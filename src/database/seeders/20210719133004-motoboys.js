'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Motoboys",
			[
				{
					nome: "José Oliveira",
					cpf: "382.584.990-25",
					senha:"$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
					telefone: "(41)99896-8745"
					
				},
				{
					nome: "Marcos Ribeiro",
					cpf: "004.483.540-04",
					senha:"$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
					telefone: "(41)99745-6321"
					
				},
				{
					nome: "Carlos Santanna",
					cpf: "188.381.490-11",
					senha:"$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
					telefone: "(41)99741-2589"
					
				},
				{
					nome: "Michel Santos",
					cpf: "608.414.580-90",
					senha:"$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
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
