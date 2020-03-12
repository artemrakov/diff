import _ from 'lodash';

const buildValue = (value, indentation) => {
  if (!_.isObject(value)) {
    return value;
  }

  return '[complex value]'
};

// Property 'timeout' was changed from 50 to 20
// Property 'proxy' was deleted
// Property 'common.setting4' was deleted
// Property 'common.setting5' was deleted
// Property ' common.setting2' was added with value: 200
// Property 'common.setting6.ops' was added with value: 'vops'
// Property 'common.sites' was added with value: 'hexlet.io'
// Property 'group1.baz' was changed from 'bars' to 'bas'
// Property 'group3' was deleted
// Property 'verbose' was added with value: true
// Property 'group2' was added with value: [complex value]

const stringifyHelper = (node, accKey) => {
  const presentNode = {
    added: (node) => `Property '${accKey}' was added with value: ${buildValue(node.value)}\n`,
    removed: (node) => `Property '${accKey}' was deleted\n`,
    unchanged: (node) => ``,
    changed: (node) => `Property '${}' was changed from ${buildValue(node.beforeValue)} to ${buildValue(node.afterValue)}\n`,
    nested: (node) => `nested\n`,
  };

  return nodes.reduce((acc, node) => acc + presentNode[node.type](node, indentation), '');
};


const stringify = (data) => stringifyHelper(data, '');


export default stringify;
