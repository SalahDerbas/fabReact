import { ApiResult, ApiError } from '..';

const isError = (result: ApiResult<any>): result is ApiError => (result as ApiError).errorType !== undefined;

export default isError;
