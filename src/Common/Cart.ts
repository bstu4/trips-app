import { Component } from "../Abstract/Componets";
import { TGood } from "../Abstract/Types";
import { LogicService } from "../Services/LogicService";

export class Cart extends Component {
    constructor(parent: HTMLElement, private service: LogicService, private good: TGood) {
        super(parent,'div', ["cart"]);

        new Component(this.root,'img', ["image_cart"], null , ["src", "alt"], ["../assets/cartImg.png", "good"]);

        new Component(this.root, "p", ["cart_title"], good.title);
        new Component(this.root, "a", ["cart_subtitle"], "Подробнее");

        this.root.onclick = () => {
            service.openPageDetails(good);
        }
    }
}