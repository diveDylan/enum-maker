const { generateEnums } = require('../dist/index');




test('generate enums', async () => {
  const enums = {
    CheckPeriod: { YEAR: '年度考核', QUARTER: '季度考核' },
    ResourceEnum: {
      'center:pricing:add': '个人中心_价格_新增',
      'center:pricing:apply:edit': '个人中心_价格_申请_修改',
      'center:pricing:delete': '个人中心_价格_删除',
    },
  };
  await generateEnums({
    enums,
    outputPath: './tests/.types',
    permissionKey: 'ResourceEnum',
  });
});
