// Import necessary modules
const express = require('express');
const router = express.Router();
const FoodItem = require('../models/fooditems'); // Assuming your model is in '../models/fooditems'

// Route handling for creating a new food item
router.post("/add", async (req, res) => {
    try {
        // Extract data from the request body
        const { CategoryName, name, img, options, description } = req.body;

        // Create a new instance of the FoodItem model
        const newFoodItem = new FoodItem({
            CategoryName,
            name,
            img,
            options,
            description
        });

        // Save the new food item to the database
        const savedFoodItem = await newFoodItem.save();

        // Respond with the saved food item
        res.json({ success: true, foodItem: savedFoodItem });
    } catch (error) {
        // If an error occurs, log it and respond with an error message
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/get_items', async (req, res) => {
    try {
      // Fetch all food items from the database
      const itemss = await FoodItem.find();
  
      // Send the food items as a JSON response
      res.json(itemss);
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error('Error fetching food items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Export the router
module.exports = router;






