import { defineConfig } from "cypress";

const xlsx = require("node-xlsx").default;
const fs = require("fs");
const path = require("path");
const mysqlssh = require('mysql-ssh');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

        on("task", {
          parseXlsx({ filePath }) {
            return new Promise((resolve, reject) => {
              try {
                const jsonData = xlsx.parse(fs.readFileSync(filePath));
                resolve(jsonData);
              } catch (e) {
                reject(e);
              }
            });
          }
        });


        on('task', {
            executeSql (sql, ...args) {
                return new Promise(async (resolve, reject) => {
                    try {
                        let connection = await mysqlssh.connect(  {
                                host: "sz2.dev.thesoc.us",
                                user: "ec2-user",
                                privateKey: fs.readFileSync("C:/Users/R.Abdurakhmanova/.ssh/cw-strat-dev.pem")
                            },
                            {
                                host: "zen-db-dev.c9a9xaaexuwa.us-east-1.rds.amazonaws.com",
                                user: "root",
                                password: "Ce0t!GCnN2P3!32342dgw",
                                database: "zendb"
                            });
                        let result = await connection.promise().query(sql, args);
                        mysqlssh.close();
                        resolve(result[0][0]); 
                    } catch (err) {
                        reject(err);
                    }
                });
            }
        })

    return config
    },
    baseUrl : 'https://sz2.dev.thesoc.us',
    chromeWebSecurity: false,
  },
});


