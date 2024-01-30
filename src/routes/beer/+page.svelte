<script lang="ts">
 import { Button } from 'flowbite-svelte'

  let location = true
  let pick1 = false
  let pick2 = false
  let pick3 = false
</script>

{#if location}
  <div class="flex flex-col h-full">
    <div class="text-white text-5xl p-2">
      Select Location
    </div>
    <div class="overflow-x-scroll flex flex-row">
      <div class="space-y-4 mt-4 mx-2 bg-slate-800">
        <div>
          <img src="shrek.jpg" alt="">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>         
        </div>
      </div>
      <div class="space-y-4 mt-4 mx-2 bg-slate-800">
        <div>
            <img src="shrek.jpg" alt="">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
      </div>
      <div class="space-y-4 mt-4 mx-2 bg-slate-800">
        <div>
            <img src="shrek.jpg" alt="">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
      </div>
      <div class="space-y-4 mt-4 mx-2 bg-slate-800">
        <div>
            <img src="shrek.jpg" alt="">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
      </div>
    </div>
    <div class="flex flex-grow justify-center items-end mb-40">
      <Button class="bg-cyan-500 py-4 px-16 text-white text-xl rounded-lg" on:click={() => {
        location = false
        pick1 = true
        }}>
        Next
      </Button>
    </div>
  </div>
{:else if pick1}
  <div class="text-white text-5xl">page2</div>
  <Button class="bg-cyan-500 py-4 px-16 text-white text-xl rounded-lg" on:click={() => {
    pick1 = false
    pick2 = true
  }}>
    Next
  </Button>
{:else if pick2}
  <div class="text-white text-5xl">page3</div>
  <Button class="bg-cyan-500 py-4 px-16 text-white text-xl rounded-lg" on:click={() => {
    pick2 = false
    pick3 = true
  }}>
    Next
  </Button>
{/if}