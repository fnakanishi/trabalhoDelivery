'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Motoboys",
			[
				{
					nome: "José Oliveira",
					cpf: "382.584.990-25",
					telefone: "(41)99896-8745"
					
				},
				{
					nome: "Marcos Ribeiro",
					cpf: "004.483.540-04",
					telefone: "(41)99745-6321"
					
				},
				{
					nome: "Carlos Santanna",
					cpf: "188.381.490-11",
					telefone: "(41)99741-2589"
					
				},
				{
					nome: "Michel Santos",
					cpf: "608.414.580-90",
					telefone: "(41)99787-6251"
					
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Motoboys", null, {});
	}
};
