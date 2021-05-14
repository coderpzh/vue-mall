<template>
	<div class="tab-control">
		<div v-for="(item,index) in titles" class="tab-control-item" 
		@click="conClick(index)" :class="{active:conIndex == index}">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:"TabControl",
		props:{
			titles:{
				type:Array,
				default(){return []}
			}
		},
		data(){
			return {
				conIndex:0
			}
		},
		methods:{
			conClick(x){
				this.conIndex = x
				this.$emit('goods1Click',this.conIndex)
			}
		},
	}
</script>

<style>
	.tab-control{
		display: flex;
		text-align: center;
		background-color: #fff;
		height: 40px;
		line-height: 40px;
	}
	
	.tab-control-item{
		flex: 1;
	}
	
	.active{
		color: hotpink;
	}
	
	.active span{
		border-bottom:3px solid hotpink;
		padding: 5px;
	}
	
	.tab-control-item span{
		cursor: pointer;
	}
</style>
