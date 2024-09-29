const express = require("express");
const axios = require("axios");

const router = express.Router();


const BASE_URL = "https://dummyjson.com/products";


router.get("/categories", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
});


router.get("/", async (req, res) => {
  const { category, skip = 0, limit = 10, search } = req.query;

  try {
    let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;


    if (category) {
      url = `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`;
    }


    if (search) {
      url += `&q=${search}`;
    }

    console.log(`Fetching products from: ${url}`);
    const response = await axios.get(url); 


    const totalResponse = await axios.get(BASE_URL);

    res.json({
      products: response.data.products, 
      total: totalResponse.data.total,  
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});


router.get("/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params; 
  const { skip = 0, limit = 10 } = req.query; 

  try {

    const url = `${BASE_URL}/category/${categoryName}?limit=${limit}&skip=${skip}`;
    console.log(`Fetching products by category from: ${url}`);

    const response = await axios.get(url); 
    res.json(response.data); 
  } catch (error) {
    console.error(`Error fetching products by category (${categoryName}):`, error.message);
    res.status(500).json({ message: "Error fetching products by category", error: error.message });
  }
});

module.exports = router;
