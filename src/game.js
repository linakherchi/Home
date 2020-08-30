

class Game {
    constructor(levelName, levelData) {
        document.getElementById("main-menu").remove()
        // setting levels and levelData as instance to be accessed elsewhere
        this.levelName = levelName
        this.levelData = levelData
        this.score = 0
        // create canvas where Globe will be appended
        this.root = document.getElementById("root")
        this.root.style.display ="flex"
        this.canvas = document.createElement("canvas")
        this.canvas.setAttribute("id", "globe")
        document.getElementById("root").prepend(this.canvas)
        // to change later -- this is just for testing -- will need to be append later
        // setting globe properties
        this.projection = d3.geoOrthographic().precision(0.1)
        this.angles = { x: -20, y: 40, z: 0 }
        this.lastTime = d3.now()
        this.degPerSec = 70
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


        // Loading land into globe
        let that = this
        d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (data) {
            that.land = data.objects.land
            that.landcoord = topojson.feature(data, that.land) 
            that.countries = data.objects.countries
            that.countriescoord = topojson.feature(data, that.countries)
            
        })
        setTimeout(() => this.loadDataAndSelectCountry(), 1000)

        this.numTimesGuessed = 3
        
     
    }
    drawEarthAndStartPlaying() {
        this.drawEarth()
        this.play()
    }
        
    loadDataAndSelectCountry(){
       let that = this;
            d3.tsv(that.levelData, function(data1){
            delete data1.columns
            that.countryList = data1
            that.selectCountry()
        })
        setTimeout(() => that.drawEarthAndStartPlaying(), 1000)
    }

    selectCountry(){
        this.countryListLength = this.countryList.length
        this.countryIds = [];
        Object.values(this.countryList).forEach(country => this.countryIds.push(country.id))
        var randomId = this.countryIds[Math.floor(Math.random() * this.countryIds.length)];
        this.polygon = this.countriescoord.features.find(function (el) { return el.id === randomId }) 
        this.countrySelected = Object.values(this.countryList).find(function (el){return el.id === randomId})
        console.log(this.countrySelected.name)
    }


    drawEarth(){
        this.projection.rotate()
        d3.geoPath(this.projection).context(d3.select('#globe').node().getContext('2d'))
        this.scale()
        this.render()
    }


    scale() {
        this.canvas.attr('width', this.width /1.8 ).attr('height', this.height)
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
        // console.log(this.centroid)
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
        this.context.fill()
    }
    
    stroke(obj, color) {
        this.context.beginPath()
        this.path(obj)
        this.context.strokeStyle = color
        this.context.stroke()
    }

    
    
    showQuestion(){
        this.form = document.createElement("form")
        this.form.setAttribute("id", "form-question")
        const questionTitle= document.createElement("h1")
        questionTitle.setAttribute("id", "question-title")
        questionTitle.innerHTML = "Guess the name of this country"
        this.input1 = document.createElement("input")
        this.input1.setAttribute("id", "fill-country")
        this.input1.setAttribute("type", "text")
        this.input1.setAttribute("placeholder", "Your answer here")
        this.input2 = document.createElement("input")
        this.input2.setAttribute("id", "enter")
        this.input2.setAttribute("type", "submit")
        this.input2.setAttribute("value", "Give it a try!")
        this.form.append(questionTitle)
        this.form.append(this.input1)
        this.form.append(this.input2)
        this.rightSide.appendChild(this.form)
        let that = this
        this.form.addEventListener("submit", () =>{
            event.preventDefault()
            const possibleAnswer = that.input1.value
            that.checkAnswer(possibleAnswer)
        })
    };
    
    
    

    
    

    closeQuestion(){
        const question = document.getElementsByClassName('question-shown')[0];
        question.className = 'question-hidden';
    }


    

  tryAgain(){
      const h1 = document.createElement("h1")
      h1.setAttribute("id", "try-again")
      h1.innerHTML = `Try again ... You still have ${this.numTimesGuessed} guesse(s)`
      this.form.append(h1)
      this.input2.disabled = true 
      this.input1.disabled = true 
      setTimeout(()=> {
          h1.remove()
          this.input1.disabled = false
          this.input2.disabled = false}
          , 1000)
  }

  lastTryEncouragement(){
      const h1 = document.createElement("h1")
      h1.setAttribute("id", "last-encouragement")
      h1.innerHTML = `The country you were trying to guess is ${this.countrySelected.name}, remember it for next time!`
      this.form.append(h1)
      setTimeout(() => {
          this.form.remove()
          this.selectCountry()
          this.startRotation()
      }, 5000)
  }

    checkAnswer(answer){
        let that = this
        
        if (this.numTimesGuessed !== 1 && answer !== this.countrySelected.name){
                this.numTimesGuessed -= 1
                this.tryAgain()
            }else if(this.numTimesGuessed == 1){
                this.lastTryEncouragement()
                this.numTimesGuessed = 3
            }
        if (answer == this.countrySelected.name){
            this.numTimesGuessed = 3
            var audio = new Audio('kids.wav');
            audio.play();
            that.score ++ 
            document.getElementById('your-score').innerHTML = 'Your score :' + that.score + '/' + that.countryListLength 
            that.form.reset()
            this.closeQuestion()
            that.countryIds = that.countryIds.filter(function(el){return el !== that.countrySelected.id})
            that.countryList = that.countryList.filter(function (el) { return el !== that.countrySelected })
            that.randomId = that.countryIds[Math.floor(Math.random() * that.countryIds.length)]

            that.polygon = that.countriescoord.features.find(function (el) { return el.id === that.randomId }) 
            that.countrySelected = Object.values(that.countryList).find(function (el) { return el.id === that.randomId })
            console.log(that.countrySelected.name)
            this.startRotation()}
        
    }

    
    play(){
        this.createRightSide()
        let that = this;
        this.timer = d3.timer(function(elapsed){that.rotate(elapsed)}) 
    }  

    createRightSide(){
        this.rightSide = document.createElement('div')
        this.rightSide.setAttribute("id", "right-side")
        scoreSide = document.createElement("div")
        scoreSide.setAttribute("id", "score")
        scoreSide.innerHTML = `✬ Your score : ${this.score} / ${this.countryListLength}`
        this.rightSide.append(scoreSide)
        this.root.append(this.rightSide)



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