const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //baseUrl: "http://localhost:3000", // Altere conforme sua aplicação
    //browser: "chrome", // Define o Chrome como navegador padrão
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});



