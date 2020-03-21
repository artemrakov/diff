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

const stringify = (nodes, accKey) => {
  const presentNode = {
    added: (node) => `Property '${buildKey(node.key, accKey)}' was added with value: ${buildValue(node.value)}`,
    removed: (node) => `Property '${buildKey(node.key, accKey)}' was deleted`,
    unchanged: () => null,
    changed: (node) => `Property '${buildKey(node.key, accKey)}' was changed from ${buildValue(node.beforeValue)} to ${buildValue(node.afterValue)}`,
    nested: (node) => stringify(node.children, [...accKey, node.key]),
  };

  const result = nodes.map((node) => presentNode[node.type](node));
  return result.filter((n) => n).join('\n');
};


const render = (data) => stringify(data, '');


export default render;
