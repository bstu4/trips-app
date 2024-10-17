import { Component } from "../Abstract/Componets";

export class MainPage extends Component {
  stateUpdate: boolean = false;
  constructor(parent: HTMLElement) {
    super(parent, "main", ["main_pages"]);

    const mainPage = new Component(this.root, "div", ["mainImg"], null);
    new Component(
      mainPage.root,
      "div",
    );
    new Component(
      mainPage.root,
      "p",
      ['mainPage_title'],
      "Go TRIPS"
    );
    

    new Component(
      mainPage.root,
      "p",
      ['mainPage_subtitle'],
      "Окунитесь с головой в самые интригующие путешествия вместе с нами!"
    );

    
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
