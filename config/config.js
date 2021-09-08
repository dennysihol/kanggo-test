let env = process.env.NODE_ENV

if(env !== "production") {
  require("dotenv").config()
}

module.exports =
{
  "development": {
    "username": process.env.DB_USERNAME_DEV,
    "password": "",
    "database": process.env.DB_NAME_DEV,
    "host": process.env.DB_HOST_DEV,
    "dialect": process.env.DB_DIALECT_DEV
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable" : "DATABASE_URL",
    "dialectOptions" : {
        "ssl": {
            "rejectUnauthorized": false
        }
    }
}
}
