const request = require('supertest');
const server = require('../../server'); // Asegúrate de que la ruta sea correcta

describe('Operaciones de Artistas Verificados', () => {
    describe('Obteniendo resultados de GET /artist', () => {
        it('Debería devolver un status 200 cuando está autenticado', async () => {
            const token = 'tu-token-de-autenticación';

            const response = await request(server)
                .get('/artist')
                .set('Authorization', `Bearer ${token}`);

            const status = response.statusCode;
            expect(status).toBe(200);

            // Puedes agregar más afirmaciones (aserciones) según sea necesario
        });

        // Puedes agregar más casos de prueba relacionados con la obtención de artistas verificados
    });

    // Puedes agregar más bloques de pruebas para otras operaciones de artistas verificados
});
