import type { Config } from "jest";

const config: Config = {
  setupFiles: ["<rootDir>/jest.setup.ts"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironmentOptions: {},
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["**/__tests__/auth.test.ts", "**/__tests__/api.test.ts"],
      transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
      },
      moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
      setupFiles: ["<rootDir>/jest.setup.ts"],
    },
    {
      displayName: "jsdom",
      testEnvironment: "jsdom",
      testMatch: ["**/__tests__/components/**/*.test.tsx"],
      transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
      },
      moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
      setupFiles: ["<rootDir>/jest.setup.ts"],
      setupFilesAfterEnv: ["@testing-library/jest-dom"],
    },
  ],
};

export default config;
