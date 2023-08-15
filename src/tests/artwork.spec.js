const request = require('supertest');
const server = require('../../server'); // Importa tu aplicación Express

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
        .put('/artworks/2') // Reemplaza '1' con el ID del artwork a actualizar
        .send(updatedArtwork);

      expect(status).toBe(200);
      expect(artwork).toMatchObject(updatedArtwork);
    });

    
  });

  describe('Eliminando un artwork existente', () => {
    it('Debería devolver un status 200 y eliminar un artwork existente', async () => {
      const response = await request(server)
        .delete('/artworks/6'); // Reemplaza '1' con el ID del artwork a eliminar

      expect(response.status).toBe(200);
    });


  });
});
