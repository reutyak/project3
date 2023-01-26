// All logical operations of the backend folder will displayed here.
// importations
import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
import User from "../Models/User";
import Vacation from "../Models/Vacation";

var hash = require("object-hash");

const getAllUsers = async (): Promise<User[]> => {
  const sql = `
        SELECT * FROM user
    `;
  const user = await dal.execute(sql);
  return user;
};
const getSingleUser = async (id: number): Promise<User> => {
  const sql = `
        SELECT * FROM user
        WHERE user.id=${id};
    `;
  const admin = await dal.execute(sql);
  return admin;
};
const addUser = async (newUser: User): Promise<User> => {
  const sql = `
    INSERT INTO user VALUES
    (DEFAULT,
    '${newUser.name}',
    '${newUser.last_name}',
    '${hash(newUser.user_name)}',
    '${hash(newUser.password)}',
    ""
    )
    `;
  const response: OkPacket = await dal.execute(sql);
  newUser.id = response.insertId;
  return newUser;
};

const deleteUser = async (id: number): Promise<void> => {
  const sql = `
    DELETE FROM user WHERE id=${id}`;
  const response = await dal.execute(sql);
};

const updateUser = async (user: User): Promise<User> => {
  const sql = `
    UPDATE user 
    SET name = '${user.name}',
    last_name = '${user.last_name}',
    user_name='${user.user_name}',
    password = '${user.password}',
    followed_list= '${user.followed_list}'
    WHERE id = ${user.id}
    `;
  const response: OkPacket = await dal.execute(sql);
  return user;
};

const getAllVacations = async (): Promise<Vacation[]> => {
  const sql = `
        SELECT * FROM vacation`;
  const vacation = await dal.execute(sql);
  return vacation;
};

const getSingleVacation = async (id: number): Promise<Vacation> => {
  const sql = `
        SELECT * FROM vacation
        WHERE vacation.id=${id};
    `;
  const something = await dal.execute(sql);
  return something;
};

export default {
  getAllUsers,
  getSingleUser,
  addUser,
  deleteUser,
  updateUser,
  getSingleVacation,
  getAllVacations,
};
