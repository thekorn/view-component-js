export abstract class BaseComponent {
  abstract getTemplate(): string

  constructor() {
    console.log('filename ', this.getTemplate());
    
  }

  render(): any {
    return '<h1>this got rendered ffff</h1>'
  }
}