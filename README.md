# Football App

A simple static football player search app built with HTML, CSS, and JavaScript.

## Overview

Football App lets users search for football players and view profile details such as:
- player name
- team
- position
- nationality
- date of birth
- player image

The app uses the free TheSportsDB API to fetch player data.

## Files

- `index.html` - landing page with app description and link to the player search page
- `about.html` - search interface for finding football players
- `style.css` - styling for the landing page, search page, and player cards
- `script.js` - JavaScript logic for searching players and rendering results

## How to Run

1. Open `index.html` in a web browser.
2. Click `View Players` to go to the search page.
3. Enter a player name and click `Search` or press `Enter`.

## Notes

- The project is fully client-side and does not require a build step.
- It depends on the public TheSportsDB API endpoint:
  `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php`
- If no players match the search, an error message is shown.

## Customization

- Update `style.css` to change colors, layout, or typography.
- Modify `script.js` to add additional player details or improve error handling.
- Add more pages or navigation links if you want to expand the app.

## License

This project is provided as-is for learning and demonstration purposes.