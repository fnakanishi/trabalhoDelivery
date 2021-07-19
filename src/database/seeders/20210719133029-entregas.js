'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Entregas",
			[
				{
					associadoId: 1,
					clienteId: 1,
					motoboyId: 2,
					status: "Pendente",
					valor: 20.0,
					descricao: "Entrega1",
				},
				{
					associadoId: 3,
					clienteId: 3,
					motoboyId: 1,
					status: "Realizada",
					valor: 45.0,
					descricao: "Entrega2",
				},
				{
					associadoId: 4,
					clienteId: 2,
					motoboyId: 3,
					status: "Pendente",
					valor: 60.0,
					descricao: "Entrega3",
				},
				{
					associadoId: 2,
					clienteId: 4,
					motoboyId: 4,
					status: "Realizada",
					valor: 120.0,
					descricao: "Entrega4",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Entregas", null, {});
	}
};
