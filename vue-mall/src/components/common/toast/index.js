import Toast from './Toast'

const obj = {}

obj.install = function (Vue){
	// 1.创建组件构造器
	const toastContrustor = Vue.extend(Toast)
	
	// 2.用new的方式,根据组件构造器,可创建一个组件对象
	const toast = new toastContrustor()
	
	// 3.将组件对象,手动挂载到某个元素上
	toast.$mount(document.createElement('div'))
	
	//4.将组件对象的模板(template)挂载到body上,toast.$el对应的就是div
	document.body.appendChild(toast.$el)
	
	//5.添加Vue原型，整个vue实例都可以使用$toast来获取toast对象
	Vue.prototype.$toast = toast       
	
}

export default obj
