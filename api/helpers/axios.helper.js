import Axios from 'axios'

import { buildEnv } from './env.helper.js'

const env = buildEnv();

const axiosInstance = new Axios.create({
	baseURL: `https://iows.ikea.com/retail/iows/${env.country}/${env.region}/stores/082/availability/SPR/`,
	headers:{
		"Accept": "application/vnd.ikea.iows+json;version=1.0",
		"Consumer": "MAMMUT#pip-range",
		"Contract": "37249"
	}
})

export default axiosInstance