import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios"
import eventManager, { EVENT_UNAUTHORIZED } from "../event-manager"
import { ApiResult } from "./models/api-result"
import ApiErrorType from "./enums/api-error-type"
import { ApiError, ApiResponseError } from "."

export default class ApiProvider {
  private api: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    this.api = axios.create(config)
    this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
      ...param,
      headers: {
        ...param.headers,
        Accept: "application/json",
      },
    }))
  }

  public async request<T>(config: AxiosRequestConfig): Promise<ApiResult<T>> {
    try {
      const response = await this.api.request<ApiResult<T>>(config)
      return response.data
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  private handleError(error: AxiosError<ApiError>): ApiError {
    try {
      if (error.response) {
        // The request was made and the server responded with an error status code.
        let resError = error.response.data as ApiResponseError
        switch (resError.code) {
          case 400:
            resError.errorType = ApiErrorType.BAD_REQUEST
            break
          case 401:
            resError.errorType = ApiErrorType.UNAUTHORIZED
            eventManager.emit(EVENT_UNAUTHORIZED)
            break
          case 402:
            resError.errorType = ApiErrorType.UNAUTHORIZED
            eventManager.emit(EVENT_UNAUTHORIZED)
            break
          case 403:
            resError.errorType = ApiErrorType.FORBIDDEN
            break
          case 404:
            resError.errorType = ApiErrorType.NOT_FOUND
            break
          case 409:
            resError.errorType = ApiErrorType.CONFLICT
            break
          case 422:
            resError.errorType = ApiErrorType.DATA_VALIDATION_FAILED
            break
          case 500:
            resError.errorType = ApiErrorType.INTERNAL_SERVER_ERROR
            break
          default:
            resError.errorType = ApiErrorType.UNKNOWN_RESPONSE_CODE
            break
        }
        return resError
      } else if (error.request) {
        return { errorType: ApiErrorType.CONNECTION }
      } else {
        return { errorType: ApiErrorType.UNKNOWN }
      }
    } catch {
      return { errorType: ApiErrorType.UNKNOWN }
    }
  }
}
