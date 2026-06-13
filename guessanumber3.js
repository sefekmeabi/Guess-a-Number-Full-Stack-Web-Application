var express = require('express');
// use the express module and call it 'express'

var randomNum = [];
var guessesMade = [];   // NEW: track number of guesses per gameId

var app = express(); // create a new express server object called 'app'

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS setup
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// ------------------------------
// START GAME
// ------------------------------
app.post('/startGame', function (req, res) {

    let gameId = req.body.gameId;

    // Generate number 1–100
    let randomNumberGenerated = Math.floor(Math.random() * 100) + 1;

    // Store number
    randomNum[gameId] = randomNumberGenerated;

    // Reset guess count
    guessesMade[gameId] = 0;

    console.log("Created game number " + gameId + ". The number to guess is " + randomNumberGenerated);

    responseMessage = { 
        APIMessage: "Created game number " + gameId + " - good luck!" 
    };

    res.json(responseMessage);
});

// ------------------------------
// GUESS MADE
// ------------------------------
app.get('/guessMade', function (req, res) {

    let gameId = req.query.gameId;
    let numberToGuess = randomNum[gameId];
    let numberGuessed = parseInt(req.query.guessMade);

    // 1. VALIDATE RANGE 1–100
    if (numberGuessed < 1 || numberGuessed > 100 || isNaN(numberGuessed)) {
        return res.json({
            APIMessage: "ERROR: Please enter a number between 1 and 100."
        });
    }

    // Increase guess counter
    guessesMade[gameId]++;

    let currentGuess = guessesMade[gameId];
    let guessesLeft = 5 - currentGuess;

    // ------------------------------
    // 4. USER GUESSED CORRECTLY
    // ------------------------------
    if (numberGuessed === numberToGuess) {

        return res.json({
            APIMessage:
                "🎉 Congratulations! You guessed the number " + numberToGuess +
                " in " + currentGuess + " guess(es).",
            gameOver: true,
            win: true
        });
    }

    // ------------------------------
    // 5. USER RAN OUT OF GUESSES
    // ------------------------------
    if (currentGuess >= 5) {
        return res.json({
            APIMessage:
                "❌ You lost! You used all 5 guesses.\nThe correct number was: " + numberToGuess,
            gameOver: true,
            win: false
        });
    }

    // ------------------------------
    // 3. TOO HIGH / TOO LOW + GUESSES LEFT
    // ------------------------------
    let message = "";

    if (numberGuessed < numberToGuess) {
        message = "Too low!";
    } else {
        message = "Too high!";
    }

    return res.json({
        APIMessage:
            message + " This is guess number " + currentGuess +
            ". You have " + guessesLeft + " guess(es) left.",
        gameOver: false
    });
});

app.listen(8080, "0.0.0.0");
console.log("Listening on port 8080"); 

