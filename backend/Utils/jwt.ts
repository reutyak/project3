import jwt from "jsonwebtoken";
import config from "./config";

const getJWT = (userName: string, userId: number) => {
  let data = {
    exp: Math.floor(Date.now() / 1000) + 60 * 1,
    timeStamp: Date(),
    user: userName,
    id: userId,
  };

  return jwt.sign(data, config.JWT_SECRET_KEY);
};

const checkJWT = async (token: string): Promise<boolean> => {
  const trueToken = token.split(" ")[1];
  const isExp = await getExpFromJWT(token);
  return new Promise<boolean>((resolve, reject) => {
    try {
      jwt.verify(
        trueToken,
        config.JWT_SECRET_KEY,
        async (err: any, user: any) => {
          if (err) {
            resolve(false);
          } else {
            if (Date.now() >= isExp) {
              resolve(false);
            } else {
              resolve(true);
            }
          }
        }
      );
    } catch (err: any) {
      console.log(err);
      resolve(false);
    }
  });
};
const getUserIdFromJWT = async (token: any) => {
  try {
    const myToken: any = jwt.decode(token);
    return myToken.id;
  } catch (err) {
    //console.log(err);
    console.log("error getting user...");
  }
};
const getUserNameFromJWT = async (token: any) => {
  try {
    const myToken: any = jwt.decode(token);
    return myToken.user;
  } catch (err) {
    //console.log(err);
    console.log("error getting user...");
  }
};

const getExpFromJWT = async (token: any) => {
  try {
    const myToken: any = jwt.decode(token);
    return myToken.exp;
  } catch (err) {
    //console.log(err);
    console.log("error getting exp...");
  }
};

export {
  getJWT,
  checkJWT,
  getUserNameFromJWT,
  getExpFromJWT,
  getUserIdFromJWT,
};
