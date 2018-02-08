import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

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
    public static String getId(String name) { //エラー処理が必要にする
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            String url = "jdbc:mysql://localhost/softdex?characterEncoding=UTF-8";
            Connection conn = DriverManager.getConnection(url, "softd", "softd");

            String sql = "SELECT * FROM users where name = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, name); //1つ目の？に引数をセットする
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

    public static String[] getWordList(String user_id) {
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            String url = "jdbc:mysql://localhost/softdex?characterEncoding=UTF-8";
            Connection conn = DriverManager.getConnection(url, "softd", "softd");

            String sql = "select * from typed_words where user_id = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, user_id); //1つ目の？に引数をセットする
            ResultSet rs = stmt.executeQuery();

            ArrayList<String> array = new ArrayList<String>();

            while (rs.next()) {
                System.out.println("called next");
                array.add(rs.getString("word_id"));
            }
            System.out.println("user_id"+ user_id);
            System.out.println(array.size());

            rs.close();
            stmt.close();
            conn.close();

            return array.toArray(new String[array.size()]);

        } catch (Exception e) {
            System.out.println("FnitError");
            System.out.println(e);
            String[] a = new String[0];
            return a;
        }
    }

    public static void insertWord(String user_id, String word) {
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            String url = "jdbc:mysql://localhost/softdex?characterEncoding=UTF-8";
            Connection conn = DriverManager.getConnection(url, "softd", "softd");

            String sql = "insert into typed_words(user_id, word_id, created_at) values(?, ?, now())";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, user_id); //1つ目の？に引数をセットする
            stmt.setString(2, word);
            int rs = stmt.executeUpdate();

            stmt.close();
            conn.close();


        } catch (Exception e) {
            System.out.println("FnitError");
            System.out.println(e);
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

    public static String[] getFilterList(String user_id) {
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            String url = "jdbc:mysql://localhost/softdex?characterEncoding=UTF-8";
            Connection conn = DriverManager.getConnection(url, "softd", "softd");

            String sql = "select * from applied_filters where user_id = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, user_id); //1つ目の？に引数をセットする
            ResultSet rs = stmt.executeQuery();

            ArrayList<String> array = new ArrayList<String>();

            while (rs.next()) {
                array.add(rs.getString("filter_name"));
            }

            rs.close();
            stmt.close();
            conn.close();

            return array.toArray(new String[array.size()]);

        } catch (Exception e) {
            System.out.println("FnitError");
            System.out.println(e);
            String[] a = new String[0];
            return a;
        }
    }

    public static void insertFilter(String user_id, String filter_name) {
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            String url = "jdbc:mysql://localhost/softdex?characterEncoding=UTF-8";
            Connection conn = DriverManager.getConnection(url, "softd", "softd");

            String sql = "insert into applied_filters(user_id, filter_name) values(?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, user_id); //1つ目の？に引数をセットする
            stmt.setString(2, filter_name);
            int rs = stmt.executeUpdate();

            stmt.close();
            conn.close();


        } catch (Exception e) {
            System.out.println("FnitError");
            System.out.println(e);
        }
    }

    public static void deleteFilter(String user_id, String filter_name) {
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            String url = "jdbc:mysql://localhost/softdex?characterEncoding=UTF-8";
            Connection conn = DriverManager.getConnection(url, "softd", "softd");

            String sql = "delete from applied_filters where user_id = ? and filter_name = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, user_id); //1つ目の？に引数をセットする
            stmt.setString(2, filter_name);
            int rs = stmt.executeUpdate();

            stmt.close();
            conn.close();


        } catch (Exception e) {
            System.out.println("FnitError");
            System.out.println(e);
        }
    }
}
