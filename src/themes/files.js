const staticOrigin = process.env.STATIC_ORIGIN;
const min = process.env.MIN_EXT || '';

export default {
  BasicTheme: {
    jsFile: `${staticOrigin}/dist/BasicTheme${min}.js`,
    cssFile: `${staticOrigin}/dist/BasicTheme${min}.css`
  }
};
