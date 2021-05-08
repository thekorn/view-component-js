import { BaseComponent, getDefaultTemplateFilename } from '@view-components/core';

export default class Page extends BaseComponent {
  getTemplate() {
    return getDefaultTemplateFilename(__filename);
  }
}