// Importing orm file with functions used to change the database
let orm = require("../config/orm.js");

// Function used to show all burgers
let burger = {

    selectAll: function (cb) {

        orm.selectAll("burgers", function (res) {

            cb(res);

        });

    },
    // Function used to add a new burger to the database
    insertOne: function (cols, vals, cb) {

        orm.insertOne("burgers", cols, vals, function (res) {

            cb(res);

        });

    },
    // Function used to change a burger from the burger list, to the eaten list
    updateOne: function (objColVals, condition, cb) {

        orm.updateOne("burgers", objColVals, condition, function (res) {

            cb(res);

        });

    },
    // Function used to delete a burger from the database
    delete: function (condition, cb) {

        orm.delete("burgers", condition, function (res) {

            cb(res);

        });

    }

};

// Export the database functions used by the controller
module.exports = burger;