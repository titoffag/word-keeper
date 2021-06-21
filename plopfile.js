module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/Component.tsx.hbs",
      },
    ],
  });
};
