import {debounce} from 'common/utils'	//防抖操作
import BackTop from 'components/common/back-top/BackTop'//回到顶部

//商品图片全部加载完后刷新better-scroll
export const GoodsItem_imgLoad ={
	data(){
		return {
			img_load:null
		}
	},
	mounted(){
		// 为避免better-scroll与异步加载起冲突,在异步加载完后刷新better-scroll使其重新计算可滚动高度
		//获取操作DOM的代码最好写在mounted中，不要在create中获取，因为组件创建好时不一定能及时挂载上模板，有可能获取不到DOM
		
		//将函数当做参数传入时，无需加(),加了表示传入该函数的返回值,因此这里的refresh不用加()
		const refresh = debounce(this.$refs.scroll.refresh,200)
		this.img_load = () => {
			refresh()
		}
		
		this.$bus.$on('imgLoad',this.img_load)
		
		//若用箭头函数传参则需要加()
		// const refresh = debounce(() => {
		// 	this.$refs.scroll.refresh()
		// 	console.log('goodsItem的图片')
		// },200)
		
		//没做防抖操作，会非常频繁的调用refresh(),浪费性能
		// this.$bus.$on('imgLoad',() => {
		// 	this.$refs.scroll.refresh()
		// }) 
	}
}

export const back_top = {
	components:{BackTop},
	data(){
		return {
			showBackTop:false,
		}
	},
	methods:{
		//回到顶部的方法
		backTop(){
			this.$refs.scroll.scrollTo(0,0)
		},
		
		//这里不能混入该方法，因为原组件的该方法中有其他代码，会将混入的代码覆盖
		// 监听滚动,回到顶部的显隐
		// scrolling(position){
		// 	this.showBackTop = (-position.y) > 1000
		// },
	}
}