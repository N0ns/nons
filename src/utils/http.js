import wepy from 'wepy';
import Tips from '../utils/Tips';
// HTTP工具类
export default class http {
  static async request(method, url, data, loading = true, msg = false,form=false,needToken = true) {

    const param = {
      url: url,
      method: method,
      data: false ? Object.assign(data, {
        token: wepy.getStorageSync("token")
      }) : data,
      header:{
        "Content-Type": form?"application/x-www-form-urlencoded":"application/json"
      }
    };

    if (loading) {
      // store.save('loading', true)
      Tips.loading();
    }
    // 网络连接超时
    let _data;
    await wepy.request(param).then(res => {
      if (loading) {
        // store.save('loading', false)
        Tips.loaded();
      }
      
      if (this.isSuccess(res)) {
        _data = !msg ? res.data.data : res.data;
      } else {
        throw this.requestException(res);
      }
    }).catch(err => {
      if (loading) {
        // store.save('loading', false)
        Tips.loaded();
      }
      // Tips.loaded();
      Tips.toast("网络连接超时，请重试", () => { }, "none");
      return err;
    });
    return _data;
  }

  /**
   * 判断请求是否成功
   */
  static isSuccess(res) {
    const wxCode = res.statusCode;
    // 微信请求错误
    if (wxCode !== 200) {
      return false;
    }

    return true;
  }

  /**
   * 异常
   */
  static requestException(res) {
    const error = {};
    error.statusCode = res.statusCode;
    const wxData = res.data;
    const serverData = wxData.data;
    if (serverData) {
      error.serverCode = wxData.code;
      error.message = serverData.message;
      error.serverData = serverData;
    }
    return error;
  }

  static get(url, data, loading = true, msg = false) {
    return this.request('GET', url, data, loading, msg);
  }

  static put(url, data, loading = true, msg = false) {
    return this.request('PUT', url, data, loading, msg);
  }

  static post(url, data, loading = true, msg = false,form=false,needToken=true) {
    return this.request('POST', url, data, loading, msg,form,needToken);
  }

  static patch(url, data, loading = true, msg = false) {
    return this.request('PATCH', url, data, loading, msg);
  }

  static delete(url, data, loading = true, msg = false) {
    return this.request('DELETE', url, data, loading, msg);
  }
}