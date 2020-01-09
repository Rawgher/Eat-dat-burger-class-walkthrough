// Importing mySQL connection to be used here
const connection = require("../config/connection.js");

// Function that adds the ?'s needed to be placed in the database queries
function printQuestionMarks(num) {

    let arr = [];

    for (let i = 0; i < num; i++) {

        arr.push("?");

    }

    return arr.toString();

}

// Function to convert key-value pairs to be used in the mySQL database
function objToSql(ob) {

    let arr = [];

    // Loops through the keys and pushes the key/value as a string into arr variable
    for (let key in ob) {

        let value = ob[key];

        // Checks to skip any hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {

            // If the string has any spaces it will add quotations to make it one value
            if (typeof value === "string" && value.indexOf(" ") >= 0) {

                value = "'" + value + "'";

            }

            // Sets the key equal to the value in the array
            arr.push(key + "=" + value);

        }

    }

    // Translates array of strings to a single comma-separated string
    return arr.toString();
}

// Object that contains all of the SQL query functions
let orm = {

    selectAll: function (tableInput, cb) {

        let queryString = "SELECT * FROM " + tableInput + ";";

        connection.query(queryString, function (err, result) {

            if (err) {

                throw err;

            }

            cb(result);

        });

    },
    insertOne: function (table, cols, vals, cb) {

        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        connection.query(queryString, vals, function (err, result) {

            if (err) {

                throw err;

            }

            cb(result);

        });

    },
    updateOne: function (table, objColVals, condition, cb) {

        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {

            if (err) {

                throw err;

            }

            cb(result);

        });

    },
    delete: function (table, condition, cb) {

        let queryString = "DELETE FROM " + table;

        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {

            if (err) {

                throw err;

            }

            cb(result);

        });

    }

};

// Exporting orm to be used in the burger model
module.exports = orm;