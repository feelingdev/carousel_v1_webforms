<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Carousel v1 Basic - feelingdev</title>
    <link href="css/site.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">

        <section class="backgroundpanel addtransition">
            <asp:Repeater ID="Repeater2" runat="server">
                <ItemTemplate>
                    <div class="addtransition" style="background-image:url('<%# Eval("GamePreview") %>')"></div>
                </ItemTemplate>
            </asp:Repeater>
        </section>

        <div class="overlay"></div>

        <section class="carouselpanel">

            <div class="leftbtn btn addtransition" style="opacity:0;" onclick="move(true);">
                <div></div>
            </div>
            <div class="rightbtn btn addtransition" style="opacity:0;" onclick="move(false);">
                <div></div>
            </div>
            
            <div class="carousel addtransition">
                <asp:Repeater ID="Repeater1" runat="server">
                    <ItemTemplate>
                        <div class="addtransition" style="background-image:url('<%# Eval("GameThumbnail") %>')"></div>
                    </ItemTemplate>
                </asp:Repeater>
            </div>

        </section>

        <script src="js/jquery-3.5.1.min.js"></script>
        <script src="js/script.js"></script>
    </form>
</body>
</html>
