<template>
	<div class="toast" v-show="toastShow">{{toastText}}</div>
</template>

<script>
	export default {
		name:'Toast',
		data(){
			return {
				toastShow:false,
				toastText:''
			}
		},
		methods: {
			show(text,time=1000) {//默认参数time=2000,不传值时用该参数
				this.toastShow = true
				this.toastText = text
				
				setTimeout(() => {
					this.toastShow = false
					this.toastText = ''
				},time)
			}
		},
	}
</script>

<style scoped>
	.toast{
		background-color: rgba(0,0,0,.7);
		color: #fff;
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 6;
		padding: 10px;
		border-radius: 5px;
		transform: translate(-50%,-50%);
	}
</style>
