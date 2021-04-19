import Sequelize from 'sequelize'

import db from '../helpers/db.helper'

const basketModel = db.define('baskets', {
	id : { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
	name: {type : Sequelize.STRING, defaultValue : null, allowNull : false},
	ref: {type : Sequelize.STRING, defaultValue : null, allowNull : false},
	watch: {type: Sequelize.BOOLEAN, defaultValue: true, allowNull: false},
	required: {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false}
})

export default basketModel