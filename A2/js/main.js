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
var employeesModel = [];

$(function () { //Ready handler\
    console.log("jQuery ready");


    //Fetch data and populate table
    initializeEmployeesModel();

    //keyup event for search field
    $("#employee-search").keyup(function () {
        getFilteredEmployeesModel($("#employee-search").val())
    })

    //Clicking a body row
    $(".bootstrap-header-table").on('click', '.body-row', function () {
        let currentEmployee = getEmployeeModelById($(this).attr('data-id'));

        let mDate = moment(currentEmployee.HireDate);
        mDate.utc();
        let formattedDate = mDate.format('MMMM Do, YYYY');
        currentEmployee.HireDate = formattedDate;

        let displayTemplate = _.template(
            '<strong>Address:</strong> <%- employee.AddressStreet %>, <%- employee.AddressCity %>, <%- employee.AddressState %> <%- employee.AddressZip %> <br>' +
            '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %> <br>' +
            '<strong>Hire Date:</strong> <%- employee.HireDate %>'
        )

        let employeeContent = displayTemplate({ 'employee': currentEmployee });


        showGenericModal(currentEmployee.FirstName + ' ' + currentEmployee.LastName, employeeContent);
        console.log(currentEmployee);


    })

    //Sorting
    $("#header-first-name").on('click', function () {
        console.log("Sorting by FirstName");
        employeesModel = _.orderBy(employeesModel, [function (employee) { return employee.FirstName; }], ['asc']);
        //employeesModel = _.orderBy(employeesModel, [function (employee) { return employee.FirstName; }], ['desc']);

        refreshEmployeeRows(employeesModel);

    })

    $("#header-last-name").on('click', function () {
        console.log("Sorting by LastName");
        employeesModel = _.sortBy(employeesModel, [function (employee) { return employee.LastName }]);
        refreshEmployeeRows(employeesModel);
    })

    $("#header-position").on('click', function () {
        console.log("Sorting by Position")
        employeesModel = _.sortBy(employeesModel, [function (employee) { return employee.Position.PositionName }])
        refreshEmployeeRows(employeesModel)
    })


});


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

function refreshEmployeeRows(employees) {
    console.log("refreshing employee rows...")
    $("#employees-table").empty();

    var employeeTemplate = _.template(
        '<% _.forEach(employees, function(employee) { %>' +
        '<div class="row body-row" data-id="<%- employee._id %>">' +
        '<div class="col-xs-4 body-column">' + '<%- employee.FirstName %>' + '</div>' +
        '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
        '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
        '</div>' +
        '<% }); %>'
    );
    let employeeRow = employeeTemplate({ employees });
    $("#employees-table").append(employeeRow);

}

function getFilteredEmployeesModel(filterString) {

    //Converting to regex 
    let caseInsensitiveString = new RegExp(filterString, 'i');
    console.log("Filtering by: " + caseInsensitiveString);

    let filteredEmployees = _.filter(employeesModel, function (employee) {
        if (employee.FirstName.match(caseInsensitiveString) || employee.LastName.match(caseInsensitiveString) || employee.Position.PositionName.match(caseInsensitiveString)) {
            return employee;
        }
    });

    console.log(filteredEmployees);

    if (filterString == "") {
        refreshEmployeeRows(employeesModel);
    }

    else {
        refreshEmployeeRows(filteredEmployees);
    }
}

function showGenericModal(title, message) {
    console.log("Showing: " + title);

    $('.modal-title').empty();
    $('.modal-body').empty();
    $('.modal-title').html(title);
    $('.modal-body').html(message);
    $('#genericModal').modal('show');
}

function getEmployeeModelById(id) {
    let found = _.find(employeesModel, function (employee) {
        return employee._id == id;
    })

    return found;
}