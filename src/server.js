
const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

require('dotenv').config()
app.use(express.json())

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vending Machine API",
      version: "1.0.0",
      description: "A simple Express Vending Machine API",
    },

    servers: [
      {
        url: "http://localhost:3000",
        // description: "My API Documentation",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
const vendRouter = require('../routes/vend.routes')
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/", vendRouter)

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
