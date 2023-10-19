var startGame = {
    action: 'startGame',
    allGameSessionId : sessionID,
    gameSessionId: gameId,
    timeStamp: Date.now()
}

class MainMenu extends Phaser.Scene{
    constructor(){
        super({key: "MainMenu"})
    }


    create(){
        console.log('MainMenu started!')
        clickSound = this.sound.add('click', { volume: 0.5, loop: false });
        var blomAnim_1 = this.textures.get('flowerBloom_1').getFrameNames();
        this.anims.create({
            key: 'idle_1',
            frames: this.anims.generateFrameNames('floweridle_1', { 
                start: 1, 
                end: 47,
                prefix: 'Flower-1-Idle_',
                suffix: '.png',
            }),
            duration: 1000,
            repeat: -1
        })
        this.anims.create({
            key: 'idle_2',
            frames: this.anims.generateFrameNames('floweridle_2', { 
                start: 0, 
                end: 47,
                prefix: 'Flower-2-Idle_',
                suffix: '.png',
            }),
            duration: 1000,
            repeat: -1
        })
        this.anims.create({
            key: 'idle_3',
            frames: this.anims.generateFrameNames('floweridle_3', { 
                start: 0,
                end: 47,
                prefix: 'Flower-3-Idle_',
                suffix: '.png',
                }),
            duration: 1000,
            repeat: -1
        })
        this.anims.create({
            key: 'idle_4',
            frames: this.anims.generateFrameNames('floweridle_4', {
                start: 0,
                end: 47,
                prefix: 'Flower-4-Idle_',
                suffix: '.png',
            }),
           
            duration: 1000,
            repeat: -1
        })

        this.anims.create({
            key: 'idle_5',
            frames: this.anims.generateFrameNames('floweridle_5', { 
                start: 0,
                end: 47,
                prefix: 'Flower-5-Idle_',
                suffix: '.png',    
            }),
            duration: 1000,
            repeat: -1
        })
        
        this.anims.create({
            key: 'blooming_2',
            frames: this.anims.generateFrameNames('flowerBloom_2', { 
                start: 0,
                end: 23,
                prefix: 'Flower-2-Bloom_',
                suffix: '.png',
            }),
            duration: 3000,
            repeat: 0
        })

        this.anims.create({
            key: 'blooming_3',
            frames: this.anims.generateFrameNames('flowerBloom_3', { 
                start: 0,
                end: 23,
                prefix: 'Flower-3-Bloom_',
                suffix: '.png',
            }),
            duration: 3000,
            repeat: 0
        })

        this.anims.create({
            key: 'blooming_4',
            frames: this.anims.generateFrameNames('flowerBloom_4', { 
                start: 0,
                end: 23,
                zeroPad: 1,
                prefix: 'Flower-4-Bloom_',
                suffix: '.png' 
                }),
            
            duration: 3000,
            repeat: 0
        })
        this.anims.create({
            key: 'blooming_5',
            frames: this.anims.generateFrameNames('flowerBloom_5', {
                start: 0,
                end: 23,
                prefix: 'Flower-5-Bloom_',
                suffix: '.png',
            }),
            duration: 3000,
            repeat: 0
        })

        this.bgMusic = this.sound.add('music', {loop: true, volume: 0.5});
        gameOptions.isMenu = true;
        gameOptions.onGame = false;
        this.blurBg = this.add.image(game.config.width/2, game.config.height/2, `bgBlur_${gameOptions.marker}`);
        this.blurBg.setDisplaySize(game.config.width, game.config.height);
        this.backGround = this.add.image(game.config.width/2, game.config.height/2, "startBg");
        this.backGround.setOrigin(0.5);
        this.backGround.setDisplaySize(game.config.width, game.config.height);
        // this.playBackground = this.add.image(game.config.width/2, game.config.height/2, "playBackground");
        // this.playBackground.setScale(0.4)
        
        var canvas = document.querySelector("canvas");

        this.btnStart = this.add.sprite(game.config.width/2, game.config.height/2 + 50, "button").setScale(0.4);

        this.btnExit = this.add.sprite(this.btnStart.x, this.btnStart.y+130,"button").setScale(0.3);

        this.selector = this.add.image(this.btnStart.x, this.btnStart.y, "selector");
        this.selector.setScale(0.565, 0.57);

        this.btnStartText = this.add.text(this.btnStart.x, this.btnStart.y, "НАЧАТЬ ИГРУ",{
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
        this.btnStartText.setOrigin(0.5);

        this.btnStart.setInteractive();
        this.btnStart.on('pointerdown', this.startBtn, this)
        this.loadScore();
        
        this.controlInfo = this.add.image(game.config.width - 250, game.config.height - 90, 'controlMenu_info');

        document.addEventListener('keydown',(e)=>{
            if(e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196){
                this.onPressExit()
            }
        })
        this.ageInfo = this.add.image(game.config.width - 150, 100, 'ageInfo');
        this.versionText = this.add.text(game.config.width - 60, game.config.height - 40, `${game_version}`, { fontFamily:'Rubik-Medium', fontStyle:'bold', fontSize: '30px', fill: '#fff' }).setOrigin(0.5);
    }

    // loadScore(){
    //     if(localStorage.getItem('heighScore_KH')){
    //         this.heigScoreText = this.add.text(game.config.width/2, game.config.height - 80, `РЕКОРД: ${JSON.parse(localStorage.getItem('heighScore_KH'))}`, {
    //             fontFamily: 'Nunito-black',
    //             fontSize: 65,
                
    //             fontStyle: 'bold',
    //             color: '#2E3D66',
    //             align: 'center'
    //         }).setOrigin(0.5)
    //     }
    //     else{
    //         this.hieghScoreText = this.add.text(game.config.width/2, game.config.height - 80, `РЕКОРД 0`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '65px', fill: '#2E3D66' }).setOrigin(0.5);
    //     }
    // }

    loadScore(){
        if(localStorage.getItem('heighScore_KH')){
            this.heigScoreText = this.add.text(game.config.width/2, game.config.height - 60, `${JSON.parse(localStorage.getItem('heighScore_KH'))}`, {
                fontFamily: 'Rubik-Medium',
                fontSize: 64,
                fontStyle: 'normal',
                color: '#fff',
            }).setOrigin(0.5)
            this.heigScoreTitle = this.add.text(this.heigScoreText.x, this.heigScoreText.y - 75, "Рекорд", {
                fontFamily: 'Rubik-Regular',
                fontSize: 48,
                fontStyle: 'normal',
                color: '#fff',
            }).setOrigin(0.5)
        }
    }

    selectorDown(){
        if(gameOptions.isMenu == true){
            if(this.selector.y != this.btnExit.y){
                this.selector.y = this.btnExit.y
                this.btnExittText.setColor('#ffffff');
                this.btnStartText.setColor('#2E3D66');
                this.selector.setScale(0.4)
                clickSound.play();
            }
        }
    }

    selectorUp(){
        if(gameOptions.isMenu == true){
            if(this.selector.y != this.btnStart.y){
                this.selector.y = this.btnStart.y
                this.btnExittText.setColor('#2E3D66');
                this.btnStartText.setColor('#ffffff');
                this.selector.setScale(0.565, 0.57);
                clickSound.play();
            }
        }
    }

    startBtn(){
        clickSound.play();
        if(gameOptions.isMenu == true){
            this.scene.start(playgame)
            this.bgMusic.play();
           gameOptions.knifeCount = 8
           gameOptions.rotationSpeed = 1
           gameOptions.throwSpeed = 150
           gameOptions.targetHp = 7
           gameOptions.hitScore = 0
           gameOptions.score = 0
           gameOptions.canThrow = true
           gameOptions.isOver = false
           gameOptions.stageComplete = false
           gameOptions.bossIsDead = false
           gameOptions.stage = 1
           gameOptions.isMenu = false
           gameOptions.y = 500


            startGame.gameSessionId = generateUUID();
            startGame.allGameSessionId = sessionID;
            window?.parent.postMessage(startGame, '*');
            console.log(`started game w: allGame - ${startGame.allGameSessionId} and gameId - ${startGame.gameSessionId}`);
           
        }
    }

    gameToggle(){
        if(gameOptions.isMenu == true){
            if(this.selector.y == this.btnStart.y){
                this.startBtn()
            }
            else if(this.selector.y == this.btnExit.y){
                this.onPressExit();
            }
        }
    }

    exit(){
        clickSound.play();
        let closeGameSession = {
            action: 'closeGameSession',
            allGameSessionId : sessionID,
            timeStamp : Date.now()
        }

        window?.parent.postMessage(closeGameSession, '*');
    }
    onPressExit(){
        if(gameOptions.isMenu == true){
            clickSound.play();
            this.exit();
        }
    }
}

var mainMenu = new MainMenu();