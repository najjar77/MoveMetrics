/**
 OUR LINTING SETUP IS BASED ON THIS ARTICLE https://dev.to/tao/adding-eslint-and-prettier-to-nuxt-3-2023-5bg
 * */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended"],
  plugins: [],
  rules: {
    "no-console": "off",
    "vue/script-setup-uses-vars": "error",
  },
};
