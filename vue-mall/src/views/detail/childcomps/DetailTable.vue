<template>
	<div v-if="Object.keys(detailParams).length !== 0" class="detail-table">
		<table class="table-size">
			<tr v-for="item in detailParams.sizes[0]" class="item size">
				<td v-for="td in item">{{td}}</td>
			</tr>
			
			<tr v-if="detailParams.sizes[1]" v-for="item in detailParams.sizes[1]" class="item size">
				<td v-for="td in item">{{td}}</td>
			</tr>
		</table>
		
		<!-- <div class="table-box">
			<table class="table-size" v-for="item in detailParams.sizes">
				<tr v-for="tr in item" class="size">
					<td v-for="td in tr">{{td}}</td>
				</tr>
			</table>
		</div> -->
		
		<table class="table-inofs">
			<tr v-for="item in detailParams.infos" class="item infos">
				<td>{{item.key}}</td>
				<td>{{item.value}}</td>
			</tr>
		</table>
		
	</div>
</template>

<script>
	export default {
		name:'DetailTable',
		props: {
			detailParams: {
				type: Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.detail-table{
		border-bottom: 5px solid #f2f5f8;
		padding-bottom: 30px;
	}
	
	.table-size{
		border-bottom: 3px solid rgba(100,100,100,.1);
	}
	
	table{
		width: 90%;
		color: rgb(102, 102, 102);
		font-size: 14px;
		margin: 0 auto;
	}
	
	.item{
		display:flex;
		padding:10px 0;
		border-bottom: 1px solid rgba(100,100,100,.1);
	}
	
	.size td{
		flex: 1;
	}
	
	.table-size :last-child{
		border: none;
	}
	/* --------------------------------------------------------------------- */
	
	.infos :first-child{
		flex: 3;
	}
	
	.infos :last-child{
		flex: 7;
		color: #eb4868;
	}
	
	img{
		width: 90%;
		display: block;
		margin: 0 auto; 
	}
</style>
