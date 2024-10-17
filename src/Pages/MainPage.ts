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

    // const aboutUs = new Component(this.root, "div", ["aboutUs"], null);

    // new Component(
    //   aboutUs.root,
    //   "p",
    //   null,
    //   "Почему выбирают Нас?"
    // );

    // const blockF = new Component(aboutUs.root, "div", ["blockF"], null);
    // const f1 = new Component(blockF.root, "div", ["f"], null);

    // new Component(f1.root, "img", null , null, ["src",'alt'], ["../assets/f1.svg.png",'f1']);
    // new Component(f1.root, "h4", null , 'Ассортимент', );
    
    // const f2 = new Component(blockF.root, "div", ["f"], null);

    // new Component(f2.root, "img", null , null, ["src",'alt'], ["../assets/f2.svg.png",'f2']);
    // new Component(f2.root, "h4", null , 'Качество', );

    // const f3 = new Component(blockF.root, "div", ["f"], null);

    // new Component(f3.root, "img", null , null, ["src",'alt'], ["../assets/f3.svg.png",'f3']);
    // new Component(f3.root, "h4", null , 'Цена', );

    // const f4 = new Component(blockF.root, "div", ["f"], null);

    // new Component(f4.root, "img", null , null, ["src",'alt'], ["../assets/f4.svg.png",'f4']);
    // new Component(f4.root, "h4", null , 'Честность', );
}
}
