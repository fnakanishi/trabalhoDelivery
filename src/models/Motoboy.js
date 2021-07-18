const Sequelize = require('sequelize');

class Motoboy extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				nome: {
					type: Sequelize.STRING,
					allowNull: false
				},
				cpf: {
					type: Sequelize.STRING,
					allowNull: false
				},
				senha: {
					type: Sequelize.STRING,
					allowNull: false
				},
				telefone: {
					type: Sequelize.STRING,
					allowNull: true
				}
			},
			{
				sequelize,
				modelName: 'motoboy'
			}
		);
	}

	static associate(models) {
		this.hasMany(models.Entrega, { foreignKey: 'motoboyId' });
	}
}

module.exports = Motoboy;