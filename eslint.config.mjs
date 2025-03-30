// eslint.config.mjs
export default [
  {
    extends: ["eslint:recommended", "next/core-web-vitals"],
    rules: {
      "react/no-unescaped-entities": "off",
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
