module.exports = {
  overrides: [
    {
      files: "*.sol",
      rules: {
        "unit-case": null,
      },
      options: {
        bracketSpacing: false,
        printWidth: 99,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
        explicitTypes: "always",
      },
    },
    {
      files: "*.ts",
      options: {
        printWidth: 120,
        semi: false,
        tabWidth: 2,
        singleQuote: false,
        trailingComma: "es5",
      },
    },
  ],
};
