import _ from 'lodash';

const REGEX_FOR_NUMBER = /^-?[\d.]+(?:e-?\d+)?$/;

const buildValue = (element) => {
  if (!_.isObject(element)) {
    return element;
  }

  // needed for rare case with ini files
  const transform = (item) => (REGEX_FOR_NUMBER.test(item) ? parseInt(item, 10) : item);
  const keys = Object.keys(element);
  return keys.reduce((acc, key) => ({ ...acc, [key]: transform(element[key]) }), {});
};

const stringifyHelper = (nodes) => {
  const presentNode = {
    added: (node) => ({ key: node.key, type: node.type, value: buildValue(node.value) }),
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
