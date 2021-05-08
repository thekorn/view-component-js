import {promises as fs} from 'fs';

import { parse, compile, render, interpolate } from '@view-components/html-parser';

interface DefaultContext {}
interface Component {
  loadTemplate: () => Promise<string>;
  compile: () => Promise<any>
  render: (params: any) => Promise<string>
}

// TODO: in components arguments value has to implement Component
export function BaseComponent<T = DefaultContext>(templateFilename: string, components?: Record<string, any>) {
  return class AbstractBaseComponent implements Component {

    constructor() {}

    // TODO: cache
    async loadTemplate(): Promise<string> {
      const templateFn = templateFilename
      const content = await fs.readFile(templateFn);
      return content.toString();
    }

    // TODO: fix type
    async compile(): Promise<any> {
      const templateContent = await this.loadTemplate()
      const nodes = await parse(templateContent)
      return compile(nodes, components)
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