import basketModel from '../models/baskets.model'

export default {
	getListUnderWatching(){
		return basketModel.findAll({
			where: {
				watch: true
			}
		})
	}
}