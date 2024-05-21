<script lang="ts">
  import { env } from '$env/dynamic/public'
  import { Button } from 'flowbite-svelte'
  import { selected_location } from '../+page.svelte'
  import type { Beer, LocationFilter } from '../beer/types'
  import { goto } from '$app/navigation'

  let current_location = selected_location
  if (current_location == undefined) {
    current_location = 'Шрум'
  }

  async function get_all_beer() {
    const filter: LocationFilter = {
      location: current_location,
    }

    const response = await fetch(`${env.PUBLIC_API_URL}/all_beer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filter),
    })
    const result: Array<Beer> = await response.json()
    return result
  }
  let all_beer = get_all_beer()
</script>

<div class="text-white text-5xl pt-2 px-2 pb-4">{current_location}</div>
<div class="text-white text-3xl mt-6 px-2 pb-4">Все напитки</div>
<div class="overflow-x-scroll flex flex-row [&::-webkit-scrollbar]:hidden">
  {#await all_beer}
    <p></p>
  {:then beer}
    {#each beer as beer}
      <div
        class="space-y-4 mx-2 bg-fuchsia-500 max-w-56 min-w-56 text-start p-0">
        <div class="h-full flex flex-col justify-between">
          <div class="mb-auto break-words">
            <div class="m-2">
              <div class="py-2 flex justify-center bg-cyan-500">
                <img src={beer.img_url} class="max-h-48 max-w-48" alt="" />
              </div>
            </div>
            <h5 class="mt-2 mb-1 px-2 text-xl font-bold text-white">
              {beer.name}
            </h5>
            <p class="mb-1 px-2 text-md font-normal text-white">
              {beer.untappd_style} ({beer.abv}%)
            </p>
            <p class="mb-1 px-2 text-md font-normal text-white">
              {beer.brewery}
            </p>
            <p class="mb-1 px-2 text-md font-normal text-white">
              {beer.description}
            </p>
          </div>
          <div class="m-2 px-2 bg-cyan-500 min-h-12 relative bottom-0">
            <p class="pt-2 px-1 text-md font-bold text-white">
              Отзыв с Untappd
            </p>
            <p class="pb-2 px-1 text-md font-normal text-white">
              {beer.last_review}
            </p>
          </div>
        </div>
      </div>
    {/each}
  {/await}
</div>
<div class="flex flex-grow justify-center items-end my-12">
  <Button
    class="bg-cyan-500 py-4 px-8 text-white text-xl rounded-lg mr-2"
    on:click={() => {
      goto(`${env.PUBLIC_CLIENT_URL}`)
    }}>
    &#8592;
  </Button>
</div>
