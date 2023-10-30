class ScenePause extends Phaser.Scene{
    constructor(){
        super({key: 'scenePause'});
    }

    create(){

        try{
            let gamePause = {
                action: 'gamePause',
                allGameSessionId: startGame.allGameSessionId,
                gameSessionId: startGame.gameSessionId,
                score: gameOptions.score,
                level: gameOptions.stage,
                timeStamp : Date.now()
            }
    
            window?.parent.postMessage(gamePause, '*');


        this.blurBg = this.add.image(game.config.width/2, game.config.height/2, `bgBlur_${gameOptions.marker}`);
        this.blurBg.setDisplaySize(game.config.width, game.config.height);
        this.uiBg = this.add.image(game.config.width/2, game.config.height/2, `pauseBg`);
        this.uiBg.setDisplaySize(game.config.width, game.config.height);

        var canvas = document.querySelector("canvas");

        this.btnResume = this.add.sprite(game.config.width/2, canvas.height/2+50, "button").setScale(0.4);
        
        this.btnExit = this.add.sprite(this.btnResume.x, this.btnResume.y+130,"button").setScale(0.3);
        this.selector = this.add.image(this.btnResume.x, this.btnResume.y, "selector");
        this.selector.setScale(0.57);

        this.btnResumetText = this.add.text(this.btnResume.x, this.btnResume.y, "ПРОДОЛЖИТЬ",{
            fontFamily: 'Nunito',
            fontSize: 50,
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        });
        this.btnResumetText.setOrigin(0.5);

        this.btnExittText = this.add.text(this.btnExit.x, this.btnExit.y, "ВЫЙТИ",{
            fontFamily: 'Nunito',
            fontSize: 45,
            color: '#2E3D66',
            fontStyle: 'bold',
            align: 'center'
        });

        this.btnExittText.setOrigin(0.5);
        this.btnResume.setInteractive();
        this.btnExit.setInteractive();

        this.btnResume.on('pointerdown', this.resumeGame, this);
        this.btnExit.on('pointerdown', this.exit, this);
        this.input.keyboard.on('keydown-ENTER', this.gameToggle, this);
        this.input.keyboard.on('keydown-BACKSPACE', this.onPressExit, this);

        document.addEventListener('keydown',(e)=>{
            if(e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196){
                this.onPressExit()
            }
        })

        gameOptions.onPause = true;

        this.input.keyboard.on('keydown-S', this.selectorDown, this);

        this.score = this.add.text(game.config.width/2-150, game.config.height - 100, `${gameOptions.score}`, { fontFamily:'Arial', fontStyle:'bold', fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        this.scoreTitle = this.add.text (this.score.x, this.score.y - 75, "Счет", {
            fontFamily: 'Rubik-Regular',
            fontSize: 48,
            fontStyle: 'normal',
            color: '#D0DBD1',
        }).setOrigin(0.5);
        this.selector.setScale(0.565, 0.57)
        
        this.versionText = this.add.text(game.config.width - 100, 40, `${game_version}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '30px', fill: '#fff' }).setOrigin(0.5);
        this.controlInfo = this.add.image(game.config.width - 250, game.config.height - 90, 'controlMenu_info');
        this.loadScore();

    }
    catch(er){
        let gamePauseError = {
            action: 'gamePauseError',
            allGameSessionId: startGame.allGameSessionId,
            gameSessionId: startGame.gameSessionId,
            score: gameOptions.score,
            level: gameOptions.stage,
            timeStamp : Date.now()
        }

        window?.parent.postMessage(gamePauseError, '*');
    }
    };

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
                fontFamily: 'Arial',
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
        if(gameOptions.onPause == true){
            if(this.selector.y != this.btnExit.y){
                this.selector.y = this.btnExit.y
                this.btnExittText.setColor('#FFFFFF');
                this.btnResumetText.setColor('#2E3D66');
                this.selector.setScale(0.4)
                clickSound.play();
            }
        }
    }

    selectorUp(){
        if(gameOptions.onPause == true){
            if(this.selector.y != this.btnResume.y){
                this.selector.y = this.btnResume.y
                this.btnResumetText.setColor('#FFFFFF');
                this.btnExittText.setColor('#2E3D66');
                this.selector.setScale(0.565, 0.57)
                clickSound.play();
            }
        }
    }

    gameToggle(){
        if(gameOptions.onPause == true){
            if(this.selector.y == this.btnResume.y){
                this.resumeGame();
            }
            else if(this.selector.y == this.btnExit.y){
                this.onPressExit();
            }
        }
    };

    resumeGame(){
        clickSound.play();
        this.scene.resume(playgame);
        this.scene.stop(scenePause);
        mainMenu.bgMusic.resume();
        gameOptions.onPause = false;
        gameOptions.onGame = true;
    };
    exit(){
        clickSound.play();
        if(!posted){
            let closeGameSession = {
                action: 'closeGameSession',
                allGameSessionId : sessionID,
                timeStamp : Date.now()
            }
            let gameOver = {
                action: 'gameOver',
                allGameSessionId : sessionID,
                gameSessionId : startGame.gameSessionId,
                level: gameOptions.stage,
                score : gameOptions.score,
                timeStamp : Date.now()
            }
    
            window?.parent.postMessage(gameOver, '*');
    
            window?.parent.postMessage(closeGameSession, '*');
            posted = true;
        }
    }
    onPressExit(){
        if(gameOptions.onPause == true){
            clickSound.play();
            this.exit();
        }
    }

}
var scenePause = new ScenePause();