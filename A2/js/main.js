/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Joel Kwan Student ID: 142473164 Date: 2018/01/20
*
*
********************************************************************************/

$(function () { //Ready handler\
    console.log("jQuery ready");

    var employeesModel= [];
    initializeEmployeesModel();

    function initializeEmployeesModel() {
        $.ajax({
            url: "https://web422teamapi.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (employees) {
            employeesModel = _.take(employees, 300);
            refreshEmployeeRows(employeesModel);
        })
        .fail(function () {
            showGenericModal("Error", "Unable to get Employees");
        }) 

    }
    
    function showGenericModal(title, message) {
        console.log("Testing showGenericModal");
        $("#genericModal").$("#model-title")(title);
        $("#genericModal").$("model-body")(message);
    }

    function refreshEmployeeRows(employees) {
        console.log("refreshing employee rows...")
        
        
        var employeeTemplate = _.template(
            '<% _.forEach(employees, function(employee) { %>' +
                '<div class="row body-row" data-id="<%- employee._id %>">' +
                    '<div class="col-xs-4 body-column">' + '<%- employee.FirstName %>' + '</div>' +
                    '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
                    '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
                '</div>' +
                '<% }); %>'
        );
        let employeeRow = employeeTemplate({employees});
        $("#employees-table").html(employeeRow);
        
    }

});