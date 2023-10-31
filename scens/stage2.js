

class Stage2 extends Phaser.Scene{
    constructor(){
        super({key: "stage2"})
    }
    create(){

        try{
            var levelUp = {
                action: 'levelUp',
                allGameSessionId : sessionID,
                gameSessionId : startGame.gameSessionId,
                level: gameOptions.stage,
                score: gameOptions.score,
                timeStamp: Date.now()
            }
            window?.parent.postMessage(levelUp, parentOrigin);

        this.backGround = this.add.image(game.config.width/2, game.config.height/2, `bg_${gameOptions.marker}`);
        this.backGround.setOrigin(0.5);
        this.backGround.setDisplaySize(game.config.width, game.config.height);

        this.winSound = this.sound.add('win', {loop: false, volume: 0.5});
        this.winSound.play();
        // this.playBackground = this.add.image(game.config.width/2, game.config.height/2, "playBackground");
        // this.playBackground.setScale(0.4)
        var canvas = document.querySelector("canvas");
        this.newStageText = this.add.text(canvas.width * 0.5, 750, `УРОВЕНЬ ${gameOptions.stage} ПРОЙДЕН!`,{
            fontFamily: 'Nunito-black',
            fontSize: 50,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.newStageText.setOrigin(0.5)
        this.targetBG = this.add.image(game.config.width / 2, 422, gameOptions.boss ? `bossBg_${gameOptions.marker}` : `targetBg_${gameOptions.marker}`).setScale(0.45);
        this.target = this.add.sprite(game.config.width / 2, 422, "target");
        this.target.setScale(0.45)
        this.target.depth = 1
        this.anim = this.add.group()
        var flower
        for(var n=0; n<=10; n++){
            flower = this.add.sprite(game.config.width / 2, game.config.height / 2-150, `flower_${gameOptions.marker}`);
            flower.angle = 90
            flower.setScale(0.8)
            this.anim.add(flower)
            flower.angle += 40*n
            flower.play(`blooming_${gameOptions.marker}`)
            flower.anims.msPerFrame = 60
        }
        
        
        var timedEvent = this.time.addEvent({
            delay: 2000,
            callback: this.sceneStart,
            callbackScope: this,
            loop: false
        });
        
        }
        

        catch(er){
            var levelUpError = {
                action: 'levelUpError',
                allGameSessionId : sessionID,
                gameSessionId : startGame.gameSessionId,
                level: gameOptions.stage,
                score: gameOptions.score,
                timeStamp: Date.now()
            }
            window?.parent.postMessage(levelUpError, parentOrigin);
        }
    }
    
    update(){
        
        var children = this.anim.getChildren();
        setTimeout(()=>{for (var i = 0; i <= 10; i++){
            var radians = Phaser.Math.DegToRad(children[i].angle + 90);
            children[i].x = this.target.x + (this.target.width / 3) * Math.cos(radians) ;
            children[i].y = this.target.y + (this.target.width / 3) * Math.sin(radians) ;
            }
        }, 200)
    }
     

    sceneStart(){
        if(gameOptions.stage%5==0){
            if(gameOptions.marker < 5){
                gameOptions.marker+=1
            }
            else{
                gameOptions.marker=1
            }
        }
        if((gameOptions.stage + 1) % 5 == 0){
            this.scene.start("StageBoss")
            gameOptions.onGame = true
            gameOptions.rotationSpeed += 0.5
            gameOptions.targetHp = 15
            gameOptions.knifeCount = 16
            gameOptions.hitScore = 0
            gameOptions.stage+=1
            gameOptions.canThrow = true
            lvlIndex === 5 ? lvlIndex = 1 : lvlIndex+=1
            
        }
        else{
            this.scene.start(playgame)
            gameOptions.canThrow = true
            gameOptions.knifeCount++
            gameOptions.rotationSpeed += 0.2
            gameOptions.targetHp += 1
            gameOptions.hitScore = 0
            gameOptions.stage +=1
            gameOptions.x -= 20
            gameOptions.onGame = true
            gameOptions.boss = false
            lvlIndex === 5 ? lvlIndex = 1 : lvlIndex+=1
        }
    }
}

var stage2 = new Stage2()