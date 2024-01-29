const { exec } = require('child_process');

const createDamp = (req, res) => {
  try {
    const currentDate = new Date();

    const date = currentDate.toISOString();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    console.log(`Damp created ${currentDate}`);

    const fileName = `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;

    const dumpCommand = `pg_dump -U admin -h 10.101.10.100 -d edbo -w  > ${fileName}.sql`;

    exec(dumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating database dump: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error creating database dump: ${stderr}`);
        return;
      }
      console.log(`Database dump created successfully`);
      res.json({
        message: `Damp успешно выполнен ${date} ${fileName}.sql `,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createDamp };
