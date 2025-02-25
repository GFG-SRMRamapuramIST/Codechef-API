const cheerio = require("cheerio");
const { codechefURL, getHTML } = require("../utility");

const contestData = async (req, res) => {
  const { username } = req.params;
  const { contestName } = req.body;
  const codechefUserProfileURL = `${codechefURL}/${username}`;

  try {
    const html = await getHTML(codechefUserProfileURL);
    const $ = cheerio.load(html);

    let contestFound = false;
    let totalQuestionsSolved = 0;
    let questions = [];

    // Selecting each contest section
    $(".rating-data-section>.content").each((index, element) => {
      const foundContestName = $(element).find("h5 span").text().trim();

      if (foundContestName === contestName) {
        contestFound = true;
        $(element)
          .find("p span span")
          .each((i, qElement) => {
            questions.push($(qElement).text().trim()); // Collecting all questions
          });
        totalQuestionsSolved = questions.length;
        return false; // Break out of loop
      }
    });

    res.json({
      username,
      contestFound,
      totalQuestionsSolved,
      questions,
    });
  } catch (err) {
    console.error("Error scraping the page:", err.message);
    res.status(500).json({ error: "Failed to fetch contest data." });
  }
};

module.exports = contestData;
