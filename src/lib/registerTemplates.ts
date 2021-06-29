import * as Handlebars from 'handlebars/runtime';

import enums from '../templates/enums.hbs';
import permission from '../templates/permission.hbs';

export interface Templates {
  enums: Handlebars.TemplateDelegate;
  permission: Handlebars.TemplateDelegate;
}

/**
 * Read all the Handlebar templates that we need and return on wrapper object
 * so we can easily access the templates in out generator / write functions.
 */
export function registerHandlebarTemplates(): Templates {
  // Main templates (entry points for the files we write to disk)
  const templates: Templates = {
    enums: Handlebars.template(enums),
    permission: Handlebars.template(permission),
  };
  return templates;
}
