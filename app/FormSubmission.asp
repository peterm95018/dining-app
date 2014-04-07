<!DOCTYPE html>
<html>
<body>
<%
dim from
from = Request.Form("inputEmail")
dim comment
comment = Request.Form("commentInput")
Set eMail=CreateObject("CDO.Message")
eMail.Subject="Dining Feedback"
eMail.From=from
eMail.To="towenmil@ucsc.edu"
eMail.TextBody=comment
eMail.Send
set eMail=nothing
Response.Write("How are you today?")
%>
</body>
</html>
