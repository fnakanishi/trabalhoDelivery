const Sequelize = require('sequelize');

class Cliente extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				nomeEmpresa: {
					type: Sequelize.STRING,
					allowNull: false
				},
				cnpj: {
					type: Sequelize.STRING,
					allowNull: false
				},
				endereco: {
					type: Sequelize.STRING,
					allowNull: false
				}
			},
			{
				sequelize,
				modelName: 'cliente'
			}
		);
	}

	static associate(models) {
		this.hasMany(models.Entrega, { foreignKey: 'clienteId' });
	}
}

module.exports = Cliente;