
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API xis da hora',
      description: 'API do sistema ecommerce xis da hora.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        customerAuth: {
          type: 'http',
          scheme: 'bearer',
          schemeFormat: 'JWT',
        },
        adminAuth: {
          type: 'http',
          scheme: 'bearer',
          schemeFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/swagger/*.swagger.ts'],
};

export const swaggerDocs = swaggerJSDoc(options)