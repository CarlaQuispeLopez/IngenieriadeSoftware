import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        List<Integer> numeros = generateRandomNumbers();
        
        ViewCondition view = new ViewCondition();
        
        view.show("TODOS", numeros, new AllwaysTrue());
        view.show("PARES", numeros, new MultipleCondition(2));
        view.show("IMPARES", numeros, new NotCondition(new MultipleCondition(2)));
        view.show("MULTIPLOS DE 5", numeros, new MultipleCondition(5));
        view.show("MULTIPLOS DE 3", numeros, new MultipleCondition(3));
        view.show("NO MULTIPLOS DE 5", numeros, new NotCondition(new MultipleCondition(5)));
        view.show("PRIMOS", numeros, new PrimeCondition());
        view.show("MES DE UN AÑO", numeros, new IsYear());
        view.show("MULTIPLO DE 3 OR 5", numeros, new OrCondition(new MultipleCondition(3), new MultipleCondition(5)));
        
        view.show("MULTIPLO DE 4 AND 3", numeros, new AndCondition(new MultipleCondition(4), new MultipleCondition(3)));
        
        view.show("ES POTENCIA DE 2", numeros, new IsPowerOf(2));
        view.show("ES DIVISOR DE 100", numeros, new IsDivisor(100));
    }
    
    public static List<Integer> generateRandomNumbers() {
        List<Integer> randomNumbers = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < 20; i++) {
            randomNumbers.add(random.nextInt(100) + 1); 
        }
        return randomNumbers;
    }
}

interface ICondicion {
    boolean evaluate(int x);
}

class IsYear implements ICondicion {
    public boolean evaluate(int x) {
        return x >= 1 && x <= 12;
    }
}

class OrCondition implements ICondicion {
    private ICondicion condicionA;
    private ICondicion condicionB;
    
    public OrCondition(ICondicion condicion1, ICondicion condicion2) {
        this.condicionA = condicion1;
        this.condicionB = condicion2;
    }
    
    public boolean evaluate(int x) {
        return (condicionA.evaluate(x) || condicionB.evaluate(x));
    }
}

class AndCondition implements ICondicion {
    private ICondicion condicionA;
    private ICondicion condicionB;
    
    public AndCondition(ICondicion condicion1, ICondicion condicion2) {
        this.condicionA = condicion1;
        this.condicionB = condicion2;
    }
    
    public boolean evaluate(int x) {
        return (condicionA.evaluate(x) && condicionB.evaluate(x));
    }
}

class MultipleCondition implements ICondicion {
    private int number;
    
    public MultipleCondition(int num) {
        number = num;
    }
    
    public boolean evaluate(int x) {
        return x % number == 0;
    }
}

class PrimeCondition implements ICondicion {
    public boolean evaluate(int x) {
        if (x <= 1) return false;
        
        for (int i = 2; i <= Math.sqrt(x); i++) {
            if (x % i == 0) return false;
        }
        return true;
    }
}

class AllwaysTrue implements ICondicion {
    public boolean evaluate(int x) {
        return true;
    }
}

class NotCondition implements ICondicion {
    private ICondicion condicionOriginal;
    
    public NotCondition(ICondicion original) {
        condicionOriginal = original;
    }
    
    public boolean evaluate(int x) {
        return !condicionOriginal.evaluate(x);
    }
}

class IsPowerOf implements ICondicion {
    private int base;
    
    public IsPowerOf(int base) {
        this.base = base;
    }
    
    public boolean evaluate(int x) {
        if (x <= 0) return false;
        if (x == 1) return true; 
        
        double logResult = Math.log(x) / Math.log(base);
        return Math.abs(logResult - Math.round(logResult)) < 1e-10;
    }
}

class IsDivisor implements ICondicion {
    private int numerador;
    
    public IsDivisor(int numerador) {
        this.numerador = numerador;
    }
    
    public boolean evaluate(int x) {
        return x != 0 && numerador % x == 0;
    }
}

class ViewCondition {
    public void show(String mensaje, List<Integer> datos, ICondicion condicion) {
        System.out.println(mensaje);
        for (int i : datos) {
            if (condicion.evaluate(i)) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }
}