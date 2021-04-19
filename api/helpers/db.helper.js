import Sequelize from 'sequelize'

import logger from './logging.helper'
import { buildEnv } from './env.helper'
const env = buildEnv();

const db = new Sequelize(process.env.DB_DATABASE || env.DB.DATABASE || 'ikea_checker', process.env.DB_USER || env.DB.USER || 'root', process.env.DB_PASSWORD || env.DB.PASSWORD || '', {
	port: env.DB.PORT,
	dialect: 'postgresql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	replication: {
		read: [
			{ host: process.env.SLAVE || env.DB.SLAVE || 'localhost' },
		],
		write: { host: process.env.DB_HOST || env.DB.HOST || 'localhost' },
	},
	logging: false
})

db.sync()

export default db