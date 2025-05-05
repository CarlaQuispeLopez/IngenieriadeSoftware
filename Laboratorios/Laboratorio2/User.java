public class User {
    private String nombre;
    private String carrera;
    private String cu;

    public User(String nombre, String carrera, String cu) {
        this.nombre = nombre;
        this.carrera = carrera;
        this.cu = cu;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCarrera() {
        return carrera;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public String getCu() {
        return cu;
    }

    public void setCu(String cu) {
        this.cu = cu;
    }

    @Override
    public String toString() {
        return "Nombre: " + nombre + ", Carrera: " + carrera + ", CU: " + cu;
    }
}