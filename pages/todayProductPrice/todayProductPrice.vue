<template>
	<view class="todayProductPrice container" @click.stop="close()">
		<top-bar :back="false" :topText="topBarList.topText"></top-bar>
		<top-filter :filterData='filterData' @change="change" ref="topFilter"></top-filter>
		<view class="productList">
			<view class="productListItem" v-for="(item,index) in productData" :key="index">
				<view class="itemTime">{{item.textDate}}</view>
				<view class="itemImage">
					<image :src="item.image"></image>
				</view>	
				<view class="itemInfo">
					<view class="flex">
						<view class="itemNum">
							<image class="NoImage" :src="imgSrc"></image>
							<text class="NoText">{{item.erpSku}}</text>
						</view>
						<view class="itemTitle">
							<image class="NoImage" :src="imgSrc"></image>
							<text class="NoText">{{item.brand}}</text>
						</view>
						<view class="itemSite">分销商：{{item.simplified}}
						</view>
					</view>
				</view>
				<view class="itemCount">今日报价：<text>￥{{item.todayPrice}}</text></view>
			</view>
			<uni-load-more :showIcon="true" iconType="snow" :status="dataStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import topBar from '@/components/top-bar/top-bar.vue'
	import topFilter from '@/components/top-filter/top-filter.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import {getTodayProductPrice,getChannel} from '../../request/http.js'
	export default {
		components: {
			topBar,
			uniLoadMore,
			topFilter
		},
		onLoad() {
			this.HttpRequest()
		},
		onReachBottom(){
			this.page.pageNo++;
			this.dataStatus = 'loading';
			this.HttpRequestTodayProductData(this.page) 
		},
		data() {
			return {
				topBarList: {
					topText: '当日产品报价'
				},
				page: {
					dealerId: '',
					pageNo: 1,
					pageSize: 12
				},
				productData: [],
				dataStatus: 'more',
				filterData: [
					{
						title: '全部',
						type: 'list',
						list: []
					}
				],
				imgSrc: require('../../static/number.png')
			}
		},
		methods: {
			HttpRequest(){
				this.HttpRequestTodayProductData(this.page)
				this.HttpRequestChannel({})
			},
			asyncFun(duration){
				return new Promise( (resolve,reject) => {
					setTimeout(resolve,duration)
				})
			},
			async HttpRequestTodayProductData(param,status = null){
				await this.asyncFun(0)
				if(status === 'filter'){
					param.pageNo = 1
				}
				getTodayProductPrice(param).then( (res) => {
					if(res.data === null){
						this.dataStatus = 'noMore'
						return false
					}else{
						this.dataStatus = 'More'
					}
					res.data.forEach( (item,index) => {
						if(status === null){
							this.productData.push(item)
						}
					})
					if(status === 'filter'){
						this.productData = res.data
					}

				})
			},
			HttpRequestChannel(param){
				getChannel(param).then( (res) => {
					this.filterData[0].list.unshift({
						id: '',
						title: "全部",
					})
					res.data.forEach( (item,index) => {
						this.filterData[0].list.push({
							id: item.dealerId,
							title: item.simplified
						})
					})
				})
			},
			change(arr){
				this.page.dealerId = arr[0].value;
				this.HttpRequestTodayProductData(this.page,'filter')
			},
			close(){
				this.$refs.topFilter.close()
			}
		}
	}
</script>

<style>
	.todayProductPrice{
		width: 100%;
		min-height: 100vh;
		font-size: 14rpx;
		background-color: #f6f6f4;
	}
	.productList{
		padding: 30rpx;
	}
	.productListItem{
		width: 100%;
		height: 350rpx;
		border-radius: 15rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
	}
	.itemTime{
		width: 100%;
		height: auto;
		padding: 25rpx 40rpx;
		font-size: 30rpx;
		font-weight: 700;
		font-family: 'SimHei';
	}
	.itemImage{
		width: 130rpx;
		height: 130rpx;
		margin: 0 25rpx;
		vertical-align:top;
		display: inline-block;
	}
	.itemInfo{
		width: calc( 100% - 180rpx);
		height: 130rpx;
		vertical-align:top;
		display: inline-block;
	}
	.flex{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.NoImage{
		vertical-align:top;
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
	.NoText{
		line-height: 30rpx;
		font-size: 30rpx;
		color: rgba(0,0,0,.5);
	}
	.itemSite{
		font-size: 30rpx;
		font-weight: 500;
	}
	.itemCount{
		margin-top: 50rpx;
		border-top: 1rpx solid rgba(0,0,0,.3);
		text-align: right;
		font-size: 30rpx;
		line-height:80rpx;
		color: rgba(0,0,0,.6);
		padding-right: 40rpx;
	}
	.itemCount text{
		color: #F0AD4E;
	}
</style>
