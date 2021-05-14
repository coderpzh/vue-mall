<template>
	<tabbar>
			<tabbaritem link="/home" activeColor="blue">
				<img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
				<img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
				<p slot="item-text">首页</p>
			</tabbaritem>
			
			<tabbaritem link="/message">
				<img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
				<img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
				<p slot="item-text">信息</p>
			</tabbaritem>
			
			<tabbaritem link="/cart">
				<img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
				<img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
				<p slot="item-text">购物车</p>
			</tabbaritem>
			
			<tabbaritem link="/profile">
				<img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
				<img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
				<p slot="item-text">我的</p>
			</tabbaritem>
							
		</tabbar>
	
</template>

<script>
		import {tabbar,tabbaritem} from 'components/common/tab-bar'
		
		export default{
			name:'Maintabbar',
			components:{tabbar,tabbaritem},			
		}
</script>

<style>
</style>
