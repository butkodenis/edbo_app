const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('edbo', 'admin', '123456', {
  host: '10.101.10.100',
  dialect: 'postgres',
});

// Определение модели для таблицы в PostgreSQL
const Task = sequelize.define(
  'Task',
  {
    year: {
      type: DataTypes.INTEGER,
    },
    speciality: {
      type: DataTypes.INTEGER,
    },
    specialityText: {
      type: DataTypes.STRING,
    },
    qualification: {
      type: DataTypes.INTEGER,
    },
    qualificationText: {
      type: DataTypes.STRING,
    },
    educationBase: {
      type: DataTypes.INTEGER,
    },
    educationBaseText: {
      type: DataTypes.STRING,
    },
    task: {
      type: DataTypes.STRING,
    },
    taskText: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    timeCreation: {
      type: DataTypes.DATE,
    },
    timeCompleted: {
      type: DataTypes.DATE,
    },
  },
  {
    // Настройки модели, если необходимо
    tableName: 'tasks', // Название таблицы в базе данных PostgreSQL
    timestamps: false, // Отключение полей created_at и updated_at
  },
);

const Universities = sequelize.define(
  'Universities',
  {
    uid: {
      type: DataTypes.INTEGER,
    },
    un: {
      type: DataTypes.STRING,
    },
    ids: {
      type: DataTypes.STRING,
    },
    n: {
      type: DataTypes.INTEGER,
    },
    timeCreation: {
      type: DataTypes.DATE,
    },
    idTask: {
      type: DataTypes.STRING,
    },
    idJob: {
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // Настройки модели, если необходимо
    tableName: 'universities', // Название таблицы в базе данных PostgreSQL
    timestamps: false, // Отключение полей created_at и updated_at
  },
);

const StatUniv = sequelize.define(
  'StatUniv',
  {
    usid: {
      type: DataTypes.INTEGER,
    },
    usn: {
      type: DataTypes.STRING,
    },
    ustn: {
      type: DataTypes.STRING,
    },
    uid: {
      type: DataTypes.INTEGER,
    },
    un: {
      type: DataTypes.STRING,
    },
    ufn: {
      type: DataTypes.STRING,
    },
    rk: {
      type: DataTypes.STRING,
    },
    qid: {
      type: DataTypes.STRING,
    },
    qn: {
      type: DataTypes.STRING,
    },
    ebid: {
      type: DataTypes.INTEGER,
    },
    ebn: {
      type: DataTypes.STRING,
    },
    efid: {
      type: DataTypes.INTEGER,
    },
    efn: {
      type: DataTypes.STRING,
    },
    cid: {
      type: DataTypes.INTEGER,
    },
    ssc: {
      type: DataTypes.STRING,
    },
    ssn: {
      type: DataTypes.STRING,
    },
    etrm: {
      type: DataTypes.STRING,
    },
    rtrm: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    xprice: {
      type: DataTypes.STRING,
    },
    up: {
      type: DataTypes.INTEGER,
    },
    spn: {
      type: DataTypes.STRING,
    },
    ox: {
      type: DataTypes.INTEGER,
    },
    ol: {
      type: DataTypes.INTEGER,
    },
    oc: {
      type: DataTypes.INTEGER,
    },
    rr: {
      type: DataTypes.INTEGER,
    },
    osn: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    os: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    st: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    year: {
      type: DataTypes.INTEGER,
    },
    timeCreation: {
      type: DataTypes.DATE,
    },
    idTask: {
      type: DataTypes.STRING,
    },
    idJob: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'statuniv',
    timestamps: false,
  },
);

const StatStudent = sequelize.define(
  'StatStudent',
  {
    prid: {
      type: DataTypes.INTEGER,
    },
    n: {
      type: DataTypes.INTEGER,
    },
    prsid: {
      type: DataTypes.INTEGER,
    },
    ptid: {
      type: DataTypes.INTEGER,
    },
    fio: {
      type: DataTypes.STRING,
    },
    pa: {
      type: DataTypes.INTEGER,
    },
    d: {
      type: DataTypes.INTEGER,
    },
    artid: {
      type: DataTypes.INTEGER,
    },
    kv: {
      type: DataTypes.INTEGER,
    },
    p: {
      type: DataTypes.STRING,
    },
    rss: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    year: {
      type: DataTypes.INTEGER,
    },
    timeCreation: {
      type: DataTypes.DATE,
    },
    idTask: {
      type: DataTypes.STRING,
    },
    idJob: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'statstud',
    timestamps: false,
  },
);
module.exports = { Task, Universities, StatUniv, StatStudent };
