<script lang="ts">
  import { getRandomisedArray, CellObject } from "./lib/ArrayInitializer";
  import ControlButtons from "./lib/ControlButtons.svelte";

  let count: number = 4;
  $: count, resetState();

  let state: CellObject[];
  resetState();

  var firstCardPosition: number = -1;
  var secondCardPosition: number = -1;

  function resetState() {
    state = getRandomisedArray(count);
  }

  function handleCellClick(position: number) {
    if (state[position].isOpen || state[position].isSolved) {
      console.log("card either open or solved. cannot proceed");
      return;
    }

    if (firstCardPosition == -1) {
      firstCardPosition = position;
      revealCardAtPosition(position);
    } else if (secondCardPosition == -1) {
      secondCardPosition = position;
      revealCardAtPosition(position);

      setTimeout(() => {
        const firstVal = state[firstCardPosition].value;
        const secondVal = state[secondCardPosition].value;

        if (firstVal == secondVal) {
          console.log("solved..", firstVal);
          markCardAsSolved(firstCardPosition);
          markCardAsSolved(secondCardPosition);
        } else {
          revealCardAtPosition(firstCardPosition);
          revealCardAtPosition(secondCardPosition);
        }

        firstCardPosition = -1;
        secondCardPosition = -1;

        const isGameOver: boolean = state.every(function (cell: CellObject) {
          return cell.isSolved;
        });

        if (isGameOver) {
          alert("Game Over");
        }
      }, 500);
    }
  }

  function markCardAsSolved(position: number) {
    state[position].isSolved = true;
  }

  function revealCardAtPosition(position: number) {
    const item: CellObject = state[position];
    console.log(state);
    item.isOpen = !item.isOpen;
    console.log(item);
    state[position] = item;
    console.log(state);
  }
</script>

<label>Size</label>
<input type="number" bind:value="{count}" step="2" />
<br />
<br />
<div class="container">
  {#each state as item, i}
    {#if i % count == 0}
      <div class="flex-new-line"></div>
    {/if}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="{item.style()}" on:click="{() => handleCellClick(i)}">
      {item.value}
    </div>
  {/each}
</div>
<br />
<br />
<ControlButtons on:reset="{resetState}" />

<style>
  .container {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
  }
  .flex-new-line {
    flex-basis: 100%;
    height: 0;
    width: 0;
  }
  .cell {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 200px;
    border: 0.5px solid #000000;
    font-size: 50px;
    cursor: pointer;
  }
  .cell-covered {
    background-image: url("https://tekeye.uk/playing_cards/images/svg_playing_cards/backs/red.svg");
    border: 0.5px solid #ffffff;
    color: transparent;
  }
</style>
