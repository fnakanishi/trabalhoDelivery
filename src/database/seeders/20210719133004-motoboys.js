'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Motoboys",
			[
				{
					nome: "José Oliveira",
					cpf: "38258499025",
					senha:"$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
					telefone: "(41)99896-8745"
					
				},
				{
					nome: "Marcos Ribeiro",
					cpf: "00448354004",
					senha:"$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
					telefone: "(41)99745-6321"
					
				},
				{
					nome: "Carlos Santanna",
					cpf: "18838149011",
					senha:"$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
					telefone: "(41)99741-2589"
					
				},
				{
					nome: "Michel Santos",
					cpf: "60841458090",
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
