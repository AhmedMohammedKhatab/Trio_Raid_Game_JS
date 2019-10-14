/**
 * @author Milad, Ahmed khatab,Amr mousa,Ahmed sherif
 * @description General class for game
 */
class Character {//start General class
    /**
     * 
     * @param {*} src URL of image
     * @param {*} classsName  CSS class to character style
     * @param {Number} characterBottomPos  The space between character and window bottom
     * @param {Number} characterLeftPos  The space between character and window left
     */
    constructor(src, classsName, characterBottomPos, characterLeftPos) {
        this.src = src;
        this.classsName = classsName;
        this.characterBottomPos = characterBottomPos;
        this.characterLeftPos = characterLeftPos;
    }
    /**
     * @description  Method for creating character
     * @argument method not required Arguments
     */
    createCharacter() {
        var character = document.createElement('img'); //create new Element
        character.setAttribute('src', this.src); //setting SRC attribute for putting url of image
        character.setAttribute('class', this.classsName); // setting CLASS attribute for image
        character.style.position = 'absolute'; // Setting the absolute position to image
        character.style.bottom = this.characterBottomPos + 'px'; //setting bottom space to character
        character.style.left = this.characterLeftPos + 'px'; //setting left space to character
        document.body.appendChild(character); //Appending new element to html file (DOM)
    }
}//end general Class

/**
 * @author Milad, Ahmed,Amr,Ahmed
 * @description Class for Hero character
 */
class Hero extends Character {//start hero class
    /**
     * 
     * @param {*} src URL of image
     * @param {*} classsName  CSS class to character style
     * @param {Number} characterBottomPos  The space between character and window bottom
     * @param {Number} characterLeftPos  The space between character and window left
     */
    constructor(src, classsName, characterBottomPos, characterLeftPos) {
        super(src, classsName, characterBottomPos, characterLeftPos);
    }
    /**
     * @description Method move hero left and right 
     * @param {Event} event Event Object
     * @param {Number} windowWidth Int Number (width of window)
     */
    moveHero(event, windowWidth) { //start method of move hero  
        var hero = document.getElementsByClassName('sea-hero')[0]; //Get hero element from html 
        if (hero != null && hero != undefined) { //check hero if exist or not
            try { //for chatch unexpected error
                if (event.keyCode == 37) { // check if left arrow button pressed on keyboard
                    this.leftArrowPress(hero); //calling function to move hero to left
                } else if (event.keyCode == 39) { //check if right arrow button pressed on keyboard
                    this.rightArrowPress(hero, windowWidth); //calling function to move hero to right
                } else if (event.keyCode == 65) { //check if  character (d) button pressed on keyboard
                    this.leftArrowPress(hero); //calling function to move hero to left
                } else if (event.keyCode == 68) { //check if character (a) button pressed on keyboard
                    this.rightArrowPress(hero, windowWidth); //calling function to move hero to right
                }
            } catch (error) { //catch error
                // console.log(error); //log unexpected error on console
            }

        }
    }//End method of move hero
    /**
     * @description Method for pressing left arrow in keyboard
     * @param {*} hero  Html Element 
     */
    leftArrowPress(hero) {
        if (parseInt(hero.style.left) > 100) {
            hero.style.left = parseInt(hero.style.left) - 8 + 'px';
        }
    }
    /**
     * @description Method for pressing right arrow in keyboard
     * @param {*} hero  Html Element
     * @param {Number} windowWidth width of window
     */
    rightArrowPress(hero, windowWidth) {
        if (parseInt(hero.style.left) < windowWidth - 100) {
            hero.style.left = parseInt(hero.style.left) + 8 + 'px';
        }
    }
}//end hero class


/**
 * @author Milad, Ahmed, Amr, Ahmed
 * @description class for Hero shots
 */

class HeroShot extends Character {//start heroShot class
    /**
     * 
     * @param {*} src URL of image
     * @param {*} classsName  CSS class to character style
     * @param {Number} characterBottomPos  The space between character and window bottom
     * @param {Number} characterLeftPos  The space between character and window left
     */
    constructor(src, classsName, characterBottomPos, characterLeftPos) {
        super(src, classsName, characterBottomPos, characterLeftPos);

    }
    /**
     * @description Mthod for creating Hero Shot 
     * @argument Method not required arguments
     */

    createShot() {
        var audio = new Audio('../assets/audio/missile.mp3');
        var heroShots = document.getElementsByClassName('missile1');

        if (heroShots == undefined || heroShots == null) {
            this.createCharacter(); //classing create method
            audio.play();
        } else if (heroShots.length == 0) {
            this.createCharacter(); //classing create method   
            audio.play();
        }






    }
    /**
     * @description shotMove method to move hero shot 
     * @argument shotMove Not required arguments
     */
    shotMove() {
        try {
            var heroShot = document.getElementsByClassName('missile1'); //get shots of hero from html file  by class name
            var enemies = document.getElementsByClassName('sea-enemy'); //get enemies from html file by class name
            var borderHero = document.getElementsByClassName('sea-hero')[0];

            var index = 0;
            for (index = 0; index < heroShot.length; index++) { //for move all heroShot in the game
                if (heroShot[index] != null) {
                    heroShot[index].style.bottom = parseInt(heroShot[index].style.bottom) + 1 + 'px'; //move shot
                    borderHero.style.borderBottom = "15px solid red";
                }

                for (let i = 0; i < enemies.length; i++) {
                    let tShot = 16;
                    let ttshot = 50;
                    let tEnemy = 51;
                    //for checking if  the shot of hero collides the enemies 
                    if (heroShot[index] != null && parseInt(heroShot[index].style.bottom) + ttshot == parseInt(enemies[i].style.bottom) ||
                        parseInt(heroShot[index].style.bottom) == parseInt(enemies[i].style.bottom)) { //check the bottom of hero == bottom of enemy

                        if (enemies[i] != null && parseInt(enemies[i].style.left) <= parseInt(heroShot[index].style.left) &&
                            parseInt(heroShot[index].style.left) + tShot <= parseInt(enemies[i].style.left) + tEnemy) {//check the shot in the body of enemy
                            enemies[i].setAttribute('src', '../assets/img/giphy.gif');
                            var audio = new Audio('../assets/audio/explode.mp3');
                            audio.play();
                            document.body.removeChild(heroShot[index]); //delete shot
                            borderHero.style.borderBottom = '15px solid green'

                            setTimeout(function () {
                                document.body.removeChild(enemies[i]); // killed enemy
                                heroShot = null; // flag for suring the enemy delete  
                                score += 1; // increament the score of hero
                                document.getElementById('Score').textContent = score; //butting the score to html file

                                if (enemies.length == 0) {//for checking killed all enemies
                                    if (numberOfLevels < 3) { //levels of hero
                                        index = 0;
                                        numberOfLevels++; //increament level when kill all enemy in this level
                                        document.body.removeChild(document.getElementsByClassName('sea-hero')[0]);//remove hero after win
                                        var nextLevel = document.createElement('p');//create p element
                                        nextLevel.setAttribute('id', 'nextLevelContainer'); //set id to p element
                                        nextLevel.innerHTML = `<button 
                                                                id='nextLevel' 
                                                                onclick=
                                                                levels(${enemySpeed - 170},'${heroSrc}','${enemySrc}',${shotHeroSpeed })
                                                                >
                                                                    Next Level
                                                                </button>`; //create button for next level and call levels method when click on it
                                        document.body.appendChild(nextLevel);//append p element to html file
                                        score = 0; //reset score to 0
                                        document.getElementById('Score').textContent = score; //putting the resetting score to html 
                                    } else if (numberOfLevels == 3) { // check if hero finshed the three level of game
                                        document.body.removeChild(document.getElementsByClassName('sea-hero')[0]); //remove hero after win
                                        var gameOver = document.createElement('p');//create new p element
                                        gameOver.setAttribute('id', 'win'); //set id to p element
                                        gameOver.innerHTML = `You Win <br> 
                                                                    <button id='play_again' onclick="window.location.reload(true);"> 
                                                                        Play Again 
                                                                    </button>`;//button if user to want play again
                                        document.body.appendChild(gameOver);//append p element
                                    }

                                }
                            }, 200);


                        }
                    }
                }

                if (heroShot != null) { // check if hero exist by flag heroShot 
                    if (parseInt(heroShot[index].style.bottom) >= parseInt(enemies[0].style.bottom)) {//if the shot of hero out the window border will deletting
                        document.body.removeChild(heroShot[index]);//remove the heroShot
                        borderHero.style.borderBottom = '15px solid green';
                    }
                }
            }

        } catch (error) {
            // console.log(error);


        }
    }
}//end heroShot class

//create shot of enemies
class EnemiesShot extends Character {
    constructor(src, classsName, characterBottomPos, characterLeftPos) {
        super(src, classsName, characterBottomPos, characterLeftPos);
    }
    enemiesShotCreate() {
        this.createCharacter();
    }
}
