<template>
	<div class="lbt">
		<div class="lbt-ul" :style="{width : lbtWidth*100+'%',left:lbtMove}">
			<slot></slot>
		</div>
		
		<div class="lbt-bottom">
			<div class="bottom-li" v-for="(item,index) in imgLength" @click="bottomClick(index)"
			:class="{active : index == lbtLeft}"></div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'Lbt',
		data(){
			return{
				lbtLeft:0
			}
		},
		props:{
			imgLength:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			bottomClick(x){
				this.lbtLeft = x
			}
		},
		computed:{
			lbtWidth(){
				if(this.imgLength){
					return this.imgLength.length
				}
				
			},
			lbtMove(){
				if(this.imgLength){
					return '-' +this.lbtLeft*100+'%'
				}
			}
		},
		mounted() {
			setInterval(() => {
				this.lbtLeft++;
				if(this.lbtLeft == this.imgLength.length){this.lbtLeft=0};
			},3000);
		},
	}
</script>

<style scoped>
	.lbt{
		width: 100%;
		position: relative;
	}
	
	.lbt-ul{
		position: absolute;
		left: 0;
		display: flex;
		transition: 1s;
	}
	
	.lbt-bottom{
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		display: flex;
	}
	
	.bottom-li{
		width: 10px;
		height: 10px;
		background-color: rgba(255,255,255,.6);
		flex: 1;
		border-radius: 50%;
		margin: 0 3px;
	}
	
	.active{
		background-color: #fff;
	}
</style>
