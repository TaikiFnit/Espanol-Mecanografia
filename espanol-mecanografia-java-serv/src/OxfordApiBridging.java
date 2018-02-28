import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class OxfordApiBridging {
    static String app_key = "your_app_key";
    static String app_id = "your_app_id";

    static String callApi(String path) {
        try {
            URL url = new URL("https://od-api.oxforddictionaries.com:443/api/v1" + path);
            HttpURLConnection http = (HttpURLConnection) url.openConnection();
            http.setRequestMethod("GET");
            http.setRequestProperty("Accept", "application/json");
            http.setRequestProperty("app_key", app_key);
            http.setRequestProperty("app_id", app_id);
            http.connect();

            // サーバーからのレスポンスを標準出力へ出す
            BufferedReader reader = new BufferedReader(new InputStreamReader(http.getInputStream()));
            String json = "", line = "";
            while ((line = reader.readLine()) != null) {
                json += line;
            }

            return json;
        } catch (Exception e) {
            return "{\"status\":false}";
        }
    }
}
