<template>
	<!-- 判断对象是否为空，确保数据传过来后再进行渲染，避免无数据时渲染导致报错 -->
	<div v-if="Object.keys(detailInfo).length !== 0" class="dImg">
		<p class="dImg_text">{{this.detailInfo.desc}}</p>
		<p class="dImg_key">{{this.detailInfo.detailImage[0].key}}</p>
		
		<div v-for="item in this.detailInfo.detailImage[0].list" class="detail-img">
			<img :src="item" @load="dImg_load">
		</div>
	
	</div>
</template>

<script>
	import {debounce} from 'common/utils'
	
	export default{
		name:'DetailImg',
		props:{
			detailInfo:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data(){
			return{
				counter:0,
				imgLength:0
			}
		},
		methods:{
			dImg_load(){
				//判断：所有图片加载完成后，只进行一次回调即可
				//这里做判断只发送一次请求而不用防抖的原因是:
				//detail页面需要获取各个主题的offsetTop,用防抖可能会发送几次请求，
				//就会获取几次offsetTop，会push几次offsetTop值进数组，会影响主题标题的点击效果
				if(++this.counter == this.imgLength){
					this.$emit('dImg_load')
				}
				// if(++this.counter == this.dImg_length){
				// 	this.$emit('dImg_load')
				// }
			}
		},
		watch:{
			//watch用于监听对象的变化，只需获取一次，detailInfo为要监听的对象
			//一旦监听的对象发生变化，就执行该方法
			detailInfo(){
				this.imgLength = this.detailInfo.detailImage[0].list.length
			}
		},
		// computed:{
		// 	dImg_length(){
		// 		return this.detailInfo.detailImage[0].list.length
		// 	}
		// 	dImg_img(){
		// 		if(this.detailInfo){
		// 			return this.detailInfo.detailImage[0].list
		// 		}
		// 	},
		// 	dImg_text(){
		// 		if(this.detailInfo){
		// 			return this.detailInfo.desc
		// 		}
		// 	},
		// 	dImg_key(){
		// 		if(this.detailInfo){
		// 			return this.detailInfo.detailImage[0].key
		// 		}
		// 	}
		// }
	}
</script>

<style scoped>
	.dImg{
		border-bottom: 5px solid #f2f5f8;
		padding-bottom: 20px;
	}
	
	.detail-img{
		width: 100%;
	}
	
	.detail-img img{
		width: 100%;
		padding: 5px 0;
	}
	
	.dImg_text{
		font-size: 14px;
		padding: 10px;
		color: #878484;
		margin: 20px 0;
	}
	
	.dImg_key{
		font-size: 16px;
		padding: 5px;
		border-top: 10px hotpink double;
		border-bottom: 10px hotpink double;
		margin-bottom: 10px;
	}
</style>
