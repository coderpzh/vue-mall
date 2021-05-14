export default {
		addList(state,payload){
			payload.count = 1								//给商品添加属性：数量1
			payload.isCheck = true					//给商品添加选中状态，默认为选中
			state.cartList.push(payload)
		},
		addCount(state,payload){
			payload.count++									//有相同商品，使其数量+1
		},
		checkClick(state,index){
			//商品的选中按钮
			state.cartList[index].isCheck = !state.cartList[index].isCheck 
		},
		allCheck(state,payload){
			//全选按钮，让全部商品的状态和全选按钮的状态一致
			//当全选按钮点亮时，点击后全部取消点亮；当全选按钮不亮时，点击后全部点亮
			// for(let i of state.cartList){
			// 	i.isCheck = !payload
			// }
			
			state.cartList.forEach(item => item.isCheck = !payload)
		}
		
		// testCart(state,payload){
			//mutations建议只放比较单一的代码,一个方法值执行一个操作 => (一个数量+1 ：一个添加信息)
			//不同方法执行不同操作，方便检查调试；若相同方法执行不同操作，会分辨不出该方法执行了什么操作
			//actions不仅放异步操作，复杂的逻辑代码也建议放在ations中
			
			//错误语法：
			//数组默认为空数组，item为空，不会进行遍历
			//在for循环中直接执行代码，会执行多次，会执行多次重复的操作
			//数组元素为引用类型，修改item会同时修改元数组，所以不需要用变量指向
			// let product = null
			// for (let item of state.cartList) {
			// 	if (item.iid == payload.iid) {
			// 		item.count++
			// 		// product = item
			// 		// product.count++
			// 		console.log('找到了')
			// 	} else{
			// 		state.cartList.push(payload)
			// 		console.log('没找到')
			// 	}
			// }
			
			//正确语法：
			//注意product不能在state中先定义，必须在此方法中定义，让其每次点击时重新定义为null
			//因为判断到不同商品后，不赋值，product为空会执行else代码，添加新的商品信息
			//若定义在state中，product被赋值会保存值，第二个商品永远无法触发else代码
			//当然不能在actions中修改state的值，devtools会追踪不到，需调用mutations方法来修改
			// let product = null
			// for (let item of context.state.cartList) {
			// 	if (item.iid == payload.iid) {
			// 		product = item
			// 	}
			// }
			
			// if (product) {
			// 	product.count++
			// } else{
			// 	context.state.cartList.push(payload)
			// }
			
		// }
  }