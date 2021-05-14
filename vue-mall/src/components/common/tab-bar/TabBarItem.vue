<template>
	<div class="tabbaritem" @click="itemClick">
		<div v-if="imgActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>		
		<div :style="textActive"><slot name="item-text"></slot></div>
	</div>
</template>

<script>
	export default {
		name:'Tabbaritem',
		methods:{
			itemClick(){
				this.$router.replace(this.link)
			}
		},
		props:{
			link:String,
			activeColor:{
				type:String,																//限制数据的类型
				default:'hotpink'														//设置数据的默认值
			}
		},
		computed:{
			imgActive(){
				return this.$route.path.indexOf(this.link) ==-1
				//indexOf()查找索引值并返回，若找不到则返回-1
				
				// return this.$route.path !== this.link
				//要求是匹配就换样式
				//若path匹配了，imgActive为false，样式为活跃的样式
				//若path不匹配，imgActive为true，样式为原本的样式				
			},
			textActive(){
				return this.imgActive ? {}:{color:this.activeColor}
				//三元表达式：判断？{为真时触发}：{为假时触发}
			}
		}
	}
</script>

<style>
	.tabbaritem{
		margin-top: 3px;
		flex: 1;
	}
	.tabbaritem img{
		height:26px;
		width: 26px;
		border-radius: 50%;
		overflow: hidden;
		vertical-align: middle;
		}
	.tabbaritem p{
		margin-top: 3px;
		margin-bottom: 0;
		font-weight: 700;
		font-size: 14px;
	}
</style>
