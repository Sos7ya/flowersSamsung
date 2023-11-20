"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,_toPropertyKey(a.key),a)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0===i)return("string"===t?String:Number)(e);i=i.call(e,t||"default");if("object"!==_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(i){var a=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(i);return _possibleConstructorReturn(this,a?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var game,sessionID,parentOrigin,clickSound,lvlIndex=1,soundMarker=0,gameOptions={onGame:!1,onPause:!1,knifeCount:8,rotationSpeed:1,throwSpeed:50,targetHp:7,hitScore:0,score:0,minAngle:15,canThrow:!0,isOver:!1,stage:1,rotationVariation:2,changeTime:2e3,maxRotationSpeed:3,isMenu:!1,x:500,boss:!1,marker:1},index=0,posted=!1,gameId=generateUUID(),game_version="v 0.1.7s",playGame=(window.onload=function(){var e={type:Phaser.CANVAS,width:1920,height:1080,fps:{forceSetTimeOut:!0,target:60},parent:"phaser-example",scene:[preloader,playgame,scenePause,stage2,stageBoss,mainMenu,gameOver],scale:{mode:Phaser.Scale.FIT},audio:{noAudio:!0,disableWebAudio:!0}};sessionID=generateUUID(),document.referrer?(parentOrigin=document.referrer,console.log(parentOrigin)):parentOrigin="*";try{var t={action:"startGameSession",allGameSessionId:sessionID,timeStamp:Date.now()};null!=(i=window)&&i.parent.postMessage(t,parentOrigin)}catch(e){var i={action:"startGameSessionError",allGameSessionId:sessionID,timeStamp:Date.now()};null!=(t=window)&&t.parent.postMessage(i,parentOrigin)}game=new Phaser.Game(e)},function(){_inherits(t,Phaser.Scene);var e=_createSuper(t);function t(){return _classCallCheck(this,t),e.call(this,{key:"PlayGame"})}return _createClass(t,[{key:"create",value:function(){for(var t=this,e=(gameOptions.isMenu=!1,gameOptions.onGame=!0,this.backGround=this.add.image(game.config.width/2,game.config.height/2,"bg_".concat(gameOptions.marker)),this.backGround.setOrigin(.5),this.backGround.setDisplaySize(game.config.width,game.config.height),this.targetBG=this.add.image(game.config.width/2,422,(gameOptions.boss?"bossBg_":"targetBg_").concat(gameOptions.marker)).setScale(.45),3<gameOptions.rotationSpeed&&(gameOptions.rotationSpeed=1.5),9<gameOptions.targetHp&&(gameOptions.targetHp=6,gameOptions.knifeCount=7,gameOptions.y=500),this.stageImage=this.add.image(game.config.width-200,89,"level").setScale(.4).setOrigin(.5),this.stageImage.alpha=0,this.stageText=this.add.text(75,80,"Уровень ".concat(gameOptions.stage),{fontFamily:"Rubik-Medium",fontSize:"37px",fontStyle:"Normal",align:"center"}),this.stopSound=setInterval(function(){t.soundOff(),7<=soundMarker&&clearInterval(t.stopSound)&&mainMenu.bgMusic.stop()},1500),this.bonusSound=this.sound.add("bonus",{loop:!1,volume:.5}),this.falseHitSound=this.sound.add("conflict",{loop:!1,volume:.5}),this.hitSound=this.sound.add("soil",{loop:!1,volume:.5}),this.knifeCount=gameOptions.knifeCount,this.currentRotationSpeed=gameOptions.rotationSpeed,this.newRotationSpeed=gameOptions.rotationSpeed,this.appleGroup=this.add.group(),this.knifeGroup=this.add.group(),this.bonusGroup=this.add.group(),this.knife=this.add.sprite(game.config.width/2,game.config.height-100,"flower_".concat(gameOptions.marker)),this.knife.setScale(.4),this.target=this.add.sprite(game.config.width/2,422,"".concat(this.isBoss())),this.target.setScale(.45),this.target.depth=1,this.scoreText=this.add.text(75,150,"Счёт",{textAlign:"center",fontFamily:"Rubik-Regular",fontSize:"28px",fill:"#D0DBD1"}),this.scoreText2=this.add.text(75,180,"".concat(gameOptions.score),{fontFamily:"Rubik-Medium",fontStyle:"normal",fontSize:"48px",fill:"#fff"}),this.countActiveGroup=this.add.group(),80),i=0;i<=gameOptions.knifeCount-2;i++){var a=this.add.sprite(e,game.config.height-80,"hitCounter_1");a.setScale(.4),e+=50,this.countActiveGroup.add(a)}1==gameOptions.isMenu&&this.scene.start("MainMenu"),gameOptions.stage%5==0&&this.time.addEvent({delay:gameOptions.changeTime,callback:this.changeSpeed,callbackScope:this,loop:!0});for(var o=Math.random(),o=.4<o?0:1,s=(this.loadScore(),this.addBonus(),7<gameOptions.stage&&this.time.addEvent({delay:10,callback:this.addObstacle,callbackScope:this,repeat:o}),document.addEventListener("keydown",function(e){8!=e.keyCode&&10009!=e.keyCode&&461!=e.keyCode&&166!=e.keyCode&&196!=e.keyCode||t.pauseGame()}),this.input.keyboard.on("keydown-SPACE",this.stageSkip,this),this.bossMarker=this.add.group(),game.config.width/2-100),n=0;n<5;n++)this.taraker=this.add.image(s,100,"bossCounter_0").setScale(.4),s+=50,this.bossMarker.add(this.taraker);this.bossFlag=this.add.image(game.config.width/2+112,72,"bossFlag_1").setScale(.4),this.anims.create({key:"blooming_1",frames:this.anims.generateFrameNames("flowerBloom_1",{start:0,end:23,prefix:"Flower-1-Bloom_",suffix:".png"}),duration:3e3,repeat:0}),this.versionText=this.add.text(game.config.width-100,40,"".concat(game_version),{fontFamily:"Nunito-black",fontStyle:"bold",fontSize:"30px",fill:"#fff"}).setOrigin(.5),this.controlInfo=this.add.image(game.config.width-250,game.config.height-90,"controlGame_info")}},{key:"soundOff",value:function(){mainMenu.bgMusic.volume=mainMenu.bgMusic.volume-.1,soundMarker++}},{key:"isBoss",value:function(){return!0===gameOptions.boss?"boss_".concat(gameOptions.marker):"target"}},{key:"addBonus",value:function(){for(var e=Phaser.Math.Between(0,360),t=Phaser.Math.DegToRad(e-90),i=this.add.sprite(this.target.x+this.target.width/8*Math.cos(t),this.target.y+this.target.width/8*Math.sin(t),"bonus").setScale(.3),a=(i.angle=e,i.startAngle=e,this.bonusGroup.add(i),this.appleGroup.getChildren()),o=0;o<a.length;o++)i.x===a[o].x&&this.addBonus()}},{key:"stageSkip",value:function(){gameOptions.onGame=!1,this.bgMusic.stop(),this.scene.start(stage2)}},{key:"addObstacle",value:function(){var e=Phaser.Math.Between(0,360),t=Phaser.Math.DegToRad(e-90),i=this.bonusGroup.getChildren(),t=this.add.sprite(this.target.x+this.target.width/8*Math.cos(t),this.target.y+this.target.width/8*Math.sin(t),"flower_".concat(gameOptions.marker));t.angle=e,t.startAngle=e,t.setScale(.4),Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle,360-i[0].startAngle))<gameOptions.minAngle?t.destroy():(this.appleGroup.add(t),100<index?index=0:index+=10)}},{key:"pauseGame",value:function(){gameOptions.onGame&&(mainMenu.bgMusic.pause(),this.scene.pause(),this.scene.launch(scenePause),scenePause.depth=1)}},{key:"changeSpeed",value:function(){var e=0==Phaser.Math.Between(0,1)?-1:1,t=Phaser.Math.FloatBetween(-gameOptions.rotationVariation,gameOptions.rotationVariation);this.newRotationSpeed=(this.currentRotationSpeed+t)*e,this.newRotationSpeed=Phaser.Math.Clamp(this.newRotationSpeed,-gameOptions.maxRotationSpeed,gameOptions.maxRotationSpeed)}},{key:"throwKnife",value:function(){var l=this;0==gameOptions.isMenu&&0==gameOptions.isOver&&1==gameOptions.onGame&&0==gameOptions.onPause&&(this.knifeCount--,0==gameOptions.knifeCount?gameOptions.canThrow=!1:1==gameOptions.canThrow&&(gameOptions.canThrow=!1,this.tweens.add({targets:[this.knife],y:this.target.y+this.target.width/3,duration:gameOptions.throwSpeed,callbackScope:this,onComplete:function(e){for(var t=!0,i=l.knifeGroup.getChildren(),a=l.appleGroup.getChildren(),o=0;o<a.length;o++)if(Math.abs(Phaser.Math.Angle.ShortestBetween(l.target.angle,360-a[o].startAngle))<gameOptions.minAngle){t=!1;break}for(var s=0;s<i.length;s++)if(Math.abs(Phaser.Math.Angle.ShortestBetween(l.target.angle,i[s].impactAngle))<gameOptions.minAngle){t=!1;break}if(t){for(var n=l.bonusGroup.getChildren(),r=0;r<n.length;r++)Math.abs(Phaser.Math.Angle.ShortestBetween(l.target.angle,360-n[r].startAngle))<gameOptions.minAngle&&(gameOptions.score+=5,l.bonusSound.play(),l.bonusText=l.add.text(n[r].x,n[r].y-300,"+5",{textAlign:"center",fontSize:"37px",fontStyle:"bold",fontFamily:"Nunito",fill:"#ffffff"}),l.bonusText.depth=2,l.tweens.add({targets:l.bonusText,y:0,ease:"Sine.InOut",repeat:0,duration:500,onComplete:function(){l.bonusText.destroy()}}),n[r].destroy());l.hitSound.play(),gameOptions.hitScore++,gameOptions.score+=1,gameOptions.canThrow=!0;var g=l.add.sprite(l.knife.x,l.knife.y,"flower_".concat(gameOptions.marker));g.setScale(.8),g.impactAngle=l.target.angle,g.play("idle_".concat(gameOptions.marker)),l.knifeGroup.add(g),l.knife.y=game.config.height-120,gameOptions.hitScore==gameOptions.targetHp&&(i.splice(2,s),gameOptions.onGame=!1,l.time.addEvent({delay:4e3,callback:l.scene.start(stage2),callbackScope:l}))}else l.falseHitSound.play(),mainMenu.bgMusic.pause(),l.tweens.add({targets:[l.knife],y:game.config.height+l.knife.height,rotation:5,duration:4*gameOptions.throwSpeed,callbackScope:l,onComplete:function(e){this.scene.start("GameOver")}})}})))}},{key:"loadScore",value:function(){localStorage.getItem("heighScore_KH")&&(this.hieghScoreTitle=this.add.text(75,240,"Рекорд",{textAlign:"center",fontFamily:"Rubik-Regular",fontSize:"28px",fill:"#D0DBD1"}),this.hieghScoreText=this.add.text(75,280,"".concat(JSON.parse(localStorage.getItem("heighScore_KH"))),{textAlign:"center",fontFamily:"Rubik-Regular",fontSize:"36px",fill:"#D0DBD1"}))}},{key:"update",value:function(e,t){5<=soundMarker&&mainMenu.bgMusic.stop(),this.scoreText2.setText("".concat(gameOptions.score)),gameOptions.stage%5==0?(this.target.angle+=this.currentRotationSpeed,this.currentRotationSpeed=Phaser.Math.Linear(this.currentRotationSpeed,this.newRotationSpeed,t/1e3),this.bossFlag.setTexture("bossFlag_2")):this.target.angle+=gameOptions.rotationSpeed;for(var i=this.knifeGroup.getChildren(),a=this.countActiveGroup.getChildren(),o=0;o<i.length;o++){i[o].angle+=this.currentRotationSpeed,a[o].setTexture("hitCounter_2");var s=Phaser.Math.DegToRad(i[o].angle+90);i[o].x=this.target.x+this.target.width/4*Math.cos(s),i[o].y=this.target.y+this.target.width/4*Math.sin(s)}for(var n=this.appleGroup.getChildren(),r=0;r<n.length;r++){n[r].angle+=this.currentRotationSpeed;s=Phaser.Math.DegToRad(n[r].angle+90);n[r].x=this.target.x+this.target.width/4*Math.cos(s),n[r].y=this.target.y+this.target.width/4*Math.sin(s)}for(var g=this.bonusGroup.getChildren(),l=0;l<g.length;l++){g[l].angle+=this.currentRotationSpeed;s=Phaser.Math.DegToRad(g[l].angle+90);g[l].x=this.target.x+this.target.width/4*Math.cos(s),g[l].y=this.target.y+this.target.width/4*Math.sin(s)}for(var h=0;h<lvlIndex;h++){var c=this.bossMarker.getChildren();c[h].setTexture("bossCounter_2"),c[lvlIndex-1].setTexture("bossCounter_1")}}}]),t}()),playgame=new playGame,GameOver=function(){_inherits(t,Phaser.Scene);var e=_createSuper(t);function t(){return _classCallCheck(this,t),e.call(this,{key:"GameOver"})}return _createClass(t,[{key:"create",value:function(){var e,t=this,i={action:"gameOver",allGameSessionId:sessionID,gameSessionId:startGame.gameSessionId,level:gameOptions.stage,score:gameOptions.score,timeStamp:Date.now()};null!=(e=window)&&e.parent.postMessage(i,parentOrigin),this.blurBg=this.add.image(game.config.width/2,game.config.height/2,"bgBlur_".concat(gameOptions.marker)),this.blurBg.setDisplaySize(game.config.width,game.config.height),this.uiBg=this.add.image(game.config.width/2,game.config.height/2,"gameOverBg"),this.uiBg.setDisplaySize(game.config.width,game.config.height),this.loseSound=this.sound.add("lose",{loop:!1,volume:.2}),this.loseSound.play(),this.score=this.add.text(game.config.width/2-150,game.config.height-100,"".concat(gameOptions.score),{fontFamily:"Rubik-Medium",fontStyle:"bold",fontSize:"64px",fill:"#fff"}).setOrigin(.5),this.scoreTitle=this.add.text(this.score.x,this.score.y-75,"Счет",{fontFamily:"Rubik-Regular",fontSize:48,fontStyle:"normal",color:"#D0DBD1"}).setOrigin(.5),this.btnRestart=this.add.sprite(game.config.width/2,game.config.height/2+50,"button").setScale(.4),this.btnExit=this.add.sprite(this.btnRestart.x,this.btnRestart.y+130,"button").setScale(.3),this.selector=this.add.image(this.btnRestart.x,this.btnRestart.y,"selector"),this.selector.setScale(.565,.57),this.btnRestartText=this.add.text(this.btnRestart.x,this.btnRestart.y,"ЗАНОВО",{fontFamily:"Nunito",fontSize:50,color:"#ffffff",fontStyle:"bold",align:"center"}),this.btnExittText=this.add.text(this.btnExit.x,this.btnExit.y,"ВЫЙТИ",{fontFamily:"Nunito",fontSize:45,color:"#2E3D66",fontStyle:"bold",align:"center"}),this.btnExittText.setOrigin(.5),this.btnRestartText.setOrigin(.5),this.btnRestart.setInteractive(),this.btnExit.setInteractive(),gameOptions.isOver=!0,gameOptions.bossIsDead=!1,this.saveScore(),this.loadScore(),this.versionText=this.add.text(game.config.width-100,40,"".concat(game_version),{fontFamily:"Nunito-black",fontStyle:"bold",fontSize:"30px",fill:"#fff"}).setOrigin(.5),this.controlInfo=this.add.image(game.config.width-250,game.config.height-90,"controlMenu_info"),document.addEventListener("keydown",function(e){8!=e.keyCode&&10009!=e.keyCode&&461!=e.keyCode&&166!=e.keyCode&&196!=e.keyCode||t.onPressExit()})}},{key:"saveScore",value:function(){this.heighScore=gameOptions.score,this.oldScore=JSON.parse(localStorage.getItem("heighScore_KH")),this.heighScore>this.oldScore?localStorage.setItem("heighScore_KH",JSON.stringify(this.heighScore)):this.heighScore=this.oldScore}},{key:"loadScore",value:function(){localStorage.getItem("heighScore_KH")&&(this.heigScoreText=this.add.text(game.config.width/2+150,game.config.height-100,"".concat(JSON.parse(localStorage.getItem("heighScore_KH"))),{fontFamily:"Rubik-Medium",fontSize:64,fontStyle:"bold",color:"#ffffff",align:"center"}).setOrigin(.5),this.heigScoreTitle=this.add.text(this.heigScoreText.x,this.heigScoreText.y-75,"Рекорд",{fontFamily:"Rubik-Regular",fontSize:48,fontStyle:"normal",color:"#D0DBD1"}).setOrigin(.5),this.line=this.add.image(game.config.width/2,game.config.height-100,"line").setOrigin(.5))}},{key:"selectorDown",value:function(){1==gameOptions.isOver&&this.selector.y!=this.btnExit.y&&(this.selector.y=this.btnExit.y,this.btnExittText.setColor("#FFFFFF"),this.btnRestartText.setColor("#2E3D66"),this.selector.setScale(.4),clickSound.play())}},{key:"selectorUp",value:function(){1==gameOptions.isOver&&this.selector.y!=this.btnRestart.y&&(this.selector.y=this.btnRestart.y,this.btnExittText.setColor("#2E3D66"),this.btnRestartText.setColor("#FFFFFF"),this.selector.setScale(.565,.57),clickSound.play())}},{key:"restartBtn",value:function(){var e;clickSound.play(),1==gameOptions.isOver&&(mainMenu.bgMusic.resume(),this.scene.start(playgame),gameOptions.onGame=!0,gameOptions.onPause=!1,gameOptions.knifeCount=8,gameOptions.rotationSpeed=1,gameOptions.throwSpeed=150,gameOptions.targetHp=7,gameOptions.hitScore=0,gameOptions.score=0,gameOptions.minAngle=15,gameOptions.canThrow=!0,gameOptions.isOver=!1,gameOptions.stage=1,gameOptions.stageStep=0,gameOptions.rotationVariation=2,gameOptions.changeTime=2e3,gameOptions.maxRotationSpeed=3,gameOptions.isMenu=!1,gameOptions.x=500,gameOptions.boss=!1,gameOptions.marker=1,lvlIndex=1,startGame.gameSessionId=generateUUID(),startGame.allGameSessionId=sessionID,null!=(e=window))&&e.parent.postMessage(startGame,parentOrigin)}},{key:"gameToggle",value:function(){1==gameOptions.isOver&&(this.selector.y==this.btnRestart.y?this.restartBtn():this.selector.y==this.btnExit.y&&this.onPressExit())}},{key:"exit",value:function(){var e,t;clickSound.play(),posted||(t={action:"closeGameSession",allGameSessionId:sessionID,timeStamp:Date.now()},null!=(e=window)&&e.parent.postMessage(t,parentOrigin),posted=!0)}},{key:"onPressExit",value:function(){1==gameOptions.isOver&&(clickSound.play(),this.exit())}}]),t}(),gameOver=new GameOver,startGame={action:"startGame",allGameSessionId:sessionID,gameSessionId:gameId,timeStamp:Date.now()},MainMenu=function(){_inherits(t,Phaser.Scene);var e=_createSuper(t);function t(){return _classCallCheck(this,t),e.call(this,{key:"MainMenu"})}return _createClass(t,[{key:"create",value:function(){var t=this;clickSound=this.sound.add("click",{volume:.5,loop:!1}),this.textures.get("flowerBloom_1").getFrameNames(),this.anims.create({key:"idle_1",frames:this.anims.generateFrameNames("floweridle_1",{start:1,end:47,prefix:"Flower-1-Idle_",suffix:".png"}),duration:1e3,repeat:-1}),this.anims.create({key:"idle_2",frames:this.anims.generateFrameNames("floweridle_2",{start:0,end:47,prefix:"Flower-2-Idle_",suffix:".png"}),duration:1e3,repeat:-1}),this.anims.create({key:"idle_3",frames:this.anims.generateFrameNames("floweridle_3",{start:0,end:47,prefix:"Flower-3-Idle_",suffix:".png"}),duration:1e3,repeat:-1}),this.anims.create({key:"idle_4",frames:this.anims.generateFrameNames("floweridle_4",{start:0,end:47,prefix:"Flower-4-Idle_",suffix:".png"}),duration:1e3,repeat:-1}),this.anims.create({key:"idle_5",frames:this.anims.generateFrameNames("floweridle_5",{start:0,end:47,prefix:"Flower-5-Idle_",suffix:".png"}),duration:1e3,repeat:-1}),this.anims.create({key:"blooming_2",frames:this.anims.generateFrameNames("flowerBloom_2",{start:0,end:23,prefix:"Flower-2-Bloom_",suffix:".png"}),duration:3e3,repeat:0}),this.anims.create({key:"blooming_3",frames:this.anims.generateFrameNames("flowerBloom_3",{start:0,end:23,prefix:"Flower-3-Bloom_",suffix:".png"}),duration:3e3,repeat:0}),this.anims.create({key:"blooming_4",frames:this.anims.generateFrameNames("flowerBloom_4",{start:0,end:23,zeroPad:1,prefix:"Flower-4-Bloom_",suffix:".png"}),duration:3e3,repeat:0}),this.anims.create({key:"blooming_5",frames:this.anims.generateFrameNames("flowerBloom_5",{start:0,end:23,prefix:"Flower-5-Bloom_",suffix:".png"}),duration:3e3,repeat:0}),this.bgMusic=this.sound.add("music",{loop:!0,volume:.5}),gameOptions.isMenu=!0,gameOptions.onGame=!1,this.blurBg=this.add.image(game.config.width/2,game.config.height/2,"bgBlur_".concat(gameOptions.marker)),this.blurBg.setDisplaySize(game.config.width,game.config.height),this.backGround=this.add.image(game.config.width/2,game.config.height/2,"startBg"),this.backGround.setOrigin(.5),this.backGround.setDisplaySize(game.config.width,game.config.height),document.querySelector("canvas");this.btnStart=this.add.sprite(game.config.width/2,game.config.height/2+50,"button").setScale(.4),this.btnExit=this.add.sprite(this.btnStart.x,this.btnStart.y+130,"button").setScale(.3),this.selector=this.add.image(this.btnStart.x,this.btnStart.y,"selector"),this.selector.setScale(.565,.57),this.btnStartText=this.add.text(this.btnStart.x,this.btnStart.y,"НАЧАТЬ ИГРУ",{fontFamily:"Nunito",fontSize:50,color:"#ffffff",fontStyle:"bold",align:"center"}),this.btnExittText=this.add.text(this.btnExit.x,this.btnExit.y,"ВЫЙТИ",{fontFamily:"Nunito",fontSize:45,color:"#2E3D66",fontStyle:"bold",align:"center"}),this.btnExittText.setOrigin(.5),this.btnStartText.setOrigin(.5),this.btnStart.setInteractive(),this.btnStart.on("pointerdown",this.startBtn,this),this.loadScore(),this.controlInfo=this.add.image(game.config.width-250,game.config.height-90,"controlMenu_info"),document.addEventListener("keydown",function(e){8!=e.keyCode&&10009!=e.keyCode&&461!=e.keyCode&&166!=e.keyCode&&196!=e.keyCode||t.onPressExit()}),this.ageInfo=this.add.image(game.config.width-150,100,"ageInfo"),this.versionText=this.add.text(game.config.width-60,game.config.height-40,"".concat(game_version),{fontFamily:"Rubik-Medium",fontStyle:"bold",fontSize:"30px",fill:"#fff"}).setOrigin(.5)}},{key:"loadScore",value:function(){localStorage.getItem("heighScore_KH")&&(this.heigScoreText=this.add.text(game.config.width/2,game.config.height-60,"".concat(JSON.parse(localStorage.getItem("heighScore_KH"))),{fontFamily:"Rubik-Medium",fontSize:64,fontStyle:"normal",color:"#fff"}).setOrigin(.5),this.heigScoreTitle=this.add.text(this.heigScoreText.x,this.heigScoreText.y-75,"Рекорд",{fontFamily:"Rubik-Regular",fontSize:48,fontStyle:"normal",color:"#fff"}).setOrigin(.5))}},{key:"selectorDown",value:function(){1==gameOptions.isMenu&&this.selector.y!=this.btnExit.y&&(this.selector.y=this.btnExit.y,this.btnExittText.setColor("#ffffff"),this.btnStartText.setColor("#2E3D66"),this.selector.setScale(.4),clickSound.play())}},{key:"selectorUp",value:function(){1==gameOptions.isMenu&&this.selector.y!=this.btnStart.y&&(this.selector.y=this.btnStart.y,this.btnExittText.setColor("#2E3D66"),this.btnStartText.setColor("#ffffff"),this.selector.setScale(.565,.57),clickSound.play())}},{key:"startBtn",value:function(){var e;clickSound.play(),1==gameOptions.isMenu&&(this.scene.start(playgame),this.bgMusic.play(),gameOptions.knifeCount=6,gameOptions.rotationSpeed=1,gameOptions.throwSpeed=150,gameOptions.targetHp=5,gameOptions.hitScore=0,gameOptions.score=0,gameOptions.canThrow=!0,gameOptions.isOver=!1,gameOptions.stageComplete=!1,gameOptions.bossIsDead=!1,gameOptions.stage=1,gameOptions.isMenu=!1,gameOptions.y=500,startGame.gameSessionId=generateUUID(),startGame.allGameSessionId=sessionID,null!=(e=window))&&e.parent.postMessage(startGame,parentOrigin)}},{key:"gameToggle",value:function(){1==gameOptions.isMenu&&(this.selector.y==this.btnStart.y?this.startBtn():this.selector.y==this.btnExit.y&&this.onPressExit())}},{key:"exit",value:function(){var e,t;clickSound.play(),posted||(t={action:"closeGameSession",allGameSessionId:sessionID,timeStamp:Date.now()},null!=(e=window)&&e.parent.postMessage(t,parentOrigin),posted=!0)}},{key:"onPressExit",value:function(){1==gameOptions.isMenu&&(clickSound.play(),this.exit())}}]),t}(),mainMenu=new MainMenu,ScenePause=function(){_inherits(t,Phaser.Scene);var e=_createSuper(t);function t(){return _classCallCheck(this,t),e.call(this,{key:"scenePause"})}return _createClass(t,[{key:"create",value:function(){var t=this;try{var i={action:"gamePause",allGameSessionId:startGame.allGameSessionId,gameSessionId:startGame.gameSessionId,score:gameOptions.score,level:gameOptions.stage,timeStamp:Date.now()},e=(null!=(a=window)&&a.parent.postMessage(i,parentOrigin),this.blurBg=this.add.image(game.config.width/2,game.config.height/2,"bgBlur_".concat(gameOptions.marker)),this.blurBg.setDisplaySize(game.config.width,game.config.height),this.uiBg=this.add.image(game.config.width/2,game.config.height/2,"pauseBg"),this.uiBg.setDisplaySize(game.config.width,game.config.height),document.querySelector("canvas"));this.btnResume=this.add.sprite(game.config.width/2,e.height/2+50,"button").setScale(.4),this.btnExit=this.add.sprite(this.btnResume.x,this.btnResume.y+130,"button").setScale(.3),this.selector=this.add.image(this.btnResume.x,this.btnResume.y,"selector"),this.selector.setScale(.57),this.btnResumetText=this.add.text(this.btnResume.x,this.btnResume.y,"ПРОДОЛЖИТЬ",{fontFamily:"Nunito",fontSize:50,color:"#ffffff",fontStyle:"bold",align:"center"}),this.btnResumetText.setOrigin(.5),this.btnExittText=this.add.text(this.btnExit.x,this.btnExit.y,"ВЫЙТИ",{fontFamily:"Nunito",fontSize:45,color:"#2E3D66",fontStyle:"bold",align:"center"}),this.btnExittText.setOrigin(.5),this.btnResume.setInteractive(),this.btnExit.setInteractive(),this.btnResume.on("pointerdown",this.resumeGame,this),this.btnExit.on("pointerdown",this.exit,this),this.input.keyboard.on("keydown-ENTER",this.gameToggle,this),this.input.keyboard.on("keydown-BACKSPACE",this.onPressExit,this),document.addEventListener("keydown",function(e){8!=e.keyCode&&10009!=e.keyCode&&461!=e.keyCode&&166!=e.keyCode&&196!=e.keyCode||t.onPressExit()}),gameOptions.onPause=!0,this.input.keyboard.on("keydown-S",this.selectorDown,this),this.score=this.add.text(game.config.width/2-150,game.config.height-100,"".concat(gameOptions.score),{fontFamily:"Arial",fontStyle:"bold",fontSize:"64px",fill:"#fff"}).setOrigin(.5),this.scoreTitle=this.add.text(this.score.x,this.score.y-75,"Счет",{fontFamily:"Rubik-Regular",fontSize:48,fontStyle:"normal",color:"#D0DBD1"}).setOrigin(.5),this.selector.setScale(.565,.57),this.versionText=this.add.text(game.config.width-100,40,"".concat(game_version),{fontFamily:"Nunito-black",fontStyle:"bold",fontSize:"30px",fill:"#fff"}).setOrigin(.5),this.controlInfo=this.add.image(game.config.width-250,game.config.height-90,"controlMenu_info"),this.loadScore()}catch(e){var a={action:"gamePauseError",allGameSessionId:startGame.allGameSessionId,gameSessionId:startGame.gameSessionId,score:gameOptions.score,level:gameOptions.stage,timeStamp:Date.now()};null!=(i=window)&&i.parent.postMessage(a,parentOrigin)}}},{key:"loadScore",value:function(){localStorage.getItem("heighScore_KH")&&(this.heigScoreText=this.add.text(game.config.width/2+150,game.config.height-100,"".concat(JSON.parse(localStorage.getItem("heighScore_KH"))),{fontFamily:"Arial",fontSize:64,fontStyle:"bold",color:"#ffffff",align:"center"}).setOrigin(.5),this.heigScoreTitle=this.add.text(this.heigScoreText.x,this.heigScoreText.y-75,"Рекорд",{fontFamily:"Rubik-Regular",fontSize:48,fontStyle:"normal",color:"#D0DBD1"}).setOrigin(.5),this.line=this.add.image(game.config.width/2,game.config.height-100,"line").setOrigin(.5))}},{key:"selectorDown",value:function(){1==gameOptions.onPause&&this.selector.y!=this.btnExit.y&&(this.selector.y=this.btnExit.y,this.btnExittText.setColor("#FFFFFF"),this.btnResumetText.setColor("#2E3D66"),this.selector.setScale(.4),clickSound.play())}},{key:"selectorUp",value:function(){1==gameOptions.onPause&&this.selector.y!=this.btnResume.y&&(this.selector.y=this.btnResume.y,this.btnResumetText.setColor("#FFFFFF"),this.btnExittText.setColor("#2E3D66"),this.selector.setScale(.565,.57),clickSound.play())}},{key:"gameToggle",value:function(){1==gameOptions.onPause&&(this.selector.y==this.btnResume.y?this.resumeGame():this.selector.y==this.btnExit.y&&this.onPressExit())}},{key:"resumeGame",value:function(){clickSound.play(),this.scene.resume(playgame),this.scene.stop(scenePause),mainMenu.bgMusic.resume(),gameOptions.onPause=!1,gameOptions.onGame=!0}},{key:"exit",value:function(){var e,t,i;clickSound.play(),posted||(t={action:"closeGameSession",allGameSessionId:sessionID,timeStamp:Date.now()},i={action:"gameOver",allGameSessionId:sessionID,gameSessionId:startGame.gameSessionId,level:gameOptions.stage,score:gameOptions.score,timeStamp:Date.now()},null!=(e=window)&&e.parent.postMessage(i,parentOrigin),null!=(e=window)&&e.parent.postMessage(t,parentOrigin),posted=!0)}},{key:"onPressExit",value:function(){1==gameOptions.onPause&&(clickSound.play(),this.exit())}}]),t}(),scenePause=new ScenePause,Preloader=function(){_inherits(t,Phaser.Scene);var e=_createSuper(t);function t(){return _classCallCheck(this,t),e.call(this,{key:"preloader"})}return _createClass(t,[{key:"preload",value:function(){try{var t={action:"startDownloading",allGameSessionId:sessionID,timeStamp:Date.now()};null!=(i=window)&&i.parent.postMessage(t,parentOrigin),this.loadText=this.add.text(game.config.width/2,game.config.height/2,"ЗАГРУЗКА...",{fontFamily:"Nunito-black",fontStyle:"bold",fontSize:"40px",fill:"white"}).alpha=0,this.loadTextTwo=this.add.text(0,0,"...",{fontFamily:"Nunito",fontStyle:"bold",fontSize:"40px",fill:"#000000"}).alpha=0,this.loadText1=this.add.text(game.config.width/2,game.config.height/2,"Загрузка...",{fontFamily:"Rubik-Medium",fontSize:64,fontStyle:"bold",color:"#ffffff",align:"center"}).setOrigin(.5),this.loadText2=this.add.text(game.config.width/2,game.config.height/2,"Загрузка...",{fontFamily:"Rubik-Regular",fontSize:64,fontStyle:"bold",color:"#ffffff",align:"center"}).alpha=0,this.loadText3=this.add.text(game.config.width/2,game.config.height/2,"Загрузка...",{fontFamily:"RubikOne-Regular",fontSize:64,fontStyle:"bold",color:"#ffffff",align:"center"}).alpha=0,this.loadText4=this.add.text(game.config.width/2,game.config.height/2,"Загрузка...",{fontFamily:"Rubik-SemiBold",fontSize:64,fontStyle:"bold",color:"#ffffff",align:"center"}).alpha=0,this.loadText4=this.add.text(game.config.width/2,game.config.height/2,"Загрузка...",{fontFamily:"Nunito",fontSize:64,fontStyle:"bold",color:"#ffffff",align:"center"}).alpha=0,this.load.setPath("assets/"),this.load.image("bg_1","bg/bg_1.png"),this.load.image("bg_2","bg/bg_2.png"),this.load.image("bg_3","bg/bg_3.png"),this.load.image("bg_4","bg/bg_4.png"),this.load.image("bg_5","bg/bg_5.png"),this.load.image("bgBlur_1","bg/bgBlur_1.png"),this.load.image("bgBlur_2","bg/bgBlur_2.png"),this.load.image("bgBlur_3","bg/bgBlur_3.png"),this.load.image("bgBlur_4","bg/bgBlur_4.png"),this.load.image("bgBlur_5","bg/bgBlur_5.png"),this.load.image("bossBg_1","bossbg/bossBg_1.png"),this.load.image("bossBg_2","bossbg/bossBg_2.png"),this.load.image("bossBg_3","bossbg/bossBg_3.png"),this.load.image("bossBg_4","bossbg/bossBg_4.png"),this.load.image("bossBg_5","bossbg/bossBg_5.png"),this.load.image("targetBg_1","targetbg/targetBg_1.png"),this.load.image("targetBg_2","targetbg/targetBg_2.png"),this.load.image("targetBg_3","targetbg/targetBg_3.png"),this.load.image("targetBg_4","targetbg/targetBg_4.png"),this.load.image("targetBg_5","targetbg/targetBg_5.png"),this.load.image("boss_1","targets/boss_1.png"),this.load.image("boss_2","targets/boss_2.png"),this.load.image("boss_3","targets/boss_3.png"),this.load.image("boss_4","targets/boss_4.png"),this.load.image("boss_5","targets/boss_5.png"),this.load.image("target","targets/target.png"),this.load.image("bonus","targets/Star.png"),this.load.image("flower_1","flowers/flower_1.png"),this.load.image("flower_2","flowers/flower_2.png"),this.load.image("flower_3","flowers/flower_3.png"),this.load.image("flower_4","flowers/flower_4.png"),this.load.image("flower_5","flowers/flower_5.png"),this.load.image("gameOverBg","ui/menu/gameOver.png"),this.load.image("startBg","ui/menu/Start.png"),this.load.image("pauseBg","ui/menu/Pause.png"),this.load.image("controlMenu_info","ui/menu/controlMenu.png"),this.load.image("controlGame_info","ui/menu/controlGame.png"),this.load.image("best","ui/txt/Best.png"),this.load.image("level","ui/txt/Level.png"),this.load.image("score","ui/txt/Score.png"),this.load.image("info","ui/txt/info.png"),this.load.image("menuBest","ui/txt/MenuBest.png"),this.load.image("menuScore","ui/txt/MenuScore.png"),this.load.image("bossCounter_0","ui/counter/bossCounter_0.png"),this.load.image("bossCounter_1","ui/counter/bossCounter_1.png"),this.load.image("bossCounter_2","ui/counter/bossCounter_2.png"),this.load.image("bossFlag_1","ui/counter/bossFlag_1.png"),this.load.image("bossFlag_2","ui/counter/bossFlag_2.png"),this.load.image("hitCounter_1","ui/counter/hitCounter_1.png"),this.load.image("hitCounter_2","ui/counter/hitCounter_2.png"),this.load.image("button","ui/buttons/button.png"),this.load.image("selector","ui/buttons/selector.png"),this.load.image("line","ui/menu/line.png"),this.load.image("ageInfo","ui/menu/ageInfo.png"),this.load.atlas("floweridle_1","anims/1/Idle/idle_1.png","anims/1/Idle/idle_1.json"),this.load.atlas("floweridle_2","anims/2/Idle/idle_2.png","anims/2/Idle/idle_2.json"),this.load.atlas("floweridle_3","anims/3/Idle/idle_3.png","anims/3/Idle/idle_3.json"),this.load.atlas("floweridle_4","anims/4/Idle/idle_4.png","anims/4/Idle/idle_4.json"),this.load.atlas("floweridle_5","anims/5/Idle/idle_5.png","anims/5/Idle/idle_5.json"),this.load.atlas("flowerBloom_1","anims/1/Bloom/blooming_1.png","anims/1/Bloom/blooming_1.json"),this.load.atlas("flowerBloom_2","anims/2/Bloom/blooming_2.png","anims/2/Bloom/blooming_2.json"),this.load.atlas("flowerBloom_3","anims/3/Bloom/blooming_3.png","anims/3/Bloom/blooming_3.json"),this.load.atlas("flowerBloom_4","anims/4/Bloom/blooming_4.png","anims/4/Bloom/blooming_4.json"),this.load.atlas("flowerBloom_5","anims/5/Bloom/blooming_5.png","anims/5/Bloom/blooming_5.json"),this.load.audio("conflict","sound/conflict.mp3"),this.load.audio("lose","sound/lose.mp3"),this.load.audio("win","sound/win.mp3"),this.load.audio("music","sound/music.mp3"),this.load.audio("soil","sound/soil.mp3"),this.load.audio("bonus","sound/star.mp3"),this.load.audio("click","sound/click.mp3")}catch(e){var i={action:"startDownloadingError",allGameSessionId:sessionID,timeStamp:Date.now()};null!=(t=window)&&t.parent.postMessage(i,parentOrigin)}}},{key:"create",value:function(){try{var t={action:"finishDownload",allGameSessionId:sessionID,timeStamp:Date.now()};null!=(i=window)&&i.parent.postMessage(t,parentOrigin)}catch(e){var i={action:"downloadError",allGameSessionId:sessionID,timeStamp:Date.now()};null!=(t=window)&&t.parent.postMessage(i,parentOrigin)}this.scene.start("MainMenu")}}]),t}(),preloader=new Preloader,Stage2=function(){_inherits(t,Phaser.Scene);var e=_createSuper(t);function t(){return _classCallCheck(this,t),e.call(this,{key:"stage2"})}return _createClass(t,[{key:"create",value:function(){try{var e,t={action:"levelUp",allGameSessionId:sessionID,gameSessionId:startGame.gameSessionId,level:gameOptions.stage,score:gameOptions.score,timeStamp:Date.now()},i=(null!=(o=window)&&o.parent.postMessage(t,parentOrigin),this.backGround=this.add.image(game.config.width/2,game.config.height/2,"bg_".concat(gameOptions.marker)),this.backGround.setOrigin(.5),this.backGround.setDisplaySize(game.config.width,game.config.height),this.winSound=this.sound.add("win",{loop:!1,volume:.5}),this.winSound.play(),document.querySelector("canvas"));this.newStageText=this.add.text(.5*i.width,750,"УРОВЕНЬ ".concat(gameOptions.stage," ПРОЙДЕН!"),{fontFamily:"Nunito-black",fontSize:50,fontStyle:"bold",color:"#ffffff",align:"center"}),this.newStageText.setOrigin(.5),this.targetBG=this.add.image(game.config.width/2,422,(gameOptions.boss?"bossBg_":"targetBg_").concat(gameOptions.marker)).setScale(.45),this.target=this.add.sprite(game.config.width/2,422,"target"),this.target.setScale(.45),this.target.depth=1,this.anim=this.add.group();for(var a=0;a<=10;a++)(e=this.add.sprite(game.config.width/2,game.config.height/2-150,"flower_".concat(gameOptions.marker))).angle=90,e.setScale(.8),this.anim.add(e),e.angle+=40*a,e.play("blooming_".concat(gameOptions.marker)),e.anims.msPerFrame=60;this.time.addEvent({delay:2e3,callback:this.sceneStart,callbackScope:this,loop:!1})}catch(e){var o={action:"levelUpError",allGameSessionId:sessionID,gameSessionId:startGame.gameSessionId,level:gameOptions.stage,score:gameOptions.score,timeStamp:Date.now()};null!=(t=window)&&t.parent.postMessage(o,parentOrigin)}}},{key:"update",value:function(){var i=this,a=this.anim.getChildren();setTimeout(function(){for(var e=0;e<=10;e++){var t=Phaser.Math.DegToRad(a[e].angle+90);a[e].x=i.target.x+i.target.width/3*Math.cos(t),a[e].y=i.target.y+i.target.width/3*Math.sin(t)}},200)}},{key:"sceneStart",value:function(){gameOptions.stage%5==0&&(gameOptions.marker<5?gameOptions.marker+=1:gameOptions.marker=1),(gameOptions.stage+1)%5==0?(gameOptions.onGame=!0,gameOptions.rotationSpeed+=.5,gameOptions.targetHp=9,gameOptions.knifeCount=10,gameOptions.hitScore=0,gameOptions.stage+=1,gameOptions.canThrow=!0,5===lvlIndex?lvlIndex=1:lvlIndex+=1,this.scene.start("StageBoss")):(this.scene.start(playgame),gameOptions.canThrow=!0,gameOptions.knifeCount++,gameOptions.rotationSpeed+=.5,gameOptions.targetHp+=1,gameOptions.hitScore=0,gameOptions.stage+=1,gameOptions.x-=20,gameOptions.onGame=!0,gameOptions.boss=!1,5===lvlIndex?lvlIndex=1:lvlIndex+=1)}}]),t}(),stage2=new Stage2,StageBoss=function(){_inherits(t,Phaser.Scene);var e=_createSuper(t);function t(){return _classCallCheck(this,t),e.call(this,{key:"StageBoss"})}return _createClass(t,[{key:"create",value:function(){document.querySelector("canvas");gameOptions.boss=!0,this.scene.start("PlayGame")}}]),t}(),stageBoss=new StageBoss;