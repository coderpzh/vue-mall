<template>
	<div class="comment">
		<div class="title">
			<span>用户评价</span>
			<span class="arrow-right"></span>
			<span>更多</span>
		</div>
		
		<div class="user">
			<img :src="detailComment.img">
			<span>{{detailComment.name}}</span>
		</div>
		
		<p class="text1">{{detailComment.content}}</p>
		
		<div class="text2">
			<span>{{detailComment.time | showDate}}</span>
			<span>{{detailComment.style}}</span>
		</div>
	</div>
</template>

<script>
	import {formatDate} from 'common/utils'
	
	export default {
		name:'DetailComment',
		props: {
			detailComment: {
				type: Object,
				default(){
					return {}
				}
			},
		},
		filters: {
			showDate(value){
				//1.将时间戳转成Date对象
				const date = new Date(value * 1000)
				
				//2.将date进行时间格式化
				return formatDate(date,'yyyy-MM-dd')
			}
		}
	}
</script>

<style scoped>
	.comment{
		padding: 20px 10px 30px 10px;
		border-bottom: 5px solid #f2f5f8;
	}
	
	.title{
		padding:0 10px 15px 0;
		border-bottom: 1px solid rgba(0,0,0,.1);
		margin-bottom: 10px;
	}
	
	.title :last-child{
		float: right;
		font-size: 13px;
		padding-right: 5px;
	}
	
	.title .arrow-right{
		float: right;
		width: 11px;
		height: 11px;
		background-color: #fff;
		border-top: 1px solid #999;
		border-right: 1px solid #999;
		transform: rotateZ(45deg);
		position: relative;
		top: 3px;
	}
	/* --------------------------------------------------------------------- */
	
	.user img{
		width: 42px;
		height: 42px;
		border-radius: 50%;
	}
	
	.user span{
		line-height: 42px;
		padding-left: 10px;
	}
	
	.text1{
		font-size: 14px;
		color: #777;
		padding: 10px 5px;
	}
	
	.text2{
		color: #999;
		font-size: 12px;
		padding-left: 5px;
	}
	
	.text2 :first-child{
		padding-right: 10px;
	}
</style>
