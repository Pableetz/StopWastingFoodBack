const express = require("express");
const router = express.Router();
const {
  createShoppingList,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingListById,
  getAllShoppingLists,
} = require("../Controllers/shoppingListController");

const authMiddleware = require("../Middleware/authMiddleware");

router.post("/create", authMiddleware, createShoppingList);

router.get("/all", authMiddleware, getAllShoppingLists);

router.get("/:id", authMiddleware, getShoppingListById);

router.patch("/update/:id", authMiddleware, updateShoppingList);

router.delete("/delete/:id", authMiddleware, deleteShoppingListById);

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingList:
 *       type: object
 *       required:
 *         - name
 *         - products
 *         - owner
 *       properties:
 *         name:
 *           type: string
 *           description: Nom de la liste
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID du produit
 *               quantity:
 *                 type: number
 *                 description: Quantité du produit
 *         owner:
 *           type: string
 *           description: ID de l'utilisateur propriétaire
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Date de création (automatique)
 */

/**
 * @swagger
 * /shoppingLists/create:
 *   post:
 *     tags:
 *       - ShoppingLists
 *     security:
 *       - bearerAuth: []
 *     summary: Créer une nouvelle liste de courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - products
 *             properties:
 *               name:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               owner:
 *                 type: string
 *     responses:
 *       201:
 *         description: Liste de courses créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation
 *                 shoppingList:
 *                   $ref: '#/components/schemas/ShoppingList'
 */

/**
 * @swagger
 * /shoppingLists/{id}:
 *   get:
 *     tags:
 *       - ShoppingLists
 *     security:
 *       - bearerAuth: []
 *     summary: Récupérer une liste de courses par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la liste de courses à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste de courses récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingList'
 */

/**
 * @swagger
 * /shoppingLists/update/{id}:
 *   put:
 *     tags:
 *       - ShoppingLists
 *     security:
 *       - bearerAuth: []
 *     summary: Mettre à jour une liste de courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la liste de courses à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingList'
 *     responses:
 *       200:
 *         description: Liste de courses mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingList'
 */

/**
 * @swagger
 * /shoppingLists/delete/{id}:
 *   delete:
 *     tags:
 *       - ShoppingLists
 *     security:
 *       - bearerAuth: []
 *     summary: Supprimer une liste de courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la liste de courses à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste de courses supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation
 *                 shoppingList:
 *                   $ref: '#/components/schemas/ShoppingList'
 */

/**
 * @swagger
 * /shoppingLists/all:
 *   get:
 *     tags:
 *       - ShoppingLists
 *     security:
 *       - bearerAuth: []
 *     summary: Récupérer toutes les listes de courses
 *     responses:
 *       200:
 *         description: Liste de toutes les listes de courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingList'
 */

module.exports = router;
