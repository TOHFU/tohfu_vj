class THREEMain {
  constructor() {

    // ----描画するオブジェクトを格納する配列
    this.objects = [];

    // ----fpsモニターの表示
    this.setupFPSmonitor();

    // ----シーンの初期化
    this.createScene();
  }

  /**
   * シーンの初期化
   */
  createScene() {

    // ----描画対象のDOM要素を取得
    this.container = document.getElementById('threeCanvas');

    // ----描画対象のDOM要素の大きさを取得
    this.vW = this.container.clientWidth;
    this.vH = this.container.clientHeight;

    // ----シーンの定義
    this.scene = new THREE.Scene();

    // ----カメラの初期化
    this.createCamera();

    // ----ライティングの初期化
    this.createLight();

    // ----レンダラーの定義
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.vW, this.vH);
    this.container.appendChild(this.renderer.domElement);

    // ----レンダリング
    this.render();

    console.log('==== render initialized ====');

    // ----リサイズイベントのリスナー
    window.addEventListener('resize', (e) => {
      this.resize();
    });

  }

  /**
   * カメラの初期化
   */
  createCamera() {

    // ----カメラのオプション
    var fov = 45;
    var aspect = this.vW / this.vH;
    var near = 1;
    var far = 1000;
    
    // ----カメラの定義
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  }

  /**
   * ライティングの初期化
   */
  createLight() {

    // ----環境光を定義
    this.light = new THREE.AmbientLight(Math.random() * 0x10);

  }

  /**
   * ウインドウリサイズの処理
   */
  resize() {

    this.vW = this.container.clientWidth;
    this.vH = this.container.clientHeight;
    
    this.camera.aspect = this.vW / this.vH;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.vW, this.vH);

  }

  /**
   * レンダリング
   */
  render() {

    if (this.stats) { this.stats.begin(); };
    
    // ----オブジェクトの更新
    this.objects.forEach((object) => {
      object.update();
    });

    // ----レンダリング
    this.renderer.render(this.scene, this.camera);

    if (this.stats) { this.stats.end(); };

    requestAnimationFrame(() => {
      this.render();
    });

  }

  /**
   * FPSモニターの初期化(stat.js)
   */
   setupFPSmonitor() {
   
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);

   }
  
  /**
   * オブジェクトの追加
   * @param mesh メッシュオブジェクト
   */
  add(mesh) {

    console.log('==== mesh added ====');

    this.objects.push(mesh);
    mesh.renew();

  }

}

let threeMain = new THREEMain();

