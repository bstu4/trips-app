import { Component } from "./Componets";

export interface Page extends Component {
  stateUpdate: boolean;
  renderWithUpdate: () => void;
  update: () => void;
}
