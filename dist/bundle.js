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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Welcome = __webpack_require__(/*! ./menu.js */ "./src/menu.js");

var Levels = __webpack_require__(/*! ./levels.js */ "./src/levels.js"); // import { showQuestion } from './question'


var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    Welcome.setButtons(this);
    this.projection = d3.geoOrthographic().precision(0.1);
    this.angles = {
      x: -20,
      y: 40,
      z: 0
    };
    this.lastTime = d3.now();
    this.degPerSec = 40;
    this.degPerMs = this.degPerSec / 1000;
    this.canvas = d3.select('#globe');
    this.context = this.canvas.node().getContext('2d');
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.water = {
      type: 'Sphere'
    };
    this.graticule = d3.geoGraticule10();
    this.colorWater = '#fff';
    this.colorLand = '#111';
    this.colorGraticule = '#ccc';
    this.path = d3.geoPath(this.projection).context(this.context);
    this.scaleFactor = 0.9;
    this.colorCountry = '#0ff';
    this.radar = document.querySelector("#globe");
    this.radarContext = this.radar.getContext("2d");
    this.form = document.getElementById('form-question');
    this.form.onsubmit = this.submit.bind(this);
    var that = this;
    d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (data) {
      that.land = data.objects.land;
      that.landcoord = topojson.feature(data, that.land);
      that.countries = data.objects.countries;
      that.countriescoord = topojson.feature(data, that.countries);
    });
  }

  _createClass(Game, [{
    key: "scale",
    value: function scale() {
      // debugger
      this.canvas.attr('width', this.width).attr('height', this.height);
      this.projection.scale(this.scaleFactor * Math.min(this.width, this.height) / 2).translate([this.width / 3.5, this.height / 2]);
      this.render();
    }
  }, {
    key: "fill",
    value: function fill(obj, color) {
      this.context.beginPath();
      this.path(obj);
      this.context.fillStyle = color; // if (obj === this.polygon){
      //     this.context.shadowBlur = 10
      //     this.context.shadowColor = "black"
      // }

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
    key: "render",
    value: function render() {
      var land;
      var landcoord;
      this.context.clearRect(0, 0, this.width, this.height);
      this.fill(this.water, this.colorWater);
      this.stroke(this.graticule, this.colorGraticule);
      this.fill(this.landcoord, this.colorLand);
      this.radarContext.beginPath();
      this.radarContext.moveTo(435, 0);
      this.radarContext.lineTo(435, 1100);
      this.radarContext.strokeStyle = 'transparent';
      this.radarContext.stroke(); // debugger

      var projection = this.projection;
    }
  }, {
    key: "rotate",
    value: function rotate(elapsed) {
      var that = this;
      var rotation;
      var now = d3.now();
      var diff = now - this.lastTime;
      rotation = this.projection.rotate();
      rotation[0] += diff * this.degPerMs;
      this.projection.rotate(rotation);
      this.centroid = this.path.centroid(this.polygon);
      this.centroid = [Math.floor(this.centroid[0]), this.centroid[1]];
      this.render();
      this.lastTime = now;

      if (that.centroid && that.centroid[0] === 435 || that.centroid && that.centroid[0] === 434 || that.centroid && that.centroid[0] === 436) {
        that.stopRotation();
        that.fill(that.polygon, that.colorCountry);
        that.showQuestion();
      }
    }
  }, {
    key: "setAngles",
    value: function setAngles() {
      var rotation = this.projection.rotate();
      rotation[0] = this.angles.y;
      rotation[1] = this.angles.x;
      rotation[2] = this.angles.z;
      this.projection.rotate(rotation);
    }
  }, {
    key: "closeQuestion",
    value: function closeQuestion() {
      var question = document.getElementsByClassName('question-shown')[0];
      question.className = 'question-hidden';
    }
  }, {
    key: "showQuestion",
    value: function showQuestion() {
      var question = document.getElementsByClassName('question-hidden')[0];
      question.className = 'question-shown';
    }
  }, {
    key: "drawEarth",
    value: function drawEarth() {
      this.setAngles();
      d3.geoPath(this.projection).context(d3.select('#globe').node().getContext('2d'));
      this.scale();
      this.render();
    }
  }, {
    key: "submit",
    value: function submit(e) {
      e.preventDefault();
      this.answer = e.target[0].value;
      this.checkAnswer(this.answer);
    }
  }, {
    key: "checkAnswer",
    value: function checkAnswer(answer) {
      var that = this;

      if (answer === this.countrySelected.name) {
        var audio = new Audio('kids.wav');
        audio.play();
        that.score++;
        document.getElementById('your-score').innerHTML = 'Your score :' + that.score + '/' + that.countryListLength;
        that.form.reset();
        this.closeQuestion();
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
      } else {
        document.getElementsByClassName('try-again-hidden')[0].className = 'try-again'; //    {document.getElementsByClassName('try-again-hidden')[0].className ='try-again'}, 3000)

        setTimeout(function () {
          document.getElementsByClassName('try-again')[0].className = 'try-again-hidden';
        }, 3000);
      }
    }
  }, {
    key: "start",
    value: function start(difficulty) {
      var star = document.getElementsByClassName('fas fa-star-hidden')[0];
      star.className = "fas fa-star";
      var that = this;
      this.score = 0;
      var level = d3.tsv(Levels[difficulty].tsv, function (data1) {
        that.countryList = data1;

        if (that.countryList) {
          that.countryListLength = that.countryList.length;
          that.countryIds = [];
          Object.values(that.countryList).forEach(function (country) {
            return that.countryIds.push(country.id);
          });
          that.countryIds.pop();
          var randomId = that.countryIds[Math.floor(Math.random() * that.countryIds.length)];
          that.polygon = that.countriescoord.features.find(function (el) {
            return el.id === randomId;
          });
          that.countrySelected = Object.values(that.countryList).find(function (el) {
            return el.id === randomId;
          });
          console.log(that.countrySelected.name);
          document.getElementById('your-score').innerHTML = 'Your score:' + that.score + '/' + that.countryListLength;
        }
      });
      this.drawEarth();
      this.play();
    }
  }, {
    key: "play",
    value: function play() {
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

/***/ "./src/globe.js":
/*!**********************!*\
  !*** ./src/globe.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Levels = __webpack_require__(/*! ./levels.js */ "./src/levels.js"); // Configuration
//
// ms to wait after dragging before auto-rotating


var rotationDelay = 3000; // scale of the globe (not the canvas element)

var scaleFactor = 0.9; // autorotation speed

var degPerSec = 6; // start angles

var angles = {
  x: -20,
  y: 40,
  z: 0
}; // colors

var colorWater = '#fff';
var colorLand = '#111';
var colorGraticule = '#ccc';
var colorCountry = '#a00'; //
// Handler
//

function enter(country) {
  // debugger
  var country = countryList.find(function (c) {
    return c.id === country.id;
  });
  current.text(country && country.name || '');
}

function leave(country) {
  current.text('');
} //
// Variables
//


var current = d3.select('#current');
var canvas = d3.select('#globe');
var context = canvas.node().getContext('2d');
var water = {
  type: 'Sphere'
};
var projection = d3.geoOrthographic().precision(0.1);
var graticule = d3.geoGraticule10();
var path = d3.geoPath(projection).context(context);
var v0; // Mouse position in Cartesian coordinates at start of drag gesture.

var r0; // Projection rotation as Euler angles at start.

var q0; // Projection rotation as versor at start.

var lastTime = d3.now();
var degPerMs = degPerSec / 1000;
var width, height;
var land, countries;
var countryList;
var autorotate, now, diff, roation;
var currentCountry; //
// Functions
//

function setAngles() {
  var rotation = projection.rotate();
  rotation[0] = angles.y;
  rotation[1] = angles.x;
  rotation[2] = angles.z;
  projection.rotate(rotation);
}

function scale() {
  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;
  canvas.attr('width', width).attr('height', height);
  projection.scale(scaleFactor * Math.min(width, height) / 2).translate([width / 2, height / 2]);
  render();
}

function startRotation(delay) {
  autorotate.restart(rotate, delay || 0);
}

function stopRotation() {
  autorotate.stop();
}

function dragstarted() {
  v0 = versor.cartesian(projection.invert(d3.mouse(this)));
  r0 = projection.rotate();
  q0 = versor(r0);
  stopRotation();
}

function dragged() {
  var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)));
  var q1 = versor.multiply(q0, versor.delta(v0, v1));
  var r1 = versor.rotation(q1);
  projection.rotate(r1);
  render();
}

function dragended() {
  startRotation(rotationDelay);
}

function render() {
  context.clearRect(0, 0, width, height);
  fill(water, colorWater);
  stroke(graticule, colorGraticule);
  fill(land, colorLand);

  if (currentCountry) {
    fill(currentCountry, colorCountry);
  }
}

function fill(obj, color) {
  context.beginPath();
  path(obj);
  context.fillStyle = color;
  context.fill();
}

function stroke(obj, color) {
  context.beginPath();
  path(obj);
  context.strokeStyle = color;
  context.stroke();
}

function rotate(elapsed) {
  now = d3.now();
  diff = now - lastTime;

  if (diff < elapsed) {
    rotation = projection.rotate();
    rotation[0] += diff * degPerMs;
    projection.rotate(rotation);
    render();
  }

  lastTime = now;
} // https://github.com/d3/d3-polygon


function polygonContains(polygon, point) {
  var n = polygon.length;
  var p = polygon[n - 1];
  var x = point[0],
      y = point[1];
  var x0 = p[0],
      y0 = p[1];
  var x1, y1;
  var inside = false;

  for (var i = 0; i < n; ++i) {
    p = polygon[i], x1 = p[0], y1 = p[1];
    if (y1 > y !== y0 > y && x < (x0 - x1) * (y - y1) / (y0 - y1) + x1) inside = !inside;
    x0 = x1, y0 = y1;
  }

  return inside;
} // function mousemove() {
//     var c = getCountry(this)
//     if (!c) {
//         if (currentCountry) {
//             leave(currentCountry)
//             currentCountry = undefined
//             render()
//         }
//         return
//     }
//     if (c === currentCountry) {
//         return
//     }
//     currentCountry = c
//     render()
//     enter(c)
// }
// function getCountry(event) {
//     var pos = projection.invert(d3.mouse(event))
//     return countries.features.find(function (f) {
//         return f.geometry.coordinates.find(function (c1) {
//             return polygonContains(c1, pos) || c1.find(function (c2) {
//                 return polygonContains(c2, pos)
//             })
//         })
//     })
// }
//
// Initialization
//


setAngles(); // canvas
//     .call(d3.drag()
//         .on('start', dragstarted)
//         .on('drag', dragged)
//         .on('end', dragended)
//     )
//     .on('mousemove', mousemove)

function loadData(cb) {
  // debugger
  d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (error, world) {
    if (error) throw error;
    var land = topojson.feature(world, world.objects.land);
    d3.tsv('https://gist.githubusercontent.com/linakherchi/641dd07aec8f7679a08f3d61f1181249/raw/040a63d20539644f136c19667b27dad3f9e56669/capitals%2520and%2520levels', function (error, countries) {
      if (error) throw error;
      var countries1 = topojson.feature(world, world.objects.countries); // debugger
      // cb(world, countries)
    });
  });
}

loadData(function (world, cList) {
  // debugger
  land = topojson.feature(world, world.objects.land);
  countries = topojson.feature(world, world.objects.countries);
  countryList = cList;
  window.addEventListener('resize', scale);
  scale();
  autorotate = d3.timer(rotate);
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Globe = __webpack_require__(/*! ./globe.js */ "./src/globe.js");

var Game = __webpack_require__(/*! ./game.js */ "./src/game.js");

var Levels = __webpack_require__(/*! ./levels */ "./src/levels.js");

window.Game = Game;
document.addEventListener("DOMContentLoaded", function () {// game = new Game()
});

/***/ }),

/***/ "./src/levels.js":
/*!***********************!*\
  !*** ./src/levels.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Levels = /*#__PURE__*/function () {
  function Levels() {
    _classCallCheck(this, Levels);

    this.extremeLevel = {
      tsv: 'https://gist.githubusercontent.com/linakherchi/279a80d6c30bd28654b3570554e03140/raw/2d898cf90669f915047c1c4a7f7d3fd88dc2fda5/Extreme'
    };
    this.hardLevel = {
      tsv: 'https://gist.githubusercontent.com/linakherchi/c22e6dbf6bdc0ecd4d927b0b8833057d/raw/d352de2211c3866f21c094b66694af27f1dee45b/Hard'
    };
    this.mediumLevel = {
      tsv: 'https://gist.githubusercontent.com/linakherchi/bb8cc8413204178dc7fd6300bc4bb806/raw/06ca7a9d901b72516ec2862761fc363a6627c4f1/Medium'
    };
    this.easyLevel = {
      tsv: 'https://gist.githubusercontent.com/linakherchi/0545583fbff6cb3a5beea4a82c6788f0/raw/234af1e606561222c652072a1ac087e396eb0fc6/Easy'
    };
    this.render();
  }

  _createClass(Levels, [{
    key: "render",
    value: function render() {
      var root = document.getElementById("root");
    }
  }]);

  return Levels;
}();

module.exports = Levels;

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

var closeMainMenu = function closeMainMenu() {
  var mainMenu = document.getElementsByClassName('main-menu')[0]; // debugger

  mainMenu.className = 'main-menu-close';
};

var openMainMenu = function openMainMenu() {
  var mainMenu = document.getElementsByClassName('main-menu-close')[0]; // debugger

  mainMenu.className = 'main-menu';
};

var openAbout = function openAbout() {
  var about = document.getElementsByClassName('about-section-hidden')[0];
  about.className = 'about-section';
};

var closeAbout = function closeAbout() {
  var about = document.getElementsByClassName('about-section')[0];
  about.className = 'about-section-hidden';
};

var Welcome = {
  setButtons: function setButtons() {
    // debugger
    // var audio = new Audio('menu.wav')
    var easyButton = document.getElementById("easy-button"); // $('#easy-button').mouseenter(function(){audio.play()})

    var mediumButton = document.getElementById("medium-button");
    var hardButton = document.getElementById("hard-button");
    var extremeButton = document.getElementById("extreme-button");
    var aboutButton = document.getElementById("how-to-play-button");
    var goBack = document.getElementById('go-back');
    easyButton.addEventListener('click', function (e) {
      closeMainMenu();
      setTimeout(function () {
        return game.start('Easy');
      }, 200);
    });
    mediumButton.addEventListener('click', function (e) {
      closeMainMenu();
      setTimeout(function () {
        return game.start('Medium');
      }, 200);
    });
    hardButton.addEventListener('click', function (e) {
      closeMainMenu();
      setTimeout(function () {
        return game.start('Hard');
      }, 200);
    });
    extremeButton.addEventListener('click', function (e) {
      closeMainMenu();
      setTimeout(function () {
        return game.start('Extreme');
      }, 200);
    });
    aboutButton.addEventListener('click', function (e) {
      closeMainMenu();
      openAbout();
    });
    goBack.addEventListener('click', function (e) {
      closeAbout();
      openMainMenu();
    });
  },
  closeMainMenu: closeMainMenu
};
module.exports = Welcome;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map