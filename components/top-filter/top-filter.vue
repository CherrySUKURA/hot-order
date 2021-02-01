<template>
	<view class="topFilter">
		<view v-for="(item,index) in data" :key="index" class="filterModule">
			<view class="title" @click.stop="open(item,index)">{{item.title}}
				<image v-if=" index === vis && show && item.type !== 'btn'" src="../../static/pull.png"></image>
				<image v-if=" index !== vis || !show && item.type !== 'btn'" src="../../static/push.png"></image>
			</view>
			<scroll-view :scroll-y="true" v-if="type === 'list' && index === vis && show" class="list-content">
				<uni-list>
					<uni-list-item v-for="(listItem,listIndex) in item.list" :key="listIndex" clickable :title="listItem.title" @click="onclick(listItem.id,listItem.title)"></uni-list-item>
				</uni-list>
			</scroll-view>
		</view>
		<uni-calendar ref="calendar" :insert="false" @confirm="confirm"></uni-calendar>
		<uni-drawer ref="drawer" :mask="true" mode="right" :maskClick="true" width="80%">
			<slot name="moreFilter"></slot>
		</uni-drawer>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	export default {
		props: {
			filterData: {
				type: Array,
				default: []
			}
		},
		components: {
			uniCalendar,
			uniDrawer
		},
		beforeMount() {
			this.data = this.$deepClone(this.filterData)
			this.data.forEach( (item,index) => {
				item.value = ''
			})
		},
		data() {
			return {
				vis: null,//是否弹出
				data: null,//所有数据
				type: '',//弹出类型,
				show: false
			};
		},
		watch: {
			filterData(val){
				this.data = this.$deepClone(this.filterData)
			}
		},
		methods: {
			open(item, index) {//打开弹窗并判断点击的是哪个，如果是已经打开的弹窗就关闭弹窗如果不是就打开该弹窗并关闭其余弹窗
				if(item.type === 'btn'){
					this.$refs.drawer.open()
					return true
				}
				if (this.vis === index) {
					this.vis = null
					this.show = false
					this.type = ''
					return true
				}
				if (this.vis !== index){
					this.vis = index
					this.show = true
					this.type = item.type
					if (item.type === 'date') {
						this.$refs.calendar.open()
					}
					return true
				}
			},
			onclick(id,title){//选择列表弹出框里的选项后的回调
				this.data[this.vis].title = title
				this.data[this.vis].value = id
				this.$emit('change',this.data)
				this.close()
			},
			confirm(e){//时间弹出框完成按钮
				this.data[this.vis].title = e.fulldate
				this.data[this.vis].value = e.fulldate
				this.$emit('change',this.data)
				this.close()
			},
			close(){//关闭列表弹出框
				this.show = false
			},
			closeFilter(){//关闭筛选侧边弹出框
				this.$refs.drawer.close()
			}
		}
	}
</script>

<style>
	.topFilter {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #FFFFFF;
		font-size: 25rpx;
		text-align: center;
		display: flex;
		position: relative;
	}

	.topFilter .filterModule {
		flex: 1;
	}

	.topFilter .filterModule .title {
		width: 100%;
		height: 100%;
		display: inline-block;
	}

	.topFilter .filterModule image {
		width: 20rpx;
		height: 20rpx;
		display: inline-block;
		margin-left: 10rpx;
	}

	.list-content {
		width: 100%;
		max-height: 400rpx;
		position: absolute;
		top: 80rpx;
		left: 0;
		z-index: 300;
	}
</style>
