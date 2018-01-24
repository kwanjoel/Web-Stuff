/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Joel Kwan Student ID: 142473164 Date: 2018/01/20
*
*
********************************************************************************/

$(function () { //Ready handler
    let well = $("#well1");
    console.log("jQuery is ready")
    $("#teams-menu").on("click", function (event) {
        event.preventDefault();
        well.empty();
        //console.log($(this).attr("id"));
        console.log("Showing teams")
        $.ajax({
            url: "https://web422teamapi.herokuapp.com/teams",
            type: "GET",
            contentType: "application/json"
        }).done(function (teams) {
            well.append($("<h3>Teams</h3>"));
            well.append(JSON.stringify(teams));

        })
    });

    $("#employees-menu").on("click", function (event) {
        event.preventDefault();
        well.empty();
        console.log("Showing employees")
        $.ajax({
            url: "https://web422teamapi.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        }).done(function (employees) {
            well.append($("<h3>Employees</h3>"));
            well.append(JSON.stringify(employees));
        })
    });

    $("#projects-menu").on("click", function (event) {
        event.preventDefault();
        well.empty();
        console.log("Showing projects")
        $.ajax({
            url: "https://web422teamapi.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"
        }).done(function (projects) {
            well.append($("<h3>Projects</h3>"));
            well.append(JSON.stringify(projects));
        })
    });

    $("#positions-menu").on("click", function (event) {
        event.preventDefault();
        $("#well1").empty();
        console.log("Showing positions")
        $.ajax({
            url: "https://web422teamapi.herokuapp.com/positions",
            type: "GET",
            contentType: "application/json"
        }).done(function (positions) {
            well.append($("<h3>Positions</h3>"));
            well.append(JSON.stringify(positions));
        })
    });
});