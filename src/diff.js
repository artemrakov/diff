import _ from 'lodash';

const build = (key, beforeData, afterData) => {
  const beforeValue = beforeData[key];
  const afterValue = afterData[key];

  if (_.has(beforeData, key) && _.has(afterData, key)) {

    if (beforeValue === afterValue) {
      return { key, value: beforeValue, type: 'unchanged' }
    }

    return {
      key,
      type: 'changed',
      values: [
        { key, value: afterValue, type: 'added' },
        { key, value: beforeValue, type: 'removed' }
      ]
    }
  }


  if (_.has(beforeData, key)) {
    return { key, value: beforeValue, type: 'removed' }
  }

  if (_.has(afterData, key)) {
    return { key, value: afterValue, type: 'added' }
  }
}

const formatData = (data) => {
  switch(data.type) {
    case 'added':
      return `+ ${data.key}: ${data.value}`;
      break;
    case 'removed':
      return `- ${data.key}: ${data.value}`;
      break;
    case 'unchanged':
      return ` ${data.key}: ${data.value}`;
      break;
    case 'changed':
      return data.values.reduce((acc, value) => [...acc, formatData(value)], []).join('\n');
      break;
    default:
      throw new Error(`Unknown type: '${data.type}'!`);
  }
}

export default (beforeData, afterData) => {
  const unionKeys = _.union(_.keys(beforeData), _.keys(afterData));
  const normalizeData = unionKeys.reduce((acc, key) => [...acc, build(key, beforeData, afterData)], []);
  const formattedData = normalizeData.reduce((acc, value) => acc + formatData(value) + '\n', ' ');
  console.log(formattedData);
};
