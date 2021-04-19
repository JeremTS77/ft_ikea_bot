import axios from './helpers/axios.helper'
import {Bot} from './helpers/telegram.helper'
import {buildEnv} from './helpers/env.helper'

const env = buildEnv()
const BOT_TOKEN = env.BOT_TOKEN
const BOT_CHAT_ID = parseInt(env.BOT_CHAT_ID, 10)

const bot = new Bot(BOT_TOKEN, BOT_CHAT_ID)

const main = async ()=>{
	// const basket = await basketService.getListUnderWatching()
	const basket = [{
		ref: "49285445",
		name: "canapé module angle"
	},{
		ref: "49285539",
		name: "canapé module convertible 2 place"
	}, {
		ref: "59285360",
		name: "canapé accoudoir"
	}, {
		ref: "69219505",
		name: "canapé module 2 places"
	}]
	const promTab = basket.map(async (product)=>{
		const finalProduct = {...product, stock: 0}
		return new Promise((resolve, reject)=>{
			axios.get(product.ref)
			.then(({data})=>{
				const ikeaStock = data.StockAvailability.RetailItemAvailability.AvailableStock.$
				finalProduct.stock = parseInt(ikeaStock)
				return resolve(finalProduct)
			})
			.catch((err)=>{
				reject(err);
			})
		})
	})
	Promise.all(promTab)
	.then((retPromTab)=>{
		const now = new Date().toLocaleString()
		const retSort = [...retPromTab].sort((a, b)=> (b.stock - a.stock))
		const msg_dispo = retSort.reduce((acc, it)=>{
			if (it.stock > 0){
				return [...acc, `[Evry] - ${it.name} - ${it.stock}`]
			}
			return acc
		}, [])
		const msg_undispo = retSort.reduce((acc, it)=>{
			if (it.stock === 0){
				return [...acc, `[Evry] - ${it.name} - "indisponible"`]
			}
			return acc
		}, [])
		const final_msg = ["\n", now, "\n[disponible]:\n", ...msg_dispo, "\n[indisponible]:\n", ...msg_undispo, "\n"].join("\n")
		console.log('msg : ', final_msg)
		bot.sendMessage(final_msg)
	})
	.catch((err)=>{
		console.log('err : ', err)
	})
}

main()
setInterval(main, 15* 60 * 1000) //each 15 mins call axios
