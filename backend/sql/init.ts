import dal_mysql from "../Utils/dal_mysql";

const admin_sql=`CREATE TABLE IF NOT EXISTS admin (
    id INT NOT NULL AUTO_INCREMENT,
    admin_name VARCHAR(45) NULL,
    admin_code VARCHAR(45) NULL,
    followed_vacations JSON NULL,
    PRIMARY KEY (id));`;
const user_sql=`CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NULL,
    last_name VARCHAR(45) NULL DEFAULT NULL,
    user_name VARCHAR(45) NULL DEFAULT NULL, 
    password VARCHAR(45) NULL,
    followed_list JSON NULL,
    PRIMARY KEY (id));`;

const vacation_sql=`CREATE TABLE IF NOT EXISTS vacation (
    id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(150) NULL,
    destination VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    vacation_img VARCHAR(250) NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    amountOfFollowers INT NULL,
    PRIMARY KEY (id));`;

const sql_init=()=>{
    dal_mysql.execute(admin_sql);
    dal_mysql.execute(user_sql);
    dal_mysql.execute(vacation_sql);
}

export default sql_init;