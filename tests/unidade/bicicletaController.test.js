'use strict'
const { build } = require('../../src/app');
const request = require("supertest");
const baseURL = "http://localhost:3000/bicicleta";
const bicicleta = require("../../src/controller/bicicletasController.js");
const {getBicicletas } = require("../../src/controller/bicicletasController.js");

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