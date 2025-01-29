Je vais vous créer un README.md plus complet et professionnel.

````markdown
# Stop Wasting Food - Backend API

API REST pour l'application Stop Wasting Food, permettant de gérer les produits alimentaires et réduire le gaspillage.

## 🚀 Installation

1. Clonez le repository :

```bash
git clone https://github.com/Pableetz/StopWastingFoodBackTemporaire.git
cd StopWastingFoodBackTemporaire
```
````

2. Installez les dépendances :

```bash
npm install
```

3. Configurez les variables d'environnement :

- Créez un fichier `.env` à la racine du projet
- Ajoutez les variables suivantes :

```env
JWT_SECRET=votre_clé_secrète
PORT=8080
MONGODB_URI=mongodb://localhost:27017/stopwastingfood
```

## 🔧 Lancement

Démarrez le serveur :

```bash
node app.js
```

Le serveur sera accessible à l'adresse : `http://localhost:8080`

## 📚 Documentation API

La documentation Swagger de l'API est disponible à l'adresse :
`http://localhost:8080/api-docs`

### Points d'accès principaux

#### Utilisateurs

- POST `/users/register` - Inscription
- POST `/users/login` - Connexion
- GET `/users/all` - Liste des utilisateurs (admin)
- PUT `/users/update/:id` - Modification d'un utilisateur
- DELETE `/users/delete/:id` - Suppression d'un utilisateur

#### Produits

- POST `/products/create` - Création d'un produit
- GET `/products/all` - Liste de tous les produits
- GET `/products/myproducts` - Produits de l'utilisateur connecté
- PUT `/products/update/:id` - Modification d'un produit
- DELETE `/products/delete/:id` - Suppression d'un produit

## 🔒 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification. Pour les routes protégées, incluez le token dans le header :

```
Authorization: Bearer <votre_token>
```

## 🛠 Technologies utilisées

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT pour l'authentification
- Swagger pour la documentation
- bcrypt pour le hashage des mots de passe

## 📝 Configuration requise

- Node.js 18+
- MongoDB 4.4+

## 🤝 Contribution

1.
2.
3.
4.
5.

## 📄 Licence

Penser à rajouter un texte Licence voir avec Mathis le boss
