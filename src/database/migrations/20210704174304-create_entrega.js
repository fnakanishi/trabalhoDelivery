'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Entrega', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			clienteId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Cliente', key: 'id' },
				onUpdate: 'RESTRICT',
				onDelete: 'RESTRICT'
			},
			motoboyId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Motoboy', key: 'id' },
				onUpdate: 'RESTRICT',
				onDelete: 'RESTRICT'
			},
			status: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			valor: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			descricao: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal(
					'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
				),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Entrega');
	}
};
