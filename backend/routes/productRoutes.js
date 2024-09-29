const express = require("express");
const axios = require("axios");

const router = express.Router();

const BASE_URL = "https://dummyjson.com/products"; // Use the Dummy JSON API

router.get("/categories", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

router.get("/", async (req, res) => {
  const { category, skip = 0, limit = 10, search } = req.query;
  try {
    let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;

    if (category) {
      // Correctly append the category as a query parameter
      url += `&category=${category}`;
    }

    if (search) {
      url += `&q=${search}`;
    }

    const response = await axios.get(url);
    const totalResponse = await axios.get(BASE_URL);
    const totalProducts = totalResponse.data.total;

    res.json({
      products: response.data.products,
      total: totalProducts
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;
