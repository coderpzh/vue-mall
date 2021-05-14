<template>
	<div class="shop">
		<div class="titel">
			<img :src="shopInfo.logo" alt="">
			<span>{{shopInfo.name}}</span>
		</div>
		
		<div class="info">
			<div>
				<div class="message sells">
					<!-- //使用过滤器对销量数目进行四舍五入 -->
					<p>{{shopInfo.sells | sellFilter}}</p>
					<p>总销量</p>
				</div>
				
				<div class="message">
					<p>{{shopInfo.goodsCount}}</p>
					<p>全部宝贝</p>
				</div>
			</div>
			
			
			<div class="score">
				<div v-for="(item,index) in shopInfo.score" class="scoreItem">
					<span>{{item.name}}</span>
					<span :style="numColor(item.isBetter)">{{item.score}}</span>
					<span :style="textColor(item.isBetter)">{{scoreText(item.isBetter)}}</span>
				</div>
			</div>
			
			<div class="line">
			</div>
		</div>
		
		<div class="button">进店逛逛</div>
		
	</div>
</template>

<script>
	export default{
		name:'DetailShop',
		props:{
			shopInfo:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			numColor(isBetter){
				if(this.shopInfo.score){
					return isBetter ? {color:'red'}:{color:'green'}
				}
			},
			textColor(isBetter){
				if(this.shopInfo.score){
					return isBetter ? {backgroundColor:'red'}:{backgroundColor:'green'}
				}
			},
			scoreText(isBetter){
				if(this.shopInfo.score){
					return isBetter ? "高":"低"
				}
			}
		},
		filters: {																	//vue的过滤器
			sellFilter(x){
				let y = x
				if(x > 10000){
					y = (y / 10000).toFixed(1) +'万'			//toFixed将数字四舍五入为指定小数位数的数字
				}
				return y
			}
		},
	}
</script>

<style scoped>
	.shop{
		border-bottom: 5px solid #f2f5f8;
		padding-bottom: 20px;
	}
	
	.titel{
		padding: 20px 0 20px 10px;
	}
	
	.titel img{
		width:40px;
		height:40px;
		border-radius: 50%;
		border: 1px solid #ccc;
	}
	
	.titel span{
		line-height: 40px;
		color: #666;
		font-size: 18px;
		padding-left: 10px;
	}
	
	.button{
		width: 40%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: #f2f5f8;
		margin: 0 auto;
		border-radius:10px;
		color: #666;
		margin-top: 10px;
	}
	/* ----------------------------------------------- */
	
	.info{
		display: flex;
		justify-content:space-around;
		font-size: 12px;
		position: relative;
	}
	
	.line{
		height: 40px;
		width: 1px;
		background-color: #ccc;
		position: absolute;
		left: 50%;
	}
	/* ----------------------------------------------- */
	
	.message{
		display: inline-block;
		text-align: center;
	}
	
	.message :first-child{
		font-size: 16px;
	}
	
	.sells{
		margin-left: -20px;
		padding-right: 20px;
	}
	/* ----------------------------------------------- */
	
	.score{
		margin-top: -15px;
	}
	
	.scoreItem{
		padding: 5px 0;
	}
	
	.scoreItem :nth-child(2){
		padding-left:5px;
		display: inline-block;
		width: 35px;
	}
	
	.scoreItem :nth-child(3){
		color: #fff;
	}
</style>
