import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		username: "",
		nickname: "",
		token: "",
		uuid: "",
		routeJson: []
	},
	getters: {
		
	},
	mutations: {
		login(state,res = null){
			if(res !== null){
				state.hasLogin = true;
				state.username = res.username;
				state.nickname = res.nickname;;
				state.routeJson = res.routeJson
				state.token = uni.getStorageSync('token');
				state.uuid = uni.getStorageSync('uuid');
			}else{
				uni.removeStorageSync('token')
				uni.removeStorageSync('uuid')
				uni.removeStorageSync('userInfo')
				state.hasLogin = false;
				state.username = "";
				state.nickname = "";
				state.token = "";
				state.uuid = "";
				state.routeJson = []
			}
		},
	},
	actions: {
		login({commit},res = null){
			commit('login',res)
			if(res !== null){
				uni.reLaunch({
					url: '../../pages/index/index',
					success: ()=>{
						uni.showToast({
							title: '登陆成功',
							icon: 'success'
						})
					}
				})
			}else{
				uni.reLaunch({
					url: '../login/login'
				})
			}
		},
	}
})

export default store