class ControllerGUI {
  constructor() {
    this.addCube();
  }

  addCube() {
    threeMain.add(new SimpleCube());
  }
}

let controllerGUI = new ControllerGUI();