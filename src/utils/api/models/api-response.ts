import { ApiResponseDone } from './api-response-done';
import { ApiResponseError } from './api-response-error';

export type ApiResponse<T = any> = ApiResponseError | ApiResponseDone<T>;
