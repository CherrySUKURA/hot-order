<template>
	<view class="index container">
		<top-bar :leftImgSrc="topbarList.leftImgSrc" @leftBtnFun="open"></top-bar>
		<view class="systemModule">
			<view v-for="(item,index) in routeJson.router" :key="index" class="module">
				<navigator class="module-content" :url="item.url">
					<image :src="item.imgSrc"></image>
					<view>{{item.title}}</view>
				</navigator>
			</view>
		</view>
		<uni-drawer ref="draw" :mask="drawerSet.mask" :maskClick="drawerSet.maskClick" :mode="drawerSet.mode" :width="drawerSet.width">
			<view class="side-content">
				<view class="userInfo">
					<image class="backgroundImg" src="../../static/userbg.jpg"></image>
					<view class="username">{{username}}</view>
					<view class="userstatus">用户身份:{{nickname}}</view>
				</view>
				<scroll-view :scroll-y="true" :scroll-top="false" class="list">
					 <view class="list-content">
						 <uni-list class="setList" v-if="false">
						     <uni-list-item v-for="(item,index) in userList" :key="index" :title="item.title" clickable link="navigateTo" :to="item.to" :thumb="item.thumb"
						      thumb-size="lg"></uni-list-item>
						 </uni-list>
						 <view class="button">
						 	<button class="unLoginBtn" @click="unLoginFun" type="default" plain="true">退出登录</button>
						 </view>
					 </view>
				</scroll-view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import topBar from '@/components/top-bar/top-bar.vue'
	import {mapState,mapMutations,mapActions} from 'vuex'
	export default {
		components:{
			uniDrawer,
			topBar
		},
		computed:{
			...mapState(['username','nickname','routeJson'])
		},
		data() {
			return {
				"drawerSet": {//抽屉参数
					"mask": true,//是否打开遮罩层
					"maskClick": true,//点击遮罩层是否关闭抽屉
					"mode": "left",//从左打开抽屉还是从右
					"width": "65%"//抽屉的宽度
				},
				"topbarList": {
					"leftImgSrc": "../../static/sidebar.png",
				},
				"userList": [
					{
						"title": "账户设置",
						"to": "../login/login",
						"thumb": "https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png",
					},
					{
						"title": "账户设置",
						"to": "../login/login",
						"thumb": "https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png",
					}
				],
			}
		},
		methods: {
			...mapActions(['login']),
			open(){//打开抽屉方法
				this.$refs.draw.open()
			},
			close(){//关闭抽屉方法
				this.$refs.draw.close()
			},
			unLoginFun(){
				this.login()
			}
		}
	}
</script>

<style scoped>
	.index {
		width: 100%;
		min-height: 100vh;
		font-size: 14rpx;
		background-color: #f6f6f4;
	}
	.side-content{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.userInfo{
		width: 100%;
		height: auto;
		padding: 150rpx 60rpx 80rpx 60rpx;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
	}
	.userInfo .username{
		font-size: 35rpx;
		color: #333333;
	}
	.userInfo .userstatus{
		margin-top: 20rpx;
		font-size: 25rpx;
		color: #808080;
	}
	.list{
		position: relative;
		height: calc(100% - 335rpx);
	}
	.list-content{
		width: 100%;
		min-height: 100%;
		padding-bottom: 200rpx;
		box-sizing: border-box;
		position: relative;
	}
	.button{
		width: 100%;
		height: 80rpx;
		box-sizing: border-box;
		position: absolute;
		bottom: 100rpx;
		left: 0;
	}
	.unLoginBtn{
		width: 80%;
		height: 80rpx;
		font-size: 32rpx;
		line-height: 80rpx;
		color: #409EFF!important;
		border: 1rpx solid rgba(0,0,0,.1)!important;
	}
	.systemModule{
		width: 100%;
		padding: 0 11rpx;
		box-sizing: border-box;
		overflow: hidden;
	}
	.module{
		width: 50%;
		height: 320rpx;
		float: left;
		padding: 22rpx 11rpx 0 11rpx;
		box-sizing: border-box;
	}
	.module-content{
		width: 100%;
		height: 100%;
		border-radius: 15rpx;
		background-color: #FFFFFF;
		text-align: center;
		font-size: 30rpx;
	}
	.module-content image{
		width: 130rpx;
		height: 130rpx;
		margin: 50rpx auto 40rpx auto;
	}
</style>
