<template>
	<div class="tabbar">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		name:'Tabbar',
	}
</script>

<style>
	.tabbar{
		display: flex;
		text-align: center;
		background-color: #f5f5f5;
		height: 49px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
</style>
