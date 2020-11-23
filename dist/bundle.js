/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/form.js":
/*!*********************!*\
  !*** ./src/form.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const Fireworks = require("./../fireworks.js/script/fireworks")
var Form = /*#__PURE__*/function () {
  function Form() {
    _classCallCheck(this, Form);

    this.star = '✬';
  }

  _createClass(Form, [{
    key: "createRightSide",
    value: function createRightSide(root, score, totalPoints) {
      this.rightSide = document.createElement('div');
      this.rightSide.setAttribute("id", "right-side");
      scoreSide = document.createElement("div");
      scoreSide.setAttribute("id", "score");
      this.pStar = document.createElement("p");
      this.pStar.innerHTML = this.star;
      this.pStar.setAttribute("id", "star");
      this.pScore = document.createElement("p");
      this.pScore.innerHTML = "Your score : ".concat(score, " / ").concat(totalPoints);
      scoreSide.append(this.pStar);
      scoreSide.append(this.pScore);
      this.rightSide.append(scoreSide);
      root.append(this.rightSide);
    }
  }, {
    key: "showQuestion",
    value: function showQuestion() {
      this.form = document.createElement("form");
      this.form.setAttribute("id", "form-question");
      var questionTitle = document.createElement("h1");
      questionTitle.setAttribute("id", "question-title");
      questionTitle.innerHTML = "Guess the name of this country";
      this.input1 = document.createElement("input");
      this.input1.setAttribute("id", "fill-country");
      this.input1.setAttribute("type", "text");
      this.input1.setAttribute("placeholder", "Your answer here");
      this.input2 = document.createElement("input");
      this.input2.setAttribute("id", "enter");
      this.input2.setAttribute("type", "submit");
      this.input2.setAttribute("value", "Give it a try!");
      this.form.append(questionTitle);
      this.form.append(this.input1);
      this.form.append(this.input2);
      this.rightSide.appendChild(this.form);
    }
  }, {
    key: "tryAgain",
    value: function tryAgain(numTimesGuessed) {
      var _this = this;

      var h1 = document.createElement("h1");
      h1.setAttribute("id", "try-again");

      if (numTimesGuessed == 1) {
        h1.innerHTML = "Try again ... You still have ".concat(numTimesGuessed, " guess");
      } else {
        h1.innerHTML = "Try again ... You still have ".concat(numTimesGuessed, " guesses");
      }

      this.form.append(h1);
      this.input2.disabled = true;
      this.input1.disabled = true;
      setTimeout(function () {
        h1.remove();
        _this.input1.disabled = false;
        _this.input2.disabled = false;
      }, 1000);
    }
  }, {
    key: "createEncouragementSide",
    value: function createEncouragementSide(failedGuess) {
      var h1 = document.createElement("h1");
      h1.setAttribute("id", "last-encouragement");
      h1.innerHTML = "The country you were trying to guess is ".concat(failedGuess, ", remember it for next time!");
      this.form.append(h1);
      this.input2.disabled = true;
      this.input1.disabled = true;
    }
  }, {
    key: "updateScore",
    value: function updateScore(newScore, totalPoints) {
      var _this2 = this;

      this.score = document.getElementById('score');
      this.pScore.innerHTML = "Your score : ".concat(newScore, " / ").concat(totalPoints);
      this.pStar.style.fontSize = "20px";
      setTimeout(function () {
        return _this2.pStar.style.fontSize = "";
      }, 200);
    }
  }, {
    key: "levelWon",
    value: function levelWon() {
      createFirework(76, 184, 7, 4, null, null, null, null, false, true);
    }
  }]);

  return Form;
}();

module.exports = Form;

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Form = __webpack_require__(/*! ./form */ "./src/form.js");

var Game = /*#__PURE__*/function () {
  function Game(levelName, levelData) {
    var _this = this;

    _classCallCheck(this, Game);

    document.getElementById("main-menu").remove(); // setting levels and levelData as instance to be accessed elsewhere

    this.levelName = levelName;
    this.levelData = levelData;
    this.score = 0; // create canvas where Globe will be appended

    this.root = document.getElementById("root");
    this.root.style.display = "flex";
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "globe");
    document.getElementById("root").prepend(this.canvas); // to change later -- this is just for testing -- will need to be append later
    // setting globe properties

    this.projection = d3.geoOrthographic().precision(0.1);
    this.angles = {
      x: -20,
      y: 40,
      z: 0
    };
    this.lastTime = d3.now();
    this.degPerSec = 70;
    this.degPerMs = this.degPerSec / 1000; // 

    this.canvas = d3.select('#globe');
    this.context = this.canvas.node().getContext('2d');
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.water = {
      type: 'Sphere'
    };
    this.graticule = d3.geoGraticule10();
    this.colorWater = '#fff'; // this.colorWater = '#0066cc'

    this.colorLand = '#111'; // this.colorLand = '#9D5F38'

    this.colorGraticule = '#ccc';
    this.path = d3.geoPath(this.projection).context(this.context);
    this.scaleFactor = 0.9;
    this.colorCountry = '#0ff';
    this.radar = document.querySelector("#globe");
    this.radarContext = this.radar.getContext("2d"); // Loading land into globe

    var that = this;
    d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (data) {
      that.land = data.objects.land;
      that.landcoord = topojson.feature(data, that.land);
      that.countries = data.objects.countries;
      that.countriescoord = topojson.feature(data, that.countries);
    });
    setTimeout(function () {
      return _this.loadDataAndSelectCountry();
    }, 1000);
    this.numTimesGuessed = 3;
    this.instanceOfForm = new Form();
  }

  _createClass(Game, [{
    key: "drawEarthAndStartPlaying",
    value: function drawEarthAndStartPlaying() {
      this.drawEarth();
      this.play();
    }
  }, {
    key: "loadDataAndSelectCountry",
    value: function loadDataAndSelectCountry() {
      var that = this;
      d3.tsv(that.levelData, function (data1) {
        delete data1.columns;
        that.countryList = data1;
        that.selectCountry();
      });
      setTimeout(function () {
        return that.drawEarthAndStartPlaying();
      }, 1000);
    }
  }, {
    key: "selectCountry",
    value: function selectCountry() {
      var _this2 = this;

      this.countryListLength = this.countryList.length;
      this.countryIds = [];
      Object.values(this.countryList).forEach(function (country) {
        return _this2.countryIds.push(country.id);
      });
      var randomId = this.countryIds[Math.floor(Math.random() * this.countryIds.length)];
      this.polygon = this.countriescoord.features.find(function (el) {
        return el.id === randomId;
      });
      this.countrySelected = Object.values(this.countryList).find(function (el) {
        return el.id === randomId;
      });
      console.log(this.countrySelected.name);
    }
  }, {
    key: "drawEarth",
    value: function drawEarth() {
      this.projection.rotate();
      d3.geoPath(this.projection).context(d3.select('#globe').node().getContext('2d'));
      this.scale();
      this.render();
    }
  }, {
    key: "scale",
    value: function scale() {
      this.canvas.attr('width', this.width / 1.8).attr('height', this.height);
      this.projection.scale(this.scaleFactor * Math.min(this.width, this.height) / 2).translate([this.width / 3.5, this.height / 2]);
    }
  }, {
    key: "render",
    value: function render() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.fill(this.water, this.colorWater);
      this.stroke(this.graticule, this.colorGraticule);
      this.fill(this.landcoord, this.colorLand);
      this.radarContext.beginPath();
      this.radarContext.moveTo(435, 0);
      this.radarContext.lineTo(435, 1100);
      this.radarContext.strokeStyle = 'transparent';
      this.radarContext.stroke();
    }
  }, {
    key: "rotate",
    value: function rotate() {
      var that = this;
      var rotation;
      var now = d3.now();
      var diff = now - this.lastTime;
      rotation = this.projection.rotate();
      rotation[0] += diff * this.degPerMs;
      this.projection.rotate(rotation);
      this.centroid = this.path.centroid(this.polygon);
      this.centroid = [Math.floor(this.centroid[0]), this.centroid[1]]; // console.log(this.centroid)

      this.render(); // console.log(this.width / 5)
      // console.log(this.width / 5.3)

      this.lastTime = now;

      if (that.centroid && that.centroid[0] >= this.width / 5.3 && that.centroid[0] <= this.width / 5.1) {
        that.stopRotation();
        that.fill(that.polygon, that.colorCountry);
        that.instanceOfForm.showQuestion(); // debugger

        this.form = document.getElementsByTagName("form")[0];
        this.form.addEventListener("submit", function () {
          event.preventDefault();
          var possibleAnswer = document.getElementById("fill-country").value;
          that.checkAnswer(possibleAnswer);
        });
      }
    }
  }, {
    key: "fill",
    value: function fill(obj, color) {
      this.context.beginPath();
      this.path(obj);
      this.context.fillStyle = color;
      this.context.fill();
    }
  }, {
    key: "stroke",
    value: function stroke(obj, color) {
      this.context.beginPath();
      this.path(obj);
      this.context.strokeStyle = color;
      this.context.stroke();
    }
  }, {
    key: "closeQuestion",
    value: function closeQuestion() {
      var question = document.getElementsByClassName('question-shown')[0];
      question.className = 'question-hidden';
    }
  }, {
    key: "lastTryEncouragement",
    value: function lastTryEncouragement() {
      var _this3 = this;

      this.instanceOfForm.createEncouragementSide(this.countrySelected.name);
      setTimeout(function () {
        _this3.form.remove();

        _this3.selectCountry();

        _this3.startRotation();
      }, 5000);
    }
  }, {
    key: "checkAnswer",
    value: function checkAnswer(answer) {
      // debugger
      var that = this;

      if (this.numTimesGuessed !== 1 && answer !== this.countrySelected.name) {
        this.numTimesGuessed -= 1;
        this.instanceOfForm.tryAgain(this.numTimesGuessed);
      } else if (this.numTimesGuessed == 1) {
        this.lastTryEncouragement();
        this.numTimesGuessed = 3;
      }

      if (answer == this.countrySelected.name) {
        this.numTimesGuessed = 3;
        var audio = new Audio('./../dist/kids.wav');

        if (audio) {
          audio.play();
        }

        audio.play();
        this.score += 1;

        if (this.score == this.countryListLength) {
          this.instanceOfForm.levelWon();
        }

        this.instanceOfForm.updateScore(this.score, this.countryListLength);
        this.form.remove();
        that.countryIds = that.countryIds.filter(function (el) {
          return el !== that.countrySelected.id;
        });
        that.countryList = that.countryList.filter(function (el) {
          return el !== that.countrySelected;
        });
        that.randomId = that.countryIds[Math.floor(Math.random() * that.countryIds.length)];
        that.polygon = that.countriescoord.features.find(function (el) {
          return el.id === that.randomId;
        });
        that.countrySelected = Object.values(that.countryList).find(function (el) {
          return el.id === that.randomId;
        });
        console.log(that.countrySelected.name);
        this.startRotation();
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.instanceOfForm.createRightSide(root, this.score, this.countryListLength);
      var that = this;
      this.timer = d3.timer(function (elapsed) {
        that.rotate(elapsed);
      });
    }
  }, {
    key: "startRotation",
    value: function startRotation() {
      var that = this;
      this.timer = d3.timer(function (elapsed) {
        that.rotate(elapsed);
      });
    }
  }, {
    key: "stopRotation",
    value: function stopRotation() {
      this.timer.stop();
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// const Globe = require("./globe.js");
var Levels = __webpack_require__(/*! ./levels */ "./src/levels.js");

document.addEventListener("DOMContentLoaded", function () {
  // debugger
  new Levels(); // game = new Game()
});

/***/ }),

/***/ "./src/levels.js":
/*!***********************!*\
  !*** ./src/levels.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = __webpack_require__(/*! ./game.js */ "./src/game.js");

var Levels = /*#__PURE__*/function () {
  function Levels() {
    _classCallCheck(this, Levels);

    // debugger
    this.render();
  }

  _createClass(Levels, [{
    key: "render",
    value: function render() {
      // debugger
      var extremeLevel = 'https://gist.githubusercontent.com/linakherchi/279a80d6c30bd28654b3570554e03140/raw/2d898cf90669f915047c1c4a7f7d3fd88dc2fda5/Extreme';
      var hardLevel = 'https://gist.githubusercontent.com/linakherchi/c22e6dbf6bdc0ecd4d927b0b8833057d/raw/d352de2211c3866f21c094b66694af27f1dee45b/Hard';
      var mediumLevel = 'https://gist.githubusercontent.com/linakherchi/bb8cc8413204178dc7fd6300bc4bb806/raw/ee122907cea29433c4551d0a112855a417ede279/Medium';
      var easyLevel = 'https://gist.githubusercontent.com/linakherchi/0545583fbff6cb3a5beea4a82c6788f0/raw/8970dccebe4b5f9736d0bb37b52f3636642d3e1c/Easy';
      var div = document.createElement("div");
      div.setAttribute("id", "main-menu"); // const menuButtons = ["Easy", "Medium", "Hard", "Extreme", "How To Play"]

      var menuButtons = ["Easy", "Medium", "Hard", "Extreme"];
      menuButtons.forEach(function (button) {
        var buttonElement = document.createElement("button");
        buttonElement.setAttribute("id", "menu-button");
        buttonElement.innerHTML = button;

        if (button !== "How To Play") {
          buttonElement.addEventListener("click", function () {
            var downcaseLevel = button.toLowerCase(); // debugger

            new Game(button, eval(downcaseLevel + "Level"));
          });
        }

        div.append(buttonElement);
      });
      var root = document.getElementById("root");
      root.append(div);
    }
  }]);

  return Levels;
}();

module.exports = Levels;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map