// Configuration

class Config { 
    public port = 3003; 
    // mysql database
    public mySQLhost = "localhost";
    public mySQLUser = "root";
    public mySQLPassword = "12345678";
    public mySQLdb = "vacation_project3";
    public JWT_SECRET_KEY = "project3WithToken";
    public mySQLport = 3316;

}

const config = new Config();
export default config