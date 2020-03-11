import _ from 'lodash';

const diff = (before, after) => {
  // Оставил чтобы показать свои мысли (как я сначала начал делать)
  // const build = (key, acc) => {
  //   const beforeValue = beforeData[key];
  //   const afterValue = afterData[key];
  //
  //   if (beforeValue === afterValue) {
  //     return [ ...acc, { key, value: beforeValue, type: 'unchanged' } ];
  //   }
  //
  //   if (_.isObject(beforeValue) && _.isObject(afterValue)) {
  //     return [ ...acc, { key, children: diff(beforeValue, afterValue), type: 'unchanged' } ]
  //   }
  //
  //   if (_.has(beforeData, key) && _.has(afterData, key)) {
  //     return [ ...acc,
  //       { key, value: beforeValue, type: 'removed' },
  //       { key, value: afterValue, type: 'added' }
  //     ]
  //   };
  //
  //   if (_.has(afterData, key)) {
  //     return [ ...acc, { key, value: afterValue, type: 'added' }];
  //   }
  //
  //   return [ ...acc, { key, value: beforeValue, type: 'removed' }];
  // };

  const buildMethods = [
    {
      check: key  => before[key] === after[key],
      proccess: key => ({ key, value: before[key], type: 'unchanged' })
    },
    {
      check: key => _.isObject(before[key]) && _.isObject(after[key]),
      proccess: key => ({ key, children: diff(before[key], after[key]), type: 'nested' })
    },
    {
      check: key => _.has(before, key) && _.has(after, key),
      proccess: key => [
        { key, value: before[key], type: 'removed' }
        { key, value: after[key], type: 'added' }
      ]
    },
    {
      check: key => _.has(after, key),
      proccess: key => ({ key, value: after[key], type: 'added' })
    },
    {
      check: key => _.has(before, key),
      proccess: key => ({ key, value: before[key], type: 'removed' })
    }
  ];

  const unionKeys = _.union(_.keys(before), _.keys(after));

  return unionKeys.reduce((acc, key) => {
    const { proccess } = buildMethods.find(({ check }) => check(key));
    return _.flatten([...acc, proccess(key)]);
  }, []);
};

export default diff;
