import javax.servlet.ServletException;
        import javax.servlet.annotation.WebServlet;
        import javax.servlet.http.HttpServlet;
        import javax.servlet.http.HttpServletRequest;
        import javax.servlet.http.HttpServletResponse;
        import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "WordListServlet")
public class WordListServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String user_id = request.getParameter("user_id");
        String word_id = request.getParameter("word_id");

        System.out.println("in wordlist");
        System.out.println(user_id);
        System.out.println(word_id);

        DBAccess.insertWord(user_id, word_id);

        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        try (PrintWriter out = response.getWriter()) {
            out.println("{}");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String user_id = request.getParameter("user_id");

        String[] array = DBAccess.getWordList(user_id);

        System.out.println("Fnifnit");
        System.out.println(array.length);
        String json = "[";

        for(int i = 0; i < array.length; i++) {
            json += "\"" + array[i] + "\"";
            if (i + 1 < array.length) {
                json += ",";
            }
        }

        json += "]";

        System.out.println(json);

        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        try (PrintWriter out = response.getWriter()) {
            out.println(json);
        }
    }
}
