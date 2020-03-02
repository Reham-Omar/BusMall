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
var groupImageSection = document.querySelector('#all_pic')

function Busmall(name) {
  this.name = name;
  this.urlImage = `images/${this.name}`;
  busmallobjects.push(this);
}
for (var i = 0; i < busmallobjectsImages.length; i++) {
  new Busmall(busmallobjectsImages[i]);//we pass the name of the busmall from the array
}
groupImageSection.addEventListener('click', clickImage);
pickRandomImages();
clickImage();

function pickRandomImages() {
  var leftImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
  var centerImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
  var rightImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];

  
  leftImage.setAttribute('src', leftImageRandom.urlImage);
  leftImage.setAttribute('alt', leftImageRandom.name);

  centerImage.setAttribute('src', centerImageRandom.urlImage);
  centerImage.setAttribute('alt', centerImageRandom.name);

  rightImage.setAttribute('src', rightImageRandom.urlImage);
  rightImage.setAttribute('alt', rightImageRandom.name);

  while (leftImage === centerImage) {
  leftImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
 
  leftImage.setAttribute('src', leftImageRandom.urlImage);
  leftImage.setAttribute('alt', leftImageRandom.name);
    //pick another random number
  }
  while (leftImage === centerImage || rightImage === centerImage) {
    rightImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
    rightImage.setAttribute('src', rightImageRandom.urlImage);
    rightImage.setAttribute('alt', rightImageRandom.name);
  }

}
function clickImage(event) {
  if (event.target.id === 'left_img' || event.target.id === 'center_img' || event.target.id === 'right_img') {
    pickRandomImages();
    totalClicks++;
  }
  if (totalClicks === 25) {
    //remove event listener
    Busmall.removeEventListener('click', clickImage);
  }
}


