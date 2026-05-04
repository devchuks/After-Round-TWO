# After Round One! 🖐️🇳🇬

## 🎮 The Game Concept

"After Round One" is a game of probability and quick thinking. Players attempt to guess the total number of fingers that will be displayed by the entire group. It is a game of elimination, if you guess correctly, you win and exit the "danger zone." The last person left is the loser.

### The Legendary Chant
The game automates the iconic rhythm used to time the reveal:
> 🎵 *After round one...*
> 🎵 *original Panadol extra...*
> 🎵 *otun gbede...*
> 🎵 *Babangida YASO!*

## 🕹️ How to Play

1.  **Join the Lobby:** Enter the number of players and their unique names.
2.  **Make Your Guess:** Every player chooses a number. The range is between **0** and **(5 × Number of Players)**. No two players can have the same guess.
3.  **The Reveal:** After the chant, every player "shows" a random number of fingers (0 to 5).
4.  **Winning:** If the sum of everyone's fingers matches your guess, you are eliminated (you win!).
5.  **The Squeeze:** As players win and leave the game, the maximum possible total of fingers drops. If your current guess is now higher than the new maximum, the game will prompt you to pick a new, valid number.
6.  **The Loser:** The rounds continue until only one player remains. **Prepare to get your hand slapped! 👋**

## 🛠️ Technical Implementation

### Core Engine
The logic is driven by the `AfterRoundOneGame` class in `game.js`, which handles:
*   **State Management:** Tracks active players, winners, and current totals.
*   **Dynamic UI:** Uses Bootstrap 5 for responsive layouts and modals.
*   **Animations:** Features a custom CSS animation for the "Yaso!" reveal to mimic the sudden movement of the hand game.
*   **Validation:** Prevents duplicate guesses and ensures all inputs stay within the mathematical bounds of the current player count.

### File Structure
*   `index.html`: The game interface and visual structure.
*   `game.js`: The primary logic file containing the game class.
*   `assets/hands/`: A collection of SVG icons (0.svg through 5.svg) representing the finger counts.

## 🚀 Installation & Setup

1.  Clone this repository to your local machine.
2.  Ensure your hand SVGs are located in `assets/hands/` and named `0.svg`, `1.svg`, etc.
3.  Open `index.html` in any modern web browser. 

*Note: For the best experience, use a browser that supports CSS grid and Flexbox.*
