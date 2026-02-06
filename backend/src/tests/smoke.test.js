// Smoke test
const request = require('supertest');
const app = require('../app');

describe('Smoke Tests', () => {
    it('should return 200 on health check', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('OK');
    });

    it('should return 404 for unknown routes', async () => {
        const response = await request(app).get('/unknown-route');
        expect(response.status).toBe(404);
    });
});
