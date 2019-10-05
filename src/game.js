


const Welcome = require("./menu.js");
const Levels = require("./levels.js");
// import { showQuestion } from './question'

class Game {
    constructor() {
        
        Welcome.setButtons(this);
        this.projection = d3.geoOrthographic().precision(0.1)
        this.angles = { x: -20, y: 40, z: 0 }
        this.lastTime = d3.now()
        this.degPerSec = 20
        this.degPerMs = this.degPerSec / 1000
        this.canvas = d3.select('#globe')
        this.context = this.canvas.node().getContext('2d')
        this.width = document.documentElement.clientWidth
        this.height = document.documentElement.clientHeight
        this.water = { type: 'Sphere' }
        this.graticule = d3.geoGraticule10()
        this.colorWater = '#fff'
        this.colorLand = '#111'
        this.colorGraticule = '#ccc'
        this.path = d3.geoPath(this.projection).context(this.context)
        this.scaleFactor = 0.9
        this.colorCountry = '#00FFFF';
        this.radar = document.querySelector("#globe")
        this.radarContext = this.radar.getContext("2d")
        this.form = document.getElementById('form-question')
        this.form.onsubmit = this.submit.bind(this)
        let that = this
        d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (data) {
            that.land = data.objects.land
            that.landcoord = topojson.feature(data, that.land) 
            that.countries = data.objects.countries
            that.countriescoord = topojson.feature(data, that.countries)
        })
    }
    
    scale() {
        this.canvas.attr('width', this.width).attr('height', this.height)
        this.projection
            .scale((this.scaleFactor * Math.min(this.width, this.height)) / 2)
            .translate([this.width / 2, this.height / 2])
        this.render()
    }

    fill(obj, color) {
        this.context.beginPath()
        this.path(obj)
        this.context.fillStyle = color
        this.context.fill()
    }
    
    stroke(obj, color) {
        this.context.beginPath()
        this.path(obj)
        this.context.strokeStyle = color
        this.context.stroke()
    }

    
    
    
    
    render() { 
        let land;
        let landcoord;
        this.context.clearRect(0, 0, this.width, this.height)
        this.fill(this.water, this.colorWater)
        this.stroke(this.graticule, this.colorGraticule)
        this.fill(this.landcoord, this.colorLand)     
        this.radarContext.beginPath();
        this.radarContext.moveTo(435, 0);
        this.radarContext.lineTo(435, 1100);
        this.radarContext.strokeStyle = 'transparent'
        this.radarContext.stroke();
    }
    
    rotate(elapsed) {
        let rotation;
        let now = d3.now()
        let diff = now - this.lastTime
        if (diff < elapsed) {

        rotation = this.projection.rotate()
        rotation[0] += diff * this.degPerMs
        this.projection.rotate(rotation)
        this.centroid = this.path.centroid(this.polygon)
        this.centroid = [Math.floor(this.centroid[0]), this.centroid[1]]
    }
        this.render()
        this.lastTime = now
    }

    setAngles() {
    var rotation = this.projection.rotate()
    rotation[0] = this.angles.y
    rotation[1] = this.angles.x
    rotation[2] = this.angles.z
    this.projection.rotate(rotation)
    }


    
    showQuestion(){
        
        const question = document.getElementsByClassName('question-hidden')[0];
        question.className = 'question-shown';
    };

    drawEarth(){
        this.setAngles()
        d3.geoPath(this.projection).context(d3.select('#globe').node().getContext('2d'))
        this.scale()
        this.render()
    }

  

    submit(e) {
        e.preventDefault()
        this.answer = e.target[0].value
         this.checkAnswer(this.answer)
    }

    checkAnswer(answer){
        if (answer === this.countrySelected.name){
            console.log('You got it')
            this.form.reset()
            // this.timer.restart()
            // let that = this
            // this.timer = d3.timer(function (elapsed) {
            //     that.rotate(elapsed)
            //     if (that.centroid && that.centroid[0] === 435) {
            //         that.timer.stop()
            //         that.fill(that.polygon, that.colorCountry)
            //         that.showQuestion()
            //     }
            // })
            return true
        }
    }

    start(difficulty){
        let that = this;
        let score = 0;
        let counter;
        let level = d3.tsv(Levels[difficulty].tsv, function(data1){
            that.countryList = data1
            counter = that.countryList.length;
            if (that.countryList){
                const countryIds = [];
                Object.values(that.countryList).forEach(country => countryIds.push(country.id))
                countryIds.pop()
                var randomId = countryIds[Math.floor(Math.random() * countryIds.length)];
                that.polygon = that.countriescoord.features.find(function (el) { return el.id === randomId }) 
                that.countrySelected = Object.values(that.countryList).find(function (el){return el.id === randomId})
           
                console.log(that.countrySelected.name)
            }
        })
        
        this.drawEarth()
        
        
            this.timer = d3.timer(function(elapsed){ 
                that.rotate(elapsed)
                    if (that.centroid && that.centroid[0] === 435)
                        {that.timer.stop()
                        that.fill(that.polygon, that.colorCountry)
                        that.showQuestion()}
            })
        
        //  if (that.checkAnswer(that.answer) === true){
        //                 score++ 
        //             }
    }
}



    

 

    //     // loop
    //     // counter
    //     // Keep track of countries asked







module.exports = Game