'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Clientes",
			[
				{
					nomeEmpresa: "Empresa Cliente1",
					cnpj: "08.353.824/0001-57",
					endereco: "Rua João Lech Júnior, 456"
					
				},
				{
					nomeEmpresa: "Empresa Cliente2",
					cnpj: "07.702.247/0001-07",
					endereco: "Rua Radomil Celinski, 74"
				},
				{
					nomeEmpresa: "Empresa Cliente3",
					cnpj: "98.843.649/0001-79",
					endereco: "Rua José Bassa, 123"
				},
				{
					nomeEmpresa: "Empresa Cliente4",
					cnpj: "63.131.719/0001-81",
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
