package Laboratorios.Laboratorio3PLUS;
import java.util.HashMap;
import java.util.Map;
public class UserControl {
    private Map<String, User> users;
    
    public UserControl() {
        // Inicializar con usuarios de prueba
        initializeUsers();
    }
    
    private void initializeUsers() {
        users = new HashMap<>();
        
        // Añadir algunos usuarios de ejemplo
        // En un sistema real, estos datos vendrían de una base de datos
        users.put("admin", new User("admin", "admin123", "Administrador", "ADMIN"));
        users.put("usuario", new User("usuario", "user123", "Usuario Normal", "USER"));
        users.put("invitado", new User("invitado", "guest123", "Usuario Invitado", "GUEST"));
    }
    
    // Método para validar si existe un usuario
    public User validUser(String username) {
        return users.get(username);
    }
    
    // Método para añadir nuevos usuarios (para administradores)
    public void addUser(String username, String password, String nombre, String rol) {
        if (!users.containsKey(username)) {
            users.put(username, new User(username, password, nombre, rol));
        }
    }
}
