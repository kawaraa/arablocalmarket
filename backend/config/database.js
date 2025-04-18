module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: { filename: require("path").join(process.cwd() + "/" + env("SQLITE_DATABASE_FILE_NAME")) },
    useNullAsDefault: true,

    // client: "mysql",
    // connection: {
    //   host: env("DATABASE_HOST"),
    //   port: env.int("DATABASE_PORT", 3306),
    //   user: env("DATABASE_USERNAME"),
    //   password: env("DATABASE_PASSWORD"),
    //   database: env("DATABASE_NAME"),
    //   ssl: env.bool("DATABASE_SSL"),
    // },
  },
});
