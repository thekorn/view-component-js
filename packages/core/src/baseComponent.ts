import {promises as fs} from 'fs';
export abstract class BaseComponent {
  abstract getTemplate(): string

  constructor() {}

  // TODO: cache
  private async loadTemplate(): Promise<string> {
    const templateFn = this.getTemplate()
    const content = await fs.readFile(templateFn);
    return content.toString();
  }

  async render(): Promise<string> {
    const templateContent = await this.loadTemplate()
    return templateContent;
  }
}