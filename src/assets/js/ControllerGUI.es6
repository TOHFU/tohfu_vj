class ControllerGUI {
  constructor() {
    this.initKeyEvent();
  }

  /**
   * キーイベントのリスナー登録
   */
  initKeyEvent() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  /**
   * キーダウン
   * @param e イベント
   */
  onKeyDown(e) {
    var keyCode = e.keyCode;
    console.log('key down : ' + keyCode);

    switch(keyCode) {
      case 81:
        // press Q
        if (!this.simpleCube) {
          this.simpleCube = new SimpleCube();
          threeMain.add(simpleCube);
        }
        break;

      default:
        break;
    }
  }

  /**
   * キーアップ
   * @param e イベント
   */
  onKeyUp(e) {
    var keyCode = e.keyCode;
    console.log('key up : ' + keyCode);

    switch(keyCode) {
      case 81:
        // press Q
        this.simpleCube.remove();
        this.simpleCube = null;
        break;

      default:
        break;
    }
  }
  
}

let controllerGUI = new ControllerGUI();