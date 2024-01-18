import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type CustomHeaders = {
  [key: string]: string
}

interface ServiceOptions extends AxiosRequestConfig {
  headers?: CustomHeaders
}

class Service {
  private url: string
  private options: ServiceOptions

  constructor(
    url: string,
    headers: CustomHeaders = {},
    payload: Record<string, unknown> = {},
  ) {
    this.url = url
    this.options = {
      headers,
      ...(payload && { data: payload }),
    }
  }

  setHeaders(headers: CustomHeaders): void {
    this.options.headers = headers
  }

  setData(payload: Record<string, unknown>): void {
    this.options.data = payload
  }

  async get(params?: Record<string, unknown>): Promise<AxiosResponse> {
    this.options.method = 'GET'
    this.options.params = params
    return this.makeRequest()
  }

  async post(): Promise<AxiosResponse> {
    this.options.method = 'POST'
    return this.makeRequest()
  }

  async delete(): Promise<AxiosResponse> {
    this.options.method = 'DELETE'
    return this.makeRequest()
  }

  async patch(): Promise<AxiosResponse> {
    this.options.method = 'PATCH'
    return this.makeRequest()
  }

  private async makeRequest(): Promise<AxiosResponse> {
    console.log('Constructed URL:', this.url)
    try {
      return await axios({ url: this.url, ...this.options })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default Service
