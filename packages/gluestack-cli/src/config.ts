const config = {
  repoUrl: 'https://github.com/gluestack/gluestack-ui.git',
  gluestackDir: '.gluestack/cache/gluestack-ui',
  componentsResourcePath: 'example/storybook-nativewind/src/core-components',
  gluestackStyleRootPath: 'themed',
  nativeWindRootPath: 'nativewind',
  expoProject: 'expo',
  nextJsProject: 'nextjs',
  reactNativeCLIProject: 'react-native-cli',
  tailwindConfigRootPath: 'example/storybook-nativewind/tailwind.config.js',
  UIconfigPath: 'gluestack-ui-provider/config.ts',
  writableComponentsPath: 'components/ui',
  branchName: 'patch',
  tagName: '@gluestack-ui/storybook@0.1.0',
  style: 'nativewind',
  providerComponent: 'gluestack-ui-provider',
  configFileName: 'config.ts',
  nativewindUtilPattern: '@gluestack-ui/nativewind-utils/',
  gluestackUIPattern: '@gluestack-ui/',
  templatesDir: '../../../template',
  codeModesDir: '../../../template/template-codemods',
};

export { config };
