<template>
	<div>
		<nav-bar><span slot="center">购物车({{cartLength}})</span></nav-bar>
		
		<scroll class="scroll" ref="scroll">
			<cart-item/>
		</scroll>
		
		<cart-bottom/>
	</div>
</template>

<script>
	import NavBar from 'components/common/nav-bar/NavBar'
	import Scroll from 'components/common/scroll/Scroll' 
	
	import CartItem from './childcomps/CartItem'
	import CartBottom from './childcomps/CartBottom'
	
	import {mapGetters} from 'vuex'//辅助函数，将store中的getters映射到局部计算属性中
	
	export default{
		name:'Cart',
		components: {
			NavBar,
			Scroll,
			CartItem,
			CartBottom,
		},
		computed: {
			...mapGetters( ['cartLength'] )             //数组语法
			//...mapGetters( {length : 'cartLength'} )  对象语法，可改getters属性名
		},
		activated(){
			//组件活跃时调用，刷新better-scroll，避免切回主页是不能滚动
			this.$refs.scroll.refresh()
		},
	}
</script>

<style>
	.scroll{
		height: calc(100vh - 137px);		/* 44+44+49=137 */
		overflow: hidden;
	}
</style>
