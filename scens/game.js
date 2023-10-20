var game;
var lvlIndex = 1;
var soundMarker = 0;
var gameOptions = {
    onGame: false,
    onPause: false,
    knifeCount: 8,
    rotationSpeed: 1,
    throwSpeed: 50,
    targetHp: 7,
    hitScore: 0,
    score: 0,
    minAngle: 15,
    canThrow: true,
    isOver: false,
    stage: 1,
    rotationVariation: 2,
    changeTime: 2000,
    maxRotationSpeed: 3,
    isMenu: false,
    x: 500,
    boss: false,
    marker: 1
}

var index = 0

var sessionID
var gameId = generateUUID();

var game_version = "v 0.1.5s";

var clickSound;
window.onload = function() {
    var gameConfig = {

       type: Phaser.CANVAS,
       width: 1920,
       height: 1080,
       

       parent: 'phaser-example',

       scene: [ preloader,
                playgame,
                scenePause,
                stage2,
                stageBoss,
                mainMenu,
                gameOver ],
        
        scale:{
            mode: Phaser.Scale.FIT,
        },

        audio:{
            disableWebAudio: true,
            noAudio: false
        }
    };
    sessionID = generateUUID();
    try{
    var startGameSession = {
        action: 'startGameSession',
        allGameSessionId: sessionID,
        timeStamp: Date.now()
    }
    window?.parent.postMessage(startGameSession, '*');

    }
    
    catch(er){
        var startGameSessionError = {
        action: 'startGameSessionError',
        allGameSessionId: sessionID,
        timeStamp: Date.now()
        }
        window?.parent.postMessage(startGameSessionError, '*');

    }

    game = new Phaser.Game(gameConfig);
}

class playGame extends Phaser.Scene{
    constructor(){
        super({key: "PlayGame"});
    }

    create(){
        gameOptions.isMenu = false
        gameOptions.onGame = true
        this.backGround = this.add.image(game.config.width/2, game.config.height/2, `bg_${gameOptions.marker}`);
        this.backGround.setOrigin(0.5);
        this.backGround.setDisplaySize(game.config.width, game.config.height);
        this.targetBG = this.add.image(game.config.width / 2, 422, gameOptions.boss ? `bossBg_${gameOptions.marker}` : `targetBg_${gameOptions.marker}`).setScale(0.45);
        
        if(gameOptions.rotationSpeed > 3){
            gameOptions.rotationSpeed = 1.5
        }

        if(gameOptions.targetHp >= 15){
            gameOptions.targetHp = 7
            gameOptions.knifeCount = 8
            gameOptions.y = 500
        }
        //this.infoImage = this.add.image(260, 89, `info`).setScale(0.4).setOrigin(0.5);
        this.stageImage = this.add.image(game.config.width - 200, 89, `level`).setScale(0.4).setOrigin(0.5);
        this.stageImage.alpha = 0;
        this.stageText = this.add.text(75, 80, `Уровень ${gameOptions.stage}`,{
        fontFamily: 'Rubik-Medium',
        fontSize: '37px',
        fontStyle: 'Normal',
        align: 'center'
        })

        
        
        this.stopSound = setInterval(() => {this.soundOff(); soundMarker >= 7 ? clearInterval(this.stopSound) && mainMenu.bgMusic.stop() : null}, 1500);

        this.bonusSound = this.sound.add('bonus', {loop: false, volume: 0.5});
        this.falseHitSound = this.sound.add('conflict', {loop: false, volume: 0.5});
        this.hitSound = this.sound.add('soil', {loop: false, volume: 0.5});

        this.knifeCount = gameOptions.knifeCount;
        this.currentRotationSpeed = gameOptions.rotationSpeed;
        this.newRotationSpeed = gameOptions.rotationSpeed;
        this.appleGroup = this.add.group();
        this.knifeGroup = this.add.group();
        this.bonusGroup = this.add.group();
        
        

        this.knife = this.add.sprite(game.config.width / 2, game.config.height - 100, `flower_${gameOptions.marker}`);
        this.knife.setScale(0.4);
        
        this.target = this.add.sprite(game.config.width / 2, 422, `${this.isBoss()}`);
        this.target.setScale(0.45);
        this.target.depth = 1;

        this.scoreText = this.add.text(75, 150, `Счёт`, { textAlign: 'center', fontFamily: 'Rubik-Regular', fontSize: '28px', fill: '#D0DBD1' });
        this.scoreText2 = this.add.text(75, 180, `${gameOptions.score}`, { fontFamily:'Rubik-Medium', fontStyle:'normal', fontSize: '48px', fill: '#fff'});
        
        this.countActiveGroup = this.add.group();
        
        
        var x = 80;
        for(var i = 0; i <= gameOptions.knifeCount-2; i++){
            var countActive = this.add.sprite(x, game.config.height - 80, "hitCounter_1");
            countActive.setScale(0.4);
            x+=50;
            
            this.countActiveGroup.add(countActive);
        }

        if(gameOptions.isMenu == true){
            this.scene.start('MainMenu');
        }


        if(gameOptions.stage % 5 == 0){
            var timedEvent = this.time.addEvent({
            delay: gameOptions.changeTime,
            callback: this.changeSpeed,
            callbackScope: this,
            loop: true
            });
        }

        var rand = Math.random();

        var n = rand > 0.4 ? 0:(rand > 0.6 ? 1 : 2);

        
        this.loadScore();
        this.addBonus();
        if(gameOptions.stage > 5){
            var timedEvent = this.time.addEvent({
                delay: 10,
                callback: this.addObstacle,
                callbackScope: this,
                repeat: gameOptions.stage == 6 ? 0 : (gameOptions.stage == 7 ? 1 : (gameOptions.stage == 8 ? 2 : n))
            })
        };
        // this.input.keyboard.on('keydown-BACKSPACE', this.pauseGame, this);

        document.addEventListener('keydown',(e)=>{
            if(e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196){
                this.pauseGame()
            }
        })

        this.input.keyboard.on('keydown-SPACE', this.stageSkip, this);

        this.bossMarker = this.add.group();
        let trakerX = game.config.width/2-100
        for(let x = 0; x < 5; x++){
            this.taraker = this.add.image(trakerX, 100, `bossCounter_0`).setScale(0.4);
            trakerX+=50;
            this.bossMarker.add(this.taraker);
        }
        this.bossFlag = this.add.image(game.config.width/2+112, 72, `bossFlag_1`).setScale(0.4);

        this.anims.create({
            key: 'blooming_1',
            frames: this.anims.generateFrameNames('flowerBloom_1', {
                start: 0,
                end: 23,
                prefix: 'Flower-1-Bloom_',
                suffix: '.png', 
            }),
            duration: 3000,
            repeat: 0
        })

        this.versionText = this.add.text(game.config.width - 100, 40, `${game_version}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '30px', fill: '#fff' }).setOrigin(0.5);
        this.controlInfo = this.add.image(game.config.width - 250, game.config.height - 90, 'controlGame_info');
    }

    soundOff(){
        mainMenu.bgMusic.volume = mainMenu.bgMusic.volume - 0.1;
        soundMarker++;
    }

    isBoss()
    {
        if(gameOptions.boss === true){
            return `boss_${gameOptions.marker}`;
        }
        else{
            return `target`;
        }
    }

    addBonus(){
        var bonusAngle = Phaser.Math.Between(0, 360);
        var radians = Phaser.Math.DegToRad(bonusAngle - 90);
        var bonus = this.add.sprite(this.target.x + (this.target.width/8)*Math.cos(radians), this.target.y + (this.target.width/8) * Math.sin(radians), 'bonus').setScale(0.3);
        
        bonus.angle = bonusAngle;
        bonus.startAngle = bonusAngle;
        this.bonusGroup.add(bonus);
        var check = this.appleGroup.getChildren();
        for(var n = 0; n < check.length; n++){
            if(bonus.x === check[n].x){
                this.addBonus()
            }
        }
    }

    stageSkip(){
        gameOptions.onGame = false;
        this.bgMusic.stop();
        this.scene.start(stage2);
    }

    addObstacle(){
        var appleAngle = Phaser.Math.Between(0, 360);
        var radians = Phaser.Math.DegToRad(appleAngle - 90);
        var bonuses = this.bonusGroup.getChildren();
        var apple = this.add.sprite(this.target.x + (this.target.width/8)*Math.cos(radians), this.target.y + (this.target.width/8) * Math.sin(radians), `flower_${gameOptions.marker}`);
        
        apple.angle = appleAngle;
        apple.startAngle = appleAngle;
        apple.setScale(0.4);

        if(Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 360 - bonuses[0].startAngle)) < gameOptions.minAngle){
            apple.destroy();
            return
        }

        this.appleGroup.add(apple);
        
        index > 100 ? index = 0 : index+=10
    }

    pauseGame(){
        if(gameOptions.onGame){
            mainMenu.bgMusic.pause();
            this.scene.pause();
            this.scene.launch(scenePause);
            scenePause.depth = 1;
        }
    }

    changeSpeed(){
        var sign = Phaser.Math.Between(0, 1) == 0 ? -1 : 1;
        var variation = Phaser.Math.FloatBetween(-gameOptions.rotationVariation, gameOptions.rotationVariation);
        this.newRotationSpeed = (this.currentRotationSpeed + variation) * sign;
        this.newRotationSpeed = Phaser.Math.Clamp(this.newRotationSpeed, -gameOptions.maxRotationSpeed, gameOptions.maxRotationSpeed);
    }

   throwKnife(){
        if(gameOptions.isMenu == false && gameOptions.isOver == false && gameOptions.onGame == true && gameOptions.onPause == false){
            this.knifeCount--
            if(gameOptions.knifeCount==0){
                gameOptions.canThrow = false;
            }
            else if(gameOptions.canThrow == true){
                gameOptions.canThrow = false;
                
                this.tweens.add({
 
                    targets: [this.knife],
                    y: this.target.y + this.target.width / 3,
                    duration: gameOptions.throwSpeed,
                    callbackScope: this,
 
                onComplete: (tween) => {
                    var legalHit = true;
                    var children = this.knifeGroup.getChildren();
                    var obstacle = this.appleGroup.getChildren();
                    for(var j = 0; j<obstacle.length; j++){
                        if(Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 360 - obstacle[j].startAngle)) < gameOptions.minAngle){
                        legalHit = false;
                        break
                        }
                    };
                    for (var i = 0; i < children.length; i++){
                        if(Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, children[i].impactAngle)) < gameOptions.minAngle){
                            legalHit = false;
                            break;
                        }
                    };
                    
                    
                    if(legalHit){
                        var bonuses = this.bonusGroup.getChildren();
                        for(var k = 0; k < bonuses.length; k++){
                            if(Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 360 - bonuses[k].startAngle)) < gameOptions.minAngle){
                                gameOptions.score+=5;
                                this.bonusSound.play();
                                this.bonusText = this.add.text(bonuses[k].x, bonuses[k].y-300, `+5`, { textAlign: 'center', fontSize: '37px', fontStyle: 'bold', fontFamily: 'Nunito', fill: '#ffffff' });
                                this.bonusText.depth = 2;
                                this.tweens.add({
                                    targets: this.bonusText,
                                    y: 0,
                                    ease: 'Sine.InOut',
                                    repeat: 0,
                                    duration: 500,
                                    onComplete: () =>{
                                        this.bonusText.destroy()
                                    }
                                })
                                bonuses[k].destroy()
                            }
                        };
                        this.hitSound.play();
                        gameOptions.hitScore++
                        gameOptions.score += 1;
                        gameOptions.canThrow = true;
                        var knife = this.add.sprite(this.knife.x, this.knife.y, `flower_${gameOptions.marker}`);
                        knife.setScale(0.8);
                        knife.impactAngle = this.target.angle;
                        knife.play(`idle_${gameOptions.marker}`)
                        
                        this.knifeGroup.add(knife);
                        this.knife.y = game.config.height-120;

                        if(gameOptions.hitScore == gameOptions.targetHp){
                            children.splice(2,i);
                            gameOptions.onGame = false;
                            
                            this.time.addEvent({
                                delay: 4000,
                                callback: this.scene.start(stage2),
                                callbackScope: this
                            });
                        };
                    }
 
                    else{
                        this.falseHitSound.play();
                        mainMenu.bgMusic.pause();
                        this.tweens.add({
                            targets: [this.knife],
                            y: game.config.height + this.knife.height,
                            rotation: 5,
                            duration: gameOptions.throwSpeed * 4,
                            callbackScope: this,
                            onComplete: function(tween){
                                this.scene.start("GameOver");
                            }
                        });
                    }
                }
            });      
        }
    }
}

    // loadScore(){
    //     if(localStorage.getItem('heighScore_KH')){
    //         this.gameRecordText = this.add.image(this.scoreImage.x, this.scoreImage.y+50, 'best').setScale(0.4).setOrigin(0.5);
    //         this.gameRecordText.alpha = 0;
    //         this.hieghScoreTitle = this.add.text(75, 350, `РЕКОРД`, { fontSize: '33px', fontStyle: 'bold', fontFamily: 'Nunito', fill: '#ffffff' });
    //         this.hieghScoreText = this.add.text(75, 390, `${JSON.parse(localStorage.getItem('heighScore_KH'))}`, { fontSize: '33px', fontStyle: 'bold', fontFamily: 'Nunito', fill: '#ffffff' });
    //     }
    // }

    loadScore(){
        if(localStorage.getItem('heighScore_KH')){
            this.hieghScoreTitle = this.add.text(75, 240, `Рекорд`, { textAlign: 'center', fontFamily: 'Rubik-Regular', fontSize: '28px', fill: '#D0DBD1'  });
            this.hieghScoreText = this.add.text(75, 280, `${JSON.parse(localStorage.getItem('heighScore_KH'))}`, { textAlign: 'center', fontFamily: 'Rubik-Regular', fontSize: '36px', fill: '#D0DBD1' });
        }
    }

    update(time, delta){
        if(soundMarker >= 5){
            mainMenu.bgMusic.stop();
        }
        this.scoreText2.setText(`${gameOptions.score}`);
        if(gameOptions.stage % 5 == 0){
            this.target.angle += this.currentRotationSpeed;
            this.currentRotationSpeed = Phaser.Math.Linear(this.currentRotationSpeed, this.newRotationSpeed, delta / 1000);
            this.bossFlag.setTexture('bossFlag_2');
        }

        else{
            this.target.angle += gameOptions.rotationSpeed;
        }

        var children = this.knifeGroup.getChildren();
        var non = this.countActiveGroup.getChildren();
        for (var i = 0; i < children.length; i++){
            children[i].angle += this.currentRotationSpeed;
            non[i].setTexture('hitCounter_2');
            var radians = Phaser.Math.DegToRad(children[i].angle + 90);
            children[i].x = this.target.x + (this.target.width / 4) * Math.cos(radians);
            children[i].y = this.target.y + (this.target.width / 4) * Math.sin(radians);
        }

        var ostacles = this.appleGroup.getChildren();
        for(var j = 0; j < ostacles.length; j++){
            ostacles[j].angle += this.currentRotationSpeed;
            var radians = Phaser.Math.DegToRad(ostacles[j].angle + 90);

            ostacles[j].x = this.target.x + (this.target.width / 4) * Math.cos(radians);
            ostacles[j].y = this.target.y + (this.target.width / 4) * Math.sin(radians);
        }
        
        var bonuses = this.bonusGroup.getChildren();

        for(var k = 0; k < bonuses.length; k++){
            bonuses[k].angle += this.currentRotationSpeed;
            var radians = Phaser.Math.DegToRad(bonuses[k].angle + 90);

            bonuses[k].x = this.target.x + (this.target.width/4) * Math.cos(radians);
            bonuses[k].y = this.target.y + (this.target.width/4) * Math.sin(radians);
        }

        

        for(let r = 0; r < lvlIndex; r++){
            let markers = this.bossMarker.getChildren();
            markers[r].setTexture('bossCounter_2');
            markers[lvlIndex-1].setTexture('bossCounter_1');
        }
    }
}

var playgame = new playGame()