enum ApiErrorType {
  CONNECTION = 'connection',
  BAD_REQUEST = 'bad-request',
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not-found',
  CONFLICT = 'conflict',
  DATA_VALIDATION_FAILED = 'data-validation-failed',
  INTERNAL_SERVER_ERROR = 'internal-server-error',
  UNKNOWN_RESPONSE_CODE = 'unknown-response-code',
  UNKNOWN = 'unknown',
}

export default ApiErrorType;
