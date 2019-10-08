const closeMainMenu = () => {
    const mainMenu = document.getElementsByClassName('main-menu')[0];
    // debugger
    mainMenu.className = 'main-menu-close';
};



const Welcome = {
    setButtons(){
        // debugger
        // var audio = new Audio('menu.wav')
        const easyButton = document.getElementById("easy-button")
        // $('#easy-button').mouseenter(function(){audio.play()})
        const mediumButton = document.getElementById("medium-button")
        const hardButton = document.getElementById("hard-button")
        const extremeButton = document.getElementById("extreme-button")
        const aboutButton = document.getElementById("how-to-play-button")

        easyButton.addEventListener('click', (e) => {
            closeMainMenu();
            setTimeout(() => game.start('Easy'), 200);
        }
        );

        mediumButton.addEventListener('click', (e) => {
            closeMainMenu();
            setTimeout(() => game.start('Medium'), 200);
        }
        );

        hardButton.addEventListener('click', (e) => {
            closeMainMenu();
            setTimeout(() => game.start('Hard'), 200);
        }
        );

        extremeButton.addEventListener('click', (e) => {
            closeMainMenu();
            setTimeout(() => game.start('Extreme'), 200);
        })
    },
    
    closeMainMenu: closeMainMenu
}

module.exports = Welcome;