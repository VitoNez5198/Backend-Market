const request = require ("supertest");
const server = require("../../server");

describe("Operaciones CRUD de Users", () => {
    describe("Obteniendo resultados de get /users/:id", () => {
        it("Devolviendo un status 200", async () => {
            const idPrueba = 1;
            const response = await request(server).get(`/users/${idPrueba}`).send();
            const status = response.statusCode;
            expect(status).toBe(200);
        });
        it("Devolviendo un objeto con la informacion de 1 usuario", async () => {
            const idPrueba = 1;
            const {body} = await request(server).get(`/users/${idPrueba}`).send();
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty('user_id', idPrueba);
            expect(body).toHaveProperty('username');
            expect(body).toHaveProperty('email');
            expect(body).toHaveProperty('password');
        });
    })
});

describe("Operaciones CRUD de Auth", () => {
    describe("Registrando un usuario", () => {
        it("Devolviendo un status 201, y ademas se encuentre el usuario segun su email y username", async () => {
            bodyPrueba = {
                "username": "Ryuzu Meyer",
                "email": "ryuzu@prueba.com",
                "password": "ryuzu123"
            }
            const {body: users, statusCode: status} = await request(server).post('/auth/register').send(bodyPrueba);
            expect(status).toBe(201);
            expect(users[0]).toMatchObject({
                "username": "Ryuzu Meyer",
                "email": "ryuzu@prueba.com"
            });
        });
        it("Devolviendo un status 500 al entregar datos incorrectos", async () => {
            bodyPrueba = {
                "user": "Ryuzu Meyer",
                "correo": 321,
                "clave": 32132
            }
            const response = await request(server).post('/auth/register').send(bodyPrueba);
            const status = response.statusCode;
            expect(status).toBe(500);
        });
    });
    describe("Login de un usuario", () => {
        it("Devolviendo un error al proporcionar contraseña incorrecta", async () => {
            bodyUsuario = {
                "username": "Ryuzu Meyer",
                "email": "ryuzu@prueba.com",
                "password": "ryuzu123"
            }
            usuarioIncorrecto = {
                "email": "ryuzu@prueba.com",
                "password": "as6d54asd"
            }
            await request(server).post('/auth/register').send(bodyUsuario);
            const response = await request(server).post('/auth/login').send(usuarioIncorrecto);
            expect(response.body).toMatchObject({"error": "Usuario o contraseña incorrectas"});
        });
        it("Devolviendo un error al proporcionar un email no registrado", async () => {
            dbPrueba1 = {
                "username": "Ryuzu Meyer",
                "email": "ryuzu@prueba.com",
                "password": "ryuzu123"
            }
            dbPrueba2 = {
                "username": "Kenshin Himura",
                "email": "battousai@prueba.com",
                "password": "kenshin123"
            }
            usuarioIncorrecto = {
                "email": "soyunemailincorrecto@prueba.com",
                "password": "ryuzu123"
            }
            await request(server).post('/auth/register').send(dbPrueba1);
            await request(server).post('/auth/register').send(dbPrueba2);
            const response = await request(server).post('/auth/login').send(usuarioIncorrecto);
            expect(response.body).toMatchObject({"error": "Usuario no encontrado"});
        });
        it("Devolviendo un status 200 al loguearse exitosamente", async () => {
            dbPrueba1 = {
                "username": "Ryuzu Meyer",
                "email": "ryuzu@prueba.com",
                "password": "ryuzu123"
            }
            dbPrueba2 = {
                "username": "Kenshin Himura",
                "email": "battousai@prueba.com",
                "password": "kenshin123"
            }
            usuarioCorrecto = {
                "email": "battousai@prueba.com",
                "password": "kenshin123"
            }
            await request(server).post('/auth/register').send(dbPrueba1);
            await request(server).post('/auth/register').send(dbPrueba2);
            const response = await request(server).post('/auth/login').send(usuarioCorrecto);
            expect(response.statusCode).toBe(200);
        });
    });
});

describe("Operaciones CRUD de Favorites", () => {
    describe("Obteniendo resultados de get /favorites", () => {
        it("Devolviendo un status 200", async () => {
            const response = await request(server).get('/favorites').send();
            const status = response.statusCode;
            expect(status).toBe(200);
        });
    })    
});

describe("Operaciones CRUD de Cart", () => {
    describe("Obteniendo resultados de get /cart/:id", () => {
        it("Devolviendo un status 201 al agregar un producto al carro", async () => {
            productoPrueba = {
                "user_id": 1,
                "product_id": 18,
                "price": 9900,
                "quantity": 15
            };
            const response = await request(server).post('/cart').send(productoPrueba);
            expect(response.statusCode).toBe(201);
        });
        it("Devolviendo un status 200 al devolver un carrito", async () => {
            idPrueba = 1;
            const response = await request(server).get(`/cart/${idPrueba}`).send();
            expect(response.statusCode).toBe(200);
        });
        it("Devolviendo un status 200 al sustraer un producto del carrito", async () => {
            objetoPrueba = {
                "user_id": 1,
                "product_id": 18,
            };
            const response = await request(server).put('/cart/sustract').send(objetoPrueba);
            expect(response.statusCode).toBe(200);
        });
    })
});