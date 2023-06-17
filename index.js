const canvas = document.querySelector('canvas');
const canvasContainer = document.querySelector('#canvas-container')
const c = canvas.getContext('2d');
const enemyHealthBar = document.querySelector("#player2-health-bar")
const playerHealthBar = document.querySelector("#player1-health-bar")
const timmerElement = document.querySelector("#timmer")
const resultContainer = document.querySelector('#result-container')
const gravity = 0.7




canvas.width = 1024
canvas.height = 576



const keys = {
    d : {
        pressed : false,
        
    },
    a : {
        pressed : false,
        
    },
    s : {
        pressed : false,
        
    },
    w : {
        pressed : false,  
    },
    arrowUp:{
        pressed : false,
    },
    arrowLeft : {
        pressed : false,
        
    },
    arrowRight : {
        pressed : false,
        
    },
    arrowDown : {
        pressed : false,
        
    }
    
}


// background declaration 

const backgroundImage = new Sprite(
    {
        position:{
            x: 0,
            y: 0
        },
        width: 1024,
        height: 576,
        imageSrc: 'images/background.png'

    }
)



// Player declaration

const player = new Fighter({ 
    position:{
        x: 0,
        y:0
    },
    velocity:{
        x: 0,
        y: 0   
    },
    color: "red",
    weapon:{
        width: 100,
        height: 30,
        offset: {
            x: 0,
            y: 0
        },
        color: "green"

    } 
    
})
const enemy = new Fighter({ 
    position:{
        x: 512,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0  
    },
    color: 'blue',
    weapon:{
        width: 100,
        height: 30,
        offset: {
            x:-50,
            y: 0
        },
        color: 'green'
    } 
    
})









function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = "black"
    c.fillRect(0,0,canvas.width, canvas.height)
    backgroundImage.update
    player.update()
    enemy.update()

    //player movement 
    if (keys.d.pressed && player.lastKey === 'd' ) {
        player.velocity.x = 8
    }else if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -8
    }else{
        player.velocity.x = 0

    }

    //enemy movement
    if (keys.arrowRight.pressed && enemy.lastKey === 'ArrowRight' ) {
        enemy.velocity.x = 8
    }else if (keys.arrowLeft.pressed && enemy.lastKey === 'ArrowLeft' ){
        enemy.velocity.x = -8
    }else{
        enemy.velocity.x = 0

    }

   //collison dectection

    if (rectangleCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
        player.isAttacking
    ){
        player.isAttacking = false
        enemy.health -= 5
        enemyHealthBar.style.width = enemy.health + '%'
    }

    if (rectangleCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking
    ){
        enemy.isAttacking = false
        player.health -= 5
        playerHealthBar.style.width = player.health + '%'
    }


    //end game based on health 

    if (player.health <= 0 || enemy.health <= 0){
        determineWinner(player, enemy, timeoutId)
    }


}






// Event listeners for movement and user input

window.addEventListener('keydown', (e)=> {
    switch (e.key){
        case "a":
            keys.a.pressed = true
            player.lastKey = 'a'
            break;
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 's':
            keys.s.pressed = true
            player.lastKey = 's'
            break;
        case 'w':
            keys.w.pressed = true
            player.lastKey = 'w'
            player.velocity.y = -20
            break;
        case 'ArrowLeft':
            keys.arrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowRight':
            keys.arrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            enemy.lastKey = 'ArrowDown'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20
            break;
        case ' ':
            player.attack()
            break;
        case 'Enter':
            enemy.attack()
            break;
    }
}
)

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        case 'ArrowUp':
            keys.arrowUp.pressed = false
            break
        case 'ArrowLeft':
            keys.arrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.arrowRight.pressed = false
            break
        case 'ArrowDown':
            keys.arrowDown.pressed = false
            break

        }
})


// function calls

decreaseTimmer()

animate()