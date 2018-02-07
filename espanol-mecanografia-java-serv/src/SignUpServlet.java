import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(name = "SignUpServlet")
public class SignUpServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=UTF-8");
        request.setCharacterEncoding("UTF-8");

        String name = request.getParameter("name");
        String password = request.getParameter("password");

        String result_id = DBAccess.signUp(name, password);

        HttpSession session = request.getSession(true);

        System.out.println("Signup");
        System.out.println(result_id);

        if (result_id.length() != 0) {
            session.setAttribute("id", result_id);
            response.sendRedirect("http://localhost:3000?id=" + result_id);
            System.out.println("redirected");
        } else {
            response.sendRedirect("/signup.jsp");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
