function CarGame(){
  var container;
  var road;
  var score = 0;
  var car;
  var that = this;
  var moveY = 0;
  var intervalId;
  var traffic;
  var allTraffic = [];
  var bullet;
  var allBullet = [];
  var bulletCounter = 10;
  var bulletFlag = 0;
 
  this.init = function(){
    container = document.getElementsByClassName('container')[0];

    car = new Car();
    car.addClass('car');
    car.setInitialPos({posX: 150, posY: 490});
    car.appendTo(container);
    that.startGame();
    
  }

  this.startGame = function(){
    road = document.getElementsByClassName('road')[0];

    document.addEventListener('keydown', that.moveCar);

    //Main Game Loop
    intervalId = setInterval(function(){
      score++;

      that.updateBullet();
      that.updateBg();
      that.createTraffic();
      that.updateTraffic();
      that.collisionDetect();
      that.displayBoard();
    }, 5);
  }

  this.updateBg = function(){
    moveY -= 3; 
    road.style.bottom = moveY + 'px'; 
  }

  this.createTraffic = function(){
    if(moveY % 250 == 0){
      traffic = new Traffic(container);
      traffic.create(-moveY);
      allTraffic.push(traffic);
    }
  }

  this.updateTraffic = function(){
    var trf = allTraffic;
    for(var i = 0; i < trf.length; i++){
      trf[i].update();
    }
  }

  this.moveCar = function(e){
    if (e.keyCode == '37' && car.posX != 40) { //left
      car.movePos(-110);
    }
    if(e.keyCode == '39' && car.posX != 260){ //right
      car.movePos(+110);
    }
    if(e.keyCode == '32' && bulletCounter !=0) {// && bulletFlag < 2){
      bullet = new Bullet(car);
      bullet.create(container);
      allBullet.push(bullet);
      bulletCounter--;
      bulletFlag++;
    }
  }

  this.updateBullet = function(){

    for(var i = 0; i < allBullet.length; i++){
        allBullet[i].update();
        if(allBullet[i].bulletY == 0){
          allBullet[i].deleteBullet(container);
          allBullet.splice(i, 1);
          bulletFlag--;
        }
    }
  }

  this.collisionDetect = function(){
    var carX = car.posX;
    var carY = car.posY;
    var traffic = allTraffic;
    var bullet = allBullet;
    for(var i = 0; i < traffic.length; i++) {
      if(traffic[i].posX <= carX + 100 && traffic[i].posX + 100 >= carX && traffic[i].posY <= carY + 100 && traffic[i].posY + 100 >= carY){
        that.gameOver();
      }  
    
      for(var j = 0; j < bullet.length; j++) {
        if(traffic[i].posX <= bullet[j].bulletX + 100
            && traffic[i].posX + 100 >= bullet[j].bulletX
            && traffic[i].posY <= bullet[j].bulletY + 100
            && traffic[i].posY + 100 >= bullet[j].bulletY) {
          traffic[i].deleteTraffic(container);
          traffic = traffic.splice(i,1);
          bullet[j].deleteBullet(container);
          bullet = bullet.splice(j, 1);
          bulletFlag--;
        }  
      }
    }
  }

  this.displayBoard = function(){
    var scoreBoard = document.getElementById('score');
    var bullets = document.getElementById('bullets');

    bullets.innerHTML = bulletCounter;
    scoreBoard.innerHTML = score;
  }

  this.gameOver = function(){
    var gameOverScreen = document.getElementsByClassName('game-over')[0];
    clearInterval(intervalId);
    gameOverScreen.style.display = 'block';
  }

  

}

var carGame = new CarGame();
carGame.init();
