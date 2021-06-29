import fs from 'fs-extra';
import * as path from 'path';
import * as Handlebars from 'handlebars/runtime';

/**
 * @description if folder is exist, remove and mkdir a new folder
 */
async function checkFolder(folder) {
    const isExists = await fs.pathExistsSync(folder);
    if (isExists) {
        await fs.removeSync(folder);
    }
    await fs.mkdirsSync(folder);
}
/**
 * @description write enums files
 */
async function writeEnums(folder, enums, templates) {
    const enumsData = templates.enums({ enums });
    await fs.writeFileSync(folder + '/enum.ts', enumsData);
}
/**
 * @description write permissions
 */
async function writePermissions(permissions, outputPath, templates) {
    const permissionTemplate = templates.permission({ permissions });
    const fileName = outputPath + '/permissions.ts';
    await fs.writeFileSync(fileName, permissionTemplate);
}

var enums = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.strict, alias2=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "/**\n * @description "
    + ((stack1 = alias2(alias1(depth0, "name", {"start":{"line":8,"column":18},"end":{"line":8,"column":22}} ), depth0)) != null ? stack1 : "")
    + "\n */\nexport enum "
    + ((stack1 = alias2(alias1(depth0, "name", {"start":{"line":10,"column":14},"end":{"line":10,"column":18}} ), depth0)) != null ? stack1 : "")
    + " {\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),lookupProperty(depth0,"enums"),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":2},"end":{"line":16,"column":11}}})) != null ? stack1 : "")
    + "}\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.strict, alias2=container.lambda;

  return "  /**\n  * @description "
    + ((stack1 = alias2(alias1(depth0, "label", {"start":{"line":13,"column":19},"end":{"line":13,"column":24}} ), depth0)) != null ? stack1 : "")
    + "\n  */\n  "
    + ((stack1 = alias2(alias1(depth0, "value", {"start":{"line":15,"column":4},"end":{"line":15,"column":9}} ), depth0)) != null ? stack1 : "")
    + " = '"
    + ((stack1 = alias2(alias1(depth0, "value", {"start":{"line":15,"column":17},"end":{"line":15,"column":22}} ), depth0)) != null ? stack1 : "")
    + "',\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "/**\n * * notice this file create by sandfish\n * * https://github.com/diveDylan/sandfish\n * @description 系统字典枚举\n */\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),lookupProperty(depth0,"enums"),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":18,"column":9}}})) != null ? stack1 : "");
},"useData":true};

var permission = {"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.strict, alias2=container.lambda;

  return "  /**\n  * @description "
    + ((stack1 = alias2(alias1(depth0, "label", {"start":{"line":9,"column":19},"end":{"line":9,"column":24}} ), depth0)) != null ? stack1 : "")
    + "\n  */\n  "
    + ((stack1 = alias2(alias1(depth0, "value", {"start":{"line":11,"column":4},"end":{"line":11,"column":9}} ), depth0)) != null ? stack1 : "")
    + " = '"
    + ((stack1 = alias2(alias1(depth0, "code", {"start":{"line":11,"column":17},"end":{"line":11,"column":21}} ), depth0)) != null ? stack1 : "")
    + "',\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "/**\n * * notice this file create by sandfish\n * * https://github.com/diveDylan/sandfish\n * * @description 系统权限枚举\n */\nexport enum Permission {\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),lookupProperty(depth0,"permissions"),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":12,"column":11}}})) != null ? stack1 : "")
    + "}";
},"useData":true};

/**
 * Read all the Handlebar templates that we need and return on wrapper object
 * so we can easily access the templates in out generator / write functions.
 */
function registerHandlebarTemplates() {
    // Main templates (entry points for the files we write to disk)
    const templates = {
        enums: Handlebars.template(enums),
        permission: Handlebars.template(permission),
    };
    return templates;
}

function generatorEnums({ enums, formatter, permissionKey, }) {
    const enumsArray = [];
    let permissions;
    const enumsKeys = Object.keys(enums);
    enumsKeys.forEach((enumsKey) => {
        /**
         * @notice 权限应该是[key,value]对象
         * 我们会自动过滤数字命名的key
         */
        if (enumsKey === permissionKey) {
            permissions = Object.entries(enums[enumsKey]).map((enumsItem) => ({
                label: enumsItem[1],
                value: codeSplitTransfer(enumsItem[0]).toUpperCase(),
                code: enumsItem[0],
            })).filter(enumsItem => isNaN(Number(enumsItem.value)));
            return;
        }
        /**
         * @notice sometime wo create enums as a array
         */
        if (Array.isArray(enums[enumsKey])) {
            const formatterFn = formatter ||
                function (enums) {
                    return { label: enums.label, value: enums.value.toUpperCase() };
                };
            enumsArray.push({
                name: addEnumTail(enumsKey),
                // @ts-ignore
                enums: enums[enumsKey].map(enumsItem => formatterFn(enumsItem)).filter(enumsItem => isNaN(Number(enumsItem[0]))),
            });
        }
        else {
            enumsArray.push({
                name: addEnumTail(enumsKey),
                enums: Object.entries(enums[enumsKey]).map((enumsItem) => ({
                    label: enumsItem[1],
                    value: enumsItem[0].toUpperCase(),
                })).filter(enumsItem => isNaN(Number(enumsItem.value))),
            });
        }
    });
    return {
        enumsArray: enumsArray.filter(enumItem => enumItem.enums.length),
        permissions,
    };
}
/**
 * @description add Enum string tail for name
 * @param name string
 * @returns string
 */
function addEnumTail(name) {
    return name.endsWith('Enum') ? name : name + 'Enum';
}
/**
 * @description 处理权限码中的分割标志: . - -> 变成下划线
 */
function codeSplitTransfer(code) {
    return code.replace(/(\:|\,|\.|\-|->)/g, '_');
}
/**
 * @description 自动化生成枚举
 * @param enums
 * @param outputPath
 */
async function generateEnums({ enums, outputPath, formatterFn, permissionKey, }) {
    const folder = path.resolve(process.cwd(), outputPath);
    await checkFolder(folder);
    const { enumsArray, permissions } = generatorEnums({
        enums,
        formatter: formatterFn,
        permissionKey,
    });
    const templates = registerHandlebarTemplates();
    await Promise.all([
        writeEnums(folder, enumsArray, templates),
        permissions
            ? writePermissions(permissions, folder, templates)
            : Promise.resolve(),
    ]);
}

export { addEnumTail, codeSplitTransfer, generateEnums, generatorEnums };
