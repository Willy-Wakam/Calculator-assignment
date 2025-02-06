# Calculator-assignment

As part of our Frontend development training, we need to implement a simple calculator. This is a simple calculator web application built using **HTML**, **CSS**, and **JavaScript**. It supports basic arithmetic operations and is designed to be user-friendly and responsive.

## Features

The calculator supports the following operations:

1. **Addition (`+`)**  
   Adds two numbers together.  
   Example: `5 + 3 = 8`

2. **Subtraction (`-`)**  
   Subtracts the second number from the first number.  
   Example: `10 - 4 = 6`

3. **Multiplication (`*`)**  
   Multiplies two numbers.  
   Example: `7 * 2 = 14`

4. **Division (`/`)**  
   Divides the first number by the second number.  
   Example: `20 / 5 = 4`

## How to Use

1. **Open the Calculator**  
   Follow this link: https://willy-wakam.github.io/Calculator-assignment/

2. **Perform Calculations**  
   - Click the buttons on the calculator interface to input numbers and operations.
   - Use the `C` button to clear the current input.
   - Press the `=` button to compute the result.

3. **Browser Console Testing**  
   You can also test the calculator functions directly in your browser's console:
   - Open the browser's developer tools (usually by pressing `F12` or `Ctrl+Shift+I`).
   - Navigate to the **Console** tab.
   - Use the following functions to test the operations:
     ```javascript
     operate('5', '3', '+');       // Output: 8
     operate('10', '4', '-'); // Output: 6
     operate('7', '2', '*');  // Output: 14
     operate('20', '5', '÷');   // Output: 4
     ```

## Project Structure

The project consists of the following files:
- `index.html`: The main HTML file containing the calculator structure.
- `calculator.css`: The CSS file for styling the calculator interface.
- `calculator.js`: The JavaScript file containing the logic for the calculator operations.
