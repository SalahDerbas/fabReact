import { ApiRequestError } from './api-request-error';
import { ApiResponseError } from './api-response-error';

export type ApiError = ApiResponseError | ApiRequestError;
