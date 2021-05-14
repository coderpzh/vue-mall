<template>
	<recomd>
		<recomditem v-for="item in recommend">
			<img :src="item.image" slot='img'>
			<p slot="text">{{item.title}}</p>
		</recomditem>
	</recomd>
</template>

<script>
	import {recomd,recomditem} from 'components/common/recommend'
	
	export default{
		name:'Hometj',
		props:{
			recommend:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{recomd,recomditem}
	}
</script>

<style>
	
</style>

