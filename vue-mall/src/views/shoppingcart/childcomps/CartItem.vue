<template>
	<!-- 另外一种商品展示的方法： -->
	<!-- 在Shoppingcart中获取cartList并遍历cart-item，然后传item过来，该组件就根据item来展示商品 -->
	<div v-if="Object.keys(cartList).length !==0">
		<div class="cart-item" v-for="(item,index) in cartList">
			<check-button class="check" :checked="item.isCheck" @click.native="checkClick(index)"/>
			
			<img :src="item.img" alt="商品图片">
			
			<div class="text">
				<p>{{item.title}}</p>
				<p>{{item.desc}}</p>
				<span>￥{{item.price}}</span>
				<span>x{{item.count}}</span>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
	
	export default {
		name:'CartItem',
		components: {CheckButton},
		computed: {
			cartList() {
				return this.$store.state.cartList
			}
		},
		methods: {
			checkClick(x) {
				this.$store.commit('checkClick',x)
			}
		},
	}
</script>

<style scoped>
	.cart-item{
		display: flex;
		padding: 5px;
		border-bottom: 1px solid #ccc;
	}
	
	.check{
		margin-top: 45px;
	}
	
	.cart-item img{
		width: 80px;
		height: 100px;
		border-radius: 5px;
		margin: 5px;
	}
	
	.text{
		flex: 6;
		overflow: hidden;
		padding: 10px;
	}
	
	.text :first-child{
		font-size: 17px;
		margin-bottom: 10px;
	}
	
	.text :nth-child(2){
		font-size: 14px;
		color: rgb(102, 102, 102);
		margin-bottom: 20px;
	}
	
	.text :nth-child(3){
		font-size: 17px;
		color: orangered
	}
	
	.text :last-child{
		font-size: 17px;
		float: right;
		padding-right: 10px;
	}
	
	.text p{
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
</style>
