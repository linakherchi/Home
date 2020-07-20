const Game = require("./game.js")

class Levels{
    constructor(){
        this.render()
    }
    
    render(){
        // debugger
        const extremeLevel =  'https://gist.githubusercontent.com/linakherchi/279a80d6c30bd28654b3570554e03140/raw/2d898cf90669f915047c1c4a7f7d3fd88dc2fda5/Extreme'
        const hardLevel = 'https://gist.githubusercontent.com/linakherchi/c22e6dbf6bdc0ecd4d927b0b8833057d/raw/d352de2211c3866f21c094b66694af27f1dee45b/Hard'
        const mediumLevel = 'https://gist.githubusercontent.com/linakherchi/bb8cc8413204178dc7fd6300bc4bb806/raw/06ca7a9d901b72516ec2862761fc363a6627c4f1/Medium'
        const easyLevel = 'https://gist.githubusercontent.com/linakherchi/0545583fbff6cb3a5beea4a82c6788f0/raw/234af1e606561222c652072a1ac087e396eb0fc6/Easy'
        const div = document.createElement("div")
        div.setAttribute("id","main-menu")
        const menuButtons = ["Easy", "Medium", "Hard", "Extreme", "How To Play"]
        menuButtons.forEach((button) => {
            const buttonElement = document.createElement("button")
            buttonElement.setAttribute("id", "menu-button")
            buttonElement.innerHTML = button
            if (button !== "How To Play"){
                buttonElement.addEventListener("click", ()=> {
                    const downcaseLevel = button.toLowerCase() 
                    new Game(button, eval(downcaseLevel +"Level") )
                })
            }
            div.append(buttonElement)
        })
        const root = document.getElementById("root")
        root.append(div)
        
        
        
                
    
    }

}

    
    

module.exports = Levels;