import { Component } from "../Abstract/Componets";

export class Header extends Component {
  constructor(parent: HTMLElement) {
    super(parent, "div", ["header"]);

    const header_logoText = new Component(this.root,"div",["header_logoText"],null);

    new Component(header_logoText.root, "h3", ["first"], 'Выбирай',);
    new Component(header_logoText.root, "h3", ["second"], 'Бронируй',);
    new Component(header_logoText.root, "h3", ["third"], 'Путешествуй',);

    new Component(this.root, "a", ['header_tours'], "Туры", ["href"], ["#"]);

    new Component(this.root, "img", ["header_logo"], null, ["src",'alt'], ["../assets/Логотип.png",'logo']);

    new Component(this.root, "a", null, "Почему мы?", ["href"], ["#"]);

    new Component(this.root, "a", null, "Контакты", ["href"], ["#"]);

    const cart = new Component(this.root, "a", ['header_cart'], null, ["href"], ["#"]);
    new Component(cart.root, "img", ["header_cart"], null, ["src",'alt'], ["../assets/корзина 1.png",'cart']);
    
    const profile = new Component(this.root, "a", ['header_profile'], null, ["href"], ["#gerger"]);
    new Component(profile.root, "img", ["header_profile"], null, ["src",'alt'], ["../assets/пользователь 1.png",'profile']);


    // new Component(
    //   this.root,
    //   "h1",
    //   ["logo"],
    //   'LuxCars'
    // );

    // const nav = new Component(this.root, "nav", ["nav"]);

    // new Component(nav.root, "a", null, "Каталог", ["href"], ["#"]);
    // new Component(nav.root, "a", null, "Контакты", ["href"], ["#"]);


    // new Component(nav.root, "img", ["profile"], null, ["src",'alt'], ["../assets/Cart.svg",'profile']);
    // new Component(nav.root, "button", ["account"], 'Вход', [], );

    
  }
}
