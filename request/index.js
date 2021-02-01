import vue from '../main.js'
import axios from 'axios'
let store = vue.$store

// 环境的切换
if (process.env.NODE_ENV == 'development') { 
    axios.defaults.baseURL = 'https://www.hotmine.cn/miniprogram';}
else if (process.env.NODE_ENV == 'debug') { 
    // axios.defaults.baseURL = 'https://www.hotmine.cn/miniprogram';
    axios.defaults.baseURL = 'https://www.hotmine.cn/miniprogram';
} 
else if (process.env.NODE_ENV == 'production') { 
    // axios.defaults.baseURL = 'https://www.hotmine.cn/miniprogram';
    axios.defaults.baseURL = 'https://www.hotmine.cn/miniprogram';
}
//请求时效
axios.defaults.timeout = 1000;
//公共请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';
//请求前拦截器
axios.interceptors.request.use(
    config => {
        //判断是否是登录接口
        if(config.url.split('/').pop() === 'userLogin'){
            return config
        }else{
            //如果不是登录接口，判断是否有token如果有就在请求头中加入token，如果没有就跳转到登录页面重新请求
            if(uni.getStorageSync('token')){
                config.headers.roleHeader = store.state.token
                config.headers.uuid = store.state.uuid
            }
            return config
        }
    },
    error => {
        return Promise.reject(error);
    }
)
//接收头拦截器
axios.interceptors.response.use(
    response => {
        if(response.status === 200){
            //判断如果是登陆就将token存入到缓存中
            if(response.config.url.split('/').pop() === 'userLogin'){
                if(response.header.roleHeader){
					uni.setStorage({
						key: 'token',
						data: response.header.roleHeader 
					})
                }
                if(response.header.uuid){
					uni.setStorage({
						key: 'uuid',
						data: response.header.uuid
					})
                }
            }
            return Promise.resolve(response)
        }else {
            Promise.reject(response)
        }
    },
    error => {
        if(error.response.status){
            switch (error.response.status){
                case 401:
					uni.showToast({
						title: '登录已失效，请重新登录',
						icon: 'none',
						success() {
							store.dispatch('login')
						}
					})
                break;
				default: 
					uni.showToast({
						title: '请求出错'
					})
            }
        }
        return Promise.reject(error.response)
    }
)

axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
    return new Promise((resolve, reject) => {
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}

//封装get请求
export function get(url,param){
    return new Promise( (resolve,reject) => {
        axios.get(url,{
            params: param
        }).then(res => {
            resolve(res.data)
        }).catch( err => {
            reject(err.data)
        })
    })
}
//封装post请求
export function post(url,param){
    return new Promise( (resolve,reject) => {
        axios.post(url,param).then(res => {
            resolve(res.data)
        }).catch( err => {
            reject(err.data)
        })
    })
}

//封装delete接口
export function Delete(url,param){
    return new Promise( (resolve,reject) => {
        axios.delete(url,{
            params: param
        }).then(res => {
            resolve(res.data)
        }).catch( err => {
            reject(err.data)
        })
    })
}

//封装put接口
export function put(url,param){
    return new Promise( (resolve,reject) => {
        axios.put(url,param).then(res => {
            resolve(res.data)
        }).catch( err => {
            reject(err.data)
        })
    })
}