class SimpleCube {
  constructor() {

    var defaults = {
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

    this.opt = defaults;

    this.group = null;

    // ----メッシュの初期化
    this.createMesh();

  }

  createGeometry() {

    // ジオメトリの定義
    this.geometry = new THREE.BoxGeometry(
                      this.opt.size.x,
                      this.opt.size.y,
                      this.opt.size.z
                    );

  }

  createMaterial() {

    // マテリアルの定義
    this.material = new THREE.MeshBasicMaterial({
                      color: this.opt.color
                    });

  }

  createMesh() {

    this.createGeometry();
    this.createMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.set(
        this.opt.position.x,
        this.opt.position.y,
        this.opt.position.z
      );
  
  }

  renew() {

    if(this.group == null){
      this.group = new THREE.Group();
      threeMain.scene.add(this.group);
    }
    this.group.add(this.mesh);

  }

  remove() {

    threeMain.scene.remove(this.group);
    this.group = null;
  
  }

  update() {

    this.mesh.rotation.y += 0.01;
  
  }
}