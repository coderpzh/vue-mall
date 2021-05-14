<template>
	<div class="nav-bar">
		<div class="nav-left">
			<slot name="left"></slot>
		</div>
		
		<div class="nav-center">
			<slot name="center"></slot>
		</div>
		
		<div class="nav-right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Navbar',
	}
</script>

<style>
	.nav-bar{
		display: flex;
		line-height: 44px;
		height: 44px;
		text-align: center;
		background-color: hotpink;
	}
	.nav-left,.nav-right{
		width: 60px;
	}
	.nav-center{
		flex: 1;
		color: #fff;
		font-size: 20px;
		font-weight: 700;
	}
</style>
