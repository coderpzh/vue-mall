<template>
	<nav-bar class="detail-nav">
		<div slot="left" class="nav-back" @click="backClick">
			<img src="~assets/img/common/back.svg">
		</div>
		
		<div slot="center" class="nav-text">
			<span v-for="(item,index) in list" @click="activeClick(index)" 
			:class="{active:colorIndex == index}">
				{{item}}
			</span>
		</div>
	</nav-bar>
</template>

<script>
	import NavBar from 'components/common/nav-bar/NavBar'
	
	export default{
		name:'DetailNav',
		components:{NavBar},
		data(){
			return{
				colorIndex:0,
				list:['商品','参数','评论','推荐'],
			}
		},
		methods:{
			backClick(){
				this.$router.back()
			},
			activeClick(x){
				this.colorIndex = x
				this.$emit('navClick',x)
			}
		}
	}
</script>

<style scoped>
	.detail-nav{
		background-color: #fff;
		border-bottom: 3px solid #f5f5f5;
	}
	
	.nav-back{
		margin-top: 13px;
	}
	
	.nav-text{
		color: #000;
		font-weight: 400;
		font-size: 16px;
		display: flex;
	}
	
	.nav-text span{
		flex: 1;
	}
	
	.active{
		color: hotpink;
	}
</style>
