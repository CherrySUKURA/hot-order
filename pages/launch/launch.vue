<template>
	<view>
		
	</view>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapActions(['login'])
		},
		onShow() {
			uni.getStorage({
				key: 'token',
				success: (res)=>{
					if(res.data.token !== ""){
						let userInfo = uni.getStorageSync('userInfo')
						this.login(userInfo)
					}else{
						uni.reLaunch({
							url: '../login/login'
						})
					}
				},
				fail: () => {
					uni.reLaunch({
						url: '../login/login'
					})
				}
			})
		}
	}
</script>

<style>

</style>
