class GameOver extends Phaser.Scene{
    constructor(){
        super({key: "GameOver"});
    }

    create(){

        let gameOver = {
            action: 'gameOver',
            allGameSessionId : sessionID,
            gameSessionId : startGame.gameSessionId,
            level: gameOptions.stage,
            score : gameOptions.score,
            timeStamp : Date.now()
        }

        window?.parent.postMessage(gameOver, '*');

        this.blurBg = this.add.image(game.config.width/2, game.config.height/2, `bgBlur_${gameOptions.marker}`);
        this.blurBg.setDisplaySize(game.config.width, game.config.height);

        this.uiBg = this.add.image(game.config.width/2, game.config.height/2, `gameOverBg`);
        this.uiBg.setDisplaySize(game.config.width, game.config.height);
        
        this.loseSound = this.sound.add('lose', {loop: false, volume: 0.2});
        this.loseSound.play();

        this.score = this.add.text(game.config.width/2-150, game.config.height - 100, `${gameOptions.score}`, { fontFamily:'Rubik-Medium', fontStyle:'bold', fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        this.scoreTitle = this.add.text (this.score.x, this.score.y - 75, "Счет", {
            fontFamily: 'Rubik-Regular',
            fontSize: 48,
            fontStyle: 'normal',
            color: '#D0DBD1',
        }).setOrigin(0.5);

        // this.stageName = this.add.text(game.config.width/2, this.score.y + 100, `УРОВЕНЬ: ${gameOptions.stage}`,{
        //     fontFamily: 'Nunito',
        //     fontSize: 30,
        //     fontStyle: 'bold',
        //     color: '#000000',
        //     align: 'center'
        // })

        
        // this.stageName.setOrigin(0.5);

        this.btnRestart = this.add.sprite(game.config.width/2, game.config.height/2+50, "button").setScale(0.4);

        this.btnExit = this.add.sprite(this.btnRestart.x, this.btnRestart.y+130,"button").setScale(0.3);
        
        this.selector = this.add.image(this.btnRestart.x, this.btnRestart.y, "selector");
        this.selector.setScale(0.565, 0.57);

        this.btnRestartText = this.add.text(this.btnRestart.x, this.btnRestart.y, "ЗАНОВО",{
            fontFamily: 'Nunito',
            fontSize: 50,
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        });

        this.btnExittText = this.add.text(this.btnExit.x, this.btnExit.y, "ВЫЙТИ",{
            fontFamily: 'Nunito',
            fontSize: 45,
            color: '#2E3D66',
            fontStyle: 'bold',
            align: 'center'
        });
        this.btnExittText.setOrigin(0.5);

        this.btnRestartText.setOrigin(0.5);

        this.btnRestart.setInteractive();
        this.btnExit.setInteractive();

        gameOptions.isOver = true;
        gameOptions.bossIsDead = false;

        this.saveScore();

        this.loadScore();

        this.versionText = this.add.text(game.config.width - 100, 40, `${game_version}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '30px', fill: '#fff' }).setOrigin(0.5);
        this.controlInfo = this.add.image(game.config.width - 250, game.config.height - 90, 'controlMenu_info');

        document.addEventListener('keydown',(e)=>{
            if(e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196){
                this.onPressExit()
            }
        })
    }

    saveScore(){
        this.heighScore = gameOptions.score;
        this.oldScore = JSON.parse(localStorage.getItem('heighScore_KH'));
        this.heighScore > this.oldScore ? localStorage.setItem('heighScore_KH', JSON.stringify(this.heighScore)) : this.heighScore = this.oldScore;
    }

    // loadScore(){
    //     if(localStorage.getItem('heighScore_KH')){
    //         this.heigScoreText = this.add.text(this.score.x - 170, this.score.y + 50, `РЕКОРД: ${JSON.parse(localStorage.getItem('heighScore_KH'))}`, {
    //             fontFamily: 'Nunito-black',
    //             fontSize: 65,
    //             fontStyle: 'bold',
    //             color: '#2E3D66',
    //             align: 'center'
    //         })
    //     }
    // }

    loadScore(){
        if(localStorage.getItem('heighScore_KH')){
            this.heigScoreText = this.add.text(game.config.width / 2 + 150, game.config.height - 100,`${JSON.parse(localStorage.getItem('heighScore_KH'))}`, {
                fontFamily: 'Rubik-Medium',
                fontSize: 64,
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);

            this.heigScoreTitle = this.add.text(this.heigScoreText.x, this.heigScoreText.y - 75, "Рекорд", {
                fontFamily: 'Rubik-Regular',
                fontSize: 48,
                fontStyle: 'normal',
                color: '#D0DBD1',
            }).setOrigin(0.5);

            this.line = this.add.image(game.config.width / 2, game.config.height - 100, 'line').setOrigin(0.5);
        }
    }

    selectorDown(){
        if(gameOptions.isOver == true){
            if(this.selector.y != this.btnExit.y){
                this.selector.y = this.btnExit.y
                this.btnExittText.setColor('#FFFFFF');
                this.btnRestartText.setColor('#2E3D66');
                this.selector.setScale(0.4)
                clickSound.play();
            }
        }
    }

    selectorUp(){
        if(gameOptions.isOver == true){
            if(this.selector.y != this.btnRestart.y){
                this.selector.y = this.btnRestart.y
                this.btnExittText.setColor('#2E3D66');
                this.btnRestartText.setColor('#FFFFFF');
                this.selector.setScale(0.565, 0.57);
                clickSound.play();
            }
        }
    }

    restartBtn(){
        clickSound.play();
        if(gameOptions.isOver == true){
            mainMenu.bgMusic.resume();
            this.scene.start(playgame)
            gameOptions.onGame = true,
            gameOptions.onPause = false,
            gameOptions.knifeCount = 8,
            gameOptions.rotationSpeed = 1,
            gameOptions.throwSpeed = 150,
            gameOptions.targetHp = 7,
            gameOptions.hitScore = 0,
            gameOptions.score = 0,
            gameOptions.minAngle = 15,
            gameOptions.canThrow = true,
            gameOptions.isOver = false,
            gameOptions.stage = 1,
            gameOptions.stageStep = 0,
            gameOptions.rotationVariation = 2,
            gameOptions.changeTime = 2000,
            gameOptions.maxRotationSpeed = 3,
            gameOptions.isMenu = false,
            gameOptions.x = 500,
            gameOptions.boss = false,
            gameOptions.marker = 1
            lvlIndex = 1


            startGame.gameSessionId = generateUUID();
            startGame.allGameSessionId = sessionID;
            window?.parent.postMessage(startGame, '*');
        }
    }

    gameToggle(){
        if(gameOptions.isOver == true){
            if(this.selector.y == this.btnRestart.y){
                this.restartBtn()
            }
            else if(this.selector.y == this.btnExit.y){
                this.onPressExit()
            }
        }
    }

    exit(){
        clickSound.play();
        if(!posted){
            let closeGameSession = {
                action: 'closeGameSession',
                allGameSessionId : sessionID,
                timeStamp : Date.now()
            }
    
            window?.parent.postMessage(closeGameSession, '*');
            posted = true;
        }
    }
    onPressExit(){
        if(gameOptions.isOver == true){
            clickSound.play();
            this.exit();
        }
    }
}

var gameOver = new GameOver()