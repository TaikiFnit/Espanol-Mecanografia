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
    <link rel="stylesheet" href="index.css">
</head>
<body>
<form action="/signup" method="POST">
    <input type="text" name="name" placeholder="name">
    <input type="password" name="password" placeholder="password">
    <input type="submit">
</form>
<a href="/signup.jsp">Sign up</a>
</body>
</html>
