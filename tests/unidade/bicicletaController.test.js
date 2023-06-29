'use strict'
const { build } = require('../../src/app');
const bicicleta = require("../../src/controller/bicicletasController.js");
const {getBicicletas } = require("../../src/controller/bicicletasController.js");

const bddMock = require("/bddMock");
const bdd = require("../../src/data/bdd");
const {retornaBicicletas} = require("./bddMock");
//jest.mock(bdd);
jest.mock('bdd',()=>{
    retornaBicicletas: jest.fn().mockReturnValue(bddMock.retornaBicicletas);
})

const newBicicleta = {
    marca: "caloi",
    modelo: "Caloteira",
    ano: "2025",
    numero:"2345",
}
const newBicicletaNull = {
    modelo: "Caloteira",
    ano: "2025",
    numero:"2345",
}
const newBicicletaEmpty = {
    marca: "",
    modelo: "Caloteira",
    ano: "2025",
    numero:"2345",
}

//testa get
describe("GET/", () => {
    const app = build();

    it("should return 200",async ()=>{
        const response = await app.inject({
            method: 'GET',
            url: '/bicicleta'
        });

        expect(response.statusCode).toBe(200);
    });

    it("should return a array", async () =>{
        const response = await app.inject({
            method: 'GET',
            url: '/bicicleta'
        });
        expect(response.statusCode).toBe(200);
    });

});