import { ApiRequestError } from './api-request-error';

export interface ApiResponseError extends ApiRequestError {
  data: any;
  status: boolean;
  message: string | any[];
  code: number;
}
