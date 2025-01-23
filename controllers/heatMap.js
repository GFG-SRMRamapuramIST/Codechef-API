const cheerio = require("cheerio");

const { codechefURL, getHTML } = require("../utility");

// Function to scrape user heat map data from CodeChef
const heatMap = async (req, res) => {
  const username = req.params.username;
  const codechefUserProfileURL = `${codechefURL}/${username}`;

  try {
    const html = await getHTML(codechefUserProfileURL);
    const $ = cheerio.load(html);

    // Find the <script> tag containing the 'userDailySubmissionsStats' variable
    const scriptTags = $("script").toArray();
    let userDailySubmissionsStats = null;

    for (const script of scriptTags) {
      const scriptContent = $(script).html();

      // Check if the 'userDailySubmissionsStats' variable is in this script tag
      if (scriptContent.includes("var userDailySubmissionsStats")) {
        const regex = /var userDailySubmissionsStats = (\[.*?\]);/;
        const match = scriptContent.match(regex);

        if (match && match[1]) {
          userDailySubmissionsStats = JSON.parse(match[1]); // Parse the JSON data
          break;
        }
      }
    }

    // Return the extracted data or an error message if not found
    if (userDailySubmissionsStats) {
      return res.json({
        username,
        userDailySubmissionsStats,
      });
    } else {
      return res.status(404).json({
        error: "Failed to find user heat map data.",
      });
    }
  } catch (err) {
    console.error("Error scraping the page:", err.message);
    res.status(500).json({ error: "Failed to fetch user heat map data." });
  }
};

module.exports = heatMap;
