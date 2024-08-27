import axios, { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const handleRequest = async (
  method: string,
  requestUrl: string,
  requestBody: object | null = null,
): Promise<NextResponse> => {
  try {
    let response: AxiosResponse;

    switch (method) {
      case 'GET':
        response = await axios.get(requestUrl);
        break;
      case 'POST':
        response = await axios.post(requestUrl, requestBody);
        break;
      case 'PUT':
        response = await axios.put(requestUrl, requestBody);
        break;
      case 'PATCH':
        response = await axios.patch(requestUrl, requestBody);
        break;
      case 'DELETE':
        response = await axios.delete(requestUrl);
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
      console.log(error);
      
      // return NextResponse.json(
      //   { error: error.message, status: error.response.status },
      //   { status: error.response.status },
      // );
    } else if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, status: 404 },
        { status: 404 },
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
  const urlBase64 = searchParams.get('urlBase64');
  const requestUrl = Buffer.from(urlBase64!, 'base64').toString('utf-8');
  const bodyBase64 = searchParams.get('bodyBase64');
  const requestBody = bodyBase64
    ? JSON.parse(Buffer.from(bodyBase64, 'base64').toString('utf-8'))
    : null;
  return handleRequest('POST', requestUrl, requestBody);
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const urlBase64 = searchParams.get('urlBase64');
  const requestUrl = Buffer.from(urlBase64!, 'base64').toString('utf-8');
  const bodyBase64 = searchParams.get('bodyBase64');
  const requestBody = bodyBase64
    ? JSON.parse(Buffer.from(bodyBase64, 'base64').toString('utf-8'))
    : null;
  return handleRequest('PUT', requestUrl, requestBody);
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const urlBase64 = searchParams.get('urlBase64');
  const requestUrl = Buffer.from(urlBase64!, 'base64').toString('utf-8');
  const bodyBase64 = searchParams.get('bodyBase64');
  const requestBody = bodyBase64
    ? JSON.parse(Buffer.from(bodyBase64, 'base64').toString('utf-8'))
    : null;
  return handleRequest('PATCH', requestUrl, requestBody);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const urlBase64 = searchParams.get('urlBase64');
  const requestUrl = Buffer.from(urlBase64!, 'base64').toString('utf-8');
  return handleRequest('DELETE', requestUrl);
}
