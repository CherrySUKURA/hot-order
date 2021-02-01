<template>
	<view class="topbar">
		<view v-if="leftImgSrc !== '' && back" class="leftBtn barBtn" @click="leftBtnFun">
			<image :src="leftImgSrc"></image>
		</view>

		<navigator v-if="!back" class="leftBtn barBtn" open-type="navigateBack">
			<image src="../../static/back.png"></image>
		</navigator>

		<text class="topText" v-if="topText !== ''">{{topText}}</text>
		<view v-if="rightImgSrc !== ''" class="rightBtn barBtn" @click="rightBtnFun">
			<image :src="rightImgSrc"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			leftImgSrc: {//左边图片
				type: String,
				default: ''
			},
			rightImgSrc: {//右边图片
				type: String,
				default: ''
			},
			topText: {//中间文字
				type: String,
				default: ''
			},
			back: {//是否关闭回退键
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			leftBtnFun() {
				this.$emit('leftBtnFun')
			},
			rightBtnFun() {
				this.$emit('rightBtnFun')
			}
		}
	}
</script>

<style>
	.topbar{
		width: 100%;
		height: 200rpx;
		background-color: #0448ab;
/* 		background: linear-gradient(120deg, #00e4d0, #5983e8);
		-webkit-transition: background 0.25s ease; */
		position: fixed;
		top: 0;
		left: 0;
		box-shadow: 0rpx 7rpx 7rpx -7rpx rgba(255,255,255,.5);
		z-index: 2;
	}
	.topbar .barBtn{
		width: 50rpx;
		height: 40rpx;
		position: absolute;
		bottom: 55rpx;
		cursor: pointer;
	}
	.topText{
		font-size: 40rpx;
		font-weight: 400;
		color: #FFFFFF;
		position: absolute;
		bottom: 52rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.leftBtn {
		left: 40rpx;
	}
	.rightBtn {
		right: 40rpx;
	}
</style>
