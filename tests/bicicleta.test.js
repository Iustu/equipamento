'use strict'

const { build } = require('../src/app');

//testa get
describe('get/', () => {
    test('Should return 200', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: '/bicicleta'
        });

        expect(response.statusCode).toBe(200);
    });

    test('Should return error when wrong url called', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: '/bicicletas'
        });

        expect(response.statusCode).toBe(404);
    });

    test("Should a populated array size be bigger than 0", async ()=>{
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        });

        //Necessário parsear os bodys
        const parsedPost = JSON.parse(post.body);

        const response = await app.inject({
            method: 'GET',
            url: '/bicicleta'
        });

        expect(JSON.parse(response.body).length >= 1 ).toBe(true);

        const deletE = await app.inject({
            method:'delete',
            url: `bicicleta/${parsedPost.bicicleta.id}`,
        });
    });
});

//testa get/id
describe('get/id', () => {
    test('Should return one bikezada when called and status 200', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response = await app.inject({
            method: 'GET',
            url: `bicicleta/${parsedPost.bicicleta.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.bicicleta).toStrictEqual(
            {
                id: parsedPost.bicicleta.id,
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        );

        const deletE = await app.inject({
            method:'delete',
            url: `bicicleta/${parsedPost.bicicleta.id}`,
        })
    });

    test('Should return 404 due to miss', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: 'bicicleta/0'
        });

        expect(response.statusCode).toBe(404);

    });

    test('Should return 404 due to error', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: 'bicicleta/aba'
        });

        expect(response.statusCode).toBe(404);

    });
});

//testa Post
 describe("POST /", () => {
     test('Should return 200 and add to array', async () => {
         const app = build();

         const response1 = await app.inject({
             method: 'GET',
             url: '/bicicleta'
         });
         const parsedResponse1 = JSON.parse(response1.body);

         const post = await app.inject({
             method:'POST',
             url: '/bicicleta',
             body:{
                 marca: "caloi",
                 modelo: "Caloteira",
                 ano: "2025",
                 status: "nova",
             }
         })
         const parsedPost = JSON.parse(post.body);

         const response2 = await app.inject({
             method: 'GET',
             url: '/bicicleta'
         });
         const parsedResponse2 = JSON.parse(response2.body);

         const response3 = await app.inject({
             method: 'GET',
             url: `bicicleta/${parsedPost.bicicleta.id}`
         });
         const parsedResponse3 = JSON.parse(response3.body);

         // console.log(parsedPost);
         // console.log(parsedResponse3);
         // console.log(parsedResponse2);
         // console.log(parsedResponse1);

         expect(post.statusCode).toBe(200);
         expect(parsedResponse2.length>parsedResponse1.length).toBe(true);
         expect(parsedResponse3.bicicleta).toStrictEqual(parsedPost.bicicleta);

         const deletE = await app.inject({
             method:'delete',
             url: `bicicleta/${parsedPost.bicicleta.id}`,
         })
     });
     test('Should return 422 due to null', async () => {
         const app = build();

         const post = await app.inject({
             method:'POST',
             url: '/bicicleta',
             body:{
                 modelo: "Caloteira",
                 ano: "2025",
                 status: "nova",
             }
         })
         const parsedPost = JSON.parse(post.body);

         expect(post.statusCode).toBe(422);
         expect(parsedPost.message).toBe("Dados inválidos (Null)");

     });
     test('Should return 422 due to empty', async () => {
         const app = build();

         const post = await app.inject({
             method:'POST',
             url: '/bicicleta',
             body:{
                 marca: "",
                 modelo: "Caloteira",
                 ano: "2025",
                 status: "nova",
             }
         })
         const parsedPost = JSON.parse(post.body);

         expect(post.statusCode).toBe(422);
         expect(parsedPost.message).toBe("Dados inválidos (Empty)");
     });
 });

describe("PUT /id", () => {
    test('Should return 200 and delete the data correctly', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response1 = await app.inject({
            method: 'GET',
            url: `/bicicleta/${parsedPost.bicicleta.id}`
        });
        const parsedResponse1 = JSON.parse(response1.body);

        const put = await app.inject({
            method:'PUT',
            url: `/bicicleta/${parsedPost.bicicleta.id}`,
            body:{
                marca: "caloi",
                modelo: "Caloteira2",
                ano: "2022",
                status: "nova",
            }
        })
        const parsedPut = JSON.parse(put.body);

        const response = await app.inject({
            method: 'GET',
            url: `/bicicleta/${parsedPost.bicicleta.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        // console.log(post.body);
        // console.log(put.body);
        // console.log(response.body);
        // console.log(response1.body);

        expect(put.statusCode).toBe(200);
        expect(parsedResponse1.bicicleta != parsedResponse.bicicleta).toBe(true);
        expect(parsedResponse.bicicleta).toStrictEqual(parsedPut.bicicleta);

        const deletE = await app.inject({
        method:'delete',
        url: `bicicleta/${parsedPost.bicicleta.id}`,
        })
    });
    test('Should return 422 due to null', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca:"Caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/bicicleta/${parsedPost.bicicleta.id}`,
            body:{
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(422);
        expect(parsedPut.message).toBe("Dados inválidos (Null)");
        const deletE = await app.inject({
            method:'delete',
            url: `bicicleta/${parsedPost.bicicleta.id}`,
        })

    });
    test('Should return 422 due to empty', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca: "Caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/bicicleta/${parsedPost.bicicleta.id}`,
            body:{
                marca: "",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(422);
        expect(parsedPut.message).toBe("Dados inválidos (Empty)");
        const deletE = await app.inject({
            method:'delete',
            url: `bicicleta/${parsedPost.bicicleta.id}`,
        })
    });
    test('Should return 404', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca:"Caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/bicicleta/0`,
            body:{
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(404);
        expect(parsedPut.message).toBe("Não encontrado");
        const deletE = await app.inject({
            method:'delete',
            url: `bicicleta/${parsedPost.bicicleta.id}`,
        })

    });
});


// //testa Delete
describe("Delete /id", ()=>{
    test("Should return 200 and remove from array",async ()=>{
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca:"Caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response1 = await app.inject({
            method: 'GET',
            url: `/bicicleta`
        });
        const parsedResponse1 = JSON.parse(response1.body);

        const deletE = await app.inject({
            method:'delete',
            url: `bicicleta/${parsedPost.bicicleta.id}`,
        })

        const response2 = await app.inject({
            method: 'GET',
            url: `/bicicleta`
        });
        const parsedResponse2 = JSON.parse(response2.body);

        // console.log(parsedPost);
        // console.log(deletE.body);
        // console.log(parsedResponse2);
        // console.log(parsedResponse1);

        expect(deletE.statusCode).toBe(200);
        expect(parsedResponse2.length<parsedResponse1.length).toBe(true);

        const response3 = await app.inject({
            method: 'GET',
            url: `/bicicleta/${parsedPost.bicicleta.id}`
        });
        const parsedResponse3 = JSON.parse(response1.body);

        expect(response3.statusCode).toBe(404);

    });
    test("Should return 404 and remove Nothing",async ()=>{
        const app = build();
        const deletE = await app.inject({
            method:'delete',
            url: `bicicleta/0`,
        })

        expect(deletE.statusCode).toBe(404);

    });
});
// describe("Delete one bicicleta", () => {
//     const newBicicleta = {
//         marca: "caloi",
//         modelo: "Caloteira",
//         ano: "2025",
//         status: "nova",
//     }
//     let primeiroMomento;
//     let post;
//     beforeAll(async () => {
//         post = await request(baseURL).post("/").send(newBicicleta);
//         primeiroMomento = await request(baseURL).get("/");
//     })
//     it("should delete one item and return 200", async () => {
//         const response = await request(baseURL).delete(`/${post.body.bicicleta.id}`);
//         expect(response.statusCode).toBe(200);
//         const bicicleta = await request(baseURL).get(`/${post.body.bicicleta.id}`);
//         expect(bicicleta.statusCode).toBe(404);
//         const segundoMomento = await request(baseURL).get("/");
//         expect(segundoMomento.body.length<primeiroMomento.body.length).toBe(true);
//     });
//     it("should not delete and return 404", async () => {
//         await request(baseURL).post("/").send(newBicicleta);
//         const response = await request(baseURL).delete("/0");
//         expect(response.statusCode).toBe(404);
//         const segundoMomento = await request(baseURL).get("/");
//         expect(segundoMomento.body.length == primeiroMomento.body.length).toBe(true);
//     });
// });