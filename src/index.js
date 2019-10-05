const Globe = require("./globe.js");
const Game = require("./game.js");
const Menu = require("./menu.js");
window.Game = Game 
window.Globe = Globe;

document.addEventListener("DOMContentLoaded", function () {
    // const canvasEl = document.getElementById("globe");
    // const ctx = canvasEl.getContext("2d");
    // const globe = new Globe();
    // new GameView(game, ctx).start();
    game = new Game()
});