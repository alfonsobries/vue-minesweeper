const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

const borderPlugin = ({ addUtilities, e, theme, variants }) => {
  const colors = flattenColorPalette(theme('borderColor'));
  delete colors['default'];

  const colorMap = Object.keys(colors)
    .map(color => ({
      [`.border-t-${color}`]: {borderTopColor: colors[color]},
      [`.border-r-${color}`]: {borderRightColor: colors[color]},
      [`.border-b-${color}`]: {borderBottomColor: colors[color]},
      [`.border-l-${color}`]: {borderLeftColor: colors[color]},
    }));
  const utilities = Object.assign({}, ...colorMap);

  addUtilities(utilities, variants('borderColor'));
}

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    borderPlugin
  ],
}
