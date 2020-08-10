
<script>
  import Sum from './sum.svelte';
  import Min from './min.svelte';
  import Reverse from './reverse.svelte';
  import MatrixMul from './matrix_mul.svelte';
</script>

# Pole (array)
## Suma prvků
Funkce projde pole a spocita sumu.
```c
int suma(int *pole, int len);
```

<Sum array={[10, 20, 30, 40]}/>
<hr />

## Hledání minimální hodnoty v poli

<Min array={[10, 5, 30, 2]}/>
<hr />

## Obrácení pole
<Reverse array={[1, 2, 3, 4]}/>
<hr />

## Násobení matic
<MatrixMul a={[[1, 2, 3], [4, 5, 6], [7, 8, 9]]}
           b={[[10, 20, 30], [40, 50, 60], [70, 80, 90]]}
/>
