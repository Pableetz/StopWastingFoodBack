const Recipe = require("../Models/recipeModel");
const axios = require("axios");

const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      owner: req.user._id,
    });

    await recipe.save();

    res.status(201).send({ message: "Recipe created", recipe });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    console.log("id", req.params.id);
    const recipe = await Recipe.findOne({ _id: req.params.id });
    //   .populate(
    //   "comments"
    // ).setOptions({ strictPopulate: false }).exec();
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }

    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id });

    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }

    res.status(200).send({ message: "Recipe deleted", recipe });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const filters = {};

    if (req.query.name) {
      filters.name = new RegExp(req.query.name, "i");
    }

    if (req.query.category) {
      filters.category = new RegExp(req.query.category, "i");
    }

    const recipes = await Recipe.find(filters);

    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const generateRecipes = async (req, res) => {
  const userIngredients = req.body.ingredients;
  console.log("body", req.body);
  console.log("userIngredients", userIngredients);
  const prompt = `Propose-moi 3 recettes à partir de ces ingrédients (tu peux partir du principe que j'habite dans une maison toute l'année et que j'ai accès à des ingrédients de base comme l'huile d'olive, le sel, le poivre, riz, pates,  etc.) :
${userIngredients.join(", ")}.

Je veux que tu m'envoies **une réponse strictement au format JSON**, sans texte d'introduction ni commentaire, sous forme d'un tableau d'objets JSON ( 1objet par recipe ).
Chaque objet doit comporter :
- "nom" (string),
- "tempsPreparation" (string),
- "ingredients" (tableau de chaînes),
- "etapes" (tableau de chaînes).

Voici un exemple de réponse correcte :
[
  {
    "tempsPreparation": "20 minutes",
    "nom": "Pâtes à la tomate",
    "ingredients": ["pâtes", "tomates", "ail"],
    "etapes": ["Faire cuire les pâtes", "Préparer la sauce tomate"]
  },
  {
    "tempsPreparation": "15 minutes",
    "nom": "Salade avocat-poulet",
    "ingredients": ["avocat", "poulet", "salade", "huile d'olive"],
    "etapes": ["Couper l'avocat et le poulet", "Mélanger avec la salade et l'huile d'olive"]
  }
]`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Tu es un assistant culinaire qui m'aide à créer des recettes à partir d'ingrédients que j'ai chez moi. Tu dois proposer des recettes simples et rapides à réaliser.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    let resultRaw = response.data.choices[0].message.content;

    resultRaw = resultRaw.trim();

    // Retirer un bloc ```json ... ```
    if (resultRaw.startsWith("```json")) {
      resultRaw = resultRaw.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (resultRaw.startsWith("```")) {
      // Retirer les simples balises ```
      resultRaw = resultRaw.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    let recipes = [];
    try {
      recipes = JSON.parse(resultRaw);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return res.status(400).send({
        error: "Invalid response format from OpenAI",
      });
    }
    console.log("Generated recipes:", recipes);
    res.status(200).send(recipes);
  } catch (error) {
    console.error("Error generating recipes:", error);
    res.status(500).send({ error: "Failed to generate recipes" });
  }
};

module.exports = {
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  generateRecipes,
};
