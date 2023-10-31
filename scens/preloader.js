class Preloader extends Phaser.Scene{
    constructor(){
        super({key: 'preloader'});
    }

    preload(){
        try{

            let startDownloading = {
                action: 'startDownloading',
                allGameSessionId: sessionID,
                timeStamp: Date.now()
            }
            window?.parent.postMessage(startDownloading, parentOrigin);
        this.loadText = this.add.text(game.config.width/2, game.config.height/2, 'ЗАГРУЗКА...', { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '40px', fill: 'white'}).alpha = 0;
        this.loadTextTwo = this.add.text(0, 0, '...', { fontFamily:'Nunito', fontStyle:'bold', fontSize: '40px', fill: '#000000'}).alpha = 0;
        

        this.loadText1 = this.add.text(game.config.width / 2, game.config.height / 2, "Загрузка...", {
            fontFamily: 'Rubik-Medium',
            fontSize: 64,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5)

        this.loadText2 = this.add.text(game.config.width / 2, game.config.height / 2, "Загрузка...", {
            fontFamily: 'Rubik-Regular',
            fontSize: 64,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        }).alpha = 0

        this.loadText3 = this.add.text(game.config.width / 2, game.config.height / 2, "Загрузка...", {
            fontFamily: 'RubikOne-Regular',
            fontSize: 64,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        }).alpha = 0

        this.loadText4 = this.add.text(game.config.width / 2, game.config.height / 2, "Загрузка...", {
            fontFamily: 'Rubik-SemiBold',
            fontSize: 64,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        }).alpha = 0

        this.loadText4 = this.add.text(game.config.width / 2, game.config.height / 2, "Загрузка...", {
            fontFamily: 'Nunito',
            fontSize: 64,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        }).alpha = 0

        this.load.setPath('assets/');
        //фон для игры
        this.load.image('bg_1', 'bg/bg_1.png');
        this.load.image('bg_2', 'bg/bg_2.png');
        this.load.image('bg_3', 'bg/bg_3.png');
        this.load.image('bg_4', 'bg/bg_4.png');
        this.load.image('bg_5', 'bg/bg_5.png');
        this.load.image('bgBlur_1', 'bg/bgBlur_1.png');
        this.load.image('bgBlur_2', 'bg/bgBlur_2.png');
        this.load.image('bgBlur_3', 'bg/bgBlur_3.png');
        this.load.image('bgBlur_4', 'bg/bgBlur_4.png');
        this.load.image('bgBlur_5', 'bg/bgBlur_5.png');
        //фон для боссов
        this.load.image('bossBg_1', 'bossbg/bossBg_1.png');
        this.load.image('bossBg_2', 'bossbg/bossBg_2.png');
        this.load.image('bossBg_3', 'bossbg/bossBg_3.png');
        this.load.image('bossBg_4', 'bossbg/bossBg_4.png');
        this.load.image('bossBg_5', 'bossbg/bossBg_5.png');
        //фон для целей
        this.load.image('targetBg_1', 'targetbg/targetBg_1.png');
        this.load.image('targetBg_2', 'targetbg/targetBg_2.png');
        this.load.image('targetBg_3', 'targetbg/targetBg_3.png');
        this.load.image('targetBg_4', 'targetbg/targetBg_4.png');
        this.load.image('targetBg_5', 'targetbg/targetBg_5.png');
        //текстуры боссов
        this.load.image('boss_1', 'targets/boss_1.png');
        this.load.image('boss_2', 'targets/boss_2.png');
        this.load.image('boss_3', 'targets/boss_3.png');
        this.load.image('boss_4', 'targets/boss_4.png');
        this.load.image('boss_5', 'targets/boss_5.png');
        //текстуры целей
        this.load.image('target', 'targets/target.png');
        this.load.image('bonus', 'targets/Star.png');
        //текстуры цветов
        this.load.image('flower_1', 'flowers/flower_1.png');
        this.load.image('flower_2', 'flowers/flower_2.png');
        this.load.image('flower_3', 'flowers/flower_3.png');
        this.load.image('flower_4', 'flowers/flower_4.png');
        this.load.image('flower_5', 'flowers/flower_5.png');
        //ui фоны
        this.load.image('gameOverBg', 'ui/menu/gameOver.png');
        this.load.image('startBg', 'ui/menu/Start.png');
        this.load.image('pauseBg', 'ui/menu/Pause.png');
        this.load.image('controlMenu_info', 'ui/menu/controlMenu.png');
        this.load.image('controlGame_info', 'ui/menu/controlGame.png');
        //ui тексты игры
        this.load.image('best', 'ui/txt/Best.png');
        this.load.image('level', 'ui/txt/Level.png');
        this.load.image('score', 'ui/txt/Score.png');
        this.load.image('info', 'ui/txt/info.png');
        //ui тексты меню
        this.load.image('menuBest', 'ui/txt/MenuBest.png');
        this.load.image('menuScore', 'ui/txt/MenuScore.png');
        //ui элементы
        this.load.image('bossCounter_0', 'ui/counter/bossCounter_0.png');
        this.load.image('bossCounter_1', 'ui/counter/bossCounter_1.png');
        this.load.image('bossCounter_2', 'ui/counter/bossCounter_2.png');

        this.load.image('bossFlag_1', 'ui/counter/bossFlag_1.png');
        this.load.image('bossFlag_2', 'ui/counter/bossFlag_2.png');

        this.load.image('hitCounter_1', 'ui/counter/hitCounter_1.png');
        this.load.image('hitCounter_2', 'ui/counter/hitCounter_2.png');

        this.load.image('button', 'ui/buttons/button.png');
        this.load.image('selector', 'ui/buttons/selector.png');

        this.load.image('line', 'ui/menu/line.png');
        this.load.image('ageInfo', 'ui/menu/ageInfo.png');

        //загрузка анимаций
        this.load.atlas('floweridle_1', 'anims/1/Idle/idle_1.png', 'anims/1/Idle/idle_1.json');
        this.load.atlas('floweridle_2', 'anims/2/Idle/idle_2.png', 'anims/2/Idle/idle_2.json');
        this.load.atlas('floweridle_3', 'anims/3/Idle/idle_3.png', 'anims/3/Idle/idle_3.json');
        this.load.atlas('floweridle_4', 'anims/4/Idle/idle_4.png', 'anims/4/Idle/idle_4.json');
        this.load.atlas('floweridle_5', 'anims/5/Idle/idle_5.png', 'anims/5/Idle/idle_5.json');

        this.load.atlas('flowerBloom_1', 'anims/1/Bloom/blooming_1.png', 'anims/1/Bloom/blooming_1.json');
        this.load.atlas('flowerBloom_2', 'anims/2/Bloom/blooming_2.png', 'anims/2/Bloom/blooming_2.json');
        this.load.atlas('flowerBloom_3', 'anims/3/Bloom/blooming_3.png', 'anims/3/Bloom/blooming_3.json');
        this.load.atlas('flowerBloom_4', 'anims/4/Bloom/blooming_4.png', 'anims/4/Bloom/blooming_4.json');
        this.load.atlas('flowerBloom_5', 'anims/5/Bloom/blooming_5.png', 'anims/5/Bloom/blooming_5.json');
        
        //загрузка звуков

        this.load.audio('conflict', 'sound/conflict.mp3');
        this.load.audio('lose', 'sound/lose.mp3');
        this.load.audio('win', 'sound/win.mp3');
        this.load.audio('music', 'sound/music.mp3');
        this.load.audio('soil', 'sound/soil.mp3');
        this.load.audio('bonus', 'sound/star.mp3');
        this.load.audio('click', 'sound/click.mp3');
    }
    catch(er){
        let startDownloadingError = {
            action: 'startDownloadingError',
            allGameSessionId: sessionID,
            timeStamp: Date.now()
        }
        window?.parent.postMessage(startDownloadingError, parentOrigin);
    }
    }
    create(){
        try{
            let finishDownload = {
                action: 'finishDownload',
                allGameSessionId: sessionID,
                timeStamp: Date.now()
            }
            window?.parent.postMessage(finishDownload, parentOrigin)
        }
        catch(er){
            let downloadError = {
                action: 'downloadError',
                allGameSessionId: sessionID,
                timeStamp: Date.now()
            }
            window?.parent.postMessage(downloadError, parentOrigin)
        }
        this.scene.start('MainMenu');
    }
}

var preloader = new Preloader();