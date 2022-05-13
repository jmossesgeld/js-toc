function generateTableOfContentsFromHeadings(context = document) {
  const headings = context.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const root = { depth: 0, children: [] };
  const stack = [root];

  for (const heading of headings) {
    // Create the node
    const node = {
      depth: Number(heading.tagName.slice(1)),
      text: heading.textContent,
      id: heading.id,
      children: [],
    };
    
    // If node.depth is less than the last node's depth, Pop the stack until it reaches the right parent to push the new node
    while (node.depth <= stack[stack.length - 1].depth) {
      stack.pop();
    }

    // Push the new node to the last node's children
    stack[stack.length - 1].children.push(node);
    stack.push(node);
  }
  console.log(JSON.stringify(root.children));

  return root.children;
}

const el = document.createElement("div");
el.innerHTML = `
<div>
  <h1 id="heading1">h1</h1>
  <h5 id="heading1.1">h5</h5>
  <h4 id="heading1.2">h4</h4>
  <h3 id="heading1.3">h3</h3>
  <h4 id="heading1.3.1">h4</h4>
  <h2 id="heading1.4">h2</h2>
</div>
`;

generateTableOfContentsFromHeadings(el);
