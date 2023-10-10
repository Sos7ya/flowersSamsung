class StageBoss extends Phaser.Scene{
    constructor(){
        super({key:"StageBoss"})
    }

    create(){
        var canvas = document.querySelector("canvas");
        gameOptions.boss = true
        
        this.scene.start("PlayGame")
        }
    }
var stageBoss = new StageBoss();