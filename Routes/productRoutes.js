const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductsByUserId,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");
const authMiddleware = require("../Middleware/authMiddleware");
const cacheMiddleware = require("../Middleware/cacheMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - nom
 *         - type
 *         - quantite
 *         - peremption
 *       properties:
 *         nom:
 *           type: string
 *           description: Nom du produit
 *         type:
 *           type: string
 *           description: Type/catégorie du produit
 *         quantite:
 *           type: number
 *           description: Quantité du produit
 *         peremption:
 *           type: string
 *           format: date
 *           description: Date de péremption du produit
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Date de création (automatique)
 *         owner:
 *           type: string
 *           description: ID de l'utilisateur propriétaire
 */

/**
 * @swagger
 * /products/create:
 *   post:
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     summary: Créer un nouveau produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - type
 *               - quantite
 *               - peremption
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom du produit
 *               type:
 *                 type: string
 *                 description: Type/catégorie du produit
 *               quantite:
 *                 type: number
 *                 description: Quantité du produit
 *               peremption:
 *                 type: string
 *                 format: date
 *                 description: Date de péremption du produit
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Non autorisé
 *       400:
 *         description: Données invalides
 */
router.post("/create", authMiddleware, createProduct);

/**
 * @swagger
 * /products/all:
 *   get:
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     summary: Récupérer tous les produits
 *     responses:
 *       200:
 *         description: Liste de tous les produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Non autorisé
 */
router.get("/all", authMiddleware, getProducts);

/**
 * @swagger
 * /products/myproducts:
 *   get:
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     summary: Récupérer les produits de l'utilisateur connecté
 *     responses:
 *       200:
 *         description: Liste des produits de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Non autorisé
 */
router.get("/myproducts", authMiddleware, cacheMiddleware, getProductsByUserId);

/**
 * @swagger
 * /products/update/{id}:
 *   put:
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     summary: Mettre à jour un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom du produit
 *               type:
 *                 type: string
 *                 description: Type/catégorie du produit
 *               quantite:
 *                 type: number
 *                 description: Quantité du produit
 *               peremption:
 *                 type: string
 *                 format: date
 *                 description: Date de péremption du produit
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Produit non trouvé
 */
router.put("/update/:id", authMiddleware, updateProduct);

/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     summary: Supprimer un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Produit non trouvé
 */
router.delete("/delete/:id", authMiddleware, deleteProduct);

module.exports = router;
