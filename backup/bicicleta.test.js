// 'use strict'
//
// const { build } = require('../src/app');
//
// //testa get
// describe('getBicicletas route test', () => {
//     test('Should return the list of bikezadas when called', async () => {
//         const app = build();
//
//         const response = await app.inject({
//             method: 'GET',
//             url: '/bicicleta'
//         });
//
//         expect(response.statusCode).toBe(200);
//     });
//
//     test('Should return error when wrong url called', async () => {
//         const app = build();
//
//         const response = await app.inject({
//             method: 'GET',
//             url: '/bicicletas'
//         });
//
//         expect(response.statusCode).toBe(404);
//     });
//
//     test("Should a populated array be size bigger than 0", async ()=>{
//         const app = build();
//
//         const post = await app.inject({
//             method:'POST',
//             url: '/bicicleta',
//             body:{
//                 marca: "caloi",
//                 modelo: "Caloteira",
//                 ano: "2025",
//                 status: "nova",
//             }
//         })
//
//         const response = await app.inject({
//             method: 'GET',
//             url: '/bicicleta'
//         });
//
//         expect(response.body.length >= 1 ).toBe(true);
//
//         const deletE = await app.inject({
//             method:'delete',
//             url: `bicicleta/${response.body.length}`,
//         })
//
//     });
// });
// // describe("GET/", () => {
// //     const newBicicleta = {
// //         marca: "caloi",
// //         modelo: "Caloteira",
// //         ano: "2025",
// //         status: "nova",
// //     }
// //     beforeAll(async () => {
// //         // set up the bicicleta
// //         await request(baseURL).post("/").send(newBicicleta);
// //     })
// //     afterAll(async () => {
// //         const response = await request(baseURL).get("/");
// //         await request(baseURL).delete(`/${response.body.length}`);
// //     })
// //     it("should return 200", async () => {
// //         const response = await request(baseURL).get("/");
// //         expect(response.statusCode).toBe(200);
// //     });
// //     it("should return an array", async () => {
// //         const response = await request(baseURL).get("/");
// //         expect(response.body.length >= 1 ).toBe(true);
// //     });
// // });
// //
// // //testa get/id
// // describe("GET/id", () => {
// //     const newBicicleta = {
// //         marca: "caloi",
// //         modelo: "Caloteira",
// //         ano: "2025",
// //         status: "nova",
// //     }
// //     beforeAll(async () => {
// //         // set up the bicicleta
// //         await request(baseURL).post("/").send(newBicicleta);
// //     })
// //     afterAll(async () => {
// //         const response = await request(baseURL).get("/");
// //         await request(baseURL).delete(`/${response.body.length}`);
// //     })
// //     it("should return bicicleta/id and status 200", async () => {
// //         const responseTotal = await request(baseURL).get("/");
// //         const responseUnitaria = await request(baseURL).get(`/${responseTotal.body.length}`);
// //         expect(responseUnitaria.statusCode).toBe(200);
// //         expect(responseUnitaria.body.message).toBe("Bicicleta encontrada");
// //         expect(responseUnitaria.body.bicicleta).toStrictEqual(
// //             {
// //                 id: responseTotal.body.length,
// //                 marca: "caloi",
// //                 modelo: "Caloteira",
// //                 ano: "2025",
// //                 status: "nova",
// //             }
// //         );
// //     });
// //     it("should return 404 and error", async () => {
// //         const responseUnitaria = await request(baseURL).get('/0');
// //         expect(responseUnitaria.statusCode).toBe(404);
// //         expect(responseUnitaria.body.message).toBe("Não encontrado");
// //     });
// // });
// //
// // //testa Post
// // describe("POST /", () => {
// //     afterAll(async () => {
// //         const response = await request(baseURL).get("/");
// //         await request(baseURL).delete(`/${response.body.length}`);
// //     })
// //     it("should return 200 and add an item to bicicletas array", async () => {
// //         const newBicicleta = {
// //             marca: "caloi",
// //             modelo: "Caloteira",
// //             ano: "2025",
// //             status: "nova",
// //         }
// //         const response = await request(baseURL).get("/");
// //         const responsePost = await request(baseURL).post("/").send(newBicicleta);
// //         const novoArray = await request(baseURL).get("/");
// //         const lastItem = responsePost.body.bicicleta;
// //         expect(responsePost.statusCode).toBe(200);
// //         expect(lastItem).toStrictEqual(
// //             {
// //                 id: responsePost.body.bicicleta.id,
// //                 marca: "caloi",
// //                 modelo: "Caloteira",
// //                 ano: "2025",
// //                 status: "nova",
// //             }
// //         );
// //         expect(responsePost.body.message).toBe("Dados cadastrados");
// //         expect(novoArray.body.length>response.body.length).toBe(true);
// //     });
// //     it("should return 422 because null field", async () => {
// //         const newBicicleta = {
// //             modelo: "Caloteira",
// //             ano: "2025",
// //             status: "nova",
// //         }
// //         const response = await request(baseURL).post("/").send(newBicicleta);
// //         expect(response.statusCode).toBe(422);
// //         expect(response.body.message).toBe("Dados inválidos (Null)");
// //     });
// //     it("should return 422 because empty field", async () => {
// //         const newBicicleta = {
// //             marca: "",
// //             modelo: "Caloteira",
// //             ano: "2025",
// //             status: "nova",
// //         }
// //         const response = await request(baseURL).post("/").send(newBicicleta);
// //         expect(response.statusCode).toBe(422);
// //         expect(response.body.message).toBe("Dados inválidos (Empty)");
// //     });
// // });
// //
// // //testa Put
// // describe("PUT /id", () => {
// //     const newBicicletaPost = {
// //         marca: "caloi",
// //         modelo: "Caloteira",
// //         ano: "2025",
// //         status: "nova",
// //     };
// //     let responsePost;
// //     beforeAll(async () => {
// //         responsePost = await request(baseURL).post("/").send(newBicicletaPost);
// //     })
// //     afterAll(async () => {
// //         await request(baseURL).delete(`/${responsePost.body.bicicleta.id}`);
// //     })
// //     it("should update item if it exists and return 200", async () => {
// //         const newBicicletaPut = {
// //             marca: "MONARK",
// //             modelo: "LIBERDADE DE EXPRESSAO",
// //             ano: "2025",
// //             status: "nova",
// //         };
// //         const responsePut = await request(baseURL).put(`/${responsePost.body.bicicleta.id}`).send(newBicicletaPut);
// //         expect(responsePut.statusCode).toBe(200);
// //         expect(responsePut.body.bicicleta).toStrictEqual(
// //             {
// //                 id: responsePost.body.bicicleta.id,
// //                 marca: "MONARK",
// //                 modelo: "LIBERDADE DE EXPRESSAO",
// //                 ano: "2025",
// //                 status: "nova",
// //             }
// //         );
// //         expect(responsePut.body.message).toBe("Dados atualizados");
// //     });
// //     it("should return 404", async () => {
// //         const newBicicletaPut = {
// //             modelo: "Caloteira",
// //             ano: "2025",
// //             status: "nova",
// //         }
// //         const responsePut = await request(baseURL).put("/0").send(newBicicletaPut);
// //         expect(responsePut.statusCode).toBe(404);
// //         expect(responsePut.body.message).toBe("Não encontrado");
// //     });
// //     it("should return 422 because null field", async () => {
// //         const newBicicletaPut = {
// //             modelo: "Caloteira",
// //             ano: "2025",
// //             status: "nova",
// //         }
// //         const responsePut = await request(baseURL).put(`/${responsePost.body.bicicleta.id}`).send(newBicicletaPut);
// //         expect(responsePut.statusCode).toBe(422);
// //         expect(responsePut.body.message).toBe("Dados inválidos (Null)");
// //     });
// //     it("should return 422 because empty field", async () => {
// //         const newBicicletaPut = {
// //             marca: "",
// //             modelo: "Caloteira",
// //             ano: "2025",
// //             status: "nova",
// //         }
// //         const responsePut = await request(baseURL).put(`/${responsePost.body.bicicleta.id}`).send(newBicicletaPut);
// //         expect(responsePut.statusCode).toBe(422);
// //         expect(responsePut.body.message).toBe("Dados inválidos (Empty)");
// //     });
// // });
// //
// // //testa Delete
// // describe("Delete one bicicleta", () => {
// //     const newBicicleta = {
// //         marca: "caloi",
// //         modelo: "Caloteira",
// //         ano: "2025",
// //         status: "nova",
// //     }
// //     let primeiroMomento;
// //     let post;
// //     beforeAll(async () => {
// //         post = await request(baseURL).post("/").send(newBicicleta);
// //         primeiroMomento = await request(baseURL).get("/");
// //     })
// //     it("should delete one item and return 200", async () => {
// //         const response = await request(baseURL).delete(`/${post.body.bicicleta.id}`);
// //         expect(response.statusCode).toBe(200);
// //         const bicicleta = await request(baseURL).get(`/${post.body.bicicleta.id}`);
// //         expect(bicicleta.statusCode).toBe(404);
// //         const segundoMomento = await request(baseURL).get("/");
// //         expect(segundoMomento.body.length<primeiroMomento.body.length).toBe(true);
// //     });
// //     it("should not delete and return 404", async () => {
// //         await request(baseURL).post("/").send(newBicicleta);
// //         const response = await request(baseURL).delete("/0");
// //         expect(response.statusCode).toBe(404);
// //         const segundoMomento = await request(baseURL).get("/");
// //         expect(segundoMomento.body.length == primeiroMomento.body.length).toBe(true);
// //     });
// // });