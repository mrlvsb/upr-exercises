
<script>
  import Sum from './sum.svelte';
  import Min from './min.svelte';
  import Reverse from './reverse.svelte';
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
