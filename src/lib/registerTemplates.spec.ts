import { registerHandlebarTemplates } from './registerTemplates';

describe('registerHandlebarTemplates', () => {
  it('should return correct templates', () => {
    const templates = registerHandlebarTemplates();
    expect(templates.enums).toBeDefined();
    expect(templates.permission).toBeDefined();
  });
});
