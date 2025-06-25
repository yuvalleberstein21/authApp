import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AuthApp',
      version: '1.0.0',
      description: 'תיעוד API למערכת התחברות',
    },
    servers: [
      {
        url: 'http://localhost:8005',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
});
