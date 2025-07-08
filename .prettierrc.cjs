module.exports = {
  // Spacing
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  
  // Quotes
  singleQuote: true,
  quoteProps: 'as-needed',
  
  // Semicolons
  semi: true,
  
  // Trailing commas
  trailingComma: 'es5',
  
  // Brackets
  bracketSpacing: true,
  bracketSameLine: false,
  
  // Arrows
  arrowParens: 'always',
  
  // Prose
  proseWrap: 'preserve',
  
  // HTML
  htmlWhitespaceSensitivity: 'css',
  
  // End of line
  endOfLine: 'lf',
  
  // Embedded languages
  embeddedLanguageFormatting: 'auto',
  
  // Single attribute per line
  singleAttributePerLine: false,
  
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: false,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
        tabWidth: 2,
      },
    },
  ],
};