const axios = require('axios');

const getUniversities = async (
  year,
  qualification,
  educationBase,
  speciality,
) => {
  // меняем ссылку взависимости от года
  if (year === new Date().getFullYear()) {
    year = '';
  }
  try {
    const apiUrl = `https://vstup${year}.edbo.gov.ua/offers-universities/`;
    const requestData = `qualification=${qualification}&education_base=${educationBase}&speciality=${speciality}`;
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Referer: `https://vstup${year}.edbo.gov.ua/offers/?${requestData}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    // Получаем JSON-данные из ответа
    const jsonData = response.data.universities;
    const message = 'запит до vstup.edbo.gov.ua виконано';
    console.log(message);
    // console.log(jsonData);

    /*
    await saveLog(
      'запит пророз. за спец.',
      message,
      'ok',
      getTime(),
      taskId,
      idRun,
    ); //LOG
*/

    return jsonData; // Возвращаем данные
  } catch (error) {
    const message = `помилка запиту пропозиц: ${error.message}`;
    console.error('помилка запиту пропозиц.:', error.message);
  }
};
// getUniversities(2022, 2, 40, 226);
module.exports = getUniversities;
