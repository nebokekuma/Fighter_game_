let timmer = 60
let timeoutId




function rectangleCollision({rectangle1, rectangle2}){
    return (
        rectangle1.weapon.position.x + rectangle1.weapon.width >= rectangle2.position.x &&
        rectangle1.weapon.position.x  <= rectangle2.position.x + rectangle2.width &&
        rectangle1.weapon.position.y + rectangle1.weapon.height >= rectangle2.position.y &&
        rectangle1.weapon.position.y  <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner(player1, player2, timeoutId){
    clearTimeout(timeoutId)
    resultContainer.style.display = 'flex'
    if (player1.health > player2.health){
        resultContainer.innerHTML = "player1 Wins"
    }else if (player1.health < player2.health){
        resultContainer.innerHTML = "player2 Wins"
    }else{
        resultContainer.innerHTML = "Draw"
    }
    
}



function decreaseTimmer(){
    if(timmer>0){
        timmerElement.innerHTML = timmer
        timeoutId = setTimeout(decreaseTimmer, 1000)
        timmer--
    }

    if(timmer === 0){
        determineWinner(player, enemy, timeoutId)
    }

}

function offMapChecker(object){
    if (object.position.x + object.width >= canvas.width || object.position.x < 0){
        return true
    }
}
