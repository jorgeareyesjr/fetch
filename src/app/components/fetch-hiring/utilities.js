/**
 * 
 * @param {*} data 
 * @param {*} key 
**/
function filterDataByKey(data, key) {
  return data.filter((obj) => {
    return obj[`${key}`]
  });
};

/**
 * 
 * @param {array} data - A dataset to sort.
 * @param {string} key - The key used to sort the dataset.
 * @param {string} order - (optional) The order to sort the dataset, `asc` or `desc` - will default to `asc`.
 * @return {array} - Return a dataset, sorted by `key`.
**/
function sortDataByKey(data, key, order) {
  let sortedData;

  function sortAscending(data) {
    return data.sort((a,b) => {
      return a[`${key}`] - b[`${key}`];
    });
  };
  function sortDescending(data) {
    return data.sort((a,b) => {
      return b[`${key}`] - a[`${key}`];
    });
  };

  switch(order) {
    case 'desc':
      sortedData = sortDescending(data);
      break; 
    default:
      sortedData = sortAscending(data);
    break;
  };

  return sortedData;
};

export {
  filterDataByKey,
  sortDataByKey
}