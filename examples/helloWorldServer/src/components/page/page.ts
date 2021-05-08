import { BaseComponent, getDefaultTemplateFilename } from '@view-components/core';

interface PageContext {
  user: string
}

export default class Page extends BaseComponent<PageContext>(getDefaultTemplateFilename(__filename)) {}