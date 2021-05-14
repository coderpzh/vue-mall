<template>
	<div class="recomditem">
		<div class="recomdimg"><slot name="img"></slot></div>
		<div class="recomdtext"><slot name="text"></slot></div>
	</div>
</template>

<script>
	export default{
		name:'RecomdItem'
	}
</script>

<style>
	.recomditem{
		flex: 1;
	}
	
	.recomdimg img{
		height: 75px;
		width: 75px;
		margin-bottom: 10px;
	}
</style>
