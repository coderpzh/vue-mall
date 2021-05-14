<template>
	<div class="recomd">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		name:'Recomd'
	}
</script>

<style>
	.recomd{
		display: flex;
		text-align: center;
		padding: 20px 0;
		font-size: 14px;
		border-bottom: 8px solid #eee;
	}
</style>
