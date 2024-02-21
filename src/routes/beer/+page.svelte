<script lang="ts">
 import { Button } from 'flowbite-svelte'

  let location = true
  let pick1 = false
  let pick2 = false
  let pick3 = false

  let styleRadioValue: string
</script>

{#if location}
  <div class="flex flex-col h-full">
    <div class="text-white text-5xl p-2">
      Select Location
    </div>
    <div class="overflow-x-scroll flex flex-row">
      {#each [1, 2, 3, 4] as {}}
      <div class="space-y-4 mt-4 mx-2 bg-slate-800 min-w-80">
        <div>
          <img src="shrek.jpg" alt="">
          <h5 class="my-2 px-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="mb-3 px-2 font-normal text-gray-700 dark:text-gray-400 leading-tight">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>         
        </div>
      </div>
      {/each}
    </div>
    <div class="flex flex-grow justify-center items-end mb-24">
      <Button class="bg-fuchsia-500 py-4 px-16 text-white text-xl rounded-lg" on:click={() => {
        location = false
        pick1 = true
        styleRadioValue = "Классическое"
        }}>
        Next
      </Button>
    </div>
  </div>
  {:else if pick1}
  <div class="text-white text-5xl pt-2 px-2 pb-4">
    Выберите
  </div>
  <div class="flex justify-center flex-col py-4 px-2">
    <div class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
      <input id="bordered-radio-1" type="radio" value="Классическое" bind:group={styleRadioValue} class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600">
      <label for="bordered-radio-1" class="w-full py-4 ms-3 text-xl text-white">Классическое</label>
    </div>
    <div class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
        <input id="bordered-radio-2" type="radio" value="Сладкое" bind:group={styleRadioValue} class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600">
        <label for="bordered-radio-2" class="w-full py-4 ms-3 text-xl text-white">Сладкое</label>
    </div>
    <div class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
      <input id="bordered-radio-3" type="radio" value="Кислое" bind:group={styleRadioValue} class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600">
      <label for="bordered-radio-3" class="w-full py-4 ms-3 text-xl text-white">Кислое</label>
    </div>
    <div class="flex items-center ps-4 border border-gray-700 rounded bg-fuchsia-500">
      <input id="bordered-radio-4" type="radio" value="Соленое" bind:group={styleRadioValue} class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600">
      <label for="bordered-radio-4" class="w-full py-4 ms-3 text-xl text-white">Соленое</label>
    </div>
  </div>
  <div class="flex flex-grow justify-center items-end mb-24">
    <Button class="bg-cyan-500 py-4 px-8 text-white text-xl rounded-lg mr-2" on:click={() => {
      location = true
      pick1 = false
    }}>
      &#8592;
    </Button>
    <Button class="bg-fuchsia-500 py-4 px-16 text-white text-xl rounded-lg" on:click={() => {
      pick1 = false
      pick2 = true
    }}>
      Next
    </Button>
  </div>
{/if}
