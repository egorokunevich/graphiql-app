import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { isValidUrl } from '@src/hooks/useCheckUrl';
import { ResponseType } from '@src/types/index';
import { introspectionQuery } from '@src/utils/sdlUtils';

const isAxiosError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error);
};

interface ErrorResponse {
  message?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export const useGraphiQLRequest = (
  endpoint: string,
  body: string,
  variables: string,
  headers: { key: string; value: string }[],
  sdlUrl: string,
) => {
  const t = useTranslations('responses');
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
        message: t('endpointIsNotValid'),
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
        message: t('invalidJSONFormatInVariables'),
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
          message: t('emptyResponseReceived'),
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
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (!axiosError.response) {
        setResponse({
          status: 'Network Error',
          message: t('networkError'),
        });
      } else {
        setResponse({
          status: axiosError.response?.status || 500,
          message:
            axiosError.response?.data?.message || t('errorOccuredOnTheServer'),
          data: axiosError.response?.data || null,
        });
      }
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error
    ) {
      const genericError = error as Error;
      setResponse({
        status: 0,
        message: genericError.message || t('unexpectedError'),
      });
    } else {
      setResponse({
        status: 0,
        message: t('unexpectedError'),
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
