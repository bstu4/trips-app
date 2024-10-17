import { Component } from "../Abstract/Componets";

export class Footer extends Component {
    constructor(parent: HTMLElement) {
    super(parent, "footer", ["footer"]);
    
    new Component(
        this.root,
        "span",
        ['footer_title'],
        "Контакты"
      );
    
    const infoDiv = new Component(
        this.root,
        "div",
        ["infoDiv"],
        null
    );

    const Info = new Component(
        infoDiv.root,
            "div",
            ["Info"],
            null
        );

    const Info2 = new Component(
        infoDiv.root,
        "div",
        ["Info2"],
        null
    );

    const phoneNumber = new Component(Info.root, "div", ["phoneNumber"], null);
    new Component(phoneNumber.root, "img", ["phoneNumberImg"], null, ["src",'alt'], ["../assets/tel.png",'cart']);
    new Component(phoneNumber.root, "h3", null, '+375296847925',);

    const Email = new Component(Info.root, "div", ["Email"], null);
    new Component(Email.root, "img", ["Email"], null, ["src",'alt'], ["../assets/email.png",'cart']);
    new Component(Email.root, "h3", null, 'em000406@bstu.com',);

    const Adress = new Component(Info.root, "div", ["Adress"], null);
    new Component(Adress.root, "img", ["AdressImg"], null, ["src",'alt'], ["../assets/location.png",'cart']);
    new Component(Adress.root, "h3", ['footer_Adress'], 'г.Брест, ул. Советская, 67, 12 этаж',);

    

    
    const links = new Component(Info2.root,"div",["links"],null);
    new Component(links.root, "img", ["tg"], null, ["src",'alt'], ["../assets/тг.png",'tg']);
    new Component(links.root, "img", ["facebook"], null, ["src",'alt'], ["../assets/фб.png",'facebook']);
    new Component(links.root, "img", ["instagram"], null, ["src",'alt'], ["../assets/инст.png",'instagram']);
    new Component(links.root, "img", ["vk"], null, ["src",'alt'], ["../assets/вк.png",'vk']);


    new Component(Info2.root, "img", ["footer_logo"], null, ["src",'alt'], ["../assets/Логотип.svg",'logo']);
    }
}
