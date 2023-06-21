// const request = require("supertest")
// request("https://icanhazdadjoke.com")
// const baseURL = "http://localhost:3000/bicicleta"
//
// //testa get
// describe("GET ", () => {
//     const newBicicleta = {
//         id:"1",
//         marca: "caloi",
//         modelo: "Caloteira",
//         ano: "2025",
//         status: "nova",
//     }
//     beforeAll(async () => {
//         // set up the bicicleta
//         await request(baseURL).post("/").send(newBicicleta);
//     })
//     afterAll(async () => {
//         await request(baseURL).delete(`/${newBicicleta.id}`)
//     })
//     it("should return 200", async () => {
//         const response = await request(baseURL).get("/");
//         expect(response.statusCode).toBe(200);
//         //expect(response.body.error).toBe(null);
//     });
//     it("should return bicicletas", async () => {
//         const response = await request(baseURL).get("/");
//         expect(response.body.data.length >= 1).toBe(true);
//     });
// });

//testa Post
// describe("POST /", () => {
//     const newBicicleta = {
//         id: 2,
//         marca: "caloi",
//         modelo: "Caloteira",
//         ano: "2025",
//         status: "nova",
//     }
//     afterAll(async () => {
//         await request(baseURL).delete(`/${newBicicleta.id}`)
//     })
//     it("should add an item to bicicletas array", async () => {
//         const response = await request(baseURL).post("/").send(newBicicleta);
//         const lastItem = response.body.data[response.body.data.length-1]
//         expect(response.statusCode).toBe(201);
//         expect(lastItem.item).toBe(newBicicleta["item"]);
//         expect(lastItem.completed).toBe(newBicicleta["completed"]);
//     });
// });
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