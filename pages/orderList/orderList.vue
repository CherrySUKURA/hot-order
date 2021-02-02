<template>
	<view class="orderList container" @click.stop="close()">
		<top-bar :back="false" :topText="topBarList.topText"></top-bar>
		<view class="search">
			<input class="searchInp" v-model="OrderParam.phone" type="number" placeholder="请输入手机号" maxlength="11"  confirm-type="search"  />
			<view class="searchBtn" @click="search">搜索</view>
		</view>
		<top-filter :filterData = 'filterData' @change="change" ref="topFilter"></top-filter>
		<view class="dataList">
			<view class="dataItem" v-for="(item,index) in orderListData" @click="open(item.id,'sku')">
				<view class="itemTop">
					<text class="title">
						{{item.shopName}} | {{item.clientName}} | {{item.addLoc1}}
					</text>
					<view class="tag">
						<uni-tag :text="item.status === 0 ? '待审核' : item.status === 2 && item.orderStatus !== 201  ? '已审核': item.status === 2 && item.orderStatus === 201 ? '已出库': item.status === 3 ? '已核算': item.status === 4 ? '已取消' : '正在核算'" size="normal" :type="item.status === 4 ? 'error' : 'success'" :circle="true"></uni-tag>
					</view>
				</view>
				<view class="itemBottom">
					<view class="itemSerial">
						订单编号：
						<text class="NoText">{{item.salesOrderNo}} - {{item.lineNo}} | {{item.sellerCode}} * {{item.orderQty}} </text>
					</view>
					<view class="itemSerial">
						订单时间：
						<text class="NoText">{{item.textDate}}</text>
					</view>
					<image v-if="item.orderStatus === 201" @click.stop="open(item.id,'logistics',item)" class="to" src="../../static/wuliu.png"></image>
				</view>
			</view>
			<uni-load-more :showIcon="true" iconType="snow" :status="dataStatus"></uni-load-more>
			<uni-popup ref="popup" type="bottom">
				<scroll-view :scroll-y="true" class="bottomPopup">
					<view class="barTitle">
						{{name === 'sku' ? 'sku详情' : '物流详情'}}
						<view class="closeBtn" @click="closePopup">
							<image src="../../static/close.png"></image>
						</view>
					</view>

					<view class="orderInfo">
						<view class="orderImg">
							<image :src="name === 'sku' ? orderMessage.image : orderMessage.logicImage"></image>
						</view>
						<view class="orderTitle">{{name === 'sku' ? orderMessage.brandName : orderMessage.logicDesc}}</view>
						<view class="orderMessage">
							<view v-if="name === 'sku'">
								<view class="message">
									商品数量 <text>{{orderMessage.orderQty}}</text>
								</view>
								<view class="message">
									商品编码 <text>{{orderMessage.sellerCode}}</text>
								</view>
								<view class="message"> 
									当日报价 <text>￥{{orderMessage.price !== null ? orderMessage.price : 0}}</text>
								</view>
								<view class="message">
									额外运费 <text>￥{{orderMessage.freight !== null ? orderMessage.freight : 0}}</text>
								</view>
							</view>
							<view v-else>
								<view class="message">
									物流地址	<text>{{orderMessage.addLoc1}}{{orderMessage.addLoc2}}{{orderMessage.addLoc3}}{{orderMessage.addFull}}</text>
								</view>
								<view class="message">
									物流编号
									 <text>
										{{orderMessage.parcelNo === null ? '暂无物流' : orderMessage.parcelNo}}
									</text>
									<button  @click="copy(orderMessage.parcelNo === null ? '暂无物流' : orderMessage.parcelNo)" class="copyBtn">复制</button>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import topBar from '@/components/top-bar/top-bar.vue'
	import topFilter from '@/components/top-filter/top-filter.vue'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup-message/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup-dialog/uni-popup-dialog.vue'
	import {getOrderInfo,getOrderSkuInfo,getChannel} from '../../request/http.js'

	export default {
		components: {
			topBar,
			topFilter,
			uniTag,
			uniLoadMore,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		onLoad(option){
			if(option.id || option.startTime || option.endTime){
				this.OrderParam.buttonId = option.id
				this.OrderParam.startTime = option.startTime
				this.OrderParam.endTime = option.endTime
				this.filterData[1].title = option.startTime
				this.filterData[2].title = option.endTime
			}else{
				this.OrderParam.buttonId = 1
				this.OrderParam.startTime = ""
				this.OrderParam.endTime = ""
			}
		},
		onShow(){
			this.HttpRequest()
		},
		onReachBottom(){
			this.OrderParam.pageNo++;
			this.dataStatus = 'loading';
			this.HttpRequestOrderInfo(this.OrderParam)
		},
		data() {
			return {
				topBarList: {
					topText: '订单列表'
				},
				filterData: [
					{
						title: '订单筛选',
						type: 'list',
						list: [],
					},
					{
						title: '开始时间',
						type: 'date',
					},
					{
						title: '结束时间',
						type: 'date',
					},
				],
				imageSrc: require('../../static/search.png'),
				orderListData: [],
				OrderParam: {
					buttonId: 1,
					pageNo: 1,
					pageSize: 12,
					dealerId: "",
					endTime: "",
					phone: "",
					startTime: ""
				},
				OrderIdParam: {
					id: ""
				},
				dataStatus: 'more',
				orderMessage: {},
				name: ''
			}
		},
		methods: {
			HttpRequest(){
				this.HttpRequestOrderInfo(this.OrderParam)
				this.HttpRequestChannel({})
			},
			asyncFun(duration){
				return new Promise( (resolve,reject) => {
					setTimeout(resolve,duration)
				})
			},
			async HttpRequestOrderInfo(param,status = null){
				if(status === 'filter'){
					param.pageNo = 1
				}
				await this.asyncFun(0)
				getOrderInfo(param).then( (res) => {
					if(res.data === null){
						this.dataStatus = 'noMore'
						return false
					}else{
						this.dataStatus = 'More'
					}
					res.data.forEach( (item,index) => {
						if(status === null){
							this.orderListData.push(item)
						}
					})
					if(status === 'filter'){
						this.orderListData = res.data
					}
				})
			},
			HttpRequestOrderSkuInfo(param){
				getOrderSkuInfo(param).then( (res) => {
					this.orderMessage = res.data
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
			close(){
				this.$refs.topFilter.close()
			},
			change(arr){
				this.OrderParam.dealerId = arr[0].value;
				this.OrderParam.startTime = arr[1].value;
				this.OrderParam.endTime = arr[2].value;
				this.HttpRequestOrderInfo(this.OrderParam,'filter')
			},
			search(){
				this.HttpRequestOrderInfo(this.OrderParam,'filter')
			},
			open(id,name,data = null){
				this.OrderIdParam.id = id
				this.name = name
				if(name === 'sku'){
					this.HttpRequestOrderSkuInfo(this.OrderIdParam)
				}
				if(name === 'logistics'){
					this.orderMessage = data
				}
				this.$refs.popup.open()
			},
			closePopup(){
				this.$refs.popup.close()
			},
			copy(data){
				uni.setClipboardData({
				    data: data,
				    success: function () {
				    }
				});
			}
		}
	}
</script>

<style scoped>
	.orderList{
		width: 100%;
		min-height: 100vh;
		font-size: 14rpx;
		background-color: #f6f6f4;
		z-index: 1;
	}
	.search{
		width: 100%;
		height: 100rpx;
		background-color: #0448ab;
		padding: 20rpx 40rpx;
	}
	.searchInp{
		width: 85%;
		height: 100%;
		background-color: #FFFFFF;
		padding-left: 90rpx;
		border-radius: 50rpx;
		box-sizing: border-box;
		font-size: 25rpx;
		background-image: url(../../static/search.png);
		background-size: 60rpx 100%;
		background-position: 2%;
		background-repeat: no-repeat;
		vertical-align: top;
		display: inline-block;
	}
	.searchBtn{
		width: 15%;
		height: 100%;
		vertical-align: top;
		display: inline-block;
		text-align: center;
		font-size: 30rpx;
		color: #FFFFFF;
		line-height: 60rpx;
	}
	.dataList{
		padding: 25rpx 25rpx;
	}
	.dataItem{
		width: 100%;
		border-radius: 15rpx;
		background-color: #FFFFFF;
		margin-bottom: 25rpx;
	}
	.itemTop{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1rpx solid rgba(0,0,0,.3);
		padding: 0 20rpx;
		position: relative;
		font-size: 25rpx;
	}
	.itemTop .tag{
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
		padding: 0 30rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
	.itemTop .tag2{
		position: absolute;
		right: 180rpx;
		top: 50%;
		transform: translateY(-50%);
		padding: 0 30rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
	.itemBottom{
		width: 100%;
		height: 150rpx;
		display: flex;
		font-size: 25rpx;
		flex-direction: column;
		justify-content: space-evenly;
		position: relative;
	}
	.itemSerial{
		display: inline-block;
		padding: 0 30rpx;
		line-height: 50%;
	}
	.NoText{
		color: rgba(0,0,0,.5);
	}
	.to{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	.bottomPopup{
		width: 100%;
		height: 1200rpx;
		background-color: #FFFFFF;
		position: relative;
	}
	.barTitle{
		width: 100%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
	}
	.closeBtn{
		width: 40rpx;
		height: 40rpx;
		float: right;
		position: absolute;
		top: 50%;
		right: 20rpx;
		transform: translateY(-80%);
	}
	.orderInfo{
		width:100%;
		padding-top: 100rpx;
		box-sizing: border-box;
	}
	.orderInfo .orderImg{
		width: 500rpx;
		height: 500rpx;
		border-radius: 15rpx;
		margin: auto;
		background-color: #e6e6e6;
		overflow: hidden;
	}
	.orderInfo .orderTitle{
		width: 100%;
		height: 100rpx; 
		line-height: 100rpx;
		font-size: 30rpx;
		font-weight: 800;
		text-align: center;
	}
	.orderInfo .orderMessage{
		width: 95%;
		min-height: 420rpx;
		border-radius: 15rpx;
		background-color: #eeeeee;
		margin: auto;
		font-size: 25rpx;
		line-height: 80rpx;
		padding: 20rpx 20rpx;
		color: rgba(0,0,0,.3);
	}
	.orderInfo .orderMessage .message{
		width: 100%;
		overflow: hidden;
		position: relative;
	}
	.orderInfo .orderMessage text{
		width: 80%;
		padding-right: 125rpx;
		color: black;
		vertical-align: top;
		display: inline-block;
		margin-left: 20rpx;
		word-break: break-all;
		box-sizing: border-box;
	}
	.copyBtn{
		width: 100rpx;
		font-size: 15rpx;
		line-height: 50rpx;
		position: absolute;
		top: 50%;
		right: 25rpx;
		transform: translateY(-50%);
	}
</style>
