// All logical operations of the backend folder will displayed here.
// importations 
import dal from "../Utils/dal_mysql"
import { OkPacket } from "mysql";
import User from "../Models/User";


// functions( async / await ) for getting data from DB
const getAllUsers = async (): Promise<User> => {
    // command line for the DB
    const sql = `
        SELECT * FROM user
    `;
    // a promise function that connects us to the database with the command line
    const user = await dal.execute(sql);
    return user;
}
const getSingleUser = async (id:number): Promise<User> => {
    // command line for the DB
    const sql = `
        SELECT * FROM user
        WHERE user.id=${id};
    `;
    // a promise function that connects us to the database with the command line
    const admin = await dal.execute(sql);
    return admin;
}
const addUser = async (newUser: User): Promise<User> => {
    // command line for the DB
    const sql = `
    INSERT INTO user VALUES
    (DEFAULT,
    '${newUser.name}',
    '${newUser.last_name}',
    '${newUser.user_name}',
    '${newUser.password}',
    '${newUser.followed_list}')
    `
    const response : OkPacket = await dal.execute(sql);
    newUser.id = response.insertId;
    return newUser;

} 

const deleteUser = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM user WHERE id=${id}`
    const response = await dal.execute(sql);
    
}

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
    const response : OkPacket = await dal.execute(sql);
    return user;
}

// exporting 
export default {
    getAllUsers,
    getSingleUser,
    addUser,
    deleteUser,
    updateUser
}