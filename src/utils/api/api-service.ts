import ApiProvider from "./api-provider";
import HttpMethod from "./enums/http-method";
import { AxiosRequestConfig } from "axios";
import { ApiResult } from "./models/api-result";

export default class ApiService {
  private provider: ApiProvider;

  constructor(config: AxiosRequestConfig) {
    this.provider = new ApiProvider(config);
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    const method = HttpMethod.GET;
    return this.provider.request({ method, url, ...config });
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    const method = HttpMethod.DELETE;
    return this.provider.request({ method, url, ...config });
  }

  protected post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    const method = HttpMethod.POST;
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    });
  }

  protected put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    const method = HttpMethod.PUT;
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    });
  }

  protected patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    const method = HttpMethod.PATCH;
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    });
  }
}
