<template>
	<div>
		<nav-bar><span slot="center">购物街</span></nav-bar>
		
		<tab-control :titles="['流行','新款','精品']" @goods1Click="goods2Click" 
		class="tab2" v-show="isTabFixed" ref="tab2"/>
		
		<!-- 在vue中可以用ref直接操作DOM -->
		<scroll class="scroll" ref="scroll" :probeType="3" :pullUpLoad="true" 
						@scrolling="scrolling" @pullingUp="pullingUp">
			
			<home-lbt :banner="banner" @lbtLoad="lbtLoad"/>
			
			<home-rcomd :recommend="recommend"/>
			
			<home-popweek/>
			
			<tab-control :titles="['流行','新款','精品']" @goods1Click="goods2Click" ref="tab1"/>
			
			<goods-list :goods="this.goods[showGoods].list"/>
		
		</scroll>
		
		<back-top @click.native="backTop" v-show="showBackTop"/>
		<!-- 组件标签不能直接监听原生事件，需要加".native"修饰符 -->
		
	</div>
</template>

<script>
	//将不同类型的引入文件分开放置
	import NavBar from 'components/common/nav-bar/NavBar'
	import TabControl from 'components/content/tabControl/TabControl'
	import Scroll from 'components/common/scroll/Scroll'
	import HomeLbt from './childcomps/HomeLbt'
	import HomeRcomd from './childcomps/HomeRcomd'
	import HomePopweek from './childcomps/HomePopweek'
	import GoodsList from 'components/content/goods/GoodsList'
	
	import {debounce} from 'common/utils'	//防抖操作
	import {GoodsItem_imgLoad,back_top} from 'common/mixin'//引入混入代码，减少代码的重复
	
	import {getHomeMultidata,getHomeGoods,getHomeDetail} from 'network/home'
	
	export default{
		name:'Home',
		mixins:[GoodsItem_imgLoad,back_top],
		//按引入的顺序注册组件
		components:{
			NavBar,
			Scroll,
			TabControl,
			GoodsList,
			HomeLbt,
			HomeRcomd,
			HomePopweek,
		},
		data(){
			return{
				banner : [],
				recommend : [],
				goods:{
					pop:{page:0,list:[]},
					new:{page:0,list:[]},
					sell:{page:0,list:[]}
				},
				showGoods:'pop',
				isTabFixed : false,
				tabOffsetTop : 0,
				saveY:0
			}
		},
		created() {
			this.getHomeMultidata()
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		methods:{
			//事件监听的方法----------------------------------------------------------------------
			//tab-bar控制展示不同商品的方法
			goods2Click(conIndex){
				switch(conIndex){
					//case后写的是要做比较的值，不是表达式
					case 0:
						this.showGoods = 'pop'
						break
					case 1:
						this.showGoods = 'new'
						break
					case 2:
						this.showGoods = 'sell'
						break
				}
				//使两个tabControl的点击状态相同
				this.$refs.tab1.conIndex = conIndex
				this.$refs.tab2.conIndex = conIndex
			},
			//监听滚动
			scrolling(position){
				this.showBackTop = (-position.y) > 1000										//回到顶部的显隐
				this.isTabFixed = (-position.y+44) > this.tabOffsetTop		//tab2的显隐 
				//？？？为什么要加navbar的44px高度才能有效果
				//tab1的offsetTop是算在最顶部，被navbar给挡住了44px
			},
			//监听上拉动作，上拉加载的方法
			pullingUp(){
				this.getHomeGoods(this.showGoods)
				this.$refs.scroll.finishPullUp()
				//this.$refs.scroll.bscroll.finishPullUp()
				//建议对bscroll.finishPullUp()做一层封装，这样代码易看且可在scroll组件中对该方法做些别的操作
			},
			//监听轮播图图片的加载，以便获取tab2的所在高度
			lbtLoad(){
				this.tabOffsetTop = this.$refs.tab1.$el.offsetTop
			},
			
			//网络请求的方法----------------------------------------------------------------------
			getHomeMultidata(){
				getHomeMultidata().then(res => {
					this.banner = res.data['data']['banner']['list'];
					this.recommend = res.data['data']['recommend']['list'];
				})
			},
			getHomeGoods(type){
				//这里的type是传进来的参数,是变量,不能直接用"."   []中没加''的是变量，加了的是具体的值
				const page = this.goods[type].page +1
				getHomeGoods(type,page).then(res => {
					this.goods[type].list.push(...res.data.data.list)  //...表示将对象里的东西依次进行push
					this.goods[type].page += 1
				})
			}
		},
		activated(){
			//组件活跃时调用，刷新better-scroll，避免切回主页是不能滚动
			this.$refs.scroll.refresh()
			//参数1水平值，参数2垂直值，参数3延迟时间，0即立即执行
			// this.$refs.scroll.scrollTo(0,saveY,0)
		},
		deactivated(){
			//组件不活跃时调用,在切出主页时取消全局事件的监听
			this.$bus.$off('imgLoad',this.img_load)
			// this.saveY = this.$refs.scroll.bscroll.Y
		},
	}
</script>

<style scoped>
	.scroll{
		/* calc函数用于计算元素的长度值,vh表示视口高度,100为100% */
		height: calc(100vh - 93px);
		/* margin-top: 44px; */
		overflow: hidden;
	}
	
	.tab2{
		position: fixed;
		z-index: 2;
		width: 100%;
	}
</style>
