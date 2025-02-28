const express = require("express");
const router = express.Router();
const {
  createCommentaire,
  deleteCommentaireById,
  getCommentairesByRecipeId,
  editCommentaireByOwner,
} = require("../Controllers/commentaireController");

const authMiddleware = require("../Middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Commentaire:
 *       type: object
 *       required:
 *         - commentaire
 *         - owner
 *         - recipe
 *       properties:
 *         commentaire:
 *           type: string
 *           description: Contenu du commentaire
 *         owner:
 *           type: string
 *           description: ID de l'utilisateur ayant posté le commentaire
 *         recipe:
 *           type: string
 *           description: ID de la recette concernée
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Date de création du commentaire
 */

/**
 * @swagger
 * /commentaires/create:
 *   post:
 *     tags:
 *       - Commentaires
 *     security:
 *       - bearerAuth: []
 *     summary: Créer un commentaire sur une recette
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentaire
 *               - recipe
 *             properties:
 *               commentaire:
 *                 type: string
 *               recipe:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation de la création
 *                 commentaire:
 *                   $ref: '#/components/schemas/Commentaire'
 */
router.post("/create", authMiddleware, createCommentaire);

/**
 * @swagger
 * /commentaires/recipe/{id}:
 *   get:
 *     tags:
 *       - Commentaires
 *     summary: Récupérer tous les commentaires d'une recette
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la recette
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commentaire'
 */
router.get("/recipe/:id", getCommentairesByRecipeId);

/**
 * @swagger
 * /commentaires/update/{id}:
 *   put:
 *     tags:
 *       - Commentaires
 *     security:
 *       - bearerAuth: []
 *     summary: Modifier un commentaire par son propriétaire
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commentaire à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentaire:
 *                 type: string
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commentaire'
 */
router.put("/update/:id", authMiddleware, editCommentaireByOwner);

/**
 * @swagger
 * /commentaires/delete/{id}:
 *   delete:
 *     tags:
 *       - Commentaires
 *     security:
 *       - bearerAuth: []
 *     summary: Supprimer un commentaire par son propriétaire
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commentaire à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation de la suppression
 *                 commentaire:
 *                   $ref: '#/components/schemas/Commentaire'
 */
router.delete("/delete/:id", authMiddleware, deleteCommentaireById);

module.exports = router;
