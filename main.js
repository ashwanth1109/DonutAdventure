//------------------------------------------GETTING ELEMENTS BY ID------------------------------------------

let arrowRight1 = document.getElementById(`ar-screen1`);
let arrowLeft1 = document.getElementById(`al-screen1`);
let arrowRight2 = document.getElementById(`ar-screen2`);
let arrowLeft2 = document.getElementById(`al-screen2`);
let arrowRight3 = document.getElementById(`ar-screen3`);
let arrowLeft3 = document.getElementById(`al-screen3`);

let screen1 = document.getElementById(`screen1`);
let screen2 = document.getElementById(`screen2`);
let screen3 = document.getElementById(`screen3`);

let logLine1 = document.getElementById(`log-line-1`);
let logLine2 = document.getElementById(`log-line-2`);

let talkSmack = document.getElementById(`talk-smack`);
let fight = document.getElementById(`fight`);

let enemyName = document.getElementById(`enemy-name`);
let heroName = document.getElementById(`hero-name`);
let enemyMove1 = document.getElementById(`enemy-move1`);
let enemyMove2 = document.getElementById(`enemy-move2`);
let heroMove1 = document.getElementById(`hero-move1`);
let heroMove2 = document.getElementById(`hero-move2`);

//------------------------------------------DEFINING SCREENS------------------------------------------

let screens = [];
screens.push(screen1);
screens.push(screen2);
screens.push(screen3);

let currentScreenIndex = 0;
let currentScreen, nextScreen;

//------------------------------------------FUNCTIONS TO TRANSITION SCREENS------------------------------------------
const showNextScreen = () => {
  nextScreen.style.visibility = `visible`;
  nextScreen.style.opacity = 1;
  nextScreen.style.zIndex = 1;
};

const hideCurrentScreen = () => {
  currentScreen.style.visibility = `hidden`;
  currentScreen.style.opacity = 0;
  currentScreen.style.zIndex = 0;
  setTimeout(showNextScreen, 1000);
};

const goRight = () => {
  currentScreen = screens[currentScreenIndex];
  nextScreen = screens[currentScreenIndex + 1];
  hideCurrentScreen();
  currentScreenIndex++;
};
const goLeft = () => {
  currentScreen = screens[currentScreenIndex];
  nextScreen = screens[currentScreenIndex - 1];
  hideCurrentScreen();
  currentScreenIndex--;
};

const startBattle = () => {
  goRight();
  // setTimeout
};

//------------------------------------------ADDING EVENT LISTENERS TO ARROWS------------------------------------------

arrowRight1.addEventListener(`click`, goRight);
arrowLeft2.addEventListener(`click`, goLeft);
// arrowLeft.addEventListener(`click`, hideNextScreen);
arrowRight2.addEventListener(`click`, startBattle);
arrowLeft3.addEventListener(`click`, goLeft);

//------------------------------------------ADDING HERO CLASS------------------------------------------

class Hero {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.moves = [`sprinkle spray`, `sugar shock`];
    this.weapons = {
      sprinkleSpray: 5,
      sugarShock: 10
    };
    this.catchPhrases = [
      `I'm fresher than a day old pizza`,
      `You can't count my calories`
    ];
  }
  talkSass() {
    return this.catchPhrases[Math.round(Math.random())];
  }
  announceHealth() {
    return `${this.name}'s health is currently ${this.health}`;
  }
  fight(opponent) {
    let randomValue = Math.round(Math.random());
    opponent.health -= randomValue
      ? this.weapons.sprinkleSpray
      : this.weapons.sugarShock;
    return `${opponent.name} got hit by ${
      this.moves[randomValue]
    } and health is now ${opponent.health}`;
  }
}

//------------------------------------------ADDED DOUGIE AS INSTANCE OF HERO------------------------------------------
const dougie = new Hero(`Dougie the Donut`);

//------------------------------------------ADDING ENEMY CLASS------------------------------------------

class Enemy {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.moves = [`pepperoni stars`, `cheese grease`];
    this.weapons = {
      pepporoniStars: 5,
      cheeseGrease: 10
    };
    this.catchPhrases = [
      `I'm more youtube famous than you are`,
      `You can't handle my pepperoni throwing stars`
    ];
  }
  talkSmack() {
    return this.catchPhrases[Math.round(Math.random())];
  }
  announceHealth() {
    return `${this.name}'s health is currently ${this.health}`;
  }
  fight(opponent) {
    let randomValue = Math.round(Math.random());
    opponent.health -= randomValue
      ? this.weapons.pepporoniStars
      : this.weapons.cheeseGrease;
    return `${opponent.name} got hit by ${
      this.moves[randomValue]
    } and health is now ${opponent.health}`;
  }
}

//------------------------------------------ADDED PIZZA RAT AS INSTANCE OF ENEMY------------------------------------------

const pizzaRat = new Enemy(`Pizza Rat Ninja`);

//------------------------------------------ADDING FUNCTIONS FOR BATTLE------------------------------------------

const generateSmackTalk = () => {
  logLine1.innerText = `${dougie.name}: ${dougie.talkSass()}`;
  logLine2.innerText = `${pizzaRat.name}: ${pizzaRat.talkSmack()}`;
};

const checkIfBattleIsOver = () => {
  if (dougie.health > 0 && pizzaRat.health <= 0) {
    logLine1.innerText = `Congratulations! The hero ${
      dougie.name
    } triumphs today!!`;
    logLine2.innerText = `${
      dougie.name
    } can now go to Flat Iron District to show his moves`;
  } else if (pizzaRat.health > 0 && dougie.health <= 0) {
    logLine1.innerText = `Oh No! The enemy ${pizzaRat.name} has won today!!`;
    logLine2.innerText = `${
      dougie.name
    } will have to go to Flat Iron some other day`;
  } else if (pizzaRat.health <= 0 && dougie.health <= 0) {
    logLine1.innerText = `You fought well, but its a tie`;
    logLine2.innerText = `${
      dougie.name
    } will have to go to Flat Iron some other day`;
  }
};

const simulateBattle = () => {
  if (dougie.health > 0 && pizzaRat.health > 0) {
    logLine1.innerText = dougie.fight(pizzaRat);
    logLine2.innerText = pizzaRat.fight(dougie);
    checkIfBattleIsOver();
  } else {
    checkIfBattleIsOver();
  }
};
//------------------------------------------ADDING EVENT LISTENERS TO BUTTONS------------------------------------------

talkSmack.addEventListener(`click`, generateSmackTalk);
fight.addEventListener(`click`, simulateBattle);

//------------------------------------------ADD INFO FROM OBJECTS TO HTML------------------------------------------
enemyName.innerText = pizzaRat.name;
heroName.innerText = dougie.name;
enemyMove1.innerText = pizzaRat.moves[0];
enemyMove2.innerText = pizzaRat.moves[1];
heroMove1.innerText = dougie.moves[0];
heroMove2.innerText = dougie.moves[1];
