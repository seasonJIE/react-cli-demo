import axios from "axios";
import {message} from 'antd';

const RESPONSE_STATUS_CODE = {
  SUCCESS: 200,
  ERROR: 500
}

export function post(url: string, data: object) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((res: any) => {
        getResponse(res.data, resolve, reject)
        // resolve(res.data);
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

const getResponse = (res: any, resolve: any, reject: any) => {
  if (res.code === RESPONSE_STATUS_CODE.SUCCESS) {
    resolve(res)
    return
  }
  reject(res.msg)
}

export const msgSuccess = (res: any) => {
  if (typeof res === "string") {
    message.success(res)
  } else if (res && res.msg) {
    message.success(res.msg)
  }
}

export const msgError = (err: any) => {
  if (err && err.response && err.response.data && err.response.data.code === RESPONSE_STATUS_CODE.ERROR) {
    message.error(err.response.data.msg)
  } else if (err && err.response && err.response.statusText !== "") {
    message.error(err.response.statusText);
  } else if (typeof err === "string") {
    message.error(err);
  } else {
    msgError(err)
  }
  throw new Error(err);
}
