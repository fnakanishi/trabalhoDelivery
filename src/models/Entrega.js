const Sequelize = require('sequelize');

class Entrega extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				descricao: {
					type: Sequelize.STRING,
					allowNull: false
				},
				status: {
					type: Sequelize.STRING,
					allowNull: false
				},
				valor: {
					type: Sequelize.FLOAT,
					allowNull: true
				}
			},
			{
				sequelize,
				modelName: 'entrega'
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
        this.belongsTo(models.Motoboy, { foreignKey: 'motoboyId' });
	}
}

module.exports = Entrega;