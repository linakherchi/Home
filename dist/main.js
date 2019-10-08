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

eval("\nconst Welcome = __webpack_require__(/*! ./menu.js */ \"./src/menu.js\");\nconst Levels = __webpack_require__(/*! ./levels.js */ \"./src/levels.js\");\n// import { showQuestion } from './question'\n\nclass Game {\n    constructor() {\n        \n        Welcome.setButtons(this);\n        this.projection = d3.geoOrthographic().precision(0.1)\n        this.angles = { x: -20, y: 40, z: 0 }\n        this.lastTime = d3.now()\n        this.degPerSec = 40\n        this.degPerMs = this.degPerSec / 1000\n        this.canvas = d3.select('#globe')\n        this.context = this.canvas.node().getContext('2d')\n        this.width = document.documentElement.clientWidth\n        this.height = document.documentElement.clientHeight\n        this.water = { type: 'Sphere' }\n        this.graticule = d3.geoGraticule10()\n        this.colorWater = '#fff'\n        this.colorLand = '#111'\n        this.colorGraticule = '#ccc'\n        this.path = d3.geoPath(this.projection).context(this.context)\n        this.scaleFactor = 0.9\n        this.colorCountry = '#0ff';\n        this.radar = document.querySelector(\"#globe\")\n        this.radarContext = this.radar.getContext(\"2d\")\n        this.form = document.getElementById('form-question')\n        this.form.onsubmit = this.submit.bind(this)\n        let that = this\n        d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (data) {\n            that.land = data.objects.land\n            that.landcoord = topojson.feature(data, that.land) \n            that.countries = data.objects.countries\n            that.countriescoord = topojson.feature(data, that.countries)\n        })\n        \n        \n     \n    }\n    \n    scale() {\n        // debugger\n        this.canvas.attr('width', this.width).attr('height', this.height)\n        this.projection\n            .scale((this.scaleFactor * Math.min(this.width, this.height)) / 2)\n            .translate([this.width / 3.5, this.height / 2])\n        this.render()\n    }\n\n    fill(obj, color) {\n        this.context.beginPath()\n        this.path(obj)\n        this.context.fillStyle = color\n        // if (obj === this.polygon){\n        //     this.context.shadowBlur = 10\n        //     this.context.shadowColor = \"black\"\n        // }\n        this.context.fill()\n    }\n    \n    stroke(obj, color) {\n        this.context.beginPath()\n        this.path(obj)\n        this.context.strokeStyle = color\n        this.context.stroke()\n    }\n\n    \n    \n    \n    \n    render() { \n        let land;\n        let landcoord;\n        this.context.clearRect(0, 0, this.width, this.height)\n        this.fill(this.water, this.colorWater)\n        this.stroke(this.graticule, this.colorGraticule)\n        this.fill(this.landcoord, this.colorLand)     \n        this.radarContext.beginPath();\n        this.radarContext.moveTo(435, 0);\n        this.radarContext.lineTo(435, 1100);\n        this.radarContext.strokeStyle = 'transparent'\n        this.radarContext.stroke();\n        // debugger\n        var projection = this.projection\n    }\n\n    \n    \n    rotate(elapsed) {\n        \n        let that = this\n        let rotation;\n        let now = d3.now()\n        let diff = now - this.lastTime\n        rotation = this.projection.rotate()\n        rotation[0] += diff * this.degPerMs\n        this.projection.rotate(rotation)\n        this.centroid = this.path.centroid(this.polygon)\n        this.centroid = [Math.floor(this.centroid[0]), this.centroid[1]]\n  \n        this.render()\n        \n        this.lastTime = now\n        if ((that.centroid && that.centroid[0] === 435) || (that.centroid && that.centroid[0] === 434) || (that.centroid && that.centroid[0] === 436)) {\n                    that.stopRotation()\n                    \n                    that.fill(that.polygon, that.colorCountry)\n                 \n                    that.showQuestion()\n                }\n    }\n\n    setAngles() {\n    var rotation = this.projection.rotate()\n    rotation[0] = this.angles.y\n    rotation[1] = this.angles.x\n    rotation[2] = this.angles.z\n    this.projection.rotate(rotation)\n    }\n\n\n    closeQuestion(){\n        const question = document.getElementsByClassName('question-shown')[0];\n        question.className = 'question-hidden';\n    }\n\n    showQuestion(){\n        const question = document.getElementsByClassName('question-hidden')[0];\n        question.className = 'question-shown';\n    };\n\n    drawEarth(){\n        this.setAngles()\n        d3.geoPath(this.projection).context(d3.select('#globe').node().getContext('2d'))\n        this.scale()\n        this.render()\n    }\n\n  \n\n    submit(e) {\n        e.preventDefault()\n        this.answer = e.target[0].value\n         this.checkAnswer(this.answer)\n    }\n\n    checkAnswer(answer){\n        \n        let that = this\n        if (answer === this.countrySelected.name){\n            var audio = new Audio('kids.wav');\n            audio.play();\n            that.score ++ \n\n            document.getElementById('your-score').innerHTML = 'Your score :' + that.score + '/' + that.countryListLength \n            that.form.reset()\n            this.closeQuestion()\n            that.countryIds = that.countryIds.filter(function(el){return el !== that.countrySelected.id})\n            that.countryList = that.countryList.filter(function (el) { return el !== that.countrySelected })\n            that.randomId = that.countryIds[Math.floor(Math.random() * that.countryIds.length)]\n            that.polygon = that.countriescoord.features.find(function (el) { return el.id === that.randomId }) \n            that.countrySelected = Object.values(that.countryList).find(function (el) { return el.id === that.randomId })\n            console.log(that.countrySelected.name)\n            this.startRotation()\n        }else {\n            document.getElementsByClassName('try-again-hidden')[0].className = 'try-again' \n        //    {document.getElementsByClassName('try-again-hidden')[0].className ='try-again'}, 3000)\n    setTimeout(function() { \n            (document.getElementsByClassName('try-again')[0]).className = 'try-again-hidden'}, 3000)}\n        \n    }\n    \n    start(difficulty){\n        let star = document.getElementsByClassName('fas fa-star-hidden')[0];\n        star.className =\"fas fa-star\"\n        let that = this;\n       this.score = 0\n       \n        let level = d3.tsv(Levels[difficulty].tsv, function(data1){\n            that.countryList = data1\n            \n            if (that.countryList){\n                that.countryListLength = that.countryList.length\n                that.countryIds = [];\n                Object.values(that.countryList).forEach(country => that.countryIds.push(country.id))\n                that.countryIds.pop()\n                var randomId = that.countryIds[Math.floor(Math.random() * that.countryIds.length)];\n                that.polygon = that.countriescoord.features.find(function (el) { return el.id === randomId }) \n                that.countrySelected = Object.values(that.countryList).find(function (el){return el.id === randomId})\n                console.log(that.countrySelected.name)\n                document.getElementById('your-score').innerHTML = 'Your score:' + that.score + '/' + that.countryListLength\n            }\n        })\n        this.drawEarth()\n        this.play()\n   \n        \n        \n    }\n    \n    play(){\n        let that = this;\n        this.timer = d3.timer(function(elapsed){that.rotate(elapsed)}) \n    }  \n\n\n    startRotation() {\n        let that = this\n        this.timer = d3.timer(function (elapsed) { that.rotate(elapsed) })\n    }\n\n    stopRotation() {\n        this.timer.stop()\n    }\n}\n\n\n\n\n\n\n\n\n\nmodule.exports = Game\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/globe.js":
/*!**********************!*\
  !*** ./src/globe.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Levels = __webpack_require__(/*! ./levels.js */ \"./src/levels.js\");\n// Configuration\n//\n\n// ms to wait after dragging before auto-rotating\nvar rotationDelay = 3000\n// scale of the globe (not the canvas element)\nvar scaleFactor = 0.9\n// autorotation speed\nvar degPerSec = 6\n// start angles\nvar angles = { x: -20, y: 40, z: 0 }\n// colors\nvar colorWater = '#fff'\nvar colorLand = '#111'\nvar colorGraticule = '#ccc'\nvar colorCountry = '#a00'\n\n\n//\n// Handler\n//\n\nfunction enter(country) {\n    // debugger\n    var country = countryList.find(function (c) {\n        return c.id === country.id\n    })\n    current.text(country && country.name || '')\n}\n\nfunction leave(country) {\n    current.text('')\n}\n\n//\n// Variables\n//\n\nvar current = d3.select('#current')\nvar canvas = d3.select('#globe')\nvar context = canvas.node().getContext('2d')\nvar water = { type: 'Sphere' }\nvar projection = d3.geoOrthographic().precision(0.1)\nvar graticule = d3.geoGraticule10()\nvar path = d3.geoPath(projection).context(context)\nvar v0 // Mouse position in Cartesian coordinates at start of drag gesture.\nvar r0 // Projection rotation as Euler angles at start.\nvar q0 // Projection rotation as versor at start.\nvar lastTime = d3.now()\nvar degPerMs = degPerSec / 1000\nvar width, height\nvar land, countries\nvar countryList\nvar autorotate, now, diff, roation\nvar currentCountry\n\n//\n// Functions\n//\n\nfunction setAngles() {\n    var rotation = projection.rotate()\n    rotation[0] = angles.y\n    rotation[1] = angles.x\n    rotation[2] = angles.z\n    projection.rotate(rotation)\n}\n\nfunction scale() {\n    width = document.documentElement.clientWidth\n    height = document.documentElement.clientHeight\n    canvas.attr('width', width).attr('height', height)\n    projection\n        .scale((scaleFactor * Math.min(width, height)) / 2)\n        .translate([width / 2, height / 2])\n    render()\n}\n\nfunction startRotation(delay) {\n    autorotate.restart(rotate, delay || 0)\n}\n\nfunction stopRotation() {\n    autorotate.stop()\n}\n\nfunction dragstarted() {\n    v0 = versor.cartesian(projection.invert(d3.mouse(this)))\n    r0 = projection.rotate()\n    q0 = versor(r0)\n    stopRotation()\n}\n\nfunction dragged() {\n    var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))\n    var q1 = versor.multiply(q0, versor.delta(v0, v1))\n    var r1 = versor.rotation(q1)\n    projection.rotate(r1)\n    render()\n}\n\nfunction dragended() {\n    startRotation(rotationDelay)\n}\n\nfunction render() {\n    context.clearRect(0, 0, width, height)\n    fill(water, colorWater)\n    stroke(graticule, colorGraticule)\n    fill(land, colorLand)\n    if (currentCountry) {\n        fill(currentCountry, colorCountry)\n    }\n}\n\nfunction fill(obj, color) {\n    context.beginPath()\n    path(obj)\n    context.fillStyle = color\n    context.fill()\n}\n\nfunction stroke(obj, color) {\n    context.beginPath()\n    path(obj)\n    context.strokeStyle = color\n    context.stroke()\n}\n\nfunction rotate(elapsed) {\n    now = d3.now()\n    diff = now - lastTime\n    if (diff < elapsed) {\n        rotation = projection.rotate()\n        rotation[0] += diff * degPerMs\n        projection.rotate(rotation)\n        render()\n    }\n    lastTime = now\n}\n\n\n\n// https://github.com/d3/d3-polygon\nfunction polygonContains(polygon, point) {\n    var n = polygon.length\n    var p = polygon[n - 1]\n    var x = point[0], y = point[1]\n    var x0 = p[0], y0 = p[1]\n    var x1, y1\n    var inside = false\n    for (var i = 0; i < n; ++i) {\n        p = polygon[i], x1 = p[0], y1 = p[1]\n        if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside\n        x0 = x1, y0 = y1\n    }\n    return inside\n}\n\n// function mousemove() {\n//     var c = getCountry(this)\n//     if (!c) {\n//         if (currentCountry) {\n//             leave(currentCountry)\n//             currentCountry = undefined\n//             render()\n//         }\n//         return\n//     }\n//     if (c === currentCountry) {\n//         return\n//     }\n//     currentCountry = c\n//     render()\n//     enter(c)\n// }\n\n// function getCountry(event) {\n//     var pos = projection.invert(d3.mouse(event))\n//     return countries.features.find(function (f) {\n//         return f.geometry.coordinates.find(function (c1) {\n//             return polygonContains(c1, pos) || c1.find(function (c2) {\n//                 return polygonContains(c2, pos)\n//             })\n//         })\n//     })\n// }\n\n\n//\n// Initialization\n//\n\nsetAngles()\n\n// canvas\n//     .call(d3.drag()\n//         .on('start', dragstarted)\n//         .on('drag', dragged)\n//         .on('end', dragended)\n//     )\n//     .on('mousemove', mousemove)\n\n\nfunction loadData(cb) {\n    // debugger\n    d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (error, world) {\n        if (error) throw error\n        let land = topojson.feature(world, world.objects.land)\n        d3.tsv('https://gist.githubusercontent.com/linakherchi/641dd07aec8f7679a08f3d61f1181249/raw/040a63d20539644f136c19667b27dad3f9e56669/capitals%2520and%2520levels', function (error, countries) {\n            if (error) throw error\n            let countries1 = topojson.feature(world, world.objects.countries)\n            // debugger\n            // cb(world, countries)\n        })\n    })\n}\n\n\nloadData(function (world, cList) {\n    // debugger\n    land = topojson.feature(world, world.objects.land)\n    countries = topojson.feature(world, world.objects.countries)\n    countryList = cList\n\n    window.addEventListener('resize', scale)\n    scale()\n    autorotate = d3.timer(rotate)\n}\n)\n\n\n\n\n\n//# sourceURL=webpack:///./src/globe.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Globe = __webpack_require__(/*! ./globe.js */ \"./src/globe.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Menu = __webpack_require__(/*! ./menu.js */ \"./src/menu.js\");\nwindow.Game = Game \nwindow.Globe = Globe;\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    // const canvasEl = document.getElementById(\"globe\");\n    // const ctx = canvasEl.getContext(\"2d\");\n    // const globe = new Globe();\n    // new GameView(game, ctx).start();\n    game = new Game()\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/levels.js":
/*!***********************!*\
  !*** ./src/levels.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// debugger\nconst Levels = {\n    'Extreme': {\n        tsv: 'https://gist.githubusercontent.com/linakherchi/279a80d6c30bd28654b3570554e03140/raw/2d898cf90669f915047c1c4a7f7d3fd88dc2fda5/Extreme'\n    },\n    'Hard': {\n        tsv:'https://gist.githubusercontent.com/linakherchi/c22e6dbf6bdc0ecd4d927b0b8833057d/raw/d352de2211c3866f21c094b66694af27f1dee45b/Hard'\n    },\n    'Medium': {\n        tsv:'https://gist.githubusercontent.com/linakherchi/bb8cc8413204178dc7fd6300bc4bb806/raw/06ca7a9d901b72516ec2862761fc363a6627c4f1/Medium'\n    },\n    'Easy': {\n        tsv:'https://gist.githubusercontent.com/linakherchi/0545583fbff6cb3a5beea4a82c6788f0/raw/234af1e606561222c652072a1ac087e396eb0fc6/Easy'\n    }\n};\n\nmodule.exports = Levels;\n\n//# sourceURL=webpack:///./src/levels.js?");

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const closeMainMenu = () => {\n    const mainMenu = document.getElementsByClassName('main-menu')[0];\n    // debugger\n    mainMenu.className = 'main-menu-close';\n};\n\n\n\nconst Welcome = {\n    setButtons(){\n        // debugger\n        // var audio = new Audio('menu.wav')\n        const easyButton = document.getElementById(\"easy-button\")\n        // $('#easy-button').mouseenter(function(){audio.play()})\n        const mediumButton = document.getElementById(\"medium-button\")\n        const hardButton = document.getElementById(\"hard-button\")\n        const extremeButton = document.getElementById(\"extreme-button\")\n        const aboutButton = document.getElementById(\"how-to-play-button\")\n\n        easyButton.addEventListener('click', (e) => {\n            closeMainMenu();\n            setTimeout(() => game.start('Easy'), 200);\n        }\n        );\n\n        mediumButton.addEventListener('click', (e) => {\n            closeMainMenu();\n            setTimeout(() => game.start('Medium'), 200);\n        }\n        );\n\n        hardButton.addEventListener('click', (e) => {\n            closeMainMenu();\n            setTimeout(() => game.start('Hard'), 200);\n        }\n        );\n\n        extremeButton.addEventListener('click', (e) => {\n            closeMainMenu();\n            setTimeout(() => game.start('Extreme'), 200);\n        })\n    },\n    \n    closeMainMenu: closeMainMenu\n}\n\nmodule.exports = Welcome;\n\n//# sourceURL=webpack:///./src/menu.js?");

/***/ })

/******/ });