<!DOCTYPE html>
<html>
<body>
<%
Set mail=CreateObject("CDO.Message")
mail.Subject="Dining Feedback"
mail.From=Request.Form("ExampleInputEmail1")
mail.To="towenmil@ucsc.edu"
mail.TextBody=Request.Form("commentInput")
mail.Send
set mail=nothing
%>
</body>
</html>
