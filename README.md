# Guess-a-Number-Full-Stack-Web-Application
A full stack web application built with Node.js, Express.js, HTML, JavaScript, jQuery, and Bootstrap — deployed live on AWS EC2 Windows Server.  The game challenges players to guess a randomly generated number between 1 and 100 in 5 attempts or fewer, with real-time feedback delivered through a RESTful A
The game challenges players to guess a randomly generated number between 1 and 100 in 5 attempts or fewer, with real-time feedback delivered through a RESTful API.


-Tech Stack

HTML, CSS, JavaScript, jQuery,Node.js, Express.jsCloud DeploymentAWS EC2 (Windows Server)Networking, Windows Defender Firewall, Port 8080, EC2 Security GroupsArchitectureRESTful API, Client-Server, Async HTTP Requests


-How It Works


Player clicks Start Game — the client sends a request to the server, which generates a random number (1–100) and stores it by session ID
Player enters a guess and clicks Guess — the client sends the guess to the server via an async GET request
Server responds with real-time feedback (guess count, guesses remaining, win/loss status)
Player has 5 guesses to find the number
Player can click Reset Game to start a new session at any time



API Endpoints

POST /startGame

Initializes a new game session.

Request body:

json{ "gameId": 994561 }

Response:

json{ "APIMessage": "Created game number 994561 - good luck!" }


GET /guessMade

Processes a player's guess and returns feedback.

Query params: gameId, guessMade

Response (in-progress guess):

json{
  "APIMessage": "Too low! This is guess number 1. You have 4 guess(es) left.",
  "gameOver": false
}

Response (win):

json{
  "APIMessage": "🎉 Congratulations! You guessed the number 42 in 3 guess(es).",
  "gameOver": true,
  "win": true
}

Response (loss):

json{
  "APIMessage": "❌ You lost! You used all 5 guesses. The correct number was: 42",
  "gameOver": true,
  "win": false
}


AWS Deployment

This application was deployed to a live AWS EC2 Windows Server instance. Steps taken:


Launched an EC2 Windows Server instance via AWS Academy
Connected via RDP (Remote Desktop Protocol)
Installed Node.js and Express on the server
Configured EC2 Security Group inbound rules to allow traffic on ports 8080–8085
Configured Windows Defender Firewall to allow inbound connections on port 8080
Updated the client HTML to point to the EC2 public DNS/IP address
Debugged and resolved real deployment issues including connection errors and routing failures
Confirmed the application was fully functional in production


