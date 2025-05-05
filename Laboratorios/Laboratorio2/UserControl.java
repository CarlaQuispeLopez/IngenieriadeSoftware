import java.util.ArrayList;
import java.util.Scanner;

public class UserControl {
    private ArrayList<User> users;

    public UserControl() {
        users = new ArrayList<>();
    }

    public void addUser(User user) {
        users.add(user);
        System.out.println("Usuario añadido: " + user.getNombre());
    }

    public void modifyUser(String cu, String newNombre, String newCarrera) {
        for (User user : users) {
            if (user.getCu().equals(cu)) {
                user.setNombre(newNombre);
                user.setCarrera(newCarrera);
                System.out.println("Usuario modificado: " + user.getNombre());
                return;
            }
        }
        System.out.println("Usuario con CU " + cu + " no encontrado.");
    }

    public void deleteUser(String cu) {
        for (User user : users) {
            if (user.getCu().equals(cu)) {
                users.remove(user);
                System.out.println("Usuario eliminado: " + user.getNombre());
                return;
            }
        }
        System.out.println("Usuario con CU " + cu + " no encontrado.");
    }

    public void listUsers() {
        if (users.isEmpty()) {
            System.out.println("No hay usuarios registrados.");
        } else {
            for (User user : users) {
                System.out.println(user);
            }
        }
    }

    public static void main(String[] args) {
        UserControl control = new UserControl();
        Scanner scanner = new Scanner(System.in);
        int option;

        do {
            System.out.println("\n1. Anadir Usuario");
            System.out.println("2. Modificar Usuario");
            System.out.println("3. Eliminar Usuario");
            System.out.println("4. Listar Usuarios");
            System.out.println("5. Salir");
            System.out.print("Seleccione una opcion: ");
            option = scanner.nextInt();
            scanner.nextLine(); // Consumir el salto de línea

            switch (option) {
                case 1:
                    System.out.print("Nombre: ");
                    String nombre = scanner.nextLine();
                    System.out.print("Carrera: ");
                    String carrera = scanner.nextLine();
                    System.out.print("CU: ");
                    String cu = scanner.nextLine();
                    control.addUser(new User(nombre, carrera, cu));
                    break;
                case 2:
                    System.out.print("CU del usuario a modificar: ");
                    String cuModify = scanner.nextLine();
                    System.out.print("Nuevo Nombre: ");
                    String newNombre = scanner.nextLine();
                    System.out.print("Nueva Carrera: ");
                    String newCarrera = scanner.nextLine();
                    control.modifyUser(cuModify, newNombre, newCarrera);
                    break;
                case 3:
                    System.out.print("CU del usuario a eliminar: ");
                    String cuDelete = scanner.nextLine();
                    control.deleteUser(cuDelete);
                    break;
                case 4:
                    control.listUsers();
                    break;
                case 5:
                    System.out.println("Saliendo...");
                    break;
                default:
                    System.out.println("Opción no válida.");
            }
        } while (option != 5);

        scanner.close();
    }
}