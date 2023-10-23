# TITLE: POKEMON DEX APP 

link: https://pokemon-app-seven-lyart.vercel.app/

This responsive fun app is for generating random pokemon cards from Pokemon API, compare them, access & manage selected card attributes, save and delete selected card to/from user account, firebase OAuth for user login /registration 

# TECHNOLOGIES USED
- ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) `REACT`
- ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) `SCSS`
- ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) `TYPESCRIPT`
- ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) `FIREBASE`
- ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) `FRAMER MOTION`
- ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) `AXIOS`
- ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) `REACT-TOASTIFY`

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
