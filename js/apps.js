'use strict';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var busmallobjectsImages = [
  'bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg',
  'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg',
  'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var leftImage = document.querySelector('#left_img');
var centerImage = document.querySelector('#center_img');
var rightImage = document.querySelector('#right_img');
var busmallobjects = [];//an array to store all busmallobjects object
var totalClicks = 0;
var allpro = document.querySelector('#allproduct');
var leftImageRandom ,centerImageRandom ,rightImageRandom;
function Busmall(name) {
  this.name = name;
  this.urlImage = `images/${this.name}`;
  busmallobjects.push(this);
  this.view = 0;
  this.clickTime = 0
}

function pickRandomImages() {
  leftImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
  centerImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
  rightImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];


  while (leftImageRandom === centerImageRandom || rightImageRandom === centerImageRandom || leftImageRandom === rightImageRandom) {
    leftImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
    centerImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
    rightImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];

  }

  leftImage.setAttribute('src', leftImageRandom.urlImage);
  leftImage.setAttribute('alt', leftImageRandom.name);

  centerImage.setAttribute('src', centerImageRandom.urlImage);
  centerImage.setAttribute('alt', centerImageRandom.name);

  rightImage.setAttribute('src', rightImageRandom.urlImage);
  rightImage.setAttribute('alt', rightImageRandom.name);

}
for (var i = 0; i < busmallobjectsImages.length; i++) {
  new Busmall(busmallobjectsImages[i]);//we pass the name of the busmall from the array
}
pickRandomImages();

function clickImage(event) {
  if (event.target.id === 'left_img' || event.target.id === 'center_img' || event.target.id === 'right_img') {
    pickRandomImages();
    totalClicks++;
    leftImageRandom.view++ ;
    centerImageRandom.view++ ;
    rightImageRandom.view++ ;
  }
  if (event.target.id ==="left_img") {
    leftImageRandom.clickTime++ ;
   }
  
   if (event.target.id ==="center_img") {
    centerImageRandom.clickTime ++ ;
    }
    if (event.target.id ==="right_img") {
      rightImageRandom.clickTime++ ;
    }
  if (totalClicks === 25) {
    //remove event listener
    allpro.removeEventListener('click', clickImage);
    listResult();

  }
}
allpro.addEventListener('click', clickImage);

function listResult(){

  var ulEl = document.getElementById('results');
  for (var i=0; i<busmallobjects.length;i++){
  var liEl = document.createElement('li');
  ulEl.appendChild(liEl);
  liEl.textContent = `${busmallobjects[i].name } had ${busmallobjects[i].clickTime }  click  ${busmallobjects[i].view} view`;
}}