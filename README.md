# FullBowody Application
This repository contains the source code for the FullBowody Application.
It is a web application used as an interface between the user and
the [FullBowody Engine](https://github.com/FullBowody/Engine).

## Project Informations
- This project uses [Electron](https://www.electronjs.org/) to create a windowed application.
- The main used frameworks to create the UI are [Vue.js](https://vuejs.org/) and [TailwindCSS](https://tailwindcss.com/).
- The application is built using [Webpack](https://webpack.js.org/).
- All the server side code is written in [TypeScript](https://www.typescriptlang.org/).
- The application is packaged using [electron-builder](https://www.electron.build/).

## Setup the project
To setup the entire project, run the following command:
```bash
npm install
```
Make sure the FullBowody 's Engine addon is located in the `src/server/Core/build` folder,
with the FullBowody 's Engine bridge located in the `src/server/Core/bridge` folder.

## Run and debug the project
To run the project in a electron window 
with devlopment features like hot reload, run
```bash
npm run electron:serve
```

## Build the project
To build the project, run
```bash
npm run electron:build
```

## License
This project is licensed under the GNU GPL-3.0 License - see the [LICENSE](LICENSE) file for details

---
Author : [FurWaz](https://github.com/furwaz)