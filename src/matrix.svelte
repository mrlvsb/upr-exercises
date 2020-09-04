<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  background: #5be27a;
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 0;
}

td.active {
  background: #17a2b8;
}

td.unknown {
  color: #6c757d;
  background: transparent;
}
</style>

<script>
  export let elements;
  export let highlight = null;
</script>

<table>
    {#each elements as row, r}
      <tr>
      {#each row as col, c}
        <td class="matrix-{r}-{c}" class:active={highlight && highlight[0] == r && highlight[1] == c} class:unknown={col == undefined}>
          {#if col == undefined}
          ?
          {:else}
          { col }
          {/if}
        </td>
      {/each}
      </tr>
    {/each}
</table>
