# Extract Hint Data 

This Violent Monkey user script extracts number and text from divs with `aria-label="Select hint"` and displays them in a window. It also adds "ACROSS" and "DOWN" labels to indicate the orientation of the hints, provides a copy button to copy the entire output to the clipboard, and refreshes the data every second without resetting the scroll position.

## Features

- Extracts hint data from divs with `aria-label="Select hint"`.
- Displays the extracted data in a scrollable window.
- Adds "ACROSS" at the start and "DOWN" with a newline when the numbers jump back to a lower number.
- Refreshes the data every second.
- Provides a copy button to copy the entire output to the clipboard.
- Works with Darkmode!

## Installation

1. Install [Violent Monkey](https://violentmonkey.github.io/) extension for your browser if you haven't already. (I'm sure it will work with any .js executor but Violent Monkey is what I use)
2. Create a new script in Violent Monkey and paste the code from `extractor.js`
3. Save the script and ensure it is enabled.

## Usage

Navigate to the [website](https://puzzles.usatoday.com/) crossword, then start the game to extract hint data.
The extracted data will be displayed in a small window at the bottom left of the screen.
The window will update every second to reflect any changes.
Use the "Copy" button to copy the entire output to the clipboard.
