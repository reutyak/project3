// All logical operations of the backend folder will displayed here.
// importations
import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
import Admin from "../Models/Admin";
import Vacation from "../Models/Vacation";
import VacationFollow from "../Models/vacationToUpdateFollow";

var hash = require("object-hash");

const getAllAdmins = async (): Promise<Admin[]> => {
  const sql = `
        SELECT * FROM admin`;
  const admin = await dal.execute(sql);
  return admin;
};

const addAdmin = async (newAdmin: Admin): Promise<Admin> => {
  const sql = `
    INSERT INTO admin VALUES 
    (DEFAULT, 
    '${hash(newAdmin.admin_name)}',
    '${hash(newAdmin.admin_code)}'
    );`;
  const response: OkPacket = await dal.execute(sql);
  newAdmin.id = response.insertId;
  return newAdmin;
};

const deleteAdmin = async (id: number): Promise<void> => {
  const sql = `
    DELETE FROM admin WHERE id=${id}`;
  const response = await dal.execute(sql);
};

const updateAdmin = async (admin: Admin): Promise<Admin> => {
  const sql = `
    UPDATE admin 
    SET 
    admin_name='${hash(admin.admin_name)}',
    admin_code='${hash(admin.admin_code)}',
    WHERE id = ${admin.id}
    `;
  await dal.execute(sql);
  return admin;
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

const addVacation = async (newVacation: Vacation): Promise<Vacation> => {
  const sql = `
    INSERT INTO vacation VALUES 
    (DEFAULT, 
    '${newVacation.description}',
    '${newVacation.destination}',
    ${newVacation.price},
    '${newVacation.vacation_img}',
    '${newVacation.start_date}',
    '${newVacation.end_date}',
    ${0});`;
  const response: OkPacket = await dal.execute(sql);
  newVacation.id = response.insertId;
  return newVacation;
};

const deleteVacation = async (id: number): Promise<void> => {
  const sql = `
    DELETE FROM vacation WHERE id=${id}`;
  const response = await dal.execute(sql);
};

const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
  const start_date_update = vacation.start_date.toString().split("T")[0];
  const end_date_update = vacation.end_date.toString().split("T")[0];
  const sql = `
    UPDATE vacation 
    SET description='${vacation.description}',
    destination='${vacation.destination}',
    price=${vacation.price},
    vacation_img='${vacation.vacation_img}',
    start_date='${start_date_update}',
    end_date='${end_date_update}',
    amountOfFollowers=${vacation.amountOfFollowers || 0}
    WHERE id = ${vacation.id}
    `;
  await dal.execute(sql);
  return vacation;
};

const updateVacationFollow = async (
  vacation: VacationFollow
): Promise<VacationFollow> => {
  const sql = `
    UPDATE vacation 
    SET 
    amountOfFollowers=${vacation.amountOfFollowers || 0}
    WHERE id = ${vacation.id}
    `;
  await dal.execute(sql);
  return vacation;
};

export default {
  getAllAdmins,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  getAllVacations,
  getSingleVacation,
  addVacation,
  deleteVacation,
  updateVacation,
  updateVacationFollow,
};
