import { ApiError, ApiResponseError } from '..';
import ApiErrorType from '../api/enums/api-error-type';

const isResponseError = (result: ApiError): result is ApiResponseError =>
	(result as ApiResponseError).errorType !== ApiErrorType.UNKNOWN && (result as ApiResponseError).errorType !== ApiErrorType.CONNECTION;
export default isResponseError;
