const buildNodes = (nodes) => {
  const presentNode = {
    added: (node) => ({ key: node.key, type: node.type, value: node.value }),
    removed: (node) => ({ key: node.key, type: node.type }),
    unchanged: (node) => ({ key: node.key, type: node.type, value: node.value }),
    changed: (node) => ({
      key: node.key, type: node.type, from: node.beforeValue, to: node.afterValue,
    }),
    nested: (node) => ({
      key: node.key, type: node.type, children: buildNodes(node.children),
    }),
  };

  return nodes.map(node => presentNode[node.type](node));
};

const stringify = (data) => `${JSON.stringify(buildNodes(data))}\n`;

export default stringify;
