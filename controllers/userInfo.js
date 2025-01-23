const cheerio = require("cheerio");

const { codechefURL, getHTML } = require("../utility");

// Function to scrape user info from CodeChef
const getUserInfo = async (req, res) => {
  const username = req.params.username;
  const codechefUserProfileURL = `${codechefURL}/${username}`;

  try {
    const html = await getHTML(codechefUserProfileURL);
    const $ = cheerio.load(html);

    // Profile Image, Name and User Name
    const profileImage = $(".user-details-container header>img").attr("src");
    const name = $(".user-details-container header>h1").text().trim();

    // User Details Section
    const userDetailsSection = $(".user-details .side-nav");

    const rating = userDetailsSection
      .find("li:contains('Username') .rating")
      .text()
      .trim();
    const countryFlag = userDetailsSection
      .find("li:contains('Country') .user-country-flag")
      .attr("src");
    const countryName = userDetailsSection
      .find("li:contains('Country') .user-country-name")
      .text()
      .trim();
    const userType = userDetailsSection
      .find("li:contains('Student/Professional') span")
      .text()
      .trim();
    const institution = userDetailsSection
      .find("li:contains('Institution') span")
      .text()
      .trim();

    // Ratings Widget
    const ratingWidget = $(".widget.widget-rating .content");

    const ratingNumber = ratingWidget
      .find(".rating-header .rating-number")
      .text()
      .trim();
    const highestRating = ratingWidget
      .find(".rating-header small")
      .text()
      .replace(/[^0-9]/g, "")
      .trim(); // Extract numeric part
    const globalRank = ratingWidget
      .find(".rating-ranks ul.inline-list li:first-child a strong")
      .text()
      .trim();
    const countryRank = ratingWidget
      .find(".rating-ranks ul.inline-list li:last-child a strong")
      .text()
      .trim();

    return res.json({
      Profile_Image: profileImage,
      Name: name,
      User_Name: username,
      Rating: rating,
      Country: {
        flag: countryFlag,
        name: countryName,
      },
      Student_or_Professional: userType,
      Institution: institution,
      Rating_Details: {
        Current_Rating: ratingNumber,
        Highest_Rating: highestRating,
        Global_Rank: globalRank,
        Country_Rank: countryRank,
      },
    });
  } catch (err) {
    console.error("Error scraping the page:", err.message);
    res.status(500).json({ error: "Failed to fetch user info." });
  }
};

module.exports = getUserInfo;
