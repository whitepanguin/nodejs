import mysql from "mysql2";
import { config } from "./config.mjs";

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

// mysql.createConnection 이건 그때그때 불러올때, 속도상 느림 그래서 createPool을 씀

export const db = pool.promise();
