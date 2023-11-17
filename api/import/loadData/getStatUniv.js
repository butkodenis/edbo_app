const axios = require('axios');

const getStatUniv = async (
  ids,
  uid,
  year,
  qualification,
  educationBase,
  speciality,
) => {
  if (year === new Date().getFullYear()) {
    year = '';
  }
  const apiUrl = `https://vstup${year}.edbo.gov.ua/offers-list`;
  const requestData = `ids=${ids}`;
  const headers = {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Referer: `https://vstup${year}.edbo.gov.ua/offers/?qualification=${qualification}&education_base=${educationBase}&speciality=${speciality}&university=${uid}`,
    'X-Requested-With': 'XMLHttpRequest',
  };

  try {
    const response = await axios.post(apiUrl, requestData, { headers });
    const data = response.data.offers;
    console.log(data);
    console.log('запит статистики пропозиції виконан!');
    return data; // возращаем полученые данные в виде масива обьектов
  } catch (error) {
    console.error('Ошибка:', error);
    return null; // возвращеем null если нет статистики по пропоз. (не подали заявы)
  }
};

//getStatUniv('991183, 998028, 1012749, 110769', 85, 2022, 2, 40, 226);

module.exports = getStatUniv;
