
// const Fireworks = require("./../fireworks.js/script/fireworks")

class Form{
    constructor(){
        this.star = '✬'
    }

    createRightSide(root, score, totalPoints){
        this.rightSide = document.createElement('div')
        this.rightSide.setAttribute("id", "right-side")
        scoreSide = document.createElement("div")
        scoreSide.setAttribute("id", "score")
        this.pStar = document.createElement("p")
        this.pStar.innerHTML = this.star
        this.pStar.setAttribute("id", "star")
        this.pScore = document.createElement("p")
        this.pScore.innerHTML = `Your score : ${score} / ${totalPoints}`
        scoreSide.append(this.pStar)
        scoreSide.append(this.pScore)
        this.rightSide.append(scoreSide)
        root.append(this.rightSide)
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
        
    };

    tryAgain(numTimesGuessed){
        const h1 = document.createElement("h1")
        h1.setAttribute("id", "try-again")
        if (numTimesGuessed == 1){
            h1.innerHTML = `Try again ... You still have ${numTimesGuessed} guess`
        }else{
          h1.innerHTML = `Try again ... You still have ${numTimesGuessed} guesses`
        }
        this.form.append(h1)
        this.input2.disabled = true 
        this.input1.disabled = true 
        setTimeout(()=> {
            h1.remove()
            this.input1.disabled = false
            this.input2.disabled = false}
            , 1000)
    }

    createEncouragementSide(failedGuess){
        const h1 = document.createElement("h1")
        h1.setAttribute("id", "last-encouragement")
        h1.innerHTML = `The country you were trying to guess is ${failedGuess}, remember it for next time!`
        this.form.append(h1)
        this.input2.disabled = true 
        this.input1.disabled = true 
    }

    updateScore(newScore, totalPoints){
        this.score = document.getElementById('score')
        this.pScore.innerHTML = `Your score : ${newScore} / ${totalPoints}`
        this.pStar.style.fontSize = "20px"
        setTimeout(() => this.pStar.style.fontSize = "", 200)
    }

    levelWon(){
        createFirework(76,184,7,4,null,null,null,null,false,true)
    }
}

module.exports = Form