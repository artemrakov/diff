import _ from 'lodash';

const INDENTATION = 2;
const INDENTATION_STEP = 4;

const addIndentation = (Indentation) => ' '.repeat(Indentation);

const buildChangedNode = (node, indentation) => {
  const removedNode = buildValue({
    symbol: '-', value: node.beforeValue, key: node.key, indentation
  })
  const addNode = buildValue({
    symbol: '+', value: node.afterValue, key: node.key, indentation
  })

  return `${removedNode}${addNode}`;
}

const buildObject = ({
  object, indentation, mainKey, symbol,
}) => {
  const valuesOfKey = Object.keys(object).reduce((acc, key) => `${acc}${addIndentation(indentation + INDENTATION_STEP)}  ${key}: ${object[key]}\n`, '');

  return `${addIndentation(indentation)}${symbol} ${mainKey}: {\n${valuesOfKey}  ${addIndentation(indentation)}}\n`;
};

const buildValue = ({
  indentation, symbol, key, value,
}) => {
  if (_.isObject(value)) {
    return buildObject({
      symbol,
      indentation,
      object: value,
      mainKey: key,
    });
  }

  return `${addIndentation(indentation)}${symbol} ${key}: ${value}\n`;
};

const stringifyHelper = (nodes, indentation) => {
  const presentNode = {
    added: (node) => buildValue({
      symbol: '+', value: node.value, key: node.key, indentation,
    }),
    removed: (node) => buildValue({
      symbol: '-', value: node.value, key: node.key, indentation,
    }),
    unchanged: (node) => buildValue({
      symbol: ' ', value: node.value, key: node.key, indentation,
    }),
    changed: (node) => buildChangedNode(node, indentation),
    nested: (node) => `${addIndentation(indentation)}  ${node.key}: {\n${stringifyHelper(node.children, indentation + INDENTATION_STEP)}  ${addIndentation(indentation)}}\n`,
  };

  return nodes.reduce((acc, node) => acc + presentNode[node.type](node, indentation), '');
};


const stringify = (data) => `{\n${stringifyHelper(data, INDENTATION)}}\n`;


export default stringify;
