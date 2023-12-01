console.log(maps)
const d = document;
window.addEventListener('load', setCanvasSize )
window.addEventListener('resize', setCanvasSize)
const canvas = d.querySelector('#canvas') 
const game = canvas.getContext('2d') 
const btnUp = d.querySelector('#up')
const btnLeft = d.querySelector('#left')
const btnRight = d.querySelector('#right')
const btnDown = d.querySelector('#down')
let canvasSize;
let elementSize;
let level = 0
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined 
}

const giftPosition = {
    x:undefined,
    y:undefined
}

let enemypositions = []


 

function setCanvasSize(){

    if(window.innerWidth > window.innerHeight){
        canvasSize = Number((window.innerHeight * 0.7).toFixed(0))
    }else{
        canvasSize = Number((window.innerWidth * 0.7).toFixed(0))
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    startGame()

}


function startGame(){

    elementSize = Number(((canvasSize / 10) - 1).toFixed(0))

    game.font = elementSize + 'px Verdana'
    game.textAlign = "start"

    const map = maps[level]

    if(!map){
        gameWin()
        return;
    }
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    enemypositions = []
    game.clearRect(0,0,canvasSize,canvasSize)

    
   mapRowCols.forEach((row, rowI)=>{
    row.forEach((col, colI)=>{
        const emoji = emojis[col]
        const posX = elementSize * colI
        const posY = elementSize *(rowI + 1)

        if(col == 'O'){
            if(!playerPosition.x & !playerPosition.y){
            playerPosition.x = posX
            playerPosition.y = posY
            }
        }else if( col == 'I'){
            giftPosition.x = posX
            giftPosition.y = posY
        }else if(col == 'X'){
            enemypositions.push({
                x: posX,
                y: posY
            })
        }

        
        game.fillText(emoji, posX , posY)
        
    })
   })

   movePlayer()

   console.log(playerPosition)

   


    /* for(let row = 0 ; row <=10; row++){
        for(let col = 0 ; col <10; col++)
        game.fillText(emojis[mapRowCols[row][col]], elementSize * col   , elementSize * row + 50 )

    } */
    
    console.log({canvasSize, elementSize})  
    console.log(window.innerHeight)
    console.log(window.innerWidth)
}

function gameWin(){
    console.log('!you passed this game!')
}



function movePlayer(){
    const giftCollisionX = playerPosition.x == giftPosition.x
    const giftCollisionY = playerPosition.y == giftPosition.y
    const giftCollision = giftCollisionX && giftCollisionY

    if(giftCollision){
       levelWin()
    }

    const enemyCollision = enemypositions.find(enemy=>{
        const enemyCollisionX = enemy.x == playerPosition.x
        const enemyCollisionY = enemy.y == playerPosition.y
        return enemyCollisionX && enemyCollisionY

    })

    if(enemyCollision){
        console.log('Chocaste con un enemigo')
        levelFail()
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
   }

   function levelWin(){
    level++;
    startGame()
   }

   function levelFail(){
    lives--

    if(lives<=0){
        level =0
        lives =3
    }


    playerPosition.x = undefined;
    playerPosition.y= undefined;
    startGame()


   }

window.addEventListener('keydown', moveByKeys)

function moveByKeys(e){
    if(e.key == 'ArrowUp') moveUp()
    else if(e.key == 'ArrowLeft') moveLeft()
    else if(e.key == 'ArrowRight') moveRight()
    else if(e.key == 'ArrowDown') moveDown()
}

function moveUp(){
    if((playerPosition.y - elementSize) < elementSize) {
        console.log('OUT')
    }else{
       playerPosition.y -= elementSize 
        startGame()
        console.log('I am moving Up ⬆️') 
    }
    

}

function moveLeft(){
    if(playerPosition.x  < elementSize) {
        console.log('OUT')
    }else{
       playerPosition.x -= elementSize 
        startGame()
        console.log('I am moving Up ⬆️') 
    }
    
}

function moveRight(){
    if((playerPosition.x + elementSize + 20) > canvasSize) {
        console.log('OUT')
    }else{
       playerPosition.x += elementSize 
        startGame()
        console.log('I am moving Up ⬆️') 
    }
    
}
function moveDown(){
    if((playerPosition.y + elementSize) > canvasSize) {
        console.log('OUT')
    }else{
       playerPosition.y += elementSize 
        startGame()
        console.log('I am moving Up ⬆️') 
    }
}

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)





