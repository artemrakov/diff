import _ from 'lodash';

const INDENTATION = 2;
const INDENTATION_STEP = 4;

const addIndentation = (indentation) => ' '.repeat(indentation);

const buildValue = (value, indentation) => {
  if (!_.isObject(value)) {
    return value;
  }

  const valuesOfKeys = Object.keys(value).reduce((acc, key) => `${acc}${addIndentation(indentation + INDENTATION_STEP)}  ${key}: ${value[key]}\n`, '');
  return `{\n${valuesOfKeys}  ${addIndentation(indentation)}}`;
};

const stringifyHelper = (nodes, indentation) => {
  const presentNode = {
    added: (node) => `${addIndentation(indentation)}+ ${node.key}: ${buildValue(node.value, indentation)}\n`,
    removed: (node) => `${addIndentation(indentation)}- ${node.key}: ${buildValue(node.value, indentation)}\n`,
    unchanged: (node) => `${addIndentation(indentation)}  ${node.key}: ${buildValue(node.value, indentation)}\n`,
    changed: (node) => `${addIndentation(indentation)}- ${node.key}: ${buildValue(node.beforeValue, indentation)}\n${addIndentation(indentation)}+ ${node.key}: ${buildValue(node.afterValue, indentation)}\n`,
    nested: (node) => `${addIndentation(indentation)}  ${node.key}: {\n${stringifyHelper(node.children, indentation + INDENTATION_STEP)}  ${addIndentation(indentation)}}\n`,
  };

  return nodes.reduce((acc, node) => acc + presentNode[node.type](node, indentation), '');
};


const stringify = (data) => `{\n${stringifyHelper(data, INDENTATION)}}\n`;


export default stringify;
