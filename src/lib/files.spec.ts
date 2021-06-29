import * as files from './files';
import { Templates } from './registerTemplates';
import fs from 'fs-extra';

jest.mock('fs-extra', () => {
  return {
    _isEsModule: true,
    writeFileSync: jest.fn(() => {}),
    pathExistsSync: jest.fn().mockReturnValue(true),
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
});

test('checkout lib folder should exist', async () => {
  await files.checkFolder('../lib');
  expect(fs.pathExistsSync).toReturnWith(true);
  expect(fs.removeSync).toBeCalledTimes(1);
});

test('writeEnums should write file', async () => {
  await files.writeEnums('../lib', [], templates);
  expect(fs.writeFileSync).toBeCalled();
});
test('writePermissions should write files', async () => {
  await files.writePermissions([], '../lib', templates);
  expect(fs.writeFileSync).toBeCalled();
});
