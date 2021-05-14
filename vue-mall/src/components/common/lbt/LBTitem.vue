<template>
	<div class="lbt-li" :style="{width : 1/lbtLiWidth+'%'}">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		name:'LbtItem',
		props:{
			imgLength:{
				type:Array,
				default(){
					return []
				}
			}
		},
		computed:{
			lbtLiWidth(){
				if(this.imgLength){
					return this.imgLength.length
				}
			}
		}
	}
</script>

<style>
	.lbt-li{
		flex: 1;
	}
	
	.lbt-li img{
		width: 100%;
	}
</style>
