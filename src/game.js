

class Game {
    constructor(levelName, levelData) {
        document.getElementById("main-menu").remove()
        // setting levels and levelData as instance to be accessed elsewhere
        this.levelName = levelName
        this.levelData = levelData
        this.score = 0
        // create canvas where Globe will be appended
        this.canvas = document.createElement("canvas")
        this.canvas.setAttribute("id", "globe")
        document.getElementById("root").append(this.canvas)
        // setting globe properties
        this.projection = d3.geoOrthographic().precision(0.1)
        this.angles = { x: -20, y: 40, z: 0 }
        this.lastTime = d3.now()
        this.degPerSec = 40
        this.degPerMs = this.degPerSec / 1000
        // 
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
        this.colorCountry = '#0ff';
        this.radar = document.querySelector("#globe")
        this.radarContext = this.radar.getContext("2d")
        // const form = document.createElement("form").setAttribute("id", "form-question")
        // document.getElementById("root").append(form)
        // this.form = document.getElementById('form-question')
        // this.form.onsubmit = this.submit.bind(this)

        // Loading land into globe
        let that = this
        // debugger
        d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (data) {
            // debugger
            that.land = data.objects.land
            that.landcoord = topojson.feature(data, that.land) 
            that.countries = data.objects.countries
            that.countriescoord = topojson.feature(data, that.countries)
            // debugger
            
        })
        setTimeout(() => this.loadDataAndSelectCountry(), 1000)

        
        
     
    }

        
    loadDataAndSelectCountry(){
        // debugger
        // let star = document.getElementsByClassName('fas fa-star-hidden')[0];
        // star.className ="fas fa-star"
       let that = this;

        d3.tsv(this.levelData, function(data1){
            delete data1.columns
            that.countryList = data1
            // debugger 
            if (that.countryList){
                that.countryListLength = that.countryList.length
                that.countryIds = [];
                Object.values(that.countryList).forEach(country => that.countryIds.push(country.id))
                // debugger
                var randomId = that.countryIds[Math.floor(Math.random() * that.countryIds.length)];
                // debugger
                that.polygon = that.countriescoord.features.find(function (el) { return el.id === randomId }) 
                // debugger
                that.countrySelected = Object.values(that.countryList).find(function (el){return el.id === randomId})
                // debugger
                console.log(that.countrySelected.name)
                // document.getElementById('your-score').innerHTML = 'Your score:' + that.score + '/' + that.countryListLength
            }
        })
        this.drawEarth()
        this.play() 
    }

    drawEarth(){
        this.projection.rotate()
        d3.geoPath(this.projection).context(d3.select('#globe').node().getContext('2d'))
        this.scale()
        this.render()
    }


    scale() {
        this.canvas.attr('width', this.width).attr('height', this.height)
        this.projection
            .scale((this.scaleFactor * Math.min(this.width, this.height)) / 2)
            .translate([this.width / 3.5, this.height / 2])
    }

    render() { 
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
    
    rotate() {
        
        let that = this
        let rotation;
        let now = d3.now()
        let diff = now - this.lastTime
        rotation = this.projection.rotate()
        rotation[0] += diff * this.degPerMs
        this.projection.rotate(rotation)
        this.centroid = this.path.centroid(this.polygon)
        this.centroid = [Math.floor(this.centroid[0]), this.centroid[1]]
        console.log(this.centroid)
        this.render()
        
        this.lastTime = now
        if ((that.centroid && that.centroid[0] >= 318) && (that.centroid && that.centroid[0] <= 325) ) {
                    that.stopRotation()
                    
                    that.fill(that.polygon, that.colorCountry)
                 
                    that.showQuestion()
                }
    }

    

    fill(obj, color) {
        this.context.beginPath()
        this.path(obj)
        this.context.fillStyle = color
        // if (obj === this.polygon){
        //     this.context.shadowBlur = 10
        //     this.context.shadowColor = "black"
        // }
        this.context.fill()
    }
    
    stroke(obj, color) {
        this.context.beginPath()
        this.path(obj)
        this.context.strokeStyle = color
        this.context.stroke()
    }

    
    
    showQuestion(){
        const question = document.getElementsByClassName('question-hidden')[0];
        question.className = 'question-shown';
    };
    
    
    

    
    
    

    


    closeQuestion(){
        const question = document.getElementsByClassName('question-shown')[0];
        question.className = 'question-hidden';
    }


    

  

    submit(e) {
        e.preventDefault()
        this.answer = e.target[0].value
         this.checkAnswer(this.answer)
    }

    checkAnswer(answer){
        
        let that = this
        if (answer === this.countrySelected.name){
            var audio = new Audio('kids.wav');
            audio.play();
            that.score ++ 

            document.getElementById('your-score').innerHTML = 'Your score :' + that.score + '/' + that.countryListLength 
            that.form.reset()
            this.closeQuestion()
            that.countryIds = that.countryIds.filter(function(el){return el !== that.countrySelected.id})
            that.countryList = that.countryList.filter(function (el) { return el !== that.countrySelected })
            that.randomId = that.countryIds[Math.floor(Math.random() * that.countryIds.length)]
            debugger
            that.polygon = that.countriescoord.features.find(function (el) { return el.id === that.randomId }) 
            that.countrySelected = Object.values(that.countryList).find(function (el) { return el.id === that.randomId })
            console.log(that.countrySelected.name)
            this.startRotation()
        }else {
            document.getElementsByClassName('try-again-hidden')[0].className = 'try-again' 
        //    {document.getElementsByClassName('try-again-hidden')[0].className ='try-again'}, 3000)
    setTimeout(function() { 
            (document.getElementsByClassName('try-again')[0]).className = 'try-again-hidden'}, 3000)}
        
    }

    
    play(){
        // debugger
        let that = this;
        this.timer = d3.timer(function(elapsed){that.rotate(elapsed)}) 
    }  


    startRotation() {
        let that = this
        this.timer = d3.timer(function (elapsed) { that.rotate(elapsed) })
    }

    stopRotation() {
        this.timer.stop()
    }
}









module.exports = Game