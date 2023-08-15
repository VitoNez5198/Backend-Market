const request = require("supertest");
const server = require("../../server");

describe("Operaciones CRUD de Users", () => {
    describe("Obteniendo resultados de GET /users/:id", () => {
        it("Devolviendo un status 200", async () => {
            const idPrueba = 3;
            const response = await request(server).get(`/users/${idPrueba}`).send();
            const status = response.statusCode;
            expect(status).toBe(200);
        });

        it("Devolviendo un objeto con la información de 1 usuario", async () => {
            const idPrueba = 3;
            const { body } = await request(server).get(`/users/${idPrueba}`).send();
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty('user_id', 3);
            expect(body).toHaveProperty('username');
            expect(body).toHaveProperty('email');
            expect(body).toHaveProperty('password');
        });
    });
});

describe("Operaciones CRUD de Auth", () => {
    describe("Registrando un usuario", () => {
        it("Devolviendo un status 201 y encontrando el usuario según su email y username", async () => {
            const bodyPrueba = {
                "username": "Ryuzu Meyer",
                "email": "ryuzu@prueba.com",
                "password": "ryuzu123"
            };
            const { body: users, statusCode: status } = await request(server).post('/auth/register').send(bodyPrueba);
            expect(status).toBe(201);
            expect(users[0]).toMatchObject({
                "username": "Ryuzu Meyer",
                "email": "ryuzu@prueba.com"
            });
        });

        it("Devolviendo un status 500 al entregar datos incorrectos", async () => {
            const bodyPrueba = {
                "user": "Ryuzu Meyer",
                "correo": 321,
                "clave": 32132
            };
            const response = await request(server).post('/auth/register').send(bodyPrueba);
            const status = response.statusCode;
            expect(status).toBe(500);
        });
    });

    describe("Login de un usuario", () => {
        it("Devolviendo un error al proporcionar contraseña incorrecta", async () => {
            const bodyUsuario = {
                "username": "Ryuzu Meyer",
                "email": "ryuzu@prueba.com",
                "password": "ryuzu123"
            };
            const usuarioIncorrecto = {
                "email": "ryuzu@prueba.com",
                "password": "as6d54asd"
            };
            await request(server).post('/auth/register').send(bodyUsuario);
            const response = await request(server).post('/auth/login').send(usuarioIncorrecto);
            expect(response.body).toMatchObject({ "error": "Usuario o contraseña incorrectas" });
        });
    });
});

describe("Operaciones CRUD de Favorites", () => {
    describe("Obteniendo resultados de GET /favorites", () => {
        it("Devolviendo un status 200", async () => {
            const response = await request(server).get('/favorites').send();
            const status = response.statusCode;
            expect(status).toBe(200);
        });
    });
});

describe('Operaciones CRUD de Artworks', () => {
    describe('Obteniendo resultados de GET /artworks', () => {
        it('Debería devolver un status 200 y obtener todos los artworks', async () => {
            const response = await request(server)
                .get('/artworks');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('Actualizando un artwork existente', () => {
        it('Debería devolver un status 200 y actualizar un artwork existente', async () => {
            const updatedArtwork = {
                product_id: 2,
                title: 'Nuevo Artwork',
                description: 'Descripción del nuevo artwork',
                price: 200,
                url_image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Pair_of_mandarin_ducks.jpg',
                seller_id: 4,
            };

            const { body: artwork, status } = await request(server)
                .put('/artworks/2') // Reemplaza el numero con el ID del artwork a actualizar
                .send(updatedArtwork);

            expect(status).toBe(200);
            expect(artwork).toMatchObject(updatedArtwork);
        });
    });

    describe('Eliminando un artwork existente', () => {
        it('Debería devolver un status 200 al eliminar un artwork existente', async () => {
            const response = await request(server)
                .delete('/artworks/6'); // Reemplaza numero con el ID del artwork a eliminar
        
            expect(response.status).toBe(200);
        });
    });
});
