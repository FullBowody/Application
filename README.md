# FullBowody GUI
This repository contains the source code for the FullBowody UI.
It is a web application used as an interface between the user and
the [FullBowody Engine](https://github.com/FullBowody/Engine).

This project uses electron to create a windowed application.
It is built mainly using [Vue.js](https://vuejs.org/) and [TailwindCSS](https://tailwindcss.com/).

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
