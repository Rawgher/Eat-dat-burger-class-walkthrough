// Making sure functions do not run until the DOM is loaded
$(function () {

    $("#new-burgers").on("click", ".switch-devour", function (event) {

        let id = $(this).data("id");
        let eaten = $(this).data("eaten");

        let eatenState = {
            devoured: eaten
        };

        // Using a put request to update the devoured state
        $.ajax("/api/burgers/" + id, {

            type: "PUT",
            data: eatenState

        }).then(

            function () {

                // Calls to make the sections of the page reload rather than a full refresh
                $("#new-burgers").load(location.href + " #new-burgers>*", "");
                $("#eaten-burgers").load(location.href + " #eaten-burgers>*", "");
            }

        );

    });

    $("#eaten-burgers").on("click", ".rethink", function (event) {

        let id = $(this).data("id");
        let eaten = $(this).data("eaten");

        let eatenState = {
            devoured: eaten
        };

        // Using a put request to update the devoured state
        $.ajax("/api/burgers/rethink/" + id, {

            type: "PUT",
            data: eatenState

        }).then(

            function () {

                // Calls to make the sections of the page reload rather than a full refresh
                $("#new-burgers").load(location.href + " #new-burgers>*", "");
                $("#eaten-burgers").load(location.href + " #eaten-burgers>*", "");
            }

        );

    });

    $("#burgerForm").on("submit", function (event) {

        event.preventDefault();

        let newBurger = {
            burger_name: $("#newBurgerName").val().trim(),
        };

        // Using a post request to add a new burger to the list
        $.ajax("/api/burgers", {

            type: "POST",
            data: newBurger

        }).then(

            function () {

                // Refreshes new burger div
                $("#new-burgers").load(location.href + " #new-burgers>*", "");
                $("#burger-input").load(location.href + " #burger-input>*", "" );

            }

        );

    });

    $("#new-burgers").on("click", ".delete-burger", function (event) {

        let id = $(this).data("id");

        // Using delete to remove a burger from the database
        $.ajax("/api/burgers/" + id, {

            type: "DELETE"

        }).then(

            function () {

                // Refreshes eaten burger div
                $("#new-burgers").load(location.href + " #new-burgers>*", "");
                $("#eaten-burgers").load(location.href + " #eaten-burgers>*", "");

            }

        );

    });

});