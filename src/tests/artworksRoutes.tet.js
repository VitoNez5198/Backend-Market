const request = require('supertest');
const server = require('../../server');

describe('Operaciones CRUD de Obras de Arte', () => {
    describe('Obteniendo resultados de GET /artworks', () => {
        it('Debería devolver un status 200', async () => {
            const response = await request(server).get('/artworks').send();
            const status = response.statusCode;
            expect(status).toBe(200);
        });

    });

    describe('Creando una obra de arte cuando está autenticado', () => {
        it('Debería devolver un status 201 y crear la obra de arte', async () => {
            const artworkData = {
                /* Datos de la obra de arte */
            };

            const token = 'tu-token-de-autenticación';

            const response = await request(server)
                .post('/artworks')
                .send(artworkData)
                .set('Authorization', `Bearer ${token}`);

            const status = response.statusCode;
            expect(status).toBe(201);

            // Puedes agregar más afirmaciones (aserciones) según sea necesario
        });

        // Puedes agregar más casos de prueba relacionados con la creación de obras de arte
    });
});
