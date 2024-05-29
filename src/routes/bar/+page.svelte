<script lang="ts">
  import { env } from '$env/dynamic/public'
  import { Button } from 'flowbite-svelte'
  import { location } from '$lib/data'
  import type { Beer, LocationFilter } from '$lib/types'
  import { goto } from '$app/navigation'

  async function get_all_beer() {
    const filter: LocationFilter = {
      location: location,
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

<div class="lg:flex">
  <div
    class="flex-grow justify-center items-end my-12 hidden
  lg:flex lg:w-1/3 lg:items-center">
    <Button
      class="bg-cyan-500 py-4 px-8 text-white text-xl rounded-lg mr-2"
      on:click={() => {
        goto(`${env.PUBLIC_CLIENT_URL}`)
      }}>
      &#8592;
    </Button>
  </div>
  <div class="lg:flex lg:flex-col lg:w-1/3">
    <div
      class="text-white text-5xl pt-2 px-2 pb-4
    lg:flex lg:justify-center lg:mt-10 lg:pb-0 lg:text-6xl lg:pt-0">
      {location}
    </div>
    <div
      class="text-white text-3xl mt-6 px-2 pb-4
    lg:flex lg:justify-center lg:lowercase lg:text-gray-400 lg:mt-4 lg:mb-6">
      Все напитки
    </div>
  </div>
  <div class="lg:w-1/3" />
</div>
<div
  class="overflow-x-scroll flex flex-row [&::-webkit-scrollbar]:hidden
lg:grid lg:grid-cols-2 lg:gap-5 lg:mx-4 lg:mb-6">
  {#await all_beer}
    <p></p>
  {:then beer}
    {#each beer as beer}
      <div
        class="space-y-4 mx-2 bg-fuchsia-500 min-w-56 min-h-56 text-start p-0
        lg:mx-0">
        <div
          class="h-full flex flex-col justify-between
        lg:flex-row lg:grow">
          <div
            class="mb-auto break-words
          lg:flex lg:h-full">
            <div
              class="m-2
            lg:flex lg:items-center">
              <div
                class="py-2 flex justify-center bg-cyan-500
              lg:w-52 lg:h-52">
                <img src={beer.img_url} class="h-48 w-48" alt="" />
              </div>
            </div>
            <div>
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
          </div>
          <div
            class="m-2 px-2 bg-cyan-500 min-h-12 relative bottom-0
          lg:min-w-40 lg:max-w-40 lg:break-words">
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
<div
  class="flex flex-grow justify-center items-end my-12
lg:hidden">
  <Button
    class="bg-cyan-500 py-4 px-8 text-white text-xl rounded-lg mr-2"
    on:click={() => {
      goto(`${env.PUBLIC_CLIENT_URL}`)
    }}>
    &#8592;
  </Button>
</div>
