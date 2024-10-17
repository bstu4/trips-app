import { Component } from "../Abstract/Componets";

export class Tours extends Component {
  stateUpdate: boolean = false;
  constructor(parent: HTMLElement) {
    super(parent, "div", ["tours"]);

    new Component(this.root, "p", null, "Здесь будут туры");
  }

  renderWithUpdate(): void {
    if (!this.stateUpdate) {
      this.update();
      this.stateUpdate = true;
    }
    this.myRender();
  }

  update(): void {}
}
