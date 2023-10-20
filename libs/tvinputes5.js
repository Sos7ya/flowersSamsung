"use strict";

window.addEventListener('load', function () {
  SpatialNavigation.init();
  SpatialNavigation.add({
    selector: '.focusable'
  });
  if (typeof AndroidBridge !== 'undefined') {
    initializeAndroidTVInput();
  }
  var validEvents = ['sn:willmove', 'sn:enter-down', 'sn:enter-up'];
  var eventHandler = function eventHandler(evt) {
    var _evt$detail;
    if (evt.type == 'sn:enter-down') {
      playgame.throwKnife();
      mainMenu.gameToggle();
      gameOver.gameToggle();
      scenePause.gameToggle();
    }
    switch (evt === null || evt === void 0 || (_evt$detail = evt.detail) === null || _evt$detail === void 0 ? void 0 : _evt$detail.direction) {
      case 'up':
        scenePause.selectorUp();
        gameOver.selectorUp();
        mainMenu.selectorUp();
        break;
      case 'down':
        scenePause.selectorDown();
        gameOver.selectorDown();
        mainMenu.selectorDown();
        break;
      case 'left':
        break;
      case 'right':
        break;
    }
  };
  validEvents.forEach(function (type) {
    window.addEventListener(type, eventHandler);
  });
  SpatialNavigation.makeFocusable();
  SpatialNavigation.focus();
});
function initializeAndroidTVInput() {
  AndroidBridge.onKeyEvent(function (event) {
    if (event.isTVKeyEvent) {
      var keyCode = event.keyCode;
      switch (keyCode) {
        case AndroidBridge.KEYCODE_DPAD_CENTER:
          mainMenu.startBtn();
          gameOver.gameToggle();
          scenePause.gameToggle();
          playgame.throwKnife();
          break;
        case AndroidBridge.KEYCODE_DPAD_UP:
          gameOver.selectorUp();
          scenePause.selectorUp();
          break;
        case AndroidBridge.KEYCODE_DPAD_DOWN:
          gameOver.selectorDown();
          scenePause.selectorDown();
          break;
        case AndroidBridge.KEYCODE_DPAD_LEFT:
          break;
        case AndroidBridge.KEYCODE_DPAD_RIGHT:
          break;
        case AndroidBridge.KEYCODE_BACK:
          playgame.pauseGame();
        default:
          break;
      }
    }
  });
}
