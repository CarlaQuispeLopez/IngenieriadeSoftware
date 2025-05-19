import java.math.BigInteger;

public class GeneradorCUF {

    // Función para completar con ceros a la izquierda
    public static String padLeft(String value, int length) {
        StringBuilder result = new StringBuilder(value);
        while (result.length() < length) {
            result.insert(0, "0");
        }
        return result.toString();
    }

    // Función para calcular el Módulo 11
    public static String obtenerModulo11(String cadena) {
        int mult = 2, suma = 0;
        for (int i = cadena.length() - 1; i >= 0; i--) {
            suma += (Character.getNumericValue(cadena.charAt(i)) * mult);
            mult = mult == 9 ? 2 : mult + 1;
        }
        int mod11 = suma % 11;
        int digito = (mod11 == 0) ? 1 : (mod11 == 1) ? 0 : 11 - mod11;
        return String.valueOf(digito);
    }

    // Función para convertir a base 16 (Hexadecimal)
    public static String convertirBase16(String cadena) {
        BigInteger bigInt = new BigInteger(cadena);
        return bigInt.toString(16).toUpperCase();
    }

    // Función para generar el CUF
    public static String generarCUF(String nitEmisor, String fechaHora, String sucursal, String modalidad,
                                      String tipoEmision, String tipoFactura, String tipoDocumentoSector,
                                      String numeroFactura, String pos, String codigoControl) {

        // Completar con ceros los campos
        nitEmisor = padLeft(nitEmisor, 13);
        fechaHora = padLeft(fechaHora, 17);
        sucursal = padLeft(sucursal, 4);
        tipoDocumentoSector = padLeft(tipoDocumentoSector, 2);
        numeroFactura = padLeft(numeroFactura, 10);
        pos = padLeft(pos, 4);

        // Concatenar los campos
        String cadenaConcatenada = nitEmisor + fechaHora + sucursal + modalidad + tipoEmision +
                tipoFactura + tipoDocumentoSector + numeroFactura + pos;

        // Módulo 11
        String digitoVerificador = obtenerModulo11(cadenaConcatenada);
        String cadenaConDigito = cadenaConcatenada + digitoVerificador;

        // Convertir a base 16
        String cadenaHexadecimal = convertirBase16(cadenaConDigito);

        // Concatenar el código de control
        return cadenaHexadecimal + codigoControl;
    }

    public static void main(String[] args) {
        // Datos 
        String nitEmisor = "123456789";
        String fechaHora = "20190113163721231";
        String sucursal = "0";
        String modalidad = "1";
        String tipoEmision = "1";
        String tipoFactura = "1";
        String tipoDocumentoSector = "1";
        String numeroFactura = "1";
        String pos = "0";
        String codigoControl = "A19E23EF34124CD";

        String cuf = generarCUF(nitEmisor, fechaHora, sucursal, modalidad, tipoEmision, tipoFactura,
                tipoDocumentoSector, numeroFactura, pos, codigoControl);

        System.out.println("CUF generado: " + cuf);
    }
}