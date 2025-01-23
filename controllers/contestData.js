const cheerio = require("cheerio");
const { codechefURL, getHTML } = require("../utility");

const contestData = async (req, res) => {
  const username = req.params.username;
  const codechefUserProfileURL = `${codechefURL}/${username}`;

  try {
    const html = await getHTML(codechefUserProfileURL);
    const $ = cheerio.load(html);

    const contests = {};

    // Selecting each contest section
    $(".rating-data-section>.content").each((index, element) => {
      const contestName = $(element).find("h5 span").text().trim(); // Contest Name
      const questions = [];
      $(element)
        .find("p span span")
        .each((i, qElement) => {
          questions.push($(qElement).text().trim()); // Collecting all questions
        });
      contests[contestName] = questions; // Adding to contests object
    });

    res.json({
      username,
      contests,
    });
  } catch (err) {
    console.error("Error scraping the page:", err.message);
    res.status(500).json({ error: "Failed to fetch contest data." });
  }
};

module.exports = contestData;
