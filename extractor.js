// ==UserScript==
// @name        Roka's Crossword Hint Extractor
// @namespace   Violentmonkey Scripts
// @match       https://puzzles.usatoday.com/game/*
// @grant       none
// @version     1.0
// @author      Roka
// @description Extracts all of the hints on usatoday's crossword. 7/16/2024, 2:12:40 PM
// ==/UserScript==

(function() {
    'use strict';

    // Function to create the output window and copy button
    function createOutputWindow() {
        const outputWindow = document.createElement('div');
        outputWindow.style.position = 'fixed';
        outputWindow.style.bottom = '10px';
        outputWindow.style.left = '10px';
        outputWindow.style.width = '300px';
        outputWindow.style.height = '400px';
        outputWindow.style.overflowY = 'scroll';
        outputWindow.style.backgroundColor = 'white';
        outputWindow.style.border = '1px solid black';
        outputWindow.style.padding = '10px';
        outputWindow.style.zIndex = '9999';
        outputWindow.id = 'outputWindow';
        document.body.appendChild(outputWindow);

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.style.position = 'fixed';
        copyButton.style.bottom = '420px';
        copyButton.style.left = '10px';
        copyButton.style.zIndex = '10000';
        copyButton.onclick = copyToClipboard;
        document.body.appendChild(copyButton);
    }

    // Function to clear the output window
    function clearOutputWindow() {
        const outputWindow = document.getElementById('outputWindow');
        outputWindow.innerHTML = '';
    }

    // Function to add a message to the output window
    function addToOutputWindow(message) {
        const outputWindow = document.getElementById('outputWindow');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        outputWindow.appendChild(messageDiv);
    }

    // Function to extract and display hint data
    function extractHintData() {
        const outputWindow = document.getElementById('outputWindow');
        const scrollPosition = outputWindow.scrollTop;
        clearOutputWindow();

        const hintDivs = document.querySelectorAll('div[aria-label="Select hint"]');
        let outputLines = [];
        hintDivs.forEach(div => {
            const number = div.querySelector('span.notranslate').innerText;
            const text = div.innerText.replace(number, '').trim();
            outputLines.push(`${number}. ${text}`);
        });

        let lastNumber = 0;
        let firstPass = true;

        outputLines.forEach(line => {
            const number = parseInt(line.split('.')[0]);
            if (firstPass) {
                addToOutputWindow("ACROSS");
                firstPass = false;
            }
            if (number < lastNumber) {
                addToOutputWindow("\nDOWN");
            }
            addToOutputWindow(line);
            lastNumber = number;
        });

        outputWindow.scrollTop = scrollPosition;
    }

    // Function to copy the output to the clipboard
    function copyToClipboard() {
        const outputWindow = document.getElementById('outputWindow');
        const range = document.createRange();
        range.selectNode(outputWindow);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        try {
            document.execCommand('copy');
            alert('Copied to clipboard');
        } catch (err) {
            alert('Failed to copy');
        }
        window.getSelection().removeAllRanges();
    }

    // Create the output window and copy button on page load
    createOutputWindow();

    // Set an interval to refresh the data every second
    setInterval(extractHintData, 1000);
})();
