import {promises as fs} from 'fs';

import { parse, compile, render, interpolate } from '@view-components/html-parser';

export function BaseComponent<T>(templateFilename: string) {
  return class AbstractBaseComponent {

    constructor() {}

    // TODO: cache
    async loadTemplate(): Promise<string> {
      const templateFn = templateFilename
      const content = await fs.readFile(templateFn);
      return content.toString();
    }

    async compile() {
      const templateContent = await this.loadTemplate()
      const nodes = await parse(templateContent)
      return compile(nodes)
    }

    async render(params: T): Promise<string> {
      const code = await this.compile()
      const content = render(code);
      if (params) {
        return interpolate(content, params);
      } else {
        return content;
      }
    }
  }
}