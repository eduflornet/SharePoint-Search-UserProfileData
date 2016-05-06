'use strict';

var context = SP.ClientContext.get_current();

// Para probar esta busqueda es necesario acceder a la administracion central de Sharepoin tOnline 
// Desde User profiles, consultar el perfil y obtener el Account name
// para este ejemplo es: i:0#.f|membership|chromosome@chromosome365.onmicrosoft.com


// 3.	Crear una función que se encargue de realizar las búsquedas

function searchUsers() {
    // Clear any existing results
    $("#users").html("");
    $("#profile").html("");

    // Get search criteria
    var userName = $('#accountName').val();
    var name = $('#name').val();
    var department = $('#department').val();

    var searchCriteria = [];

    if (userName.length > 0) {
        searchCriteria.push("AccountName:" + userName);
    }

    if (name.length > 0) {
        searchCriteria.push("(FirstName:" + name + " OR LastName:" + name + " OR PreferredName:" + name + ")");
    }

    if (department.length > 0) {
        searchCriteria.push("Department:" + department);
    }

    var queryText = "";

    $.each(searchCriteria, function (index) {
        if (queryText.length > 0) {
            queryText = queryText + " AND ";
        }
        queryText = queryText + this;
    });
    if (queryText.length == 0) {
        return;
    }

    var query = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(context);

    query.set_queryText(queryText);
    query.set_sourceId("B09A7990-05EA-4AF9-81EF-EDFAB16C4E31");

    var searchExecutor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(context);
    var results = searchExecutor.executeQuery(query);

    context.executeQueryAsync(function () {
        $("#search").hide();
        $("#results").show();

        $('#accountName').val("");
        $('#name').val("");
        $('#department').val("");

        if (results.m_value.ResultTables[0].ResultRows.count < 1) {
            $("#users").append("No users found for your search criteria.")
            return;
        }

        $("#users").append("<h1>Users</h1>");
        $.each(results.m_value.ResultTables[0].ResultRows, function () {


            $("#users").append("<div>" +
                            "<a href='#' onclick='displayProfile(this)' data-username='" + this.AccountName + "'>" + this.PreferredName + "</a></div>");
        });
    }, function () {
        alert("Error performing search.");
    });
 }


// 4.	Crear una función que se encargue de mostrar los perfiles

function displayProfile(link) {
    var requiredProperties = ["AccountName", "FirstName", "LastName", "PreferredName", "Department", "Company"];
    var username = $(link).attr("data-username");
    var peopleManager = new SP.UserProfiles.PeopleManager(context);

    var profilePropertiesRequest = new SP.UserProfiles.UserProfilePropertiesForUser(context, username, requiredProperties);
    var profileProperties = peopleManager.getUserProfilePropertiesFor(profilePropertiesRequest);

    context.load(profilePropertiesRequest);
    context.executeQueryAsync(function () {
        $("#profile").html("<div>" +
                 "<h1>" + profileProperties[3] + "</h1>" +
                 "<p>First Name: " + profileProperties[1] + "</p>" +
                 "<p>Last Name: " + profileProperties[2] + "</p>" +
                 "<p>Department: " + profileProperties[4] + "</p>" + 
                 "<p>Company: " + profileProperties[5] + "</p>");
    }, function () {
        alert("Error retrieving user profile.");
    });
}

// 5.	Crear una función que vuelva a mostrar el formulario de búsqueda

function showSearch() {
    $("#search").show();
    $("#results").hide();
}

// 6.	Asociar el evento al botón

$(document).ready(function () {
    $('#submitSearch').click(searchUsers);
});





