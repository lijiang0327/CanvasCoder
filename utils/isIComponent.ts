import { ICanvas, IComponent } from "@/store/editorStore.d";

const isIComponent = (component: IComponent | ICanvas | null): component is IComponent => {
  return !!component && (component as IComponent).id !== undefined;
}

export default isIComponent;
