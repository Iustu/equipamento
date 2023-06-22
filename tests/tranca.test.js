'use strict'

const { build } = require('../src/app');

//testa get
describe('get/', () => {
    test('Should return 200', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: '/tranca'
        });

        expect(response.statusCode).toBe(200);
    });

    test('Should return error when wrong url called', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: '/trancas'
        });

        expect(response.statusCode).toBe(404);
    });

    test("Should a populated array size be bigger than 0", async ()=>{
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        });

        //Necessário parsear os bodys
        const parsedPost = JSON.parse(post.body);

        const response = await app.inject({
            method: 'GET',
            url: '/tranca'
        });

        expect(JSON.parse(response.body).length >= 1 ).toBe(true);

        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        });
    });
});

//testa get/id
describe('get/id', () => {
    test('Should return one trancazada when called and status 200', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response = await app.inject({
            method: 'GET',
            url: `tranca/${parsedPost.tranca.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.tranca).toStrictEqual(
            {
                id: parsedPost.tranca.id,
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        );

        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })
    });

    test('Should return 404 due to miss', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: 'tranca/0'
        });

        expect(response.statusCode).toBe(404);

    });

    test('Should return 404 due to error', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: 'tranca/aba'
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
            url: '/tranca'
        });
        const parsedResponse1 = JSON.parse(response1.body);

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response2 = await app.inject({
            method: 'GET',
            url: '/tranca'
        });
        const parsedResponse2 = JSON.parse(response2.body);

        const response3 = await app.inject({
            method: 'GET',
            url: `tranca/${parsedPost.tranca.id}`
        });
        const parsedResponse3 = JSON.parse(response3.body);

        expect(post.statusCode).toBe(200);
        expect(parsedResponse2.length>parsedResponse1.length).toBe(true);
        expect(parsedResponse3.tranca).toStrictEqual(parsedPost.tranca);

        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })
    });
    test('Should return 422 due to null', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                modelo: "trancafirme",
                anoFabricacao: "2011",
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
            url: '/tranca',
            body:{
                localizacao: "",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        expect(post.statusCode).toBe(422);
        expect(parsedPost.message).toBe("Dados inválidos (Empty)");
    });
});

//teste put
describe("PUT /id", () => {
    test('Should return 200 and delete the data correctly', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response1 = await app.inject({
            method: 'GET',
            url: `/tranca/${parsedPost.tranca.id}`
        });
        const parsedResponse1 = JSON.parse(response1.body);

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/${parsedPost.tranca.id}`,
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "velha",
            }
        })
        const parsedPut = JSON.parse(put.body);

        const response = await app.inject({
            method: 'GET',
            url: `/tranca/${parsedPost.tranca.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        expect(put.statusCode).toBe(200);
        expect(parsedResponse1.tranca != parsedResponse.tranca).toBe(true);
        expect(parsedResponse.tranca).toStrictEqual(parsedPut.tranca);

        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })
    });
    test('Should return 422 due to null', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/${parsedPost.tranca.id}`,
            body:{
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(422);
        expect(parsedPut.message).toBe("Dados inválidos (Null)");
        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })

    });
    test('Should return 422 due to empty', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/${parsedPost.tranca.id}`,
            body:{
                localizacao: "",
                modelo: "Caloteira",
                anoFabricacao: "2025",
                status: "nova",
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(422);
        expect(parsedPut.message).toBe("Dados inválidos (Empty)");
        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })
    });
    test('Should return 404', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/0`,
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(404);
        expect(parsedPut.message).toBe("Não encontrado");
        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })

    });
});


//testa Delete
describe("Delete /id", ()=>{
    test("Should return 200 and remove from array",async ()=>{
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response1 = await app.inject({
            method: 'GET',
            url: `/tranca`
        });
        const parsedResponse1 = JSON.parse(response1.body);

        const deletE = await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })

        const response2 = await app.inject({
            method: 'GET',
            url: `/tranca`
        });
        const parsedResponse2 = JSON.parse(response2.body);

        expect(deletE.statusCode).toBe(200);
        expect(parsedResponse2.length<parsedResponse1.length).toBe(true);

        const response3 = await app.inject({
            method: 'GET',
            url: `/tranca/${parsedPost.tranca.id}`
        });

        expect(response3.statusCode).toBe(404);

    });
    test("Should return 404 and remove Nothing",async ()=>{
        const app = build();
        const deletE = await app.inject({
            method:'delete',
            url: `tranca/0`,
        })

        expect(deletE.statusCode).toBe(404);

    });
});
//