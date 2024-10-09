module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce a maximum file length for Angular components and services",
      category: "Best Practices",
      recommended: false,
    },
    schema: [
      {
        type: "object",
        properties: {
          max: {
            type: "number",
            default: 500,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function (context) {
    const maxLines = (context.options[0] && context.options[0].max) || 500;

    return {
      Program: function (node) {
        const filename = context.getFilename();
        if (!/\.(component|service)\.ts$/.test(filename)) {
          return; // Only apply the rule to component and service files
        }

        const lines = context.getSourceCode().lines.length;
        if (lines > maxLines) {
          context.report({
            node,
            message: `File '${filename}' has too many lines (${lines}). Maximum allowed is ${maxLines}.`,
          });
        }
      },
    };
  },
};
