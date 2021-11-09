# P2-Armageddon-Backend
Battleship as inspired by Tetris 99

Overview
The Battleship App is a web-based game for playing the classic game "Battleship" with the addition of being able to play against more than one opponent at a time. You can create an account, create a lobby, invite people to your lobby, and play a game. Additionally, players can chat in real time with other players in their lobby. 

Tables
User table, Holds login information
Match table, Holds meta data (players, winner, turn count)
Turn table, Holds game info (where was attacked)
Layout table, Holds starting ship locations 
Friends table, Holds a list of user connections
Chat history table, Holds record of messages sent to chat

User Stories
As a user, I should be able to sign up for an account
As a user, I should be able to create a lobby that other players can join
As a user, I should be able to invite players to my lobby
As a user, I should be able to chat with other players in my lobby
As a user, I should be able to play a game of battleship
As a user, I should be able to add friends

Tech Stack
C#
PostgreSQL DB
EF Core
Xunit
Serilog
Azure
Github Actions
Angular 
Stream API
Oauth
Sonar Cloud

MVP
Create account
Play a game of battleship
Chat with other players
Player Statistics (user page)
Global leaderboard

Stretch Goals
Game settings (player count, ship count, missile shape)
Bots to act as other players

Research
SIGNAL R (Web Sockets)
Socket.io

