// Local oxlint plugin: this project renders with Preact, which accepts `class`
// on DOM elements. Prefer `class` over `className` on intrinsic (lower-case)
// elements. Components are left alone: our own components take a `class` prop
// and reject `className` at the type level (closed props types, or
// `Omit<ComponentProps<...>, "className">` where props derive from preact's
// intrinsics — preact's intrinsic types accept both keys, so the Omit is what
// makes the type-checker catch a stray `className`), and third-party React
// components legitimately still need `className`, so this rule must not touch
// them.

const isIntrinsicTag = (name) => /^[a-z]/.test(name);

/** @type {import("oxlint").Plugin} */
export default {
  meta: { name: "preact-class" },
  rules: {
    "prefer-class-over-classname": {
      meta: {
        fixable: "code",
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            const tag = node.name;
            if (
              !tag ||
              tag.type !== "JSXIdentifier" ||
              !isIntrinsicTag(tag.name)
            ) {
              return;
            }
            for (const attr of node.attributes) {
              if (
                attr.type === "JSXAttribute" &&
                attr.name &&
                attr.name.type === "JSXIdentifier" &&
                attr.name.name === "className"
              ) {
                context.report({
                  node: attr.name,
                  message:
                    "Use `class` instead of `className` on DOM elements (this project renders with Preact). `className` is only for third-party React components that require it.",
                  fix: (fixer) => fixer.replaceText(attr.name, "class"),
                });
              }
            }
          },
        };
      },
    },
  },
};
