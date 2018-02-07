import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(name = "LoginServlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=UTF-8");
        request.setCharacterEncoding("UTF-8");

        String name = request.getParameter("name");
        String password = request.getParameter("password");

        String result_id = DBAccess.login(name, password);

        HttpSession session = request.getSession(true);

        if (result_id.length() != 0) {
            session.setAttribute("id", result_id);
            response.sendRedirect("http://localhost:3000?id=" + result_id);
        } else {
            response.sendRedirect("/index.jsp");
        }
    }

}
