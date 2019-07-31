import wepy from 'wepy'
import base from './base'

export default class config extends base {
    static async test(){
        let url = `${this.baseUrl}/app/global/2/iphone.json?mark=gif&version=576&from=msite_com`
        let params = {
            mark: 'gif',
            version: 576,
            from: 'msite_com',
        }
        return this.get(url, params, true, true).then(res => {
            return res;
        })
    }
    static async newsList(id){
        let url = `${this.baseUrl}/app/tabs/iphone/${id}.json`
        let params = {
            mark:'gif',
            version:576
        }
        return this.get(url, params, true, true).then(res => {
            return res;
        })
    }
}