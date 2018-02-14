/*********************************************************************************
* WEB422 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Joel Kwan Student ID: 142473164 Date: 2018/01/31
*
*
********************************************************************************/
var viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
}
$(function () { //Ready handler
    console.log("jQuery ready");

    initializeTeams().then(initializeEmployees).then(initializeProjects).then(() => {
        console.log(ko.mapping.toJS(viewModel.teams))
        console.log(ko.mapping.toJS(viewModel.employees))
        console.log(ko.mapping.toJS(viewModel.projects))
        ko.applyBindings(viewModel);
        console.log("Binding complete")

        $(".single").multipleSelect({ single: true, filter: true });
        $(".multiple").multipleSelect({ filter: true });
    
    })
        .catch((err) => {
            showGenericModal("Error", err);
        })

     
}); //Ready handler

function initializeEmployees() {
    return new Promise((resolve, request) => {
        $.ajax({
            url: "https://web422teamapi.herokuapp.com/employees",
            type: "GET",
            contentType: "application/js"
        }).done((employees) => {
            viewModel.employees = ko.mapping.fromJS(employees);
            resolve();
        }).fail((err) => {
            console.log("Failed to get employees")
            reject(err);
        })
    })
} //initializeEmployees()

function initializeTeams() {
    return new Promise((resolve, request) => {
        $.ajax({
            url: "https://web422teamapi.herokuapp.com/teams-raw",
            type: "GET",
            contentType: "application/js"
        }).done((teams) => {
            viewModel.teams = ko.mapping.fromJS(teams);
            resolve();
        }).fail((err) => {
            console.log("Failed to get teams")
            reject(err);
        })
    })
} //initializeTeams()

function initializeProjects() {
    return new Promise((resolve, request) => {
        $.ajax({
            url: "https://web422teamapi.herokuapp.com/projects",
            type: "GET",
            contentType: "application/js"
        }).done((projects) => {
            viewModel.projects = ko.mapping.fromJS(projects);
            resolve();
        }).fail((err) => {
            console.log("Failed to get projects")
            reject(err);
        })
    })


} //initializeProjects()

function showGenericModal(title, message) {
    $(".modal-title").html(title);
    $(".modal-body").html(message);
    $("#genericModal").modal();
}

function saveTeam() {
    let currentTeam = this;
    let dataToSend = {Projects: currentTeam.Projects(), Employees:currentTeam.Employees(), TeamLead:currentTeam.TeamLead()}

    $.ajax({
        url: "https://web422teamapi.herokuapp.com/team/" + currentTeam._id(),
        type: "PUT",
        data: JSON.stringify(dataToSend),
        contentType: "application/json"
    }).done(function () {
        showGenericModal("Success", currentTeam.TeamName() + " has been updated.")

    }).catch(function (err) {
        showGenericModal("Error", err)
    })
}