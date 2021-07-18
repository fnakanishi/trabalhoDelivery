const Sequelize = require('sequelize');

class Associado extends Sequelize.Model {
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
				senha: {
					type: Sequelize.STRING,
					allowNull: false
				},
				endereco: {
					type: Sequelize.STRING,
					allowNull: true
				}
			},
			{
				sequelize,
				modelName: 'associado'
			}
		);
	}
}

module.exports = Associado;