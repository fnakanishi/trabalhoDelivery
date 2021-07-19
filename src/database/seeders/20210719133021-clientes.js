'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Clientes",
			[
				{
					nomeEmpresa: "Empresa Cliente1",
					cnpj: "08353824000157",
					endereco: "Rua João Lech Júnior, 456"
					
				},
				{
					nomeEmpresa: "Empresa Cliente2",
					cnpj: "07702247000107",
					endereco: "Rua Radomil Celinski, 74"
				},
				{
					nomeEmpresa: "Empresa Cliente3",
					cnpj: "98843649000179",
					endereco: "Rua José Bassa, 123"
				},
				{
					nomeEmpresa: "Empresa Cliente4",
					cnpj: "63131719000181",
					endereco: "Rua Dante Bertoni, 74"
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Clientes", null, {});
	}
};
