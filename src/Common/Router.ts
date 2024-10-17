import { Page } from "../Abstract/Inteface";

export class Router {
  constructor(public links: Record<string, Page>) {
    window.onhashchange = () => {
      this.openPage();
    };

    this.openPage();
  }

  openPage(): void {
    Object.values(this.links).forEach((el) => el.myRemove());

    const url = window.location.hash.slice(1);

    if (url === "tours") {
      this.links["#tours"].renderWithUpdate();
    } else if (url === "information") {
      this.links["#information"].renderWithUpdate();
    } else {
      this.links["#"].renderWithUpdate();
    }
  }
}
