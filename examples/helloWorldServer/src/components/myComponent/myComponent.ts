import { BaseComponent, getDefaultTemplateFilename } from '@view-components/core';

export default class myComponent extends BaseComponent(getDefaultTemplateFilename(__filename)) {}