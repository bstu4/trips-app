import { Component } from "../Abstract/Componets";
import { TGood } from "../Abstract/Types";
import { LogicService } from "../Services/LogicService";

export class Cart extends Component {
    constructor(parent: HTMLElement, private service: LogicService, private good: TGood) {
        super(parent,'div', ["cart"]);

        new Component(this.root,'img', ["image_cart"], null , ["src", "alt"], ["../assets/cartImg.png", "good"]);

        //new Component(this.root, "p", [], "Колличество - " + good.count + "шт");
        //new Component(this.root, "p", [], good.title);
    }
}