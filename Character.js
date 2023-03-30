import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from './utils.js'
let images = ["dice-six-faces-one.svg",
"dice-six-faces-two.svg",
"dice-six-faces-three.svg",
"dice-six-faces-four.svg",
"dice-six-faces-five.svg",
"dice-six-faces-six.svg"]


class Character {
    constructor(data) {
        Object.assign(this, data)
        this.maxHealth = this.health
        this.diceHtml = getDicePlaceholderHtml(this.diceCount)
    }

    setDiceHtml() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num) =>

            `<img class="dice" src="images/${images[num - 1]}"/>`).join("")
    }

    takeDamage(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, num) => {
          return  total + num
        }
       )
        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }
    }

    getHealthBarHtml() {
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                            style="width:${percent}%;">
                    </div>
                </div>`
    }

    useCharacterPower(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, num) => {
            return  total + num
          }
         )
        return this.health += totalAttackScore
    }

    getCharacterHtml() {
        const { name, avatar, health, diceHtml } = this
        const healthBar = this.getHealthBarHtml()
        return `
            <div class="character-card">               
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health"><div>health: <b> ${health} </b></div> ${name == "Wizard" ?
                `<div class="hero_help">
                   <img class="option-attack options" src="images/spell.png"/>
                   <img class="option-heal options" src="images/health.png"/>
                   </div>` : ""}</div>
                ${healthBar}
                <div class="dice-container">
                    ${diceHtml}
                </div>
                
            </div>`
    }
}

export default Character