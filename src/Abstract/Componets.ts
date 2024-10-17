export class Component {
    root: HTMLElement;

    constructor(
        public parent: HTMLElement,
        tegName: keyof HTMLElementTagNameMap,
        arrStyles?: string[] | null,
        content?: string | null,
        attrProp?: string[] | null,
        attrValue?: string[] | null,
    ) {
        this.root = document.createElement(tegName);
        if (arrStyles) {
            arrStyles.forEach((namestyle)=>{
                this.root.classList.add(namestyle);
            });
        }
        if (content) this.root.innerHTML = content;
        if (attrProp && attrValue && attrProp.length === attrValue.length) {
            attrProp.forEach((prop,i) => {
                this.root.setAttribute(prop,attrValue[i]);
            });
        }
        this.myRender();
    }

    myRemove() {
        this.root.remove();
    }

    myRender() {
        this.parent.append(this.root);
    }
}