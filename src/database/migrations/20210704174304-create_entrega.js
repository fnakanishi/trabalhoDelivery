'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Entregas', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			associadoId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Associados', key: 'id' },
				onUpdate: 'RESTRICT',
				onDelete: 'RESTRICT'
			},
			clienteId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Clientes', key: 'id' },
				onUpdate: 'RESTRICT',
				onDelete: 'RESTRICT'
			},
			motoboyId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Motoboys', key: 'id' },
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
		await queryInterface.dropTable('Entregas');
	}
};
