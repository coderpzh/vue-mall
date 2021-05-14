<template>
	<div ref="wrap">
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default{
		name:'Scroll',
		data(){
			return {
				bscroll:null
			}
		},
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
		mounted(){
			this.bscroll = new BScroll(this.$refs.wrap,{
				click:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})
			//只在符合条件时进行监听，优化性能
			if(this.probeType === 2 || this.probeType ===3){		//3个= 既比较值也比较类型
				this.bscroll.on('scroll',(position) => {
					this.$emit('scrolling',position)
				})
			}
			if(this.pullUpLoad){
				this.bscroll.on('pullingUp',() => {
					this.$emit('pullingUp')
				})
			}
		},
		methods:{
			scrollTo(x,y,time = 300){//设置延迟时间的默认值
				//对bscroll对象做一次判断，等bscroll对象确实存在确实被创建后再执行后续的代码
				//避免某些操作在bscroll对象被创建之前执行，导致报错从而使代码停止运行
				this.bscroll && this.bscroll.scrollTo(x,y,time)
			},
			finishPullUp(){
				this.bscroll && this.bscroll.finishPullUp()
			},
			refresh(){
				this.bscroll && this.bscroll.refresh()
			}
		},
	}
</script>

<style>
</style>
