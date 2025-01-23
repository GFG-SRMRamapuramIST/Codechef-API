const cheerio = require("cheerio");

const { codechefURL, getHTML } = require("../utility");

// Function to scrape user daily submission stats from CodeChef
const ratingGraph = async (req, res) => {
  const username = req.params.username;
  const codechefUserProfileURL = `${codechefURL}/${username}`;

  try {
    const html = await getHTML(codechefUserProfileURL);
    const $ = cheerio.load(html);

    // Find the <script> tag containing the 'all_rating' variable
    const scriptTags = $("script").toArray();
    let allRatingData = null;

    for (const script of scriptTags) {
      const scriptContent = $(script).html();

      // Check if the 'all_rating' variable is in this script tag
      if (scriptContent.includes("var all_rating")) {
        const regex = /var all_rating = (\[.*?\]);/;
        const match = scriptContent.match(regex);

        if (match && match[1]) {
          allRatingData = JSON.parse(match[1]); // Parse the JSON data
          break;
        }
      }
    }

    // Return the extracted data or an error message if not found
    if (allRatingData) {
      return res.json({
        username,
        allRatingData,
      });
    } else {
      return res.status(404).json({
        error: "Failed to fetch user rating graph data.",
      });
    }
  } catch (err) {
    console.error("Error scraping the page:", err.message);
    res.status(500).json({ error: "Failed to fetch user rating graph data." });
  }
};

module.exports = ratingGraph;
