import _ from 'lodash';

const dataSymbols = {
  added: '+',
  removed: '-',
  unchanged: '',
};

const formatData = (data) => {

  if (data.children) {
    return `  ${dataSymbols[data.type]} ${data.key}: ${stringify(data.children)}`;
  }

  if (data.type === 'changed') {
    return data.values.map(formatData).join('');
  }

  const value = _.isObject(data.value) ? JSON.stringify(data.value) : data.value;

  return `  ${dataSymbols[data.type]} ${data.key}: ${value}\n`;
};


const stringify = (data) => {
  const main = data.reduce((acc, value) => acc + formatData(value), '');
  return `{\n${main}}\n`;
};


export default stringify;
