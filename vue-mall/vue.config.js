module.exports = {
	configureWebpack:{
		resolve:{
			alias:{
				//默认src ： @
				'assets':'@/assets',
				'common':'@/common',
				'components':'@/components',
				'network':'@/network',
				'views':'@/views'
			}
		}
	}
}