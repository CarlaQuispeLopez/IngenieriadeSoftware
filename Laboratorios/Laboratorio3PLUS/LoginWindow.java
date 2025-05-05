package Laboratorios.Laboratorio3PLUS;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class LoginWindow extends JFrame {
    private JTextField userField;
    private JPasswordField passwordField;
    private JButton loginButton;
    private JButton cancelButton;
    private JLabel messageLabel;
    private int attemptCount = 0;
    private final int MAX_ATTEMPTS = 3;
    
    private UserControl userControl;
    
    public LoginWindow() {
        userControl = new UserControl();
        initComponents();
    }
    
    private void initComponents() {
        setTitle("Login de Usuario");
        setSize(350, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        JPanel panel = new JPanel();
        panel.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        
        // Usuario
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.anchor = GridBagConstraints.EAST;
        panel.add(new JLabel("Usuario:"), gbc);
        
        userField = new JTextField(15);
        gbc.gridx = 1;
        gbc.gridy = 0;
        gbc.anchor = GridBagConstraints.WEST;
        panel.add(userField, gbc);
        
        // Contraseña
        gbc.gridx = 0;
        gbc.gridy = 1;
        gbc.anchor = GridBagConstraints.EAST;
        panel.add(new JLabel("Contraseña:"), gbc);
        
        passwordField = new JPasswordField(15);
        gbc.gridx = 1;
        gbc.gridy = 1;
        gbc.anchor = GridBagConstraints.WEST;
        panel.add(passwordField, gbc);
        
        // Botones
        JPanel buttonPanel = new JPanel();
        loginButton = new JButton("Ingresar");
        cancelButton = new JButton("Cancelar");
        
        buttonPanel.add(loginButton);
        buttonPanel.add(cancelButton);
        
        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.gridwidth = 2;
        gbc.anchor = GridBagConstraints.CENTER;
        panel.add(buttonPanel, gbc);
        
        // Mensaje de error
        messageLabel = new JLabel("");
        messageLabel.setForeground(Color.RED);
        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.gridwidth = 2;
        panel.add(messageLabel, gbc);
        
        // Añadir panel al frame
        add(panel);
        
        // Acción para el botón Ingresar
        loginButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                attemptLogin();
            }
        });
        
        // Acción para el botón Cancelar
        cancelButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
        
        // Permitir login con Enter
        passwordField.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_ENTER) {
                    attemptLogin();
                }
            }
        });
    }
    
    private void attemptLogin() {
        String username = userField.getText();
        String password = new String(passwordField.getPassword());
        
        if (attemptCount < MAX_ATTEMPTS) {
            // Validar usuario y contraseña
            User user = userControl.validUser(username);
            if (user != null && user.validPassword(password)) {
                JOptionPane.showMessageDialog(this, 
                    "¡Bienvenido al sistema " + username + "!", 
                    "Login exitoso", 
                    JOptionPane.INFORMATION_MESSAGE);
                dispose(); // Cerrar ventana de login
                openMainApplication(user); // Abrir aplicación principal
            } else {
                attemptCount++;
                int remainingAttempts = MAX_ATTEMPTS - attemptCount;
                
                if (remainingAttempts > 0) {
                    messageLabel.setText("Usuario o contraseña incorrectos. Intentos restantes: " + remainingAttempts);
                } else {
                    messageLabel.setText("¡Número máximo de intentos alcanzado!");
                    loginButton.setEnabled(false);
                    JOptionPane.showMessageDialog(this, 
                        "Ha excedido el número máximo de intentos.\nLa aplicación se cerrará.", 
                        "Error de autenticación", 
                        JOptionPane.ERROR_MESSAGE);
                    System.exit(1);
                }
            }
        }
        
        // Limpiar campos
        passwordField.setText("");
        passwordField.requestFocus();
    }
    
    private void openMainApplication(User user) {
        // Aquí se abriría la ventana principal de la aplicación
        // Por ejemplo:
        // MainWindow mainWindow = new MainWindow(user);
        // mainWindow.setVisible(true);
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new LoginWindow().setVisible(true);
            }
        });
    }
}