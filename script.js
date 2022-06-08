let planetDiv;
let textDiv;
let contButton;
let messDiv;
let page;
let questionData;
let score = 0;

window.onload = function() {
planetDiv = document.getElementById("planet");
textDiv = document.getElementById("text");
contButton = document.getElementById("cont");
messDiv = document.getElementById("message");
messDiv.innerHTML = "<h1>Planetrivia</h1><br><div>Click anywhere to start game!</div>";
contButton.innerHTML = "Continue ->";
page = 0;
} // window.onload

function closeLightBox(){
    document.getElementById("lightbox").style.display = "none";
	document.getElementById("buttonA").innerHTML = "";
	document.getElementById("buttonB").innerHTML = "";
	document.getElementById("buttonC").innerHTML = "";
	document.getElementById("buttonD").innerHTML = "";
fetchPlanetData();
} // closeLightBox

function fetchPlanetData() {
let url;
let randYear = Math.floor((Math.random() * 4000) + 2100);
let randPlanet = Math.floor((Math.random() * 2147483646) + 1);

setting(randYear);

url = "https://app.pixelencounter.com/api/basic/planets/"+ randPlanet +"?frame=20&width=500&height=500";
changePlanet(url);

} // fetchPlanetData

function changePlanet(data) {
planetDiv.innerHTML = "<img src=" + data + " alt='planet'>"
} // changeRandomPhoto

function setting(data) {
textDiv.innerHTML += "<p>The year is " + data + ". You have been tasked to form a mutual agreement of peace with the alien species of this planet.<br>This species, however, determines trust through knowledge. Upon arrival, they will be hosting a trivia. Answer 7 questions correctly, and you will gain their trust. Fail,<br> and you may bring an end to our civilization as we know it. We wish you the best of luck.<br> -Intergalactic Board of Connections and Communication</p>"
} // yearSetting

function cont() {
console.log(page);
if(page == 0) {
console.log("Continued.");
contButton.innerHTML = "Skip question ->";
planetDiv.innerHTML = "";
document.getElementById("score").innerHTML = "Score: " + score + "/12";
fetch('https://opentdb.com/api.php?amount=12&difficulty=easy&type=multiple')
.then(response => response.json())
.then(data =>  changeQues(data)
);
}else if (page != 12){
console.log("Skipped.");
changeQues();
}else {
location.reload();
}

}

function changeQues(data) {
page++;
if (page == 12){
endScreen(score);
return;
}
console.log(page);

if (data != undefined) questionData = data;
console.log(data);

let correctAns = Math.floor(Math.random() * 4);
const ansBut = [];
let j = 0;

for (let i = 0; i < 4; i++) {
if (i != correctAns) {
ansBut[i] = questionData.results[page].incorrect_answers[j];
j++;
}
}
ansBut[correctAns] = questionData.results[page].correct_answer;
textDiv.innerHTML = questionData.results[page].category + "<br>";
textDiv.innerHTML += questionData.results[page].question;

document.getElementById("alien").innerHTML = "<img src='https://app.pixelencounter.com/api/basic/monsters/random/png?size=200' alt='alien'>";

document.getElementById("buttonA").innerHTML = "A." + ansBut[0];
document.getElementById("buttonB").innerHTML = "B." + ansBut[1];
document.getElementById("buttonC").innerHTML = "C." + ansBut[2];
document.getElementById("buttonD").innerHTML = "D." + ansBut[3];

document.getElementById("buttonA").onclick = function() {markIt(false);};
document.getElementById("buttonB").onclick = function() {markIt(false);};
document.getElementById("buttonC").onclick = function() {markIt(false);};
document.getElementById("buttonD").onclick = function() {markIt(false);};

let correctChoice = "button";
switch (correctAns) {
case 0: correctChoice += "A"; break;
case 1: correctChoice += "B"; break;
case 2: correctChoice += "C"; break;
case 3: correctChoice += "D"; break;
} // switch

document.getElementById(correctChoice).onclick = function() {markIt(true);};
} // changeQues

// mark question correct or incorrect_answers
function markIt(correct) {
if (correct) {
console.log("Correct");
score++;
document.getElementById("score").innerHTML = "Score: " + score + "/12";
document.getElementById("ans").innerHTML = "Last question was correct!";
document.getElementById("ans").style.color = "green";
changeQues();
} else {
console.log("Incorrect");
document.getElementById("ans").innerHTML = "Last question was incorrect!";
document.getElementById("ans").style.color = "red";
changeQues();
}
} // markIT

function endScreen(score) {
console.log("You got " + score + "/12");
switch (score) {
case 12:
case 11:
case 10:
case 9:
case 8:
case 7: textDiv.innerHTML = "Your mission was successful. You have fully and completely gained the alien species' trust."; break;
case 6: textDiv.innerHTML = "They are still skeptical, but they say they can work on our relationship. Your mission was a close success."; break;
case 5:
case 4:
case 3:
case 2:
case 1:
default: textDiv.innerHTML = "They do not trust us. You have failed us.";
}

document.getElementById("buttonA").innerHTML = "";
document.getElementById("buttonB").innerHTML = "";
document.getElementById("buttonC").innerHTML = "";
document.getElementById("buttonD").innerHTML = "";
contButton.innerHTML = "Replay?";
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
