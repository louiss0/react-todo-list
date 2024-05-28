# React To do List

This project is a to do list made by me.
It's a simple one that uses simple CRUD operations
and local storage to save the todo's locally.
This app uses unocss for styling.


To start the server.

```sh
pnpm run dev 
```

To build the app.

```sh
pnpm run build 
```

To preview the app.

```sh
pnpm run preview 
```

## Unocss 

I have chosen to use UnoCSS for styling this app.
UnoCSS is configured to blocklist most classes that aren't associated with tailwindCSS.
I decided to use UnoCSS preset icons for this app. I also enabled Variant Groups as well.

## Features

This app is created with the following features.

- Create A Task.
- Delete A Task.
- Read tasks from local Storage.
- Save tasks to localStorage when it's changed.
- Delete completed tasks
- Delete all tasks.
- Task text editing.
- Task checking.

The user can't add tasks to the list when the textbox is empty.
If the user edit's a text but leaves it empty the previous text is used.


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
