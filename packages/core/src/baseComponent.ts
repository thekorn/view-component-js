import {promises as fs} from 'fs';

import { parse, render, interpolate, traverseNode, Node } from '@view-components/html-parser';

interface DefaultContext {}
interface Component {
  loadTemplate: () => Promise<string>;
  compile: () => Promise<any>
  render: (params: any) => Promise<string>
}

// TODO: in components arguments value has to implement Component
export function BaseComponent<T = DefaultContext>(templateFilename: string, components?: Record<string, any>) {
  return class AbstractBaseComponent implements Component {

    components: Map<string, any>;

    constructor() {
      this.components = new Map(Object.entries(components || {}));
      this.components.forEach((value, key, map) => {
        map.set(key.toLowerCase(), value)
      })
    }

    // TODO: cache
    async loadTemplate(): Promise<string> {
      const templateFn = templateFilename
      const content = await fs.readFile(templateFn);
      return content.toString();
    }

    // TODO: fix type
    async compile(): Promise<Node> {
      const templateContent = await this.loadTemplate()
      const node = await parse(templateContent)

      return traverseNode<Node>(node, this.components)
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