import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')								//  ./为当前目录下 ../为返回上一次目录
const Message = () => import('views/message/Message')
const Profile = () => import('views/profile/Profile')
const Cart = () => import('views/shoppingcart/Shoppingcart')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
	{
		path:'',
		redirect:'/home'
	},
  {
		path:'/home',
		component:Home
	},
	{
		path:'/message',
		component:Message
	},
	{
		path:'/profile',
		component:Profile
	},
	{
		path:'/cart',
		component:Cart
	},
	{
		path:'/detail/:iid',
		component:Detail
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
	linkActiveClass:'r-active'
})

export default router
