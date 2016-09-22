class BaseObject {
  constructor() {

    this.group = null;
  
  }

  /*
   * ジオメトリの生成
   */
  createGeometry() {}

  /*
   * マテリアルの生成
   */
  createMaterial() {}

  /*
   * メッシュの生成
   */
  createMesh() {

    var geometry = this.createGeometry();
    var material = this.createMaterial();

    this.mesh = new THREE.Mesh(geometry, material);

  }

  /*
   * オブジェクトの再生成
   */
  renew() {

    if(this.group == null){
      this.group = new THREE.Group();
      threeMain.scene.add(this.group);
    }
    this.group.add(this.mesh);

  }

  /*
   * オブジェクトの消去
   */
  remove() {

    threeMain.scene.remove(this.group);
    this.group = null;
  
  }
}