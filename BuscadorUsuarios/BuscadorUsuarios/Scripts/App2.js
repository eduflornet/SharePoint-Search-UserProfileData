'use strict';

var context = SP.ClientContext.get_current();

// Para probar esta busqueda es necesario acceder a la administracion central de Sharepoin tOnline 
// Desde User profiles, consultar el perfil y obtener el Account name
// para este ejemplo es: i:0#.f|membership|chromosome@chromosome365.onmicrosoft.com


function buscarUsuario() {
    var txt = $("#txtNom").val();
    var criterio = "AccountName:" + txt;
    var query = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(context);
    query.set_queryText(criterio);
    query.set_sourceId("B09A7990-05EA-4AF9-81EF-EDFAB16C4E31"); // ID del Result Source de Local People
    var executor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(context);
    var res = executor.executeQuery(query); // se encarga de hacer la busqueda
    
    // voy a procesar los resultados
    // voy a usar funciones anonimas, aqui podria definir otras funciones
    context.executeQueryAsync(function(){
        if(res.m_value.ResultTables[0].ResultRows.length <1){
            $("#res").html("Sin Datos");
            return;
        }
        var html = "<ul>";
        $.each(res.m_value.ResultTables[0].ResultRows,function(i,data){
            html += "<li>" + data.AccountName + "</li>";
        });
        html +="</ul>";
        $("#res").html(html);
        
    },function(){
        alert("KO");
    });
}

$(document).ready(function(){
   $("#btnBuscar").click(buscarUsuario); 
})

