import axios from 'axios';
import { useState } from 'react';

import { isValidUrl } from '@src/hooks/useCheckUrl';
import { ResponseType } from '@src/types/index';
import { introspectionQuery } from '@src/utils/sdlUtils';

export const useGraphiQLRequest = (
  endpoint: string,
  body: string,
  variables: string,
  headers: { key: string; value: string }[],
  sdlUrl: string,
) => {
  const [resLoading, setResLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [sdlResponse, setSdlResponse] = useState<ResponseType | null>(null);
  const [urlError, setUrlError] = useState(false);
  const [isSdlFetched, setIsSdlFetched] = useState(false);

  const handleSendRequest = async () => {
    if (!endpoint) {
      setUrlError(true);
      setResponse(null);
      return;
    }
    setResLoading(true);

    try {
      new URL(endpoint);
    } catch (_) {
      setResponse({
        status: 400,
        message: 'The provided endpoint URL is not valid.',
      });
      setResLoading(false);
      return;
    }

    let parsedVariables = {};
    try {
      parsedVariables = variables ? JSON.parse(variables) : {};
    } catch (error) {
      setResponse({
        status: 400,
        message: 'Invalid JSON format in variables.',
      });
      setResLoading(false);
      return;
    }

    try {
      const combinedBody = {
        query: body,
        variables: parsedVariables,
      };

      const responseUrl = await axios.post(endpoint, combinedBody, {
        headers: headers.reduce(
          (acc, { key, value }) => (key ? { ...acc, [key]: value } : acc),
          {},
        ),
      });

      if (responseUrl && responseUrl.data) {
        setResponse({ status: responseUrl.status, data: responseUrl.data });
        setResLoading(false);
        await fetchSDL();
      } else {
        setResponse({
          status: responseUrl.status,
          message: 'Empty response received.',
        });
        setResLoading(false);
      }
      setUrlError(false);
    } catch (error: unknown) {
      handleRequestError(error);
    }
  };

  const fetchSDL = async () => {
    setSdlResponse(null);
    setIsSdlFetched(false);
    if (!sdlUrl || !isValidUrl(sdlUrl)) return;

    try {
      const sdlresponse = await axios.post(
        sdlUrl,
        { query: introspectionQuery },
        {
          headers: headers.reduce(
            (acc, { key, value }) => (key ? { ...acc, [key]: value } : acc),
            {},
          ),
        },
      );

      if (sdlresponse && sdlresponse.data) {
        setSdlResponse(sdlresponse.data);
        setIsSdlFetched(true);
      } else {
        setSdlResponse(null);
        setIsSdlFetched(false);
      }
    } catch (error) {
      setSdlResponse(null);
      setIsSdlFetched(false);
    }
  };

  const handleRequestError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        setResponse({
          status: 'Network Error',
          message:
            'There was a problem with the network request. Please check your connection or the endpoint URL.',
        });
      } else {
        setResponse({
          status: error.response.status,
          message:
            error.response.data?.message || 'An error occurred on the server.',
          data: error.response.data,
        });
      }
    } else if (error instanceof Error) {
      setResponse({
        status: 0,
        message: error.message,
      });
    } else {
      setResponse({
        status: 0,
        message: 'An unexpected error occurred',
      });
    }
    setResLoading(false);
    setUrlError(false);
  };

  return {
    handleSendRequest,
    response,
    sdlResponse,
    isSdlFetched,
    resLoading,
    urlError,
  };
};
