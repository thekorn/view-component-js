import { parse } from '@view-components/html-parser';
export default class BaseComponent {

  render(): any {
    return parse('<h1>this got rendered</h1>')
  }
}