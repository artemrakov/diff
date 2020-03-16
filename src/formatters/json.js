const stringifyHelper = (nodes) => {
  const presentNode = {
    added: (node) => ({ key: node.key, type: node.type, value: node.value }),
    removed: (node) => ({ key: node.key, type: node.type }),
    unchanged: (node) => ({ key: node.key, type: node.type, value: node.value }),
    changed: (node) => ({
      key: node.key, type: node.type, from: node.beforeValue, to: node.afterValue,
    }),
    nested: (node) => ({
      key: node.key, type: node.type, children: stringifyHelper(node.children),
    }),
  };

  return nodes.reduce((acc, node) => [...acc, presentNode[node.type](node)], []);
};

const stringify = (data) => `${JSON.stringify(stringifyHelper(data))}\n`;

export default stringify;
