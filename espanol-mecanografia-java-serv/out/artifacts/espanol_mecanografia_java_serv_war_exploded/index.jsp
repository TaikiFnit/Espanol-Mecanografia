<%--
  Created by IntelliJ IDEA.
  User: taikifnit
  Date: 30/1/18
  Time: 10:29 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Login</title>
    <link rel="stylesheet" href="/index.css">
  </head>
  <body>
  <form action="/login" method="POST">
    <div class="form-group">
    <input type="text" name="name" placeholder="name">
    </div>
    <div class="form-group">
    <input type="password" name="password" placeholder="password">
    </div>
    <div class="form-group">
    <input type="submit">
    </div>
    <div class="form-group">
    <a href="/signup.jsp">or Sign Up</a>
    </div>
  </form>
  </body>
</html>
