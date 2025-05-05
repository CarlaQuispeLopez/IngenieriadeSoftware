package Laboratorios.Laboratorio3PLUS;
import javax.swing.SwingUtilities;
public class MainClass {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new LoginWindow().setVisible(true);
            }
        });
    }
}
