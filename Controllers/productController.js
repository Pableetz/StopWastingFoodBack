const Product = require("../Models/productModel");

const createProduct = async (req, res) => {
  const userId = req.user._id;
  try {
    const product = new Product({
      ...req.body,
      owner: req.user._id,
    });

    await req.redisClient.del(`user:${userId}:products`).then(() => {
      console.log("🔄 Cache Redis pour les produits de l'utilisateur supprimé");
    });

    await product.save();

    res.status(201).send({ message: "Product created", product });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Controller pour get les products de l'utilisateur connecté
const getProductsByUserId = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user._id });

    await req.redisClient.set(
      `user:${req.user._id}:products`,
      JSON.stringify(products),
      {
        EX: 3600, // Expire in 1 hour
      }
    );

    console.log("📦 Données récupérées depuis Mongo et stockées dans Redis");

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const userId = req.user._id;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    await req.redisClient.del(`user:${userId}:products`);

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const userId = req.user._id;
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    await req.redisClient.del(`user:${userId}:products`);

    res.status(200).send({ message: "Product deleted", product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const filters = {};

    if (req.query.nom) {
      filters.nom = new RegExp(req.query.nom, "i");
    }

    if (req.query.type) {
      filters.type = new RegExp(req.query.type, "i");
    }

    if (req.query.quantite) {
      filters.quantite = req.query.quantite;
    }

    if (req.query.peremption) {
      filters.peremption = req.query.peremption;
    }

    const products = await Product.find(filters);

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProductsByUserId,
  updateProduct,
  deleteProduct,
  getProducts,
};
