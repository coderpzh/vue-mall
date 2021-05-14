<template>
	<lbt :imgLength="topImages" class="detail-lbt">
		<lbtitem v-for="item in topImages" :imgLength="topImages" >
			<img :src="item" class="detail-img">
		</lbtitem>
	</lbt>
</template>

<script>
	import {lbt,lbtitem} from 'components/common/lbt'
	
	export default{
		name:'DetailLbt',
		components:{lbt,lbtitem},
		data(){
			return {
				isLoad:true,
			}
		},
		props:{
			topImages:{
				type:Array,
				default(){
					return[]
				}
			}
		},
	}
</script>

<style scoped>
	.detail-lbt{
		height: 300px;
		overflow: hidden;
	}

</style>
