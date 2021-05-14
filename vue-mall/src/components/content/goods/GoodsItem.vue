<template>
	<div class="goods-item" @click="detailClick">
		<img :src="showImg" @load="imgLoad">		<!-- @load监听图片的加载，在src的资源加载完毕时，才会触发 -->
		<div class="goods-bottom">
			<p class="goods-title">{{goodsItem.title}}</p>
			<span class="goods-price">{{'¥'+goodsItem.price}}</span>
			<span class="goods-cfav">{{goodsItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default{
			name:'GoodsItem',
			props:{
				goodsItem:{
					type:Object,
					default(){
						return {}
					}
				}
			},
			methods:{
				imgLoad(){
					//使用事件总线的方法，发射公共的事件，让非父子关系的组件能够进行通信
					//若使用子传父的$emit传方法，则需传给父组件GoodsList然后再用$emit传方法传给home.vue
					//因为home.vue中没有直接使用该组件，所以无法直接传到home.vue中
					this.$bus.$emit('imgLoad')
				},
				detailClick(){
					if(this.goodsItem.iid) this.$router.push('/detail/'+this.goodsItem.iid)
				}
			},
			computed: {
				//不同页面请求数据的方式不同，需要做判断再调用
				//但是为什么顺序不能换，首页两个都可以，详情页只有第一个能实现？？？
				showImg(){
					return this.goodsItem.image || this.goodsItem.show.img
					// return this.goodsItem.show.img || this.goodsItem.image
				}
			},
		}
</script>

<style>
	.goods-item{
		width: 48%;
		font-size: 13px;
		text-align: center;
		color: #666;
	}
	
	.goods-item img{
		width: 100%;
		height: 85%;
		border-radius: 5px;
		margin: 5px 0;
	}
	
	.goods-title{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.goods-price{
		color: hotpink;
		margin-right: 5px;
	}
	
	.goods-cfav{
		background: url(~assets/img/home/collect.svg) 0 1px/14px 14px no-repeat;
		padding-left:14px;
	}
	
	
</style>
