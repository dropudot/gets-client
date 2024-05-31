<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import type { Beer, LocationFilter } from '$lib/types'
  import { location } from '$lib/data'

  import { API_URL } from '$lib/data'

  async function get_random_beer() {
    const filter: LocationFilter = {
      location: location,
    }

    const response = await fetch(`${API_URL}/random_beer`, {
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

<div class="lg:flex lg:mt-10">
  <div
    class="hidden
    lg:flex lg:w-1/4 lg:justify-center">
  </div>
  <div
    class="text-white text-5xl p-2
  lg:flex lg:justify-center lg:w-2/4 lg:text-5xl">
    {location}
  </div>
  <div
    class="hidden
  lg:flex lg:w-1/4 lg:justify-center">
  </div>
</div>
<div
  class="flex justify-center flex-col pt-4 pb-2 px-2
      lg:pt-0 lg:mb-8">
  <div
    class="bg-cyan-500 px-2 flex items-center rounded mb-2 w-full
          lg:bg-transparent">
    <p
      class="text-white text-base mx-auto py-2
          lg:text-3xl lg:text-gray-300 lg:lowercase">
      Случайный напиток
    </p>
  </div>
</div>
<div
  class="flex justify-center
lg:mb-8">
  {#await random_beer}
    <p></p>
  {:then beer}
    <div
      class="space-y-4 bg-fuchsia-500 w-80 text-start p-0
  lg:mx-0 lg:w-1/2 lg:flex">
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
