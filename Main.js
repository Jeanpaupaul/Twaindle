let Card1 = document.querySelector("#card1");
let Card2 = document.querySelector("#card2");
let Next = document.querySelector("#next");
let number = document.querySelector("#number");
let prob = document.querySelector("#prob");

isNumeric = function(n) {
  return (typeof n !== 'undefined') ? !Array.isArray(n) && !isNaN(parseFloat(n)) && isFinite(n) : undefined;
}

product = function(data) {
	return data.reduce((a, b) => { return (isNumeric(b)) ? (a * b) : a; }, 1);
}

binomialCoefficient = function(n = 1, k = 1) {
	let factors = [];
	for (var i = 1; i <= k; i++) {
		factors.push((n + 1 - i) / i);
	}
	return product(factors);
}

binomialProbabilityMass = function(k, n = 10, probability = 0.5) {
	return binomialCoefficient(n, k) * Math.pow(probability, k) * Math.pow(1 - probability, n - k);
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.8s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

var Right = new Audio('./Sounds/Bell.mp3');
var Wrong = new Audio('./Sounds/Drum.mp3');
var Hover = new Audio('./Sounds/Click.mp3');
var Click = new Audio('./Sounds/Stop.mp3');

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

let Correct = 1;
let Db = false;
let CorrectN = 0;

Card1.onclick = function(){
    if (Db == false) {
      Db = true;
      animateCSS(Card1, 'flipInY')
      if (Correct == 1) {
       Card1.textContent = "Good ✔️"
       Card1.style.color = '#1cb615'
       playSound(Right);
       CorrectN += 1;
      } else {
       Card1.textContent = "Wrong ❌"
       Card1.style.color = '#da3c1f'
       playSound(Wrong);
       CorrectN = 0;
      }
      Correct = Math.random()<0.5?0:1;
      Next.style.display = "block";
      number.textContent = "Wins in a row: "+CorrectN
      if (CorrectN > 0) {
        prob.textContent = "( "+(binomialProbabilityMass(CorrectN,CorrectN,0.5)*100)+"% )"
       } else {
        prob.textContent = "( NA )"
      }
    }
};

Card2.onclick = function(){
  if (Db == false) {
    Db = true;
    animateCSS(Card2, 'flipInY')
    if (Correct == 0) {
     Card2.textContent = "Good ✔️"
     Card2.style.color = '#1cb615'
     playSound(Right);
     CorrectN += 1;
    } else {
     Card2.textContent = "Wrong ❌"
     Card2.style.color = '#da3c1f'
     playSound(Wrong);
     CorrectN = 0;
    }
    Correct = Math.random()<0.5?0:1;
    Next.style.display = "block";
    number.textContent = "Wins in a row: "+CorrectN
    if (CorrectN > 0) {
      prob.textContent = "( "+(binomialProbabilityMass(CorrectN,CorrectN,0.5)*100)+"% )"
     } else {
      prob.textContent = "( NA )"
    }
  }
};

Next.onclick = function(){
  if (Db == true) {
    Db = false;
    playSound(Click);
    Next.style.display = "none";

    Card1.textContent = "This"
    Card1.style.color = '#ffffff'

    Card2.textContent = "That"
    Card2.style.color = '#ffffff'
  }
};

Card1.addEventListener('mouseover', () => {
  playSound(Hover);
  if (Db == false) {
  Card1.style.color = '#000000'
  }
});

Card2.addEventListener('mouseover', () => {
  playSound(Hover);
  if (Db == false) {
    Card2.style.color = '#000000'
  }
});

Card1.addEventListener('mouseout', () => {
  playSound(Hover);
  if (Db == false) {
  Card1.style.color = '#ffffff'
  }
});

Card2.addEventListener('mouseout', () => {
  playSound(Hover);
  if (Db == false) {
  Card2.style.color = '#ffffff'
  }
});

Next.addEventListener('mouseover', () => {
  playSound(Hover);
});

Next.style.display = "none";
