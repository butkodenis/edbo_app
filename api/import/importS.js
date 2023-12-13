const importDataScheduler = async (dataTask) => {
  switch (dataTask.task) {
    case 'saveIds':
      await importData.importUniversities(dataTask);
      break;
    case 'saveStat':
      await importData.importStatUniv(dataTask);
      break;
    case 'saveStud':
      await importData.importStatStudent(dataTask);
      break;
    case 'saveAll':
      await importData.importAll(dataTask);
      break;
    default:
      throw new Error('Помилковi параметри');
  }
};
