const express = require('express');
const router = express.Router();
const FoodCategory = require('../models/FoodCategory');

// Route handling for creating a new food category
router.post("/category", async (req, res) => {
    try {
        // Extract data from the request body
        const { id, categoryName, description } = req.body;

        // Create a new instance of the FoodCategory model
        const newFoodCategory = new FoodCategory({
            id,
            categoryName,
            description,
        });

        // Save the new food category to the database
        const savedFoodCategory = await newFoodCategory.save();

        // Respond with the saved food category
        res.json({ success: true, foodCategory: savedFoodCategory });
    } catch (error) {
        // If an error occurs, log it and respond with an error message
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route handling for getting all food categories
router.get("/categories", (req, res) => {
    FoodCategory.find().then((foodCategories) => res.json(foodCategories));
});

module.exports = router;
