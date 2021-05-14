export default {
		addCart(context,payload){
			//actions不仅放异步操作，复杂的逻辑代码也建议放在ations中，mutation只放单一的操作
			
			//对比商品的iid，判断：若有相同商品则加数量，否则添加该商品进购物车列表
			//find()用于找出并返回首个符合条件的数组成员,所有成员依次执行该回调函数，且结果为true才返回该成员
			//product用于指向符合条件的商品，由于商品是引用类型(对象object)，所以修改product会同时修改原商品
			
			//有相同商品时传该商品的指向给mutations并在mutations中修改该商品的数量
			//没有找到相同商品时将该商品的信息传给mutations并在mutations中添加该商品进购物车列表
			return new Promise((resolve,reject) => {
				let product = context.state.cartList.find(item => item.iid == payload.iid)
				
				if (product) {
					context.commit('addCount',product)
				} else{
					context.commit('addList',payload)
				}
				
				resolve('加入购物车成功')
			})
			
		}
  }