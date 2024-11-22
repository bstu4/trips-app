import { Component } from "../Abstract/Componets";
import { TGood } from "../Abstract/Types";
import { Cart } from "../Common/Cart";
import { SelectFilter } from "../Common/SelectFilter";
import { SelectTypeGoods } from "../Common/SelectTypeGoods";
import { LogicService } from "../Services/LogicService";

export class Tours extends Component {
  stateUpdate: boolean = false;

  divButtons:null | Component = null;
  divGoods:null | Component = null;

  constructor(parent: HTMLElement, private service: LogicService) {
    super(parent, "div", ["tours"]);

    

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
      if (this.divButtons) {
        new SelectTypeGoods(this.divButtons.root,this.service, typesGoods);
        new SelectFilter(this.divButtons.root, this.service, "Количество человек", ['1', '2', '3'], 'peopleCount');


        const sortButton = new Component(this.divButtons.root, 'input', ['select_type_sort'], "", ["type","value"], ["button", "сортировка"])
          sortButton.root.onclick = () => {
            this.service.changeSortGoods();
          };
      }
      
      this.service.updateGoodsByType('');
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
