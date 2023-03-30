import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false
let powerUsed = false


function getNewMonster() {
    let nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}


function attack() {
    if(!isWaiting){
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{                
                endGame()
            }
        }    
    }
}

function endGame() {
    isWaiting = true
   
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
            "The monsters are Victorious"

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                    <button id="refresh" onclick="window.location.reload()">New Game</button>
                </div>
                `
        }, 1500)
}


document.getElementById("attack-button").addEventListener('click', attack)

function useHeroPower() {
    if(wizard.health <= 15 ) {
        if(!powerUsed) {
            document.querySelector(".option-heal").style.backgroundColor = "red"
           document.querySelector(".option-heal").addEventListener("click", function() {
               wizard.useCharacterPower(wizard.currentDiceScore)
               powerUsed = true
               render()
           }) 
           document.querySelector(".option-attack").style.backgroundColor = "red"
           document.querySelector(".option-attack").addEventListener("click", function() {
               monster.takeDamage(wizard.currentDiceScore)
               powerUsed = true
               render()
               if(monster.dead)
               endGame()
            })   
       }
       
    }
}


function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
    useHeroPower()
}


let wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()


