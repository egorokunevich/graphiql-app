import { NextResponse } from '@/node_modules/next/server';
import { Dispatch, SetStateAction } from 'react';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface ResponseType<T = unknown> {
  status?: number | string;
  data?: T;
  message?: string;
  error?: string;
}

export interface RestBodyEditorProps {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  variables: { key: string; value: string }[];
  setVariables: Dispatch<SetStateAction<{ key: string; value: string }[]>>;
}

export interface RestHeaderEditorProps {
  headers: {
    key: string;
    value: string;
  }[];
  setHeaders: Dispatch<
    SetStateAction<
      {
        key: string;
        value: string;
      }[]
    >
  >;
}

export interface HeadersEditorProps {
  headers: {
    key: string;
    value: string;
  }[];
  setHeaders: Dispatch<
    SetStateAction<
      {
        key: string;
        value: string;
      }[]
    >
  >;
  updateUrl: string;
  setUpdateUrl: Dispatch<SetStateAction<string>>;
}

export interface VariablesEditorProps {
  variables: string;
  setVariables: (value: string) => void;
}

export interface RequestEditorProps {
  body: string;
  setBody: (newUrl: string) => void;
}

export type UrlInputProps = {
  endpoint: string;
  setEndpoint: Dispatch<SetStateAction<string>>;
  sdlUrl: string;
  setSdlUrl: Dispatch<SetStateAction<string>>;
  urlError: boolean;
};

export interface RestTabsProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  tabGraphiql?: boolean;
  setTabGraphiql?: Dispatch<SetStateAction<boolean>>;
}

export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS';

export interface RestUrlProps {
  urlError: boolean;
  handleSendRequest: () => Promise<
    NextResponse<{ status: number | undefined; data: null }> | undefined
  >;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  method: Method;
  setMethod: Dispatch<SetStateAction<Method>>;
}

export interface RestVariablesEditorProps {
  variables: { key: string; value: string }[];
  setVariables: Dispatch<SetStateAction<{ key: string; value: string }[]>>;
}

export interface ResponseViewerProps {
  response: ResponseType<unknown> | null;
  tabGraphiql?: boolean;
  resLoading: boolean;
}

export interface SdlViewerProps {
  sdlResponse: ResponseType<unknown> | null;
  loading: boolean;
}

export type LanguageType = 'en' | 'ru';

export interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required: boolean;
  error: string | undefined;
}

export interface ErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
  httpError?: string | null;
}
