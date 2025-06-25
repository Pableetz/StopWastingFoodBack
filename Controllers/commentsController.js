const Comments = require("../Models/commentsModel");

const createComments = async (req, res) => {
  try {
    const comments = new Comments({
      ...req.body,
      owner: req.user._id,
      recipe: req.params.id,
    });

    await comments.save();

    res.status(201).send({ message: "Comment created", comments });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteCommentsById = async (req, res) => {
  try {
    const comments = await Comments.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!comments) {
      return res.status(404).send({ error: "Comment not found" });
    }

    res.status(200).send({ message: "Comment deleted", comments });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getCommentsByRecipeId = async (req, res) => {
  try {
    const comments = await Comments.find({ recipe: req.params.id });
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const editCommentsByOwner = async (req, res) => {
  try {
    const comment = await Comments.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!comment) {
      return res.status(404).send({ error: "Comments not found" });
    }

    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createComments,
  deleteCommentsById,
  getCommentsByRecipeId,
  editCommentsByOwner,
};
