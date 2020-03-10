const dataSymbols = {
  added: '+',
  removed: '-',
  unchanged: '',
};

const formatData = (data) => {
  if (data.type === 'changed') {
    return data.values.reduce((acc, value) => [...acc, formatData(value)], []).join('');
  }

  return `  ${dataSymbols[data.type]} ${data.key}: ${data.value}\n`;
};


const stringify = (data) => {
  const main = data.reduce((acc, value) => acc + formatData(value), ' ');
  return `{\n${main}}\n`;
}


export default stringify;
