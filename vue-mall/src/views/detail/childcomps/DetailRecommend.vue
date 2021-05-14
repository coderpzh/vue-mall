<template>
	<goods-list :goods="detailRecommend"></goods-list>
</template>

<script>
	import GoodsList from 'components/content/goods/GoodsList'
	
	export default {
		name:'DetailRecommend',
		components: {GoodsList},
		props: {
			detailRecommend: {
				type:Array,
				default(){
					return []
				}
			},
		},
	}
</script>

<style scoped>
</style>
