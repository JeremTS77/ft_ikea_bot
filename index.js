import axios from './helpers/axios.helper'

const main = async ()=>{
	await axios.get('39285403')
	.then((resp)=>{
		console.log('data : ', resp.data)
	}).catch((err)=>{
		console.log('err : ', err)
	})
}
main()