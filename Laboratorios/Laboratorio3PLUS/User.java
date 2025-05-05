package Laboratorios.Laboratorio3PLUS;
public class User {
    private String username;
    private String password;
    private String nombre;
    private String rol;
    
    public User(String username, String password, String nombre, String rol) {
        this.username = username;
        this.password = password;
        this.nombre = nombre;
        this.rol = rol;
    }

    public String getUsername() {
        return username;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public String getRol() {
        return rol;
    }
    
    public boolean validPassword(String inputPassword) {
        return this.password.equals(inputPassword);
    }
}
