import { Component } from "../Abstract/Componets";

export class Information extends Component {
  stateUpdate: boolean = false;
  constructor(parent: HTMLElement) {
    super(parent, "div", ["information"]);

    new Component(this.root, "p", null, "Здесь будет информацтя о нас");
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
