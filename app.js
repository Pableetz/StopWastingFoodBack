const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));

const redis = require("redis");
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis!");
  })
  .catch((err) => {
    console.error("Redis connection error:", err);
  });

app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});

const PORT = 8080;

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Stop Wasting Food",
      version: "1.0.0",
      description: "Documentation de l'API Stop Wasting Food avec Swagger",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Serveur local",
      },
    ],
    tags: [
      {
        name: "Users",
        description: "Routes pour gérer les utilisateurs",
      },
      {
        name: "Products",
        description: "Routes pour gérer les produits",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./Routes/*.js", "./app.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/swf", {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

app.use("/users", require("./Routes/userRoutes"));
app.use("/products", require("./Routes/productRoutes"));
app.use("/recipes", require("./Routes/recipeRoutes"));
app.use("/shopping-lists", require("./Routes/shoppingListRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
