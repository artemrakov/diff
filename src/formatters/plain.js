import _ from 'lodash';

const buildValue = ({
  identation, symbol, key, value,
}) => {
  if (_.isObject(value)) {

  }

  return `${addIdentation(identation)}${symbol} ${key}: ${value}\n`;
};

const stringifyHelper = (nodes, identation) => {
  const presentNode = {
    added: (node) => buildValue({ symbol: '+', value: node.value, key: node.key, identation }),
    removed: (node) => buildValue({symbol: '-', value: node.value, key: node.key, identation}),
    unchanged: (node) => buildValue({
      symbol: ' ', value: node.value, key: node.key, identation,
    }),
    nested: (node) => `${addIdentation(identation)}  ${node.key}: {\n${stringifyHelper(node.children, identation + IDENTATION_STEP)}  ${addIdentation(identation)}}\n`,
  };

  return nodes.reduce((acc, node) => acc + presentNode[node.type](node, identation), '');
};


const stringify = (data) => `{\n${stringifyHelper(data, IDENTATION)}}\n`;


export default stringify;
