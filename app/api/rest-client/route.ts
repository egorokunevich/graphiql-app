import axios, { AxiosResponse, AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const handleRequest = async (
  method: string,
  requestUrl: string,
  requestBody: object | null = null,
  headers: Record<string, string> = {},
): Promise<NextResponse> => {
  try {
    let response: AxiosResponse;

    const config = {
      headers: headers,
    };

    switch (method) {
      case 'GET':
        response = await axios.get(requestUrl, config);
        break;
      case 'POST':
        if (!requestBody) {
          return NextResponse.json(
            { error: 'POST request requires a body' },
            { status: 400 },
          );
        }
        response = await axios.post(requestUrl, requestBody, config);
        break;
      case 'PUT':
        if (!requestBody) {
          return NextResponse.json(
            { error: 'PUT request requires a body' },
            { status: 400 },
          );
        }
        response = await axios.put(requestUrl, requestBody, config);
        break;
      case 'PATCH':
        response = await axios.patch(requestUrl, requestBody, config);
        break;
      case 'DELETE':
        response = await axios.delete(requestUrl, config);
        break;
      case 'HEAD':
        response = await axios.head(requestUrl, config);
        break;
      case 'OPTIONS':
        response = await axios.options(requestUrl, config);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid HTTP method' },
          { status: 405 },
        );
    }

    return NextResponse.json({ status: response.status, data: response.data });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      return NextResponse.json(
        {
          error: axiosError.message,
          status: axiosError.response?.status || 404,
          data: axiosError.response?.data || null,
        },
        { status: axiosError.response?.status || 500 },
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, status: 500 },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred', status: 500 },
        { status: 500 },
      );
    }
  }
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const urlBase64 = searchParams.get('urlBase64');
  const requestUrl = Buffer.from(urlBase64!, 'base64').toString('utf-8');
  return handleRequest('GET', requestUrl);
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const urlBase64 = searchParams.get('urlBase64') || '';

  const headers = Object.fromEntries(searchParams.entries());
  delete headers.urlBase64;

  const requestUrl = Buffer.from(urlBase64, 'base64').toString('utf-8');

  const bodyBase64 = searchParams.get('bodyBase64');
  const requestBody = bodyBase64
    ? JSON.parse(Buffer.from(bodyBase64, 'base64').toString('utf-8'))
    : null;
  if (!requestBody || Object.keys(requestBody).length === 0) {
    return NextResponse.json(
      { error: 'POST request requires a non-empty body' },
      { status: 400 },
    );
  }

  return handleRequest('POST', requestUrl, requestBody, headers);
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const method = 'PUT';
  const urlBase64 = searchParams.get('urlBase64') || '';
  const headers = Object.fromEntries(searchParams.entries());
  delete headers.urlBase64;

  const requestUrl = Buffer.from(urlBase64, 'base64').toString('utf-8');
  const bodyBase64 = searchParams.get('bodyBase64');
  const requestBody = bodyBase64
    ? JSON.parse(Buffer.from(bodyBase64, 'base64').toString('utf-8'))
    : null;
  if (!requestBody || Object.keys(requestBody).length === 0) {
    return NextResponse.json(
      { error: 'PUT request requires a non-empty body' },
      { status: 400 },
    );
  }
  return handleRequest(method, requestUrl, requestBody, headers);
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const method = 'PATCH';
  const urlBase64 = searchParams.get('urlBase64') || '';
  const headers = Object.fromEntries(searchParams.entries());
  delete headers.urlBase64;

  const requestUrl = Buffer.from(urlBase64, 'base64').toString('utf-8');
  const bodyBase64 = searchParams.get('bodyBase64');
  const requestBody = bodyBase64
    ? JSON.parse(Buffer.from(bodyBase64, 'base64').toString('utf-8'))
    : null;
  return handleRequest(method, requestUrl, requestBody, headers);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const method = 'DELETE';
  const urlBase64 = searchParams.get('urlBase64') || '';
  const headers = Object.fromEntries(searchParams.entries());
  delete headers.urlBase64;

  const requestUrl = Buffer.from(urlBase64, 'base64').toString('utf-8');
  return handleRequest(method, requestUrl, null, headers);
}

export async function HEAD(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const urlBase64 = searchParams.get('urlBase64') || '';
  const headers = Object.fromEntries(searchParams.entries());
  delete headers.urlBase64;

  const requestUrl = Buffer.from(urlBase64, 'base64').toString('utf-8');
  return handleRequest('HEAD', requestUrl, null, headers);
}

export async function OPTIONS(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const method = 'OPTIONS';
  const urlBase64 = searchParams.get('urlBase64') || '';
  const headers = Object.fromEntries(searchParams.entries());
  delete headers.urlBase64;

  const requestUrl = Buffer.from(urlBase64, 'base64').toString('utf-8');
  return handleRequest(method, requestUrl, null, headers);
}
