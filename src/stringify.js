import _ from 'lodash';

const IDENTATION = 2;
const IDENTATION_STEP = 4;

const addIdentation = (identation) => {
  return " ".repeat(identation);
};

const buildObject = ({ object, identation, name, symbol}) => {
  const valuesOfKey = Object.keys(object).reduce((acc, key) => {
    return acc + `${addIdentation(identation + IDENTATION_STEP)}  ${key}: ${object[key]}\n`
  }, "");

  return `${addIdentation(identation)}${symbol} ${name}: {\n${valuesOfKey}  ${addIdentation(identation)}}\n`;
};

const buildValue = ({identation, symbol, key, value}) => {
  if (_.isObject(value)) {
    return buildObject({ object: value, symbol, identation, name: key});
  }

  return `${addIdentation(identation)}${symbol} ${key}: ${value}\n`;
};

const presentNode = {
  added: (node, identation) => buildValue({ symbol: "+", value: node.value, key: node.key, identation}),
  removed: (node, identation) => buildValue({ symbol: "-", value: node.value, key: node.key, identation}),
  unchanged: (node, identation) => buildValue({ symbol: " ", value: node.value, key: node.key, identation}),
  nested: (node, identation) => `${addIdentation(identation)}  ${node.key}: {\n${stringifyHelper(node.children, identation + IDENTATION_STEP)}  ${addIdentation(identation)}}\n`
};

const stringifyHelper = (nodes, identation) => {
  const result = nodes.reduce((acc, node) => {
    return acc + presentNode[node.type](node, identation)
  }, "");
  return result;
};


const stringify = (data) => {
  return `{\n${stringifyHelper(data, IDENTATION)}}\n`;
}



export default stringify;
