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
var leftImageRandom, centerImageRandom, rightImageRandom;
var testArr = [];
// Busmall.clickclick=[];
// Busmall.view=[];

function Busmall(name) {
  this.name = name.split('.')[0];
  this.urlImage = `images/${name}`;
 
  this.view = 0;
  this.clickTime = 0;
  busmallobjects.push(this);
  // Busmall.clickclick.push(this);
  // Busmall.view.push(this);
}

function pickRandomImages() {
  leftImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
  centerImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
  rightImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];


  while (leftImageRandom === centerImageRandom || rightImageRandom === centerImageRandom || leftImageRandom === rightImageRandom || testArr.includes(leftImageRandom) || testArr.includes(rightImageRandom) || testArr.includes(centerImageRandom)) {
    leftImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
    centerImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];
    rightImageRandom = busmallobjects[randomNumber(0, busmallobjects.length - 1)];

  }
  testArr = [];
  testArr.push(leftImageRandom);
  testArr.push(centerImageRandom);
  testArr.push(rightImageRandom);


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
pickRandomImages();// first time to give me the first 3 images

function clickImage(event) {
  if (event.target.id === 'left_img' || event.target.id === 'center_img' || event.target.id === 'right_img') {
    pickRandomImages();
    totalClicks++;
    leftImageRandom.view++;
    centerImageRandom.view++;
    rightImageRandom.view++;
  }
  if (event.target.id === "left_img") {
    leftImageRandom.clickTime++;
  }

  if (event.target.id === "center_img") {
    centerImageRandom.clickTime++;
  }
  if (event.target.id === "right_img") {
    rightImageRandom.clickTime++;
  }
  setItem();

  if (totalClicks === 25) {
    //remove event listener
    allpro.removeEventListener('click', clickImage);
    listResult();
    chartResult();  
  }
}
allpro.addEventListener('click', clickImage);

function listResult() {

  var ulEl = document.getElementById('results');
  for (var i = 0; i < busmallobjects.length; i++) {
    var liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${busmallobjects[i].name} had ${busmallobjects[i].clickTime}  click  ${busmallobjects[i].view} view`;
  }
}
function setItem(){
  var setResult = JSON.stringify(busmallobjects);
  localStorage.setItem( 'result of set', setResult);
  // var clicks = JSON.stringify(Busmall.clickclick);
  // localStorage.setItem( 'clicktimes', clicks);
  // var views = JSON.stringify(Busmall.view);
  // localStorage.setItem( 'viewstime', views);
}
function getItem(){
  var getResult = localStorage.getItem('result of set');
if (getResult){
  busmallobjects = JSON.parse(getResult);}
  // var clicktimes = localStorage.getItem('clicktimes');
  // Busmall.clickclick = JSON.parse(clicktimes);
  // var viewstime = localStorage.getItem('viewstime');
  // Busmall.view = JSON.parse(viewstime);
}
var ctx = document.getElementById('myObject').getContext('2d');

function chartResult() {

  var productName = [];
  var clickobject = [];
  var viewsArr = [];
  for (var i = 0; i < busmallobjects.length; i++) {
    var nameOfProduct = busmallobjects[i].name;
    productName.push(nameOfProduct);
    var objectclick = busmallobjects[i].clickTime;
    clickobject.push(objectclick);
    var viewsnumber = busmallobjects[i].view;
    viewsArr.push(viewsnumber);
  }


  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: '# of votes',
        data: clickobject,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        bclicksColor: 'rgba(255, 99, 132, 1)',
        bclicksWidth: 1
      },
      {

          labels: viewsArr,
          label: '# of views',
          data: viewsArr,
          backgroundColor: 'rgba(100, 69, 100, 0.2)',
          bclicksColor: 'rgba(255, 99, 132, 1)',
          bclicksWidth: 1

       } ]
      },

        options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        responsive: true,
            maintainAspectRatio: false,
      }
      
  }
  
  );
   
}
getItem();
