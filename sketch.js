const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

var engine, world;
var box1, pig1;
var backgroundImg, bg2, platform;
var bird, slingShot;
var score = 0;


bg2 = "sprites/bg2.jpg";
function preload() {
    changeBackground();
}

function setup() {
    var canvas = createCanvas(1200, 400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600, height, 1200, 20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810, 260, 300, PI / 2);

    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig3 = new Pig(810, 220);

    log3 = new Log(810, 180, 300, PI / 2);

    box5 = new Box(810, 160, 70, 70);
    log4 = new Log(760, 120, 150, PI / 7);
    log5 = new Log(870, 120, 150, -PI / 7);

    bird = new Bird(200, 50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body, { x: 200, y: 50 });

    mousey = Mouse.create(canvas.elt);
    pixelRatio = pixelDensity();
    var op = {
        mouse: mousey,
        stiffness: 0.02,
        length: 10
    }
    mconstraint = MouseConstraint.create(engine, op);
    World.add(world, mconstraint);

}

function draw() {
    if (backgroundImg)
        background(backgroundImg);
    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();

    pig1.score();
    pig3.score();
    textSize(35);
    text("Score -" + score, 900, 50);
}

/*function mouseDragged(){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}*/


function mouseReleased() {
    setTimeout(fly, 100);
}
function keyPressed() {
    if (keyCode === 32) {
        Body.setPosition(bird.body, { x: 100, y: 50 });
        slingshot.attach(bird.body);
    }
}
function fly() {
    slingshot.fly();
}
async function changeBackground() {
    var file = await fetch("https://worldtimeapi.org/api/timezone/Asia/kolkata");
    var fileJSON = await file.json();

    var datetime = fileJSON.datetime;
    var time = datetime.slice(11, 13);
    if (time >= 07 && time <= 19) {
        bg2 = "sprites/bg.png";
    }
    else {
        bg2 = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg2);
}