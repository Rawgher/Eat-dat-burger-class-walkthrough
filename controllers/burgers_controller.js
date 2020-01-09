let express = require("express");

let router = express.Router();

// Import the model to allow access to the database
let burger = require("../models/burger.js");

// Setting up all routes needed
router.get("/", function (req, res) {

    burger.selectAll(function (data) {

        let handleBarsObject = {

            burgers: data

        };

        res.render("index", handleBarsObject);

    });

});

router.post("/api/burgers", function (req, res) {

    burger.insertOne([
        "burger_name"
    ], [
            req.body.burger_name
        ], function (result) {

            res.json({ id: result.insertId });

        });

});

router.put("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    burger.updateOne({

        devoured: true

    }, condition, function (result) {

        if (result.changedRows == 0) {

            return res.status(404).end();

        } else {

            res.status(200).end();

        }

    });

});

router.put("/api/burgers/rethink/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    burger.updateOne({

        devoured: false

    }, condition, function (result) {

        if (result.changedRows == 0) {

            return res.status(404).end();

        } else {

            res.status(200).end();

        }

    });

});

router.delete("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {

        if (result.affectedRows == 0) {

            return res.status(404).end();

        } else {

            res.status(200).end();

        }

    });

});



// Export routes for use on the server
module.exports = router;