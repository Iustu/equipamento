const request = require("supertest");
const baseURL = "http://localhost:3000/bicicleta";
const bicicleta = require("../src/classes/bicicleta");

//testa get
describe("GET/", () => {

    const newBicicleta = {
        marca: "caloi",
        modelo: "Caloteira",
        ano: "2025",
        status: "nova",
    }
    beforeAll(async () => {
        // set up the bicicleta
        await request(baseURL).post("/").send(newBicicleta);
    })
    afterAll(async () => {
        const response = await request(baseURL).get("/");
        await request(baseURL).delete(`/${response.body.length}`)
    })
    it("should return 200", async () => {
        const response = await request(baseURL).get("/");
        expect(response.statusCode).toBe(200);
    });
    it("should return an array", async () => {
        const response = await request(baseURL).get("/");
        expect(response.body.length >= 1 ).toBe(true);
    });
});

//testa get/id
describe("GET/id", () => {

    const newBicicleta = {
        marca: "caloi",
        modelo: "Caloteira",
        ano: "2025",
        status: "nova",
    }
    beforeAll(async () => {
        // set up the bicicleta
        await request(baseURL).post("/").send(newBicicleta);
    })
    afterAll(async () => {
        const response = await request(baseURL).get("/");
        await request(baseURL).delete(`/${response.body.length}`)
    })
    it("should return bicicleta/id and status 200", async () => {
        const responseTotal = await request(baseURL).get("/");
        const responseUnitaria = await request(baseURL).get(`/${responseTotal.body.length}`);
        expect(responseUnitaria.statusCode).toBe(200);
        expect(responseUnitaria.body.message).toBe("Bicicleta encontrada");
        expect(responseUnitaria.body.bicicleta).toStrictEqual(
            {
                id: responseTotal.body.length,
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        );
    });
    it("should return 404 and error", async () => {
        const responseUnitaria = await request(baseURL).get('/0');
        expect(responseUnitaria.statusCode).toBe(404);
        expect(responseUnitaria.body.message).toBe("Não encontrado");
    });
});

//testa Post
describe("POST /", () => {
    afterAll(async () => {
        const response = await request(baseURL).get("/")
        await request(baseURL).delete(`/${response.body.length}`)
    })
    it("should return 200 and add an item to bicicletas array", async () => {
        const newBicicleta = {
            marca: "caloi",
            modelo: "Caloteira",
            ano: "2025",
            status: "nova",
        }
        const response = await request(baseURL).post("/").send(newBicicleta);
        const lastItem = response.body.bicicleta;
        expect(response.statusCode).toBe(200);
        expect(lastItem).toStrictEqual(
            {
                id: response.body.bicicleta.id,
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        );
        expect(response.body.message).toBe("Dados cadastrados")
    });
    it("should return 422 because null field", async () => {
        const newBicicleta = {
            marca: "caloi",
            modelo: "Caloteira",
            ano: "2025",
            status: "nova",
        }
        const response = await request(baseURL).post("/").send(newBicicleta);
        const lastItem = response.body.bicicleta;
        expect(response.statusCode).toBe(200);
        expect(lastItem).toStrictEqual(
            {
                id: response.body.bicicleta.id,
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        );
        expect(response.body.message).toBe("Dados cadastrados")
    });

});
//
// //testa Put
// describe("Update one bicicleta", () => {
//     const newBicicleta = {
//         id: 2,
//         marca: "caloi",
//         modelo: "Caloteira",
//         ano: "2025",
//         status: "nova",
//     }
//     beforeAll(async () => {
//         await request(baseURL).post("/").send(newBicicleta);
//     })
//     afterAll(async () => {
//         await request(baseURL).delete(`/${newBicicleta.id}`)
//     })
//     it("should update item if it exists", async () => {
//         const response = await request(baseURL).put(`/${newBicicleta.id}`).send({
//             completed: true,
//         });
//         expect(response.statusCode).toBe(201);
//         expect(response.body.data.completed).toBe(true);
//     });
// });
//
// //testa Delete
// describe("Delete one bicicleta", () => {
//     const newBicicleta = {
//         id: 2,
//         marca: "caloi",
//         modelo: "Caloteira",
//         ano: "2025",
//         status: "nova",
//     }
//     beforeAll(async () => {
//         await request(baseURL).post("/").send(newBicicleta);
//     })
//     it("should delete one item", async () => {
//         const response = await request(baseURL).delete(`/${newBicicleta.id}`);
//         const bicicletas = response.body.data
//         const exists = bicicletas.find(bicicleta => {
//             newBicicleta.id == bicicletaId
//         })
//         expect(exists).toBe(undefined)
//     });
// });