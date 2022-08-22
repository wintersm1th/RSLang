import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface UnknownError {
  status: number;
  data: unknown;
}

interface FetchError {
  status: 'FETCH_ERROR';
  data?: undefined;
  error: string;
}

interface ParsingError {
  status: 'PARSING_ERROR';
  originalStatus: number;
  data: string;
  error: string;
}

interface CustomError{

  status: 'CUSTOM_ERROR';
  data?: unknown;
  error: string;
}

function isSuccessResponse<T>(response: {data: T} | {error: FetchBaseQueryError | SerializedError }): response is {data: T}
{
  return 'data' in response;
}

function isKnownError(error: UnknownError | FetchError | ParsingError | CustomError): error is FetchError | ParsingError | CustomError
{
  return 'error' in error;
}

function isSerializedError(error: Object): error is SerializedError
{
  return 'message' in error;
}

function isParsingError(error: {status: string}): error is ParsingError
{
  return error.status === 'PARSING_ERROR';
}

export {
  isSuccessResponse,
  isKnownError,
  isSerializedError,
  isParsingError
}