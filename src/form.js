class Form{


    createRightSide(root, score, totalPoints){
        this.rightSide = document.createElement('div')
        this.rightSide.setAttribute("id", "right-side")
        scoreSide = document.createElement("div")
        scoreSide.setAttribute("id", "score")
        scoreSide.innerHTML = `✬ Your score : ${score} / ${totalPoints}`
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
}

module.exports = Form