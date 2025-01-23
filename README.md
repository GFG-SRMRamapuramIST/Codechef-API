# CodeChef API Documentation

This API provides various endpoints to fetch user data and stats from CodeChef.

---

## Live API Link

The API can be accessed at: **[Live API Endpoint](https://codechef-api-9jml.onrender.com/)**.

---

## API Endpoints

| Route                         | Method | Description                                              |
| ----------------------------- | ------ | -------------------------------------------------------- |
| `/api/info/:username`         | GET    | Fetches user information from CodeChef by username.      |
| `/api/heat-map/:username`     | GET    | Fetches the heat map data from CodeChef by username.     |
| `/api/rating-graph/:username` | GET    | Fetches the rating graph data from CodeChef by username. |
| `/api/contest-data/:username` | GET    | Fetches the contest data from CodeChef by username.      |

---

### 1. Fetch User Info

**Route:** `/api/info/:username`

**Method:** GET

**Description:** Fetches user information from CodeChef by username.

**Response Example:**

```json
{
  "Profile_Image": "https://cdn.codechef.com/sites/default/files/uploads/pictures/b95018e7e270a1aca7593aac8408a54e.png",
  "Name": "Aakash Kumar Yadav",
  "User_Name": "aakash_261204",
  "Rating": "2★",
  "Country": {
    "flag": "https://cdn.codechef.com/download/flags/24/in.png",
    "name": "India"
  },
  "Student_or_Professional": "Student",
  "Institution": "SRM Institute of Science and Technology, Ramapuram Campus",
  "Rating_Details": {
    "Current_Rating": "1446",
    "Highest_Rating": "1469",
    "Global_Rank": "38628",
    "Country_Rank": "35147"
  }
}
```

---

### 2. Fetch Heat Map Data

**Route:** `/api/heat-map/:username`

**Method:** GET

**Description:** Fetches the heat map data from CodeChef by username.

**Response Example:**

```json
{
  "username": "aakash_261204",
  "userDailySubmissionsStats": [
    {
      "date": "2023-3-1",
      "value": 44
    },
    {
      "date": "2023-3-15",
      "value": 1
    },
    {
      "date": "2023-3-22",
      "value": 8
    },
    {
      "date": "2023-4-5",
      "value": 31
    }
  ]
}
```

---

### 3. Fetch Rating Graph Data

**Route:** `/api/rating-graph/:username`

**Method:** GET

**Description:** Fetches the rating graph data from CodeChef by username.

**Response Example:**

```json
{
  "username": "aakash_261204",
  "allRatingData": [
    {
      "code": "START79D",
      "getyear": "2023",
      "getmonth": "3",
      "getday": "1",
      "reason": null,
      "penalised_in": null,
      "rating": "1229",
      "rank": "2621",
      "name": "Starters 79 Division 4 (Rated)",
      "end_date": "2023-03-01 23:00:06",
      "color": "#666666"
    },
    {
      "code": "START82D",
      "getyear": "2023",
      "getmonth": "3",
      "getday": "22",
      "reason": null,
      "penalised_in": null,
      "rating": "1362",
      "rank": "2410",
      "name": "Starters 82 Division 4 (Rated)",
      "end_date": "2023-03-22 23:00:06",
      "color": "#666666"
    }
  ]
}
```

---

### 4. Fetch Contest Data

**Route:** `/api/contest-data/:username`

**Method:** GET

**Description:** Fetches the contest data from CodeChef by username.

**Response Example:**

```json
{
  "username": "aakash_261204",
  "contests": {
    "Starters 79 Division 4 (Rated)": [
      "Add smallest prime factor",
      "Distinct Opposite Sums",
      "Better Deal",
      "Ageing"
    ],
    "Starters 82 Division 4 (Rated)": [
      "Reach Home",
      "MIN To MAX",
      "Candy Division"
    ]
  }
}
```

## Installation Steps

1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <repository-folder>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

---

## Technical Details

- This project uses the following npm packages:
  - `axios`: For making HTTP requests to fetch data.
  - `cheerio`: For parsing and scraping HTML content.

---

## Potential API Failures

- **Website Updates:**
  - Since the API relies on web scraping and specific class names on the CodeChef website, any updates or changes to the website structure or class names can cause the API to fail.
- **Network Issues:**
  - Network errors or rate-limiting from the CodeChef servers might impact the functionality.
- **Incorrect Usernames:**
  - Providing a non-existent or invalid username will result in no data being fetched.

---

## Support This Repository

If you find this repository useful, please consider giving it a ⭐ on GitHub! Your support means a lot and helps in improving this project.
