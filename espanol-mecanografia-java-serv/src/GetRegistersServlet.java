import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

@WebServlet(name = "GetRegistersServlet")
public class GetRegistersServlet extends HttpServlet {

    String app_id;
    String app_key;

    public void init(ServletConfig config) throws ServletException {
        super.init(config);

        app_id = config.getInitParameter("app_id");
        app_key = config.getInitParameter("app_key");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String json = OxfordApiBridging.callApi("/registers/es");

        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        try (PrintWriter out = response.getWriter()) {
            out.println(json);
        }

    }
}
