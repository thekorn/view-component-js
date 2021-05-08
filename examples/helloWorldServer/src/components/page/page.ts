import { BaseComponent, getDefaultTemplateFilename } from '@view-components/core';

import myComponent from '../myComponent/myComponent';

interface PageContext {
  user: string
}

const templateFn = getDefaultTemplateFilename(__filename);
const components = {
  myComponent
}

export default class Page extends BaseComponent<PageContext>(templateFn, components) {}