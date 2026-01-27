import swaggerJsdoc from "swagger-jsdoc";
import env from "./env";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Management API",
      version: "1.0.50",
      description:
        "Clean and modular API documentation for Event Management System",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            data: {
              type: "object",
            },
            message: {
              type: "string",
              example: "SUCCESS",
            },
          },
        },
      },
    },
  },
  apis: ["./src/modules/*/swagger.docs.ts"], // Separate swagger docs files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
