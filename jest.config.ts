import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  verbose: true,
  coveragePathIgnorePatterns: ["/node_modules"],
  moduleDirectories: ["node_modules", "src"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

export default config;
