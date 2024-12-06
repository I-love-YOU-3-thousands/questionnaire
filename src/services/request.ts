import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd'

class Request {
  // axios 实例
  instance: AxiosInstance

  constructor(config: InternalAxiosRequestConfig) {
    this.instance = axios.create(config)
  }
  request(config: InternalAxiosRequestConfig) {
    return this.instance.request(config)
  }
}
export default Request
