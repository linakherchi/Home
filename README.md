**About**

Our globe is our only home, and knowing more about our home can be a humbling experience because it makes us realize how small we are and how diverse our environment is.
Our globe is the reason why I wanted to build this game, which is presenting a rotating Earth that stops randomly on a country that the player needs to guess.
The goal of Home is learning more about different places in the World. There is no game over. If the user is not able to guess a specific country 3 times, he will receive the name of the country so that he is better able to guess it when the globe stops at the same spot another time.

<img width="1437" alt="Screen Shot 2019-10-11 at 10 00 18 AM" src="https://user-images.githubusercontent.com/51456702/66686048-069dc180-ec33-11e9-8c2f-53e6d165851b.png">

**Tools used to build this game**

Home is mostly frontend. I spent most of the time implementing the game logic using JavaScript and designing the website to be user-friendly using HTML5 and CSS3. However, the pillar of Home is D3.js. In fact, D3.js allowed me to create the globe and stop when a specific country on the screen.

**Challenges I encountered**

One of the functionalities of the game was to stop the rotation of the globe when a random country selected by a function was seen on the screen. However, the only data I had was a JSON object with a specific geometry for each country. I did not see how I could make sure a specific country was ON the screen.
After doing some research, I found a d3 method that saved me: path.centroid(). This method allowed me to take the centroid (which was a single point with lat-lng coordinates) of each geometry related to a country and convert it to x-y coordinates.
Then, I drew a transparent line at the center of the globe and all what was left was to check for intersections between this line and the centroid of the country selected.

<i>Below is the function that helped me stop the rotation at a specific centroid:</i> 

```javascript
  rotate(elapsed) {
        
        let that = this
        let rotation;
        let now = d3.now()
        let diff = now - this.lastTime
        rotation = this.projection.rotate()
        rotation[0] += diff * this.degPerMs
        this.projection.rotate(rotation)
        this.centroid = this.path.centroid(this.polygon)
        this.centroid = [Math.floor(this.centroid[0]), this.centroid[1]]
  
        this.render()
        
        this.lastTime = now
        if ((that.centroid && that.centroid[0] === 435) || (that.centroid && that.centroid[0] === 434) || (that.centroid && that.centroid[0] === 436)) {
                    that.stopRotation()
                    
                    that.fill(that.polygon, that.colorCountry)
                 
                    that.showQuestion()
                }
    }
