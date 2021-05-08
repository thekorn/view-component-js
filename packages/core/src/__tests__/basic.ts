import { BaseComponent, getDefaultTemplateFilename } from '../index';

test('basic', async () => {
    class myComponent extends BaseComponent(getDefaultTemplateFilename(__filename)) {}
    const component = new myComponent()
    const content = await component.render({});
    expect(content).toBe('<h1>This is a test</h1>');
});