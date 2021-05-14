<template>
	<div class="backtop">
		<img src="~assets/img/common/top.png" alt="">
	</div>
</template>

<script>
	export default{
		name:'BackTop',
	}
</script>

<style>
	.backtop{
		position: fixed;
		right: 10px;
		bottom: 55px;
		z-index: 6;
	}
	
	.backtop img{
		width: 40px;
		height: 40px;
	}
</style>
