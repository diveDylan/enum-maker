import * as files from './files';
import { Templates } from './registerTemplates';
import fs from 'fs-extra';

jest.mock('fs-extra', () => {
  return {
    _isEsModule: true,
    writeFileSync: jest.fn(() => {}),
    pathExistsSync: jest.fn().mockImplementation(value => value === '' ? false : true ),
    removeSync: jest.fn(),
    mkdirsSync: jest.fn(),
  };
});
let templates: Templates;
beforeAll(() => {
  templates = {
    enums: () => 'enums',
    permission: () => 'permission',
  };

  jest.restoreAllMocks()
});

test('checkFolderWithoutRemove test lib folder exist', async () => {
  await files.checkFolderWithoutRemove('../lib');
  expect(fs.pathExistsSync).toReturnWith(true);
  expect(fs.mkdirsSync).toBeCalledTimes(0)
});

test('checkFolderWithoutRemove test folder not exsit', async () => {
  await files.checkFolderWithoutRemove('');
  expect(fs.pathExistsSync).toReturnWith(false);
  expect(fs.mkdirsSync).toBeCalledTimes(1)
});

test('writeEnums should write file', async () => {
  const enumsFn =  jest.spyOn(templates, 'enums').mockImplementation(enums=> enums)
  await files.writeEnums('../lib', [], templates);
  expect(enumsFn).toBeCalledWith({ enums: []})
  expect(fs.writeFileSync).toBeCalled();
});
test('writePermissions should write files', async () => {
  const permissionFn = jest.spyOn(templates, 'permission').mockImplementation(permission=> permission)
  await files.writePermissions([], '../lib', templates);
  expect(permissionFn).toBeCalledWith({ permissions: [] })
  expect(fs.writeFileSync).toBeCalled();
});


