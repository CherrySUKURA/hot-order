<template>
	<view>
		<top-bar :back="false" :topText="topBarList.topText"></top-bar>
	</view>
</template>

<script>
	import topBar from '@/components/top-bar/top-bar.vue'
	export default {
		components: {
			topBar
		},
		data() {
			return {
				topBarList: {
					topText: '创建订单'
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>

</style>
