'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Motoboys",
			[
				{
					nome: "José Oliveira",
					cpf: "382.584.990-25",
					telefone: "Rua João Lech Júnior, 456"
					
				},
				{
					nome: "Marcos Ribeiro",
					cpf: "004.483.540-04",
					telefone: "Rua João Lech Júnior, 456"
					
				},
				{
					nome: "Carlos Santanna",
					cpf: "188.381.490-11",
					telefone: "Rua João Lech Júnior, 456"
					
				},
				{
					nome: "Michel Santos",
					cpf: "608.414.580-90",
					telefone: "Rua João Lech Júnior, 456"
					
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Motoboys", null, {});
	}
};
