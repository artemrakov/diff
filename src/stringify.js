import _ from 'lodash';

const IDENTATION = 2;

const buildValue = (identation, symbol, key, value) => {
  return `${addIdentation(identation)}${symbol} ${key}: ${value}`;
};

const build = {
  added: (node, identation) => buildValue({ symbol: "+", value: node.value, key: node.key, identation})
  removed: (node, identation) => buildValue({ symbol: "-", value: node.value, key: node.key, identation})
  unchanged: (node, identation) => buildValue({ symbol: " ", value: node.value, key: node.key, identation})
  nested: (node, identation) =>
};

const addIdentation = (identation) => {
  return " ".repeat(identation);
}


const stringifyHelper = (data, identation) => {
  return data.reduce((acc, { key, type, value, children }) => {
    if (children) {
      return acc + `${addIdentation(identation)}${dataSymbols[type]} ${key}: {\n${stringifyHelper(children, identation + IDENTATION_STEP)}${addIdentation(identation)}}\n`;
    }

    // const realValue = _.isObject(value) ? presentObject(value, identation + IDENTATION_STEP) : value;

    return acc + buildValue(identation, dataSymbols[type], key, value) + '\n';
  }, '');
};


const stringify = (data) => {
  return stringifyHelper(data, IDENTATION);
}



export default stringify;
