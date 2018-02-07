import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DBAccess {
    public static String login(String name, String password) { //エラー処理が必要にする
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            String url = "jdbc:mysql://localhost/softdex?characterEncoding=UTF-8";
            Connection conn = DriverManager.getConnection(url, "softd", "softd");

            String sql = "SELECT * FROM users where name = ? and password = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, name); //1つ目の？に引数をセットする
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();

            String rs_id = "";
            if (rs.next()) {
                rs_id = rs.getString("id");
            }

            rs.close();
            stmt.close();
            conn.close();

            return rs_id;

        } catch (Exception e) {
            System.out.println("FnitError");
            System.out.println(e);
            return "";
        }
    }

    public static String signUp(String name, String pass) {
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            String url = "jdbc:mysql://localhost/softdex?characterEncoding=UTF-8";
            Connection conn = DriverManager.getConnection(url, "softd", "softd");

            String sql = "insert into users(name, password, registered_at) values(?, ?, now())";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, name); //1つ目の？に引数をセットする
            stmt.setString(2, pass);
            int rs = stmt.executeUpdate();

            stmt.close();
            conn.close();

            String id = DBAccess.login(name, pass);

            return id;

        } catch (Exception e) {
            System.out.println("FnitError");
            System.out.println(e);
            return "";
        }
    }
}
