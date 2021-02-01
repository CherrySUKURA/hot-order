<template>
	<view class="login">
		<image class="backgroundImg" src="../../static/background.jpg"></image>
		<view class="input-view username">
			<view class="label-icon">
				<image src="../../static/username.png"></image>
			</view>
			<input class="Input" v-model="user.username" type="text" placeholder="请输入用户名" />
		</view>
		<view class="input-view password">
			<view class="label-icon">
				<image src="../../static/password.png"></image>
			</view>
			<input class="Input" v-model="user.password" type="text" password="true" placeholder="请输入密码" />
		</view>
		<button type="default" @click="loginFun" class="loginBtn" :hover-class="hoverBtn">登录</button>
		<view class="version">
			<text>v 0.0.1</text>
		</view>
		
	</view>
</template>

<script>
	import {mapMutations,mapActions} from 'vuex'
	import {loginRequest} from '../../request/http.js'
	export default {
		data() {
			return {
				"user": {
					"username": "",
					"password": ""
					
				},
				"userInfo":{
					"userName": '许康',
					"userStatus": "渠道商",
					"token": "11111111",
				}
			}
		},
		computed:{
			
		},
		methods:{
			...mapActions(['login']),
			loginFun(){
				loginRequest(this.user).then((res)=>{
					if(res.code == 200){
						uni.setStorage({
							key: 'userInfo',
							data: res.data,
							success: ()=>{
								this.login(res.data)
							}
						})
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.login {
		width: 100%;
		height: 100vh;
		padding-top: 250rpx;
		font-size: 28rpx;
		box-sizing: border-box;
		background-size: cover;
		background-position: center;
		position: relative;
		overflow: hidden;
	}
	.input-view{
		width: 80%;
		height: 110rpx;
		border-bottom: 1rpx solid rgba(0,0,0,.4);
		margin: auto;
		position: relative;
	}
	.input-view .label-icon{
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}
	.input-view .Input{
		width: 100%;
		height: 100%;
		padding-left: 60rpx;
		box-sizing: border-box;
	}
	.loginBtn{
		width: 80%;
		height: 90rpx;
		font-size: 24rpx;
		line-height: 90rpx;
		border-radius: 60rpx;
		margin: 40rpx auto;
		display: block;
	}
	.version{
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: 20rpx;
		color: #C0C0C0;
		font-size: 20rpx;
		line-height: 40rpx;
	}
</style>
