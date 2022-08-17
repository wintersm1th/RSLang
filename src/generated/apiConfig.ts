import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: './api/langApi.json',
  apiFile: './langApiBase.ts',
  apiImport: 'langApiBase',
  outputFile: './services/langApi.ts',
  exportName: 'langApi',
  hooks: true,
};

export default config;
