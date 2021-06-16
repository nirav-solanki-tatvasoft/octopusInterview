import { verbose } from 'sqlite3';
import { DefaultUser } from './utils';

const sqlite3 = verbose();

export class Connection {
    public static DB = new sqlite3.Database(':memory:');

    public static _initialize() {
        this.DB.serialize(() => {
            this.DB.run("CREATE TABLE IF NOT EXISTS users (username VARCHAR(50), password VARCHAR(50));");

            this.DB.run(`INSERT INTO users(username,password) 
                         SELECT 'admin','123456' 
                         WHERE NOT EXISTS(SELECT 1 FROM users WHERE username = '${DefaultUser.username}' AND password = '${DefaultUser.password}');`);
        });
    }
}