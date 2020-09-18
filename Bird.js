class Bird extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image = loadImage("sprites/bird.png");
    this.smoke = loadImage("sprites/smoke.png");
    this.path =[];
  }

  display() {
    super.display();
    if(this.body.position.x>300 && this.body.velocity.x >10){
      var position = [this.body.position.x,this.body.position.y];
      this.path.push(position);
    }
    for(var a=0;a<this.path.length;a+=1){
      image(this.smoke,this.path[a][0],this.path[a][1]);
    }
  }
}
