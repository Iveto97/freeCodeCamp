function steamrollArray(nestedArray) {
  let result = [];

  const isLengthOne = (array) => array.length === 1;

  const flatten = (el) => {
    if (Array.isArray(el)) {
      if (isLengthOne(el)) {
        flatten(el[0]);
      } else {
        el.forEach((e) => {
          flatten(e);
        });
      }
    } else {
      result.push(el);
    }
  };

  nestedArray.forEach((element) => {
    flatten(element);
  });

  return result;
}

const steamroll = steamrollArray([1, {}, [3, [[4]]]]);
console.log(steamroll);
