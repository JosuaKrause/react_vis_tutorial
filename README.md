This project is meant to show-case basic functionality of [`react`](https://facebook.github.io/react/)
and some common libraries in the context of creating visualizations. It shows a basic histogram using `SVG`
and a basic scatterplot using `canvas`.

# Run the project

In order to get the project running you need to first install the dependencies via

```bash
npm install
```

Afterwards the react-server can be started via

```bash
npm start
```

which will automatically open the correct webpage.

The commits of this project are meant to guide through its development by changing / adding one feature at a time.
Each commit is explained in detail on github via the links [below](#history).
You can check out commits from a separate terminal via

```bash
git checkout <commithash>
```

The react-server will automatically detect the change and update the website.

# Setting up a react project

You can use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap a react project.
First, you need to install the `create-react-app` package:

```bash
npm install -g create-react-app
```

Then you can bootstrap a project via

```bash
create-react-app myapp
cd myapp && npm start
```

In addition to `react` there are a few common libraries and browser plugins.

Browser plugins:
- React Developer Tools
- Redux DevTools
- JSON Formatter (useful in general)

`npm` packages (`npm install --save packagename`):
- `styled-components`
- `redux` and `react-redux`
- `knova` and `react-knova` or `pixi.js` (not used in this tutorial as we are manually using `canvas`)

# History

The commits of this repository have detailed description on github.
Please click on the links below to learn about each step of writing the project.
You can follow along using `git checkout <commithash>`. If the react-server is
running the website will update automatically. To get back to the latest version
run `git checkout master`:

- `git checkout c5c2bdd` c5c2bdd48cc1d777f2c488534fab3a1bfa732303 The initial state of the project.
- `git checkout 3ef3e22` 3ef3e22ecfce1e2b3e771f8eeb1cb5644f20f9fa Using styled components.
- `git checkout 3b17d8e` 3b17d8ec67e8ed44c43777ea3a30fd976a567147 Create your own react component.
- `git checkout 283bbb4` 283bbb4d8f33792b94e57dc24489eeb9583d000f Use themes to keep values in one place.
- `git checkout 0355dfb` 0355dfb0ab3f157a017413279b4121d9151f8e8a Load data from URLs.
- `git checkout 29654d8` 29654d87c7634b5799ad8fcc3eddea83c7ac4913 Cleaning a bit \#1.
- `git checkout a5346fa` a5346fa7b0323a5c45de69d75f891fe3e472734c `SVG` bar chart.
- `git checkout 9104300` 910430025ba7a01c6b3207233ab546608fb5b8a4 Showing percentages.
- `git checkout 8e29a77` 8e29a77dcdb494c337bb145cdee5dc4b4e5a879e Cleaning a bit \#2.
- `git checkout 5cef112` 5cef11268951d113a9b79f23fd81983729f5caff Mouse interaction and `redux`.
- `git checkout 4a29fda` 4a29fda44ed40305f92c604accf58269b4e11ed7 More convenient `redux` use.
- `git checkout d171860` d1718600db33a19645cee789a42113be14dacb02 Animating transitions.
- `git checkout 24dcd7a` 24dcd7a1b9290f390da4d6cc8d16dffb751e0f5e Create wrapper component for loading data.
- `git checkout c4672b7` c4672b70e449f7d7f3a8c68f34f1871a6f7a1adf Make the animated rectangle a wrapper.
- `git checkout 354b414` 354b414ee9842e5aff98cb97b4f2372fca6f6fac Draw scatterplot using `canvas`.
