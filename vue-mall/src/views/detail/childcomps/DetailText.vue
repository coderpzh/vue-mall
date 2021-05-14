<template>
	<!-- 判断对象是否为空，确保数据传过来后再进行渲染，避免无数据时渲染导致报错 -->
	<div class="detail-text" v-if="Object.keys(goodsInfo).length !==0">
		<p class="title">{{goodsInfo.title}}</p>
		
		<div class="price">
			<span>{{goodsInfo.newPrice}}</span>
			<span>{{goodsInfo.oldPrice}}</span>
			<span v-if="goodsInfo.discount">{{goodsInfo.discount}}</span>
		</div>
		
		<div class="text-one">
			<span>{{goodsInfo.columns[0]}}</span>
			<span>{{goodsInfo.columns[1]}}</span>
			<!-- //个别商品没有goodsInfo.services[3]信息，所以判断一下，有再进行渲染 -->
			<span v-if="goodsInfo.services[3]">{{goodsInfo.services[3].name}}</span>
		</div>
		
		<div class="text-two">
			<span>{{goodsInfo.services[0].name}}</span>
			<span>{{goodsInfo.services[1].name}}</span>
			<span>{{goodsInfo.services[2].name}}</span>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'DetailText',
		props:{
			goodsInfo:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.detail-text{
		padding: 8px;
		border-bottom: 5px solid #f2f5f8;
	}
	
	.title{
		font-size: 18px;
		margin-bottom: 5px;
	}
	
	.price :nth-child(1){
		font-size: 25px;
		color: hotpink;
	}
	
	.price :nth-child(2){
		text-decoration: line-through;
		color: #878484;
		font-size: 12px;
		margin: 0 5px;
	}
	
	.price :nth-child(3){
		font-size: 14px;
		padding:0 2px;
		background-color: hotpink;
		color: #fff;
		border-radius: 8px;
		position: relative;
		top: -8px;
	}
	
	/* ------------------------------------------------------------------- */
	
	.text-one{
		display: flex;
		padding: 10px 0 5px 0;
		border-bottom: 1px solid #878484;
		width: 95%;
		margin: 0 auto;
	}
	
	.text-one span{
		flex:1;
		font-size: 13px;
		color: #878484;
	}
	
	.text-one :nth-child(1){
		text-align: left;
	}
	
	.text-one :nth-child(2){
		text-align: center;
	}
	
	.text-one :nth-child(3){
		text-align: right;
	}
	
	/* ------------------------------------------------------------------- */
	
	.text-two{
		display: flex;
		padding: 15px 0 15px 14px;
		justify-content: space-between;
		width: 95%;
		margin: 0 auto;
	}
	
	.text-two span{
		font-size: 14px;
		position: relative;
	}
	
	.text-two span::before{
		content: '';
		position: absolute;
		left: -14px;
		top: 3px;
		width: 14px;
		height: 14px;
		background: url("~assets/img/detail/gou.png") 0 0/14px 14px;
	}
</style>
