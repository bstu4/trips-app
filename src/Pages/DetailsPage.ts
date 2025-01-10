import { Component } from "../Abstract/Componets";
import { TGood } from "../Abstract/Types";
import { Slider } from "../Common/Slider";
import { LogicService } from "../Services/LogicService";

export class DetailsPage extends Component {
  stateUpdate: boolean = false;

  private good: TGood | null = null;

  h2Name: Component;
  divProp: Component;
  slider: Slider;

  constructor(parent: HTMLElement, private service: LogicService) {
    super(parent, "div", ["details_page"]);
    const mainDiv = new Component(this.root, "div", ["itemDiv"]);

    this.h2Name = new Component(mainDiv.root, "h2");
    this.slider = new Slider(mainDiv.root, service);

    new Component(mainDiv.root,'h3', ['main_subtitle'], "Подробности");
    this.divProp = new Component(mainDiv.root, "div", ['prop']);

    new Component(mainDiv.root, "button", ['cartButton'], "В корзину")
    service.addListener("updatePageDetails", (good) => {
        this.good = good as TGood;
        this.update();
    })
  }

  renderWithUpdate(): void {
    if (!this.stateUpdate) {
      this.update();
      this.stateUpdate = true;
    }
    this.myRender();
  }

  update(): void {
    if (!this.good) return;

    this.h2Name.root.textContent = this.good.title;
    this.slider.setPhotos(this.good);
    this.divProp.root.innerHTML = "";
    this.good.typeFields.forEach((type,num) => {
    const divElem = new Component(this.divProp.root, "div", ["attribute"]);
        if (type[1] === "Расстояние") {
          const div = new Component(divElem.root, "div", ["attribute_div"]);
          new Component(div.root, "span", ["type"], type[1] + ":" + " ");
          new Component(div.root, "span", ["value"], "" + this.good?.valueFields[num][1]+ " км");
          return;
        }
        if (type[1] === "Количество человек") {
          const div = new Component(divElem.root, "div", ["attribute_div"]);

          new Component(div.root, "span", ["type"], type[1] + ":" + " ");
          new Component(div.root, "button", ["value", "button"], `-    1    +`);
          return;
        }
        const div = new Component(divElem.root, "div", ["attribute_div"]);

        new Component(div.root, "span", ["type"], type[1] + ":" + " ");
        new Component(div.root, "span", ["value"], "" + this.good?.valueFields[num][1]);
    })
    const divElem = new Component(this.divProp.root, "div", ["attribute"]);
    const div = new Component(divElem.root, "div", ["attribute_div"]);

    new Component(div.root, "span", ["type"], "Стоимость:");
    new Component(div.root, "span", ["value"], "" + this.good?.price+ "р");
  }

  isGoodInDetailsPage(): boolean {
    return this.good ? true : false;
  }
}
