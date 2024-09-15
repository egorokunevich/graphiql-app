import { Buffer } from 'buffer';

import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { useState } from 'react';

import { useHistoryContext } from '@/src/context/HistoryContext';
import { sendHttpRequest } from '@/src/hooks/useHttpRequest';
import { ResponseType, RestRequestProps } from '@/src/types/index';

export interface ErrorResponseData {
  status?: number;
  data?: unknown;
  message?: string;
}

const isAxiosError = (error: unknown): error is AxiosError =>
  (error as AxiosError).isAxiosError !== undefined;

export const useRestRequest = () => {
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [urlError, setUrlError] = useState(false);
  const [resLoading, setResLoading] = useState(false);
  const { addHistoryEntry } = useHistoryContext();

  const handleSendRequest = async ({
    method,
    url,
    body,
    headers,
    variables,
  }: RestRequestProps): Promise<
    NextResponse<{ status: number | undefined; data: null }> | undefined
  > => {
    if (!url) {
      setUrlError(true);
      setResponse(null);
      setResLoading(false);
      return undefined;
    }

    try {
      const urlBase64 = Buffer.from(url).toString('base64');

      let combinedBody = body ? JSON.parse(body) : {};
      variables.forEach((variable) => {
        combinedBody[variable.key] = variable.value;
      });

      const bodyBase64 = Buffer.from(JSON.stringify(combinedBody)).toString(
        'base64',
      );

      const queryParams = headers
        .filter((header) => header.key && header.value)
        .map(
          (header) =>
            `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`,
        )
        .join('&');

      let restUrl = `/api/rest-client?method=${method}&urlBase64=${urlBase64}`;
      if (['POST', 'PUT', 'PATCH'].includes(method) && bodyBase64) {
        restUrl += `&bodyBase64=${bodyBase64}`;
      }
      if (queryParams) {
        restUrl += `&${queryParams}`;
      }

      setResLoading(true);
      let respond = await sendHttpRequest(method, restUrl);

      setResponse({ status: respond?.data.status, data: respond?.data.data });
      setUrlError(false);

      const headersObject = headers.reduce(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

      addHistoryEntry({
        type: 'rest-client',
        method,
        url,
        headers: headersObject,
        body,
        variables,
      });

      return NextResponse.json({
        status: respond?.data.status,
        data: null,
      });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseData>;

        setResponse({
          status: axiosError.response?.data?.status || error.response?.status,
          data: axiosError.response?.data?.data || '',
          message: axiosError.message,
        });
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error
      ) {
        setResponse({
          message: (error as Error).message,
        });
        setUrlError(false);
      } else {
        setResponse({
          message: 'An unexpected error occurred',
        });
        setUrlError(false);
      }
      return undefined;
    } finally {
      setResLoading(false);
    }
  };

  return {
    handleSendRequest,
    response,
    urlError,
    resLoading,
  };
};
