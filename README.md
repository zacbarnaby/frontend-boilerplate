# Front-end Boilerplate

---

# Description

This boilerplate uses gulp.js to automate and enhance your workflow. I also included Bootstrap 5 Grid because I like it and it speeds up development.

## Features
- [Bootstrap 5 Grid](https://getbootstrap.com/docs/5.0/layout/grid/)
- [SASS/SCSS Preproccesor](https://sass-lang.com/)
- Compresses images using [imagemin](https://github.com/imagemin/imagemin) for production.
- Watch for file changes
- Create a local server and automatically reload your webpage using [BrowserSync](https://browsersync.io/)

## Installation

To install, clone this repository.

```
git clone https://github.com/zacbarnaby/frontend-boilerplate
```

Once cloned, install.

```json
npm install
```

# Usage

It's very simple, you can either use development or production. 

Development will watch, process, transpile and reload your webpage for you.
```json
npm run dev
```

Production will compress images, minify your js/css ready for production.
```json
npm run prod
```