<template>
	<div class="bottom-bar">
		
		<check-button class="check" :checked="selectAll" @click.native="allCheck"/>
		
		<span>全选</span>
		
		<span>合计:￥{{totalPrice}}</span>
		
		<span class="counter">去计算({{cartLength}})</span>
		
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
	import {mapGetters} from 'vuex'//辅助函数，将store中的getters映射到局部计算属性中
	
	export default {
		name:'CartBottom',
		components: {CheckButton},
		computed: {
			...mapGetters( ['cartList'] ),
			//filter过滤数组
			//每个数组元素依次执行回调函数,并返回符合条件的元素,组成一个新的数组
			//回调函数有一个要求，必须返回一个boolean值
			
			// reduce对数组所有内容进行汇总
			// 参数1为回调函数,参数2为初始化值(第一次遍历时pre的值)
			// 回调函数的参数1(pre)为上一次遍历所返回的值,参数2(item)为每一项的值
			
			//toFixed()对对象进行四舍五入，参数为小数点后的位数
			
			cartLength(){
				return this.cartList.filter(item => item.isCheck).length
			},
			totalPrice(){
				//不要漏了return
				return this.cartList.filter(item => item.isCheck).reduce((pre,item) => {
					return  pre + item.count * item.price
				},0).toFixed(2)
			},
			selectAll(){
				//箭头函数简写：只有一行return代码时可省略{} => return !item.isCheck
				//find函数用于找出首个符合条件的数组成员并返回，所有成员依次执行该回调函数，且结果为true才返回该成员
				//满足条件即某个isCheck为false时，返回这个整个的商品对象，再取反为false
				//不满足条件即所有isCheck都为true时，返回undefined，再取反为true
				
				//判断：当数组没有数据时不选中全选按钮
				//也可用遍历或者filter()方法实现，但是这两个方法都要全部遍历一遍，而全选按钮只需一个商品不选中就不点亮
				if(this.cartList.length == 0){
					return false
				} else{
					return !this.cartList.find(item => !item.isCheck)
				}
			}
		},
		methods: {
			allCheck() {
				//让全部商品的状态和全选按钮的状态一致
				this.$store.commit('allCheck',this.selectAll)
				
				//老师的方法：
				// if(this.selectAll){
				// 	this.cartList.forEach(item => item.isCheck = false)
				// } else{
				// 	this.cartList.forEach(item => item.isCheck = true)
				// }
				
				//错误写法：不能这么优化，会把不同状态的全选跟不同商品联系起来，达不到统一的效果
				// this.cartList.forEach(item => item.isCheck = !this.selectAll)
			}
		},
		
		
		
	}
</script>

<style scoped>
	.bottom-bar{
		background-color: #eeeeee;
		height: 44px;
		line-height: 44px;
		padding-left: 10px;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 49px;
		box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
	}
	
	.check{
		display: inline-block;
		line-height: 20px;
	}
	
	.bottom-bar :nth-child(2){
		padding: 0 15px 0 5px;
		font-size: 14px;
		color: #888;
	}
	
	.bottom-bar :nth-child(3){
		color: #666;
	}
	
	.counter{
		float: right;
		display: inline-block;
		width: 25%;
		background-color: #ff4500;
		color: #fff;
		text-align: center;
	}
</style>
