'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Associados",
			[
				{
					nomeEmpresa: "Empresa Associada1",
					cnpj: "78392667000174",
					senha: "$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
					endereco: "Rua Padre Agostinho, 756"
					
				},
				{
					nomeEmpresa: "Empresa Associada2",
					cnpj: "53182725000104",
					senha: "$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
					endereco: "Rua Antônio Krainiski, 96"
				},
				{
					nomeEmpresa: "Empresa Associada3",
					cnpj: "78265451000148",
					senha: "$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
					endereco: "Rua Jackson Figueiredo. 451"
				},
				{
					nomeEmpresa: "Empresa Associada4",
					cnpj: "08353824000157",
					senha: "$2a$12$aff3q7/eHpx83jZWJu801eomZBIfCGh1T2GkwuprXAwSCmz84AvZW",
					endereco: "Rua José da Luz, 78"
				},

			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Associados", null, {});
	}
};
