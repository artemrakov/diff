import _ from 'lodash';

const INDENTATION = 2;
const INDENTATION_STEP = 4;

const addIndentation = (indentation) => ' '.repeat(indentation);

const buildValue = (value, indentation) => {
  if (!_.isObject(value)) {
    return value;
  }

  const valuesOfKeys = Object.keys(value).map(key => `${addIndentation(indentation + INDENTATION_STEP)}  ${key}: ${value[key]}`).join('\n');
  return `{\n${valuesOfKeys}\n  ${addIndentation(indentation)}}`;
};

const stringify = (nodes, indentation) => {
  const presentNode = {
    added: (node) => `${addIndentation(indentation)}+ ${node.key}: ${buildValue(node.value, indentation)}`,
    removed: (node) => `${addIndentation(indentation)}- ${node.key}: ${buildValue(node.value, indentation)}`,
    unchanged: (node) => `${addIndentation(indentation)}  ${node.key}: ${buildValue(node.value, indentation)}`,
    changed: (node) => [`${addIndentation(indentation)}- ${node.key}: ${buildValue(node.beforeValue, indentation)}`, `${addIndentation(indentation)}+ ${node.key}: ${buildValue(node.afterValue, indentation)}`],
    nested: (node) => [`${addIndentation(indentation)}  ${node.key}: {`, `${stringify(node.children, indentation + INDENTATION_STEP)}`,  `  ${addIndentation(indentation)}}`],
  };

  const flattenNodes = _.flatten(nodes.map(node => presentNode[node.type](node)));
  return flattenNodes.join('\n');
};


const render = data => `{\n${stringify(data, INDENTATION)}\n}\n`;


export default render;
