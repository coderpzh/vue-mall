<template>
	<div class="check">
		<img src="~assets/img/cart/tick.svg" :class="{checkActive:checked}">
	</div>
</template>

<script>
	export default {
		name:'CheckButton',
		props: {
			checked: {
				//商品的选中状态，应该在对象模型(商品)中修改
				//即在vuex里的商品数据中添加/修改状态,不要在该组件中直接修改
				type: Boolean,
				default: true
			},
		}
	}
</script>

<style scoped>
	img{
		border-radius: 50%;
		border: 3px solid #ccc;
	}
	
	.checkActive{
		background-color: #ff8198;
		border: 3px solid #ff8198;
	}
</style>
