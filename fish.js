class Fish{
  constructor(ctx,url,speed) {
    this.ctx = ctx
    this.img = new Image()
    this.img.src = url
    this.x = 1200
    this.y =  200    
    this.width = 100
    this.speed = speed
  }
  update(){
    this.x -= this.speed 
    if (this.x < -20 - this.width){
      this.x += canvas.width + this.width
    }

  }
  draw (){
    this.ctx.drawImage(this.img,this.x,this.y);
  }
  
}

console.log("hello")