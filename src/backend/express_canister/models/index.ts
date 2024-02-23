import config from "../database";
import { Sequelize } from "sequelize";
import factory from "./User";

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
      host: config.HOST,
      dialect: config.dialect as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      }
    }
  );


interface DBInterface {
    Sequelize: any;
    sequelize: Sequelize;
    user: any
}

const db : DBInterface = {
    Sequelize,
    sequelize,
    user: factory(sequelize)
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = factory(sequelize);



export default db;