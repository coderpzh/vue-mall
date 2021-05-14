<template>
	<lbt :imgLength="banner" class="lbt">
		<lbtitem v-for="item in banner" :imgLength="banner">
			<img :src="item.image" @load="lbtLoad" class="lbt-img">
		</lbtitem>
	</lbt>
</template>

<script>
	import {lbt,lbtitem} from 'components/common/lbt'
	
	export default{
		name:'HomeLbt',
		components:{lbt,lbtitem},
		data(){
			return{
				isLoad:true
			}
		},
		props:{
			banner:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			lbtLoad(){
				//该判断与防抖不一样，因为轮播图是水平的4张图片，只需加载完一张bsrcoll就能计算滚动高度了
				//所以只需发送第一次请求即可,用于刷新滚动高度以便获取tab2的所在高度
				if(this.isLoad){
					this.$emit('lbtLoad')
					this.isLoad = false
				}
			}
		}
	}
</script>

<style scoped>
	.lbt{
		height: 200px;
	}
	
	.lbt-img{
		height: 200px;
	}
</style>
