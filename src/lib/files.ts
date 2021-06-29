import fs from 'fs-extra';
import { Templates } from './registerTemplates';
import { Permission } from './enum';

/**
 * @description if folder is exist, if noexist mkdir a new folder
 */
export async function checkFolderWithoutRemove(folder: string) {
  const isExists = await fs.pathExistsSync(folder);
  if (!isExists) {
    await fs.mkdirsSync(folder);
  }
}

/**
 * @description write enums files
 */
export async function writeEnums(folder, enums, templates) {
  const enumsData = templates.enums({ enums });
  await fs.writeFileSync(folder + '/enum.ts', enumsData);
}

/**
 * @description write permissions
 */
export async function writePermissions(
  permissions: Permission[],
  outputPath: string,
  templates: Templates
): Promise<void> {
  const permissionTemplate = templates.permission({ permissions });
  const fileName = outputPath + '/permissions.ts';
  await fs.writeFileSync(fileName, permissionTemplate);
}
