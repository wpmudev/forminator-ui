import "../src/stories/assets/forminator-ui.min.css"; // Get Forminator UI styles.
import "../src/stories/assets/forminator-material.min.css"; // Get Forminator Material styles.

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    disable: true
  }
}