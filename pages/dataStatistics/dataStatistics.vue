<template>
	<view class="dataStatistics container">
		<top-bar :back="false" :topText="topBarList.topText"></top-bar>
		<view class="sizer">
			<view class="sizer-picker">
				<view class="timerPick">
					<picker mode="date" :value="param.startTime" :start="validStartDate" :end="validEndDate" @change="bindStartDateChange">
						<view class="uni-input">{{param.startTime}}</view>
					</picker>
				</view>
				<text>至</text>
				<view class="timerPick">
					<picker mode="date" :value="param.endTime" :start="validStartDate" :end="validEndDate" @change="bindEndDateChange">
						<view class="uni-input">{{param.endTime}}</view>
					</picker>
				</view>
				<view class="filter" v-if="false" @click="open">
					<image src="../../static/filter.png"></image>
				</view>
			</view>
		</view>
		<view class="statistics">
			<view class="statistics-module" @click="toNaviget('1',param.startTime,param.endTime)">
				<view class="dataImg">
					<image src="../../static/orderTotal.png"></image>
				</view>
				<view class="title">
					<view class="total">{{orderTotal}}</view>
					<view class="subtitle">订单总数</view>
				</view>
			</view>
			<view class="statistics-module" @click="toNaviget('2',param.startTime,param.endTime)">
				<view class="dataImg">
					<image src="../../static/noReply.png"></image>
				</view>
				<view class="title">
					<view class="total">{{noReplyTotal}}</view>
					<view class="subtitle">未回物流</view>
				</view>
			</view>
			<view class="statistics-module" @click="toNaviget('3',param.startTime,param.endTime)">
				<view class="dataImg">
					<image src="../../static/reply.png"></image>
				</view>
				<view class="title">
					<view class="total">{{replyTotal}}</view>
					<view class="subtitle">已回物流</view>
				</view>
			</view>
		</view>
		<uni-drawer ref="draw" :mask="drawerSet.mask" :maskClick="drawerSet.maskClick" :mode="drawerSet.mode" :width="drawerSet.width">
			<scroll-view class="formSelected">
				<view class="uni-title uni-common-pl">地区选择器</view>
				        <view class="uni-list">
				            <view class="uni-list-cell">
				                <view class="uni-list-cell-left">
				                    当前选择
				                </view>
				                <view class="uni-list-cell-db">
				                    <picker @change="bindPickerChange" :value="index" range-key="simplified" :range="array">
				                        <view class="uni-input">{{array[index].simplified}}</view>
				                    </picker>
				                </view>
				            </view>
				        </view>
			</scroll-view>
			<view class="btnGroup">
				<button type="default" class="btn confirm">确认</button>
				<button type="primary" @click="close()" class="btn cancel">取消</button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import topBar from '@/components/top-bar/top-bar.vue'
	import {getChannel,logicNoReply,logicReply,orderNum} from '../../request/http.js'
	export default {
		components: {
			topBar
		},
		onShow() {
			this.httpReaquestData()
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			const currentDate2 = this.getDate('endDate')
			return {
				"topBarList": {
					topText: '数据统计'
				},
				param: {
					"dearerId": "",
					"endTime": currentDate2,
					"startTime": currentDate
				},
				"drawerSet": {//抽屉参数
					"mask": true,//是否打开遮罩层
					"maskClick": true,//点击遮罩层是否关闭抽屉
					"mode": "right",//从左打开抽屉还是从右
					"width": "80%"//抽屉的宽度
				},
				dataNumber: {
					"backGround": {
						backgroundColor: "linear-gradient(120deg, #00e4d0, #5983e8);"
					}
				},
				orderTotal: 0,
				noReplyTotal: 0,
				replyTotal: 0,
				array: [],
				index: 0,
			}
		},
		computed: {
			validStartDate() {
				return this.getDate('start');
			},
			validEndDate() {
				return this.getDate('end');
			}
		},
		methods: {
			httpReaquestData(){
				this.RequestLogicNoReply(this.param)
				this.RequestLogicReply(this.param)
				this.RequestOrderNum(this.param)
			},
			filterHttpRequestData(param){
				this.RequestGetChannel(param)
			},
			RequestLogicNoReply(param){
				logicNoReply(param).then( (res) => {
					this.noReplyTotal = res.data.logicNoReply 
				})
			},
			RequestLogicReply(param){
				logicReply(param).then( (res) => {
					this.replyTotal = res.data.logicReplied
				})
			},
			RequestOrderNum(param){
				orderNum(param).then( (res) => {
					this.orderTotal = res.data.orderNum
				})
			},
			RequestGetChannel(param){
				getChannel().then( (res) => {
					res.data.unshift({
						bankAccound: null,
						bankName: null,
						businessEmail: null,
						contactEmail: null,
						contactName: null,
						contactPhone: null,
						dealerId: "",
						dealerName: null,
						endDate: null,
						id: null,
						licenseNo: null,
						logisticsTracking: null,
						paymentMethod: null,
						simplified: "全部",
						startDate: null,
						taxNo: null,
					})
					this.array = res.data
				})
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindStartDateChange(e) {
				let ruler = this.timerRuler(e.target.value,this.param.endTime)
				if(ruler){
					this.param.startTime = e.target.value;
					this.httpReaquestData()
				}else{
					this.param.startTime = this.getDate()
					this.param.endTime = this.getDate('endDate')
				}
			},
			bindEndDateChange(e) {
				let ruler = this.timerRuler(this.param.startTime,e.target.value)
				if(ruler){
					this.param.endTime = e.target.value;
					this.httpReaquestData()
				}else{
					this.param.startTime = this.getDate()
					this.param.endTime = this.getDate('endDate')
				}
			},
			timerRuler(startDate,endDate){
				const timerArr1 = startDate.split('-')
				const timerArr2 = endDate.split('-')
				if(startDate === endDate){
					uni.showToast({
						title: '开始时间与结束时间不能相同',
						icon: 'none'
					})
					return false
				}
				let every =  timerArr2.every( (item,index,array) => {
					if(index === 2){
						return item > timerArr1[index]
					}else{
						return item >= timerArr1[index]
					}
				})
				if(!every){
					uni.showToast({
						title: '开始时间不能大于结束时间',
						icon: 'none'
					})
					return false
				}
				// for(let i = 0 ; i < timerArr2.length ; i++){
				// 	if(parseInt(timerArr1[i]) > parseInt(timerArr2[i])){
				// 		uni.showToast({
				// 			title: '开始时间不能大于结束时间',
				// 			icon: 'none'
				// 		})
				// 		return false
				// 	}
				// }
				return true
			},
			open(){
				this.filterHttpRequestData({})
				this.$refs.draw.open()
			},
			close(){
				this.$refs.draw.close()
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				} else if(type === 'endDate'){
					day = day + 1;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			toNaviget(id,startTime,endTime) {
				uni.navigateTo({
					url: '../orderList/orderList?id=' + id + '&startTime=' + startTime + '&endTime=' + endTime
				})
			}
		}
	}
</script>

<style scoped>
	.dataStatistics{
		width: 100%;
		min-height: 100vh;
		background-color: #f6f6f4;
	}
	.sizer{
		width: 100%;
		height: 200rpx;
		background-color: #0448ab;
		text-align: center;
	}
	.sizer .sizer-picker{
		display: inline-block;
		background-color: #3369e7;
		margin-top: 25rpx;
		padding: 20rpx 0;
		box-sizing: border-box;
		position: relative;
		font-size: 30rpx;
		color: #FFFFFF;
		border-radius: 5rpx;
	}
	.sizer .sizer-picker .filter{
		width: 60rpx;
		height: 50rpx;
		position: absolute;
		top: 50%;
		right: -70rpx;
		transform: translateY(-50%);
	}
	.sizer .sizer-picker .timerPick{
		width: 250rpx;
		text-align: center;
		display: inline-block;
	}
	.sizer .sizer-picker text{
		display: inline-block;
	}
	.statistics{
		width: 100%;
		height: auto;
		margin-top: -80rpx;
		box-sizing: border-box;
		padding: 0 40rpx;
	}
	.statistics-module{
		width: 100%;
		height: 250rpx;
		background-color: #FFFFFF;
		border-radius: 25rpx;
		margin-bottom: 40rpx;
		position: relative;
		box-shadow:0 2rpx 4rpx rgba(0, 0, 0, .3);
/* 		padding-left: 60rpx;
		box-sizing: border-box; */
	}
	.dataImg{
		width: 150rpx;
		height: 150rpx;
		position: absolute;
		top: 50%;
		left: 80rpx;
		transform: translateY(-50%);
	}
	.statistics-module .title{
		font-size: 25rpx;
		position: absolute;
		top: 50%;
		left: 280rpx;
		transform: translateY(-50%);
		color: rgba(0,0,0,.5);
	}
	.statistics-module .total{
		font-size: 55rpx;
		color: #409EFF;
	}
	.formSelected{
		width: 100%;
		min-height: 100vh;
		padding: 200rpx 0 120rpx 0;
		background-color: #f6f6f4;
	}
	.btnGroup{
		width: 100%;
		height: 120rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 20rpx 0;
		box-sizing: border-box;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
	}
	.btnGroup .btn{
		width: 180rpx;
		height: 100%;
		float: left;
	}
</style>
