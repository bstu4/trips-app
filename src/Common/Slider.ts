import { Component } from "../Abstract/Componets";
import { TGood, TTypeGood } from "../Abstract/Types";
import { LogicService } from "../Services/LogicService";
import { OptionTypeGoods } from "./OptionTypeGoods";

export class Slider extends Component {
    private nameGood: string = "";
    private photos:string[] = ["../assets/cardPhoto1.png"];

    private imgLeft:Component;
    private imgCenter:Component;
    private imgRight:Component;
    private divSlider:Component;
    private btnLeft:Component;
    private btnRight:Component;

    constructor(parent: HTMLElement, private service: LogicService) {
        super(parent, "div", ["slider_wrapper"]);
        this.divSlider = new Component(this.root, "div", ["slider"]);
        const divPhotoLeft = new Component(this.divSlider.root, "div", ["left__slider"]);
        this.imgLeft = new Component(divPhotoLeft.root, "img", [], null, ["src", "alt"], [this.photos[0], this.nameGood]);
        const divPhotoCenter = new Component(this.divSlider.root, "div", ["center__slider"]);
        this.imgCenter = new Component(divPhotoCenter.root, "img", [], null, ["src", "alt"], [this.photos[0], this.nameGood]);
        const divPhotoRight = new Component(this.divSlider.root, "div", ["right__slider"]);
        this.imgRight = new Component(divPhotoRight.root, "img", [], null, ["src", "alt"], [this.photos[0], this.nameGood]);
        this.btnLeft = new Component(this.root, "button", ["left_button_slider", "button__slider"], "<<");
        this.btnLeft.root.onclick = () => {
            this.moveLeftSlider();
        };
        this.btnRight = new Component(this.root, "button", ["right_button_slider", "button__slider"], ">>");
        this.btnRight.root.onclick = () => {
            this.moveRightSlider();
        };

        this.divSlider.root.onanimationend = () => {
        (this.imgCenter.root as HTMLImageElement).src = this.photos[0];
        this.divSlider.root.classList.remove("move_right__slider", "move_left__slider");
        this.btnLeft.root.onclick = () => {
            this.moveLeftSlider();
        };
        this.btnRight.root.onclick = () => {
            this.moveRightSlider();
        };
        }
    }

    public setPhotos(good: TGood):void {
        this.nameGood = good.title;
        const arrPhotos = [];
        if (good.photoLink.length > 0) arrPhotos.push(good.photoLink);
        
        arrPhotos.push(...good.slider);
        
        if(arrPhotos.length > 0) {
            this.photos = arrPhotos;
        } else {
            this.photos = ["../assets/cardPhoto1.png"];
        }
        
        [this.imgLeft, this.imgCenter, this.imgRight].forEach((el) => {
            (el.root as HTMLImageElement).src = this.photos[0];
            (el.root as HTMLImageElement).alt = this.nameGood;
        })
    }

    private moveRightSlider():void {
        console.log("right");
        
        if (this.photos.length < 2) return;
        this.btnLeft.root.onclick = null;
        this.btnRight.root.onclick = null;
        this.shiftPhoto("left");
        (this.imgLeft.root as HTMLImageElement).src = this.photos[0];
        this.divSlider.root.classList.add("move_right__slider");
    }

    private moveLeftSlider():void {
        console.log("left");

        if (this.photos.length < 2) return;
        this.btnLeft.root.onclick = null;
        this.btnRight.root.onclick = null;
        this.shiftPhoto("right");
        (this.imgRight.root as HTMLImageElement).src = this.photos[0];
        this.divSlider.root.classList.add("move_left__slider");
    }

    private shiftPhoto(direction: string): void {
        if (direction == "left") {
            this.photos = this.photos.slice(1).concat(this.photos.slice(0,1));
        } else {
            this.photos = this.photos.slice(-1).concat(this.photos.slice(0, -1));
        }
    }
}