<template>
	<div>
		<detail-nav @navClick="navClick" ref="navBar" />
		
		<scroll class="scroll" ref="scroll" @scrolling="scrolling" :probeType="3">
			
			<detail-lbt :topImages="topImages" />
			
			<detail-text :goodsInfo="goodsInfo" />
			
			<detail-shop :shopInfo="shopInfo" />
			
			<detail-img :detailInfo="detailInfo" @dImg_load="dImg_load" />
			
			<detail-table :detailParams="detailParams" ref="table" />
			
			<detail-comment :detailComment="detailComment" ref="comment" />
			
			<detail-recommend :detailRecommend="detailRecommend" ref="recomd" />
		</scroll>
		
		<detail-bottom @addTocart="addTocart" />
		
		<back-top @click.native="backTop" v-show="showBackTop" />
		<!-- 组件标签不能直接监听原生事件，需要加".native"修饰符 -->
		
		<toast :toastText="toastText" :toastShow="toastShow"/>
	</div>
</template>

<script>
	import {getDetail,getRecommend} from 'network/detail'
	import {Goods,Shop,GoodsParam,GoodsComment} from 'network/detail'
	
	import {debounce} from 'common/utils'	//防抖操作
	import {GoodsItem_imgLoad,back_top} from 'common/mixin'//引入混入代码，减少代码的重复
	
	import DetailNav from './childcomps/DetailNav'
	import DetailLbt from './childcomps/DetailLbt'
	import DetailText from './childcomps/DetailText'
	import DetailShop from './childcomps/DetailShop'
	import DetailImg from './childcomps/DetailImg'
	import DetailTable from './childcomps/DetailTable'
	import DetailComment from './childcomps/DetailComment'
	import DetailRecommend from './childcomps/DetailRecommend'
	import DetailBottom from './childcomps/DetailBottom'
	
	import Scroll from 'components/common/scroll/Scroll'
	import Toast from 'components/common/toast/Toast' 
	
	export default{
		name:'Detail',
		mixins:[GoodsItem_imgLoad,back_top],
		components:{
			DetailNav,
			DetailLbt,
			DetailText,
			DetailShop,
			DetailImg,
			DetailTable,
			DetailComment,
			DetailRecommend,
			DetailBottom,
			Scroll,
			Toast,
		},
		data(){
			return{
				iid:null,
				topImages:[],
				goodsInfo:{},
				shopInfo:{},
				detailInfo:{},
				detailParams:{},
				detailComment:{},
				detailRecommend:null,
				topList:[0],
				toastText:null,
				toastShow:null
			}
		},
		created() {
			//请求商品数据
			this.iid = this.$route.params.iid
			getDetail(this.iid).then(res => {
				const data = res.data.result
				
				//请求商品轮播图图片
				this.topImages = data.itemInfo.topImages
				
				//请求商品信息
				this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				
				//请求店铺信息
				this.shopInfo = new Shop(data.shopInfo)
				
				//请求商品图片
				this.detailInfo = data.detailInfo
				
				//请求商品参数
				this.detailParams = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				
				//请求评论信息
				//做判断，因为有些商品没有评论信息，所以无法请求数据，会报错
				if(data.rate.list){
					this.detailComment = new GoodsComment(data.rate.list[0])
				}
			})
			
			//请求推荐商品信息
			getRecommend().then(res => {
				this.detailRecommend = res.data.data.list
			})
		},
		destroyed(){
			//组件被销毁时调用,在切出详情页时取消全局事件的监听
			this.$bus.$off('imgLoad',this.img_load)
		},
		methods:{
			dImg_load(){
				//等商品垂直展示的图片全部加载完后刷新better-scroll
				this.$refs.scroll.refresh()
				
				//等商品垂直展示的图片全部加载完后获取各个板块的offsetTop
				this.topList.push(this.$refs.table.$el.offsetTop)
				this.topList.push(this.$refs.comment.$el.offsetTop)
				this.topList.push(this.$refs.recomd.$el.offsetTop)
				this.topList.push(Number.MAX_VALUE) //js中最大的数，用来方便做比较，不遍历它
			},
			addTocart(){
				//获取购物车商品的信息，并存放到Vuex中
				const cartInfo = {}
				cartInfo.iid = this.iid
				cartInfo.img = this.topImages[0]
				cartInfo.title = this.goodsInfo.title
				cartInfo.desc = this.goodsInfo.desc
				cartInfo.price = this.goodsInfo.realPrice
				
				this.$store.dispatch('addCart',cartInfo).then(res => {
					this.$toast.show(res)
				})
				
				//在购物车添加成功后弹出弹窗,在actions中使用promise方法
				//1.普通封装组件方法
				// this.$store.dispatch('addCart',cartInfo).then(res => {
				// 	this.toastText = res
				// 	this.toastShow = true
				// 	setTimeout(() => {
				// 		this.toastShow = false
				//		this.toastText = ''
				// 	},2000);
				// })
				
				//2.封装插件方法 this.$toast.show(res)
				
			},
			navClick(x){
				//标题点击切换到相应主题的位置
				this.$refs.scroll.scrollTo(0,-this.topList[x])
			},
			//监听滚动
			scrolling(position){
				const Y = (-position.y)
				const length = this.topList.length
				this.showBackTop = Y > 1000				//回到顶部的显隐
				
				//根据主题的位置高亮相应的标题
				for(let i =0; i<length-1; i++){
					if(this.$refs.navBar.colorIndex !== i && Y >= this.topList[i] && Y < this.topList[i+1]){
						this.$refs.navBar.colorIndex = i
					}
				}
				
				//若没有push一个很大的数方便比较，则需做多一次判断，因为在最后一轮遍历中i+1超出范围了
				// for(let i = 0; i<length; i++){
				// 	if(this.$refs.navBar.colorIndex !== i && i < length-1
				// 			&& Y >= this.topList[i] && Y < this.topList[i+1]){
				// 		this.$refs.navBar.colorIndex = i
				// 	} else if(this.$refs.navBar.colorIndex !== i && i == length-1
				// 			&& Y >= this.topList[i] ){
				// 		this.$refs.navBar.colorIndex = i
				// 	}
				// }
				
				//this.$refs.navBar.colorIndex !== i 用于减少遍历赋值的次数，否则每次滚动都重新赋值，浪费性能
				//Number.MAX_VALUE是JS中可表示的最大数
				//将其push进去是方便做比较,因为其本身没有意义所以不用遍历 => i<this.topList.length-1
				//若没有最后这个很大的数做比较的话，最后一轮执行的代码和前几轮的会不一样，因为最后一轮的i+1超值了
				
				//笨方法，一个个写判断
				// if(this.$refs.navBar.colorIndex !== 0 && Y < this.topList[1]) {
				// 	this.$refs.navBar.colorIndex = 0
				// 	console.log(0)
				// } else if (this.$refs.navBar.colorIndex !== 1 && Y >= this.topList[1] && Y < this.topList[2]) {
				// 	this.$refs.navBar.colorIndex = 1
				// 	console.log(111)
				// } else if(this.$refs.navBar.colorIndex !== 2 && Y >= this.topList[2] && Y < this.topList[3]) {
				// 	this.$refs.navBar.colorIndex = 2
				// 	console.log(222)
				// } else if(this.$refs.navBar.colorIndex !== 3 && Y >= this.topList[3]) {
				// 	this.$refs.navBar.colorIndex = 3
				// 	console.log(333)
				// }
				
			},
		},
		
	}
</script>

<style scoped>
	.scroll{
		height: calc(100vh - 44px - 58px);
		/* margin-top: 44px; */
		overflow: hidden;
		position: relative;
		z-index: 3;
		background-color: #fff;
	}
</style>
