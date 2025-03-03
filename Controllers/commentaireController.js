const Commentaire = require("../Models/commentaireModel");

const createCommentaire = async (req, res) => {
  try {
    const commentaire = new Commentaire({
      ...req.body,
      owner: req.user._id,
      recipe: req.params.id,
    });

    await commentaire.save();

    res.status(201).send({ message: "Commentaire created", commentaire });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteCommentaireById = async (req, res) => {
  try {
    const commentaire = await Commentaire.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!commentaire) {
      return res.status(404).send({ error: "Commentaire not found" });
    }

    res.status(200).send({ message: "Commentaire deleted", commentaire });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getCommentairesByRecipeId = async (req, res) => {
  try {
    const commentaires = await Commentaire.find({ recipe: req.params.id });
    res.status(200).send(commentaires);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const editCommentaireByOwner = async (req, res) => {
  try {
    const commentaire = await Commentaire.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!commentaire) {
      return res.status(404).send({ error: "Commentaire not found" });
    }

    res.status(200).send(commentaire);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createCommentaire,
  deleteCommentaireById,
  getCommentairesByRecipeId,
  editCommentaireByOwner,
};
