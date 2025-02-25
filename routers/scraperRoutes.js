const express = require("express");

// Importing APIs Functions
const {
  getUserInfo,
  heatMap,
  ratingGraph,
  contestData,
} = require("../controllers");

const router = new express.Router();

// API Routes Description
router.get("/", (req, res) => {
  const apiDetails = [
    {
      route: "/api/info/:username",
      method: "GET",
      description: "Fetches user information from CodeChef by username.",
    },
    {
      route: "/api/heat-map/:username",
      method: "GET",
      description: "Fetches the heat map data from CodeChef by username.",
    },
    {
      route: "/api/rating-graph/:username",
      method: "GET",
      description: "Fetches the rating graph data from CodeChef by username.",
    },
    {
      route: "/api/contest-data/:username",
      method: "POST",
      description: "Fetches the contest data from CodeChef by username.",
      parameters: {
        contestName: "Name of the contest to fetch data.",
      },
    },
  ];

  res.json({
    message: "Welcome to the CodeChef API!",
    availableRoutes: apiDetails,
  });
});

// User Info
router.get("/api/info/:username", getUserInfo);

// User Heat Map
router.get("/api/heat-map/:username", heatMap);

// User Rating Graph
router.get("/api/rating-graph/:username", ratingGraph);

// User Contest Data
router.post("/api/contest-data/:username", contestData);

module.exports = router;
