/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== DEPENDENCIES ====
import { HttpClientError } from 'error-manager-helper'

import axios,
{ 
    type AxiosRequestConfig, type Method, type AxiosError
} from 'axios'

interface RequestParams {
    url: string;
    method: Method
    payload?: any
    headers?: {
          [key: string]: string
    }
    timeout?: number
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
    errorMessage?: string
}

async function axiosRequestWrapper({
    url, method, payload, headers,
    timeout = 30000,
    responseType,
    errorMessage = 'axiosRequestWrapper() - Request failed'
}: RequestParams): Promise<any> {
    try {
        const response = await axios({
            url,
            method,
            data: payload,
            headers,
            timeout,
            responseType
        });
        
        return response;
    } catch (e: unknown) {
        throw new HttpClientError(errorMessage, e as AxiosError)
    }
}

export default axiosRequestWrapper