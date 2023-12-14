const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const Auth = require('./Routes/Auth'); // Correct the path
const DisplayData = require('./Routes/DisplayData');
const food = require('./Routes/food-items');
const category = require('./Routes/foodcategories'); 

const app = express();


// Fonction pour effectuer des opérations de base de données
function fetchDataFromDatabase(callback) {
    // Exemple de traitement asynchrone, comme une requête à la base de données
    setTimeout(async () => {
      try {
        // Connexion à MongoDB
        const mongo_url = config.get("mongoURI");
        
        await mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
  
        // Supposez que vous avez des opérations de base de données ici
        const data = await VotreModeleDeDonnees.find(); // À adapter selon votre modèle de données
  
        // Déconnexion de MongoDB (optionnel selon votre cas d'utilisation)
        await mongoose.disconnect();
  
        // Appel du callback avec les résultats
        callback(null, data);
      } catch (error) {
        // En cas d'erreur, appeler le callback avec l'erreur
        callback(error, null);
      }
    }, 1000); // Temps d'attente simulé d'une seconde
  }
  
  // Exportez la fonction fetchDataFromDatabase
  module.exports = fetchDataFromDatabase;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB configuration
const mongo_url = config.get("mongoURI");
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connecté à MongoDB"))
    .catch((err) => console.error("Erreur de connexion à MongoDB", err));
   /* const foodCollection = await mongoose.connection.db.collection("food_items");
    foodCollection.find({}).toArray(async function (err, data) {
        const categoryCollection = await mongoose.connection.db.collection("Categories");
        categoryCollection.find({}).toArray(async function (err, Catdata) {
            callback(err, data, Catdata);

        })
  });   */

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send('Erreur serveur');
});

// Use the 'Auth' router
app.use('/api/auth', Auth);
app.use('/api/DisplayData', DisplayData);
app.use('/api/food-items', food);
app.use('/api/foodcategories',category);



const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

