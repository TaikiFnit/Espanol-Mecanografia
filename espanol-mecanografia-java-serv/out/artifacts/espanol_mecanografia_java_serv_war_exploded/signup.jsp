<%--
  Created by IntelliJ IDEA.
  User: taikifnit
  Date: 2018/02/08
  Time: 7:48 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Sign Up</title>
    <link rel="stylesheet" href="/index.css">
</head>
<body style="text-align: center">

<h1 style="color: white; margin: 30px">Español Mecanografía Sign Up</h1>
<form action="/signup" method="POST">
    <div class="form-group">
    <input type="text" name="name" placeholder="name">
    </div>
    <div class="form-group">
    <input type="password" name="password" placeholder="password">
    </div>
    <div class="form-group">
    <input type="submit">
    </div>
</form>
</body>
</html>
