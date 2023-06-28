const bdd = require("../../src/data/bdd");
const {colocaBicicleta, deletaBicicleta, retornaBicicletaId, retornaBicicletas, atualizaBicicleta} = require("../../src/data/bdd");

describe("Testa recuperação de array Bicicleta",()=>{
   test ("Should return an array of bikes",()=>{
      expect(Array.isArray(bdd.retornaBicicletas())).toBe(true);
   });
});

describe("Testa recuperação de um elemento do array Bicicleta",()=>{
   let novaBike;

   beforeAll(()=>{
      novaBike = colocaBicicleta("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaBicicleta(novaBike.id-1);
   });

   test ("Should return an object",()=>{
      expect(bdd.retornaBicicletaId(novaBike.id-1) !== null).toBe(true);
   });
   test ("Should an object of bike",()=>{
      expect(retornaBicicletaId(novaBike.id-1)).toStrictEqual(novaBike);
   });
   test ("Should return undefined",()=>{
      expect(bdd.retornaBicicletaId(1000)).toBe(undefined);
   });

});

describe("Testa colocação de um elemento no array de Bicicleta",()=>{
   let array;
   let size;
   beforeAll(()=>{
      array = retornaBicicletas();
      size = array.length;
   });
   afterAll(()=>{
      deletaBicicleta(array.length-1);
   });

   test ("Should return an object",()=>{
      expect(colocaBicicleta("Teste","Teste",2000,2000)!==null).toBe(true);
      deletaBicicleta(array.length-1);
   });
   test ("Should put an object in array",()=>{
      colocaBicicleta("Teste","Teste",2000,2000);
      expect(size<array.length).toBe(true);
   });
});

describe("Testa atualização de um elemento no array de Bicicleta",()=>{
   let bicicleta;
   beforeAll(()=>{
      bicicleta = colocaBicicleta("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaBicicleta(bicicleta.id-1);
   });

   test ("Should return an object",()=>{
      expect(atualizaBicicleta(bicicleta.id-1,"Teste","Teste",2000,2000)!==null).toBe(true);
   });
   test ("Should actualize an object in array",()=>{
      bicicleta = atualizaBicicleta(bicicleta.id-1,"Teste2","Teste",2000,2000);
      expect(bicicleta !== {
         id: 1,
             marca: 'Teste',
             modelo: 'Teste',
             numero: 2000,
             ano: 2000,
             status: 'nova'
      }).toBe(true);
   });
});

describe("Testa remoção de um elemento no array de Bicicleta",()=>{
   let bicicleta;
   let size;
   beforeAll(()=>{
      bicicleta = colocaBicicleta("Teste","Teste",2000,2000);
      size = retornaBicicletas().length;
   });

   test ("Should remove just one object in array",()=>{
      deletaBicicleta(size-1);
      expect((size-retornaBicicletas().length)==1).toBe(true);
   });
});


