import { ApiResponseError } from './api-response-error';
import { ApiRequestError } from './api-request-error';
import { ApiResponseDone } from './api-response-done';

export type ApiResult<T> = ApiRequestError | ApiResponseError | ApiResponseDone<T>;
