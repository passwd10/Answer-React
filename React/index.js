const React = { createElement, render }

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    },
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function render(element, container) {
  const dom = element.type == "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(element.type);

  const isProperty = key => key !== "children"

  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

  element.props.children.forEach(child =>
    render(child, dom)
  );

  container.appendChild(dom);
}

let nextUnitOfWork = null;

/*
break the work into small units, and after we finish each unit we’ll let the browser interrupt the rendering if there’s anything else that needs to be done.
*/
function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  /* 
  We use requestIdleCallback to make a loop. You can think of requestIdleCallback as a setTimeout, but instead of us telling it when to run, the browser will run the callback when the main thread is idle.
  */
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)


function performUnitOfWork(nextUnitOfWork) {
  // TODO
}

export default React;
