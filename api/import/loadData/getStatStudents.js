const axios = require('axios');

const getStatStudents = async (year, usid, last = 0) => {
  if (year === new Date().getFullYear()) {
    year = '';
  }
  const apiUrl = `https://vstup${year}.edbo.gov.ua/offer-requests`;
  const requestData = `id=${usid}&last=${last}`; // Замените на ваш запрос

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Referer: `https://vstup${year}.edbo.gov.ua/offer/${usid}/`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    // Обработка данных из ответа
    const data = response.data.requests;
    //console.log(data.requests); // The JSON response data
    if (data !== undefined) {
      console.log(`запит статистики студ. виконан: ${data ? data.length : 0} студентів, ${usid}`); // The JSON response data
      return data; // Return the JSON response data if you want to use it outside the function
    }
    console.log(`запит студентів виконан: 0 ЗАЯВ`); // The JSON response data
    return [];
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка:', error);
    throw error;
  }
};

module.exports = getStatStudents;
