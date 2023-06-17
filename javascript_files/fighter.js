class Fighter{
    constructor({position, velocity, height= 150, width = 50, color, weapon}){
        this.position = position
        this.velocity = velocity
        this.height = height
        this.width = width
        this.color = color
        this.weapon  = {
            name: "weapon",
            position:{

                x: this.position.x, 
                y: this.position.y,
            },
            width: weapon.width,
            height: weapon.height,
            offset: weapon.offset,
            color: weapon.color

        }
        this.health = 100
        this.lastKey
        this.isAttacking
    }

    draw(){
        
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        c.fillStyle = this.color
        c.fillRect(this.position.x,this.position.y, this.width, this.height)
        this.weapon.position.x = this.position.x + this.weapon.offset.x
        this.weapon.position.y = this.position.y+ this.weapon.offset.y
        if(this.isAttacking){
            c.fillStyle = this.weapon.color
            c.fillRect(this.weapon.position.x ,this.weapon.position.y , this.weapon.width, this.weapon.height)
        }   
        

    }
    update(){

        this.draw()
        if (this.position.y + this.height >= canvas.height ){
            this.velocity.y = 0
        }
        else{
            this.velocity.y += gravity
        }

        
    }

    attack(){
        this.isAttacking = true
        setTimeout(() => this.isAttacking = false , 100)
    }


}