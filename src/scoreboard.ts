import { Dash_GlobalCanvas } from "dcldash";

class ScoreboardInstance {
    private scoreValue: number = 0
    private scoreText: UIText = new UIText(Dash_GlobalCanvas)

    constructor(){
        this.scoreText.value = "0"
        this.scoreText.fontSize = 100
        this.scoreText.hAlign = "left"
        this.scoreText.vAlign = "center"
    }

    increaseScore(value: number){
        this.scoreValue += value
        this.scoreText.value = this.scoreValue.toString()
    }
}

export const Scoreboard = new ScoreboardInstance()