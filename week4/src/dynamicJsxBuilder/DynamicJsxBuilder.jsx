import React from 'react';

export default function DynamicJsxBuilder() {
const uiTree = {
  type: "div",
  props: { className: "app" },
  children: [
    {
      type: "header",
      props: {},
      children: [
        {
          type: "h1",
          props: { text: "Dashboard" }
        }
      ]
    },
    {
      type: "main",
      props: {},
      children: [
        {
          type: "section",
          props: { className: "card" },
          children: [
            {
              type: "p",
              props: { text: "Welcome back!" }
            },
            {
              type: "button",
              props: {
                  onClick: () => alert('1'),
                text: "Refresh"
              }
            },
            {
              type: "button",
              props: {
                  onClick: () => alert('2'),
                text: "Refresh"
              }
            },
            {
              type: "button",
              props: {
                onClick: () => alert('3'),
                text: "Refresh"
              }
            },
            {
              type: "button",
              props: {
                onClick: () => alert('4'),
                text: "Refresh"
              }
            }
          ]
        }
      ]
    }
  ]
};
const renderNode = (node) => {
  if (!node || typeof node !== "object" || !node.type) {
    return null;
  }

  const { type, props = {}, children } = node;

  const { text, ...restProps } = props;

  let renderedChildren = null;

  if (Array.isArray(children)) {
    renderedChildren = children.map(child =>renderNode(child));
  } else if (children) {
    renderedChildren = renderNode(children);
  }

  try {
    return React.createElement(
      type,
      restProps,
      text || renderedChildren
    );
  } catch {
    return null;
  }
}

    return (
        <div>
            {renderNode(uiTree)}
        </div>
    );
}