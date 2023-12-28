const { Sequelize, DataTypes } = require('sequelize');

const Tasks = require('../models/taskModel');
const StatStudent = require('../models/statStudModel');
const StatUniv = require('../models/statUnivModel');
const Universities = require('../models/universitiesModel');
const pgModel = require('../models/pgModel');

const mierateAll = async (req, res) => {
  try {
    const tasks = await Tasks.find();

    const statStudents = await StatStudent.find();
    const statUniversities = await StatUniv.find();
    const universities = await Universities.find();

    //console.log(statUniversities.length);
    console.log(statStudents.length);
    console.log(universities);

    // Синхронизация модели с базой данных
    await pgModel.Task.sync({ force: true });
    await pgModel.Universities.sync({ force: true });
    await pgModel.StatUniv.sync({ force: true });
    await pgModel.StatStudent.sync({ force: true });

    // eslint-disable-next-line no-restricted-syntax
    for (const task of tasks) {
      // eslint-disable-next-line no-await-in-loop
      await pgModel.Task.create({
        year: task.year,
        speciality: task.speciality,
        specialityText: task.specialityText,
        qualification: task.qualification,
        qualificationText: task.qualificationText,
        educationBase: task.educationBase,
        educationBaseText: task.educationBaseText,
        task: task.task,
        taskText: task.taskText,
        status: task.status,
        timeCreation: task.timeCreation,
        timeCompleted: task.timeCompleted,
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const univer of universities) {
      // eslint-disable-next-line no-await-in-loop
      await pgModel.Universities.create({
        uid: univer.uid,
        un: univer.un,
        ids: univer.ids,
        n: univer.n,
        timeCreation: univer.timeCreation,
        idTask: univer.idTask,
        idJob: univer.idJob,
        year: univer.year,
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const statUn of statUniversities) {
      // eslint-disable-next-line no-await-in-loop
      await pgModel.StatUniv.create({
        usid: statUn.usid,
        usn: statUn.usn,
        ustn: statUn.ustn,
        uid: statUn.uid,
        un: statUn.un,
        ufn: statUn.ufn,
        rk: statUn.rk,
        qid: statUn.qid,
        qn: statUn.qn,
        ebid: statUn.ebid,
        ebn: statUn.ebn,
        efid: statUn.efid,
        efn: statUn.efn,
        cid: statUn.cid,
        ssc: statUn.ssc,
        ssn: statUn.ssn,
        etrm: statUn.etrm,
        rtrm: statUn.rtrm,
        price: statUn.price,
        xprice: statUn.xprice,
        up: statUn.up,
        spn: statUn.spn,
        ox: statUn.ox,
        ol: statUn.ol,
        oc: statUn.oc,
        rr: statUn.rr,
        osn: statUn.osn,
        os: statUn.os,
        st: statUn.st,
        year: statUn.year,
        timeCreation: statUn.timeCreation,
        idTask: statUn.idTask,
        idJob: statUn.idJob,
      });
    }
    /*
    // eslint-disable-next-line no-restricted-syntax
    for (const stud of statStudents) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await pgModel.StatStudent.create({
          prid: stud.prid,
          n: stud.n,
          prsid: stud.prsid,
          ptid: stud.ptid,
          fio: stud.fio,
          pa: stud.pa,
          d: stud.d,
          artid: stud.artid,
          kv: stud.kv,
          p: stud.p,
          rss: stud.rss,
          year: stud.year,
          timeCreation: stud.timeCreation,
          idTask: stud.idTask,
          idJob: stud.idJob,
        });
      } catch (error) {
        console.error(`Error creating StatStudent record for ${stud.fio}: ${error.message}`);
        // Handle the error as needed
      }
    }
    */
    res.json({ message: 'данные успешно мигрированы' });
  } catch (err) {
    console.error(`Ошибка миграции : ${err}`);
  }
};

module.exports = { mierateAll };
