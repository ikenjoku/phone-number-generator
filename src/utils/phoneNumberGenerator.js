const randomPhoneNumber = () => {
  return Math.floor(Math.random() * 100000000) + 800000000;
};

export const generatePhoneNumbers = (numberOfPhoneNumbers) => {
  const telNumbers = [];
  for (let i = 0; i < numberOfPhoneNumbers; i++){
    telNumbers.push(randomPhoneNumber());
  }
  return telNumbers;
};

export const sortNumbers = (numbers, type) => {
  const  sortFunction = (a, b) => {
    if( type === 'desc'){
      if (a < b) return 1;
      if (a > b) return -1;
    }
    else if (type === 'asc'){
      if (a < b) return -1;
      if (a > b) return 1;
    }
  };
  return numbers.sort(sortFunction);
};
