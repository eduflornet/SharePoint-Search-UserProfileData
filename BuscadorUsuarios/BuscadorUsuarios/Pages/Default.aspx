<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <%--2.	Agregar los siguientes elemento de script a continuación del jquery--%>
   <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.search.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.userprofiles.js"></script>
    
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Buscador de Usuarios
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <%--3.	Crear en el main una capa para realizar la búsqueda, debe estar compuesta de tres cajas de texto, 
        una para la cuenta, otra para el nombre y una última para el departamento. Por ultimo debemos incluir un botón 
        para ejecutar la búsqueda--%>

    <div id="search">
        <p>
            <label>Account Name</label><input type="text" id="accountName" />
        </p>
        <p>
            <label>Name</label><input type="text" id="name" />
        </p>
        <p>
            <label>Department</label><input type="text" id="department" />
        </p>
        <p>
            <button type="button" id="submitSearch">Search</button>
        </p>
    </div>
    
<%--    4.	Agregar una capa para mostrar los resultados. Debe estar compuesta por:
a.	Un link para hacer otra búsqueda
b.	Una capa para mostrar los usuario
c.	Otra para enlazar los perfiles--%>
    
    <div id="results">
        <p>
            <a href="#" onclick="showSearch()">New search...</a>
        </p>
        <div id="users">
        </div>
        <div id="profile">
        </div>
    </div>
    

    <%--Aqui hago referencia a App2.js para busqueda mediante AccountName de usuario
    <div>
     <input type="text" id="txtNom" /> 
        <input type="button" id="btnBuscar"/>

    </div>
    <div id="res">--%>



</asp:Content>
