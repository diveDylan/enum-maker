import { generatorEnums, addEnumTail, codeSplitTransfer, GeneratorEnumsOptions, generateEnums } from './enum';
import { checkFolderWithoutRemove, writeEnums, writePermissions } from './files'
import { registerHandlebarTemplates } from './registerTemplates'
import * as path from 'path'
jest.mock('./files', () => {
  return {
    _isEsModule: true,
    checkFolderWithoutRemove: jest.fn(),
    writePermissions: jest.fn(),
    writeEnums: jest.fn()
  }
})

jest.mock('./registerTemplates', () => {
  return {
    _isEsModule: true,
    registerHandlebarTemplates: jest.fn().mockReturnValue({
      enums: 'enums',
      permissions: 'permissions'
    }),
  }
})
const formatter = jest.fn().mockImplementation(item => ({
  label: item.name,
  value: item.value + '1',
}))
const enumCase: GeneratorEnumsOptions = {
  enums: {
    CheckPeriod: [
      { label: '年度考核', value: 'year' },
      { label: '季度考核', value: 'quarter' }
    ],
    Permissions: {
      VIEW: 'view',
      EDIT: 'edit'
    },
    CheckPeriodNumber: { 1: '年度考核', 2: '季度考核' },
    1: {
      test: 'no content'
    }
  },
  permissionKey: 'Permissions',
  formatter,
}



test('ArrayEnumsCase:  will create an enums array', () => {
  const {enumsArray,permissions } = generatorEnums(enumCase)
  expect( enumsArray ).toHaveLength(1);
  expect(permissions).toHaveLength(2)
  expect( enumsArray[0] ).toHaveProperty('name');
  expect( enumsArray[0] ).toHaveProperty('enums');
  expect(formatter).toBeCalled()
})


test('addEnumTail will add Enum string tail', () => {
  expect(addEnumTail('CheckPeriodEnum')).toBe('CheckPeriodEnum');
  expect(addEnumTail('CheckPeriod')).toBe('CheckPeriodEnum');
});

test('code split format', () => {
  expect(codeSplitTransfer('my:center:like')).toBe('my_center_like');
});


test('generateEnums will write enums and permissions', async () => {
  await generateEnums({
    enums: enumCase.enums,
    permissionKey: enumCase.permissionKey,
    formatterFn: formatter,
    outputPath: './test'
  })
  const outputpath  = path.resolve(process.cwd(), './test')
  expect(checkFolderWithoutRemove).toBeCalledWith(outputpath)
  expect(registerHandlebarTemplates).toBeCalledTimes(1)
  expect(writeEnums).toBeCalled()
  expect(writePermissions).toBeCalled()
})

test('generatorEnums with default formatter', async () => {
  const { enumsArray } = await generatorEnums({
    enums: enumCase.enums,
    formatter: null,
    permissionKey: enumCase.permissionKey,
  })
  expect(enumsArray.filter(item => item.name === addEnumTail('CheckPeriod'))[0].enums[0].value).toBe('YEAR')

})
