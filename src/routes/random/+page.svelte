<script lang="ts">
  import { env } from '$env/dynamic/public'
  import { Button } from 'flowbite-svelte'
  import type { Beer, LocationFilter } from '$lib/types'
  import { location } from '$lib/data'

  async function get_random_beer() {
    const filter: LocationFilter = {
      location: location,
    }

    const response = await fetch(`${env.PUBLIC_API_URL}/random_beer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filter),
    })
    const result: Beer = await response.json()
    return result
  }
  let random_beer = get_random_beer()
</script>

<div class="text-white text-5xl pt-2 px-2 pb-4">
  {location} - случайный напиток
</div>
<div class="flex justify-center">
  {#await random_beer}
    <p></p>
  {:then beer}
    <div class="space-y-4 bg-fuchsia-500 w-80 text-start p-0">
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
          <p class="pt-2 px-1 text-md font-bold text-white">Отзыв с Untappd</p>
          <p class="pb-2 px-1 text-md font-normal text-white">
            {beer.last_review}
          </p>
        </div>
      </div>
    </div>
  {/await}
</div>
<div class="flex flex-grow justify-center items-end my-12">
  <Button
    class="bg-cyan-500 py-4 px-8 text-white text-xl rounded-lg mr-2"
    on:click={() => {
      random_beer = get_random_beer()
    }}>
    &#8635;
  </Button>
</div>
