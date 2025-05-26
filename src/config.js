import {config} from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || '127.0.0.1';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'LuiDavOpoRey010606%';
export const DB_DATABASE = process.env.DB_DATABASE || 'db_compuser2025';

export const PORT2 = process.env.PORT2 || 3000;
export const DB_HOST2 = process.env.DB_HOST2 || '127.0.0.1';
export const DB_PORT2 = process.env.DB_PORT2 || 3306;
export const DB_USER2 = process.env.DB_USER2 || 'root';
export const DB_PASSWORD2 = process.env.DB_PASSWORD2 || 'LuiDavOpoRey010606%';
export const DB_DATABASE2 = process.env.DB_DATABASE2 || 'db_compuserdata';

//export const PORT = process.env.PORT;
//export const DB_HOST = process.env.DB_HOST;
//export const DB_PORT = process.env.DB_PORT;
//export const DB_USER = process.env.DB_USER;
//export const DB_PASSWORD = process.env.DB_PASSWORD;
//export const DB_DATABASE = process.env.DB_DATABASE;