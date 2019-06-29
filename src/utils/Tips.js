import Toast from '../vant-ui/toast/toast';
export default class Tips {
    static isLoading = false
    static loading(tit = '加载中...',duration = 0){
        this.isLoading = true
        if(this.isLoading){
            Toast.loading({
                mask: true,
                message: tit,
                duration
            });
        }else{
            wx.showNavigationBarLoading();
        }
        
    }
    static loaded(){
        this.isLoading = false
        Toast.clear();
        
        
    }
}