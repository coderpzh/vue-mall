<template>
	<div class="bottom-bar">
		<div class="bar-one">
			<div>
				<i class="icon-one"></i>
				<span>客服</span>
			</div>
			
			<div>
				<i  class="icon-two"></i>
				<span>店铺</span>
			</div>
			
			<div>
				<i  class="icon-three"></i>
				<span>收藏</span>
			</div>
		</div>
		
		<div class="bar-two">
			<p @click="addToCart">加入购物车</p>
			<p>购买</p>
		</div>
		
	</div>
</template>

<script>
	export default {
		name:'DetailBottom',
		methods: {
			addToCart() {
				this.$emit('addTocart')
			}
		},
		
	}
</script>

<style scoped>
	.bottom-bar{
		display: flex;
		width: 100%;
		height: 58px;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 4;
		background-color: #fff;
	}
	
	.bar-one, .bar-two{
		width: 50%;
		flex: 1;
		display: flex;
	}
	
	.bar-one div{
		flex: 1;
		text-align: center;
		color: rgb(102, 102, 102);
		font-size: 13px;
		padding-top: 10px;
	}
	
	.icon-one{
		display: block;
		width: 22px;
		height: 22px;
		margin: 0 auto;
		margin-bottom: 3px;
		background: url(../../../assets/img/detail/detail_bottom.png) no-repeat 0 -54px/100%;
	}
	
	.icon-two{
		display: block;
		width: 22px;
		height: 22px;
		margin: 0 auto;
		margin-bottom: 3px;
		background: url(../../../assets/img/detail/detail_bottom.png) no-repeat 0 -98px/100%;
	}
	
	.icon-three{
		display: block;
		width: 22px;
		height: 22px;
		margin: 0 auto;
		margin-bottom: 3px;
		background: url(../../../assets/img/detail/detail_bottom.png) no-repeat 0 0/100%;
	}
	/* ----------------------------------------------------------------------------------------- */
	
	.bar-two p{
		flex: 1;
		text-align: center;
		line-height: 58px;
	}
	
	.bar-two :first-child{
		background-color: #ffe817;
	}
	
	.bar-two :last-child{
		background-color: #ff6699;
		color: #fff;
	}
</style>
