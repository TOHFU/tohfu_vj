class SimpleCube extends BaseObject {
  constructor() {
    super();

    this.opt = {
      size: {
        x: 5,
        y: 5,
        z: 5
      },
      position: {
        x: 0,
        y: 0,
        z: -20
      },
      color: 0xff0000,

    }

    // ----メッシュの初期化
    this.createMesh();

  }

  createGeometry() {

    // ジオメトリの定義
    var geometry = new THREE.BoxGeometry(
                      this.opt.size.x,
                      this.opt.size.y,
                      this.opt.size.z
                    );

    return geometry;
  }

  createMaterial() {

    // マテリアルの定義
    var material = new THREE.MeshBasicMaterial({
                      color: this.opt.color
                    });

    return material;

  }

  createMesh() {
    super.createMesh();

    this.mesh.position.set(
        this.opt.position.x,
        this.opt.position.y,
        this.opt.position.z
      );
  
  }

  update() {

    this.mesh.rotation.y += 0.01;
  
  }
}