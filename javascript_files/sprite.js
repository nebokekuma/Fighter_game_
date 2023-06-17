class Sprite{
    constructor({position, width, height, imageSrc}){
        this.position = position
        this.width = width
        this.height = height
        this.image = new Image()
        this.image.src = imageSrc

    
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }   
        


    update(){

        this.draw()
      

        
    }



}