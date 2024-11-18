import { Component } from "../Abstract/Componets";
import { TGood } from "../Abstract/Types";
import { ButtonTypeGood } from "../Common/ButtonTypeGood";
import { Cart } from "../Common/Cart";
import { LogicService } from "../Services/LogicService";

export class Tours extends Component {
  stateUpdate: boolean = false;

  divButtons:null | Component = null;
  divGoods:null | Component = null;

  constructor(parent: HTMLElement, private service: LogicService) {
    super(parent, "div", ["tours"]);

    new Component(this.root, "p", ['tours__title'], "КАДРЫ С ПУТЕШЕСТВИЙ");

    const divData = new Component(this.root, 'div', ["goods_pages__data"]);
    this.divButtons = new Component(divData.root, 'div', ['data__buttons']);
    this.divGoods = new Component(divData.root, 'div', ["data__goods"]);
    service.addListener("updateGoodsOnPage", (goods) => {
      if (goods) this.updateGoodsOnPage(goods as TGood[]);
    });
  }

  renderWithUpdate(): void {
    if (!this.stateUpdate) {
      this.update();
      this.stateUpdate = true;
    }
    this.myRender();
  }

  update(): void {
    this.service.getTypesGoods().then((typesGoods) => {
      typesGoods.forEach((typeGood,i) => {
        if (this.divButtons) new ButtonTypeGood(this.divButtons.root, this.service, typeGood);
      });
      this.service.updateAllGoods();
    });
  }

  updateGoodsOnPage(goods: TGood[]) {
    const divGoods = this.divGoods;
    if (divGoods) {
      divGoods.root.innerHTML = "";
      goods.forEach((good) => {
        const cart = new Cart( divGoods.root, this.service, good);
      });
    }
  }
}
