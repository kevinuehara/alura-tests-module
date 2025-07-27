## Instale as dependências dos testes

```bash
npm install --save-dev jest @types/jest ts-jest babel-jest \
 @testing-library/react @testing-library/jest-dom @testing-library/user-event \
 identity-obj-proxy ts-node jest-environment-jsdom @faker-js/faker
```

### Configure o jest.config.ts

```ts
import { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "./tsconfig.test.json",
    },
  },
};

export default config;
```

### Configure o jest.setup.ts

```ts
import "@testing-library/jest-dom";
```

### Adicione nos scripts

```json
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
```

### TSconfig

Criar o tsconfig.test.json

{
"extends": "./tsconfig.json",
"compilerOptions": {
"module": "ESNext",
"moduleResolution": "node",
"jsx": "react-jsx",
"verbatimModuleSyntax": false,
"esModuleInterop": true,
"types": ["jest", "@testing-library/jest-dom"]
},
"include": ["src", "jest.setup.ts", "**/*.test.tsx", "**/*.spec.tsx"]
}
