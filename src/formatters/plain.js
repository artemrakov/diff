import _ from 'lodash';


const buildValue = (value) => {
  const format = {
    string: `'${value}'`,
    number: value,
    boolean: value,
  };

  if (!_.isObject(value)) {
    return format[typeof value];
  }

  return '[complex value]';
};

const buildKey = (key, accKey) => [...accKey, key].join('.');

const stringifyHelper = (nodes, accKey) => {
  const presentNode = {
    added: (node) => `Property '${buildKey(node.key, accKey)}' was added with value: ${buildValue(node.value)}\n`,
    removed: (node) => `Property '${buildKey(node.key, accKey)}' was deleted\n`,
    unchanged: () => '',
    changed: (node) => `Property '${buildKey(node.key, accKey)}' was changed from ${buildValue(node.beforeValue)} to ${buildValue(node.afterValue)}\n`,
    nested: (node) => stringifyHelper(node.children, [...accKey, node.key]),
  };

  return nodes.reduce((acc, node) => acc + presentNode[node.type](node), []);
};


const stringify = (data) => stringifyHelper(data, '');


export default stringify;
