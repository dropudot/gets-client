<script lang="ts" context="module">
  import { goto } from '$app/navigation'
  import { env } from '$env/dynamic/public'
  import { Button } from 'flowbite-svelte'
  import Butylochka from '$lib/components/Butylochka.svelte'
  import Golodranets from '$lib/components/Golodranets.svelte'
  import Lager from '$lib/components/Lager.svelte'
  import Shroom from '$lib/components/Shroom.svelte'
  import { changeLocation } from '$lib/data'
  import { Locations } from '$lib/enums'
</script>

<div class="flex flex-col p-2 h-full z-0 overflow-x-hidden relative">
  <div class="text-white text-7xl mb-40">Gets</div>
  <div class="flex justify-center items-start mb-48">
    <button
      class="bg-cyan-500 py-2 px-20 text-white text-3xl rounded-lg"
      on:click={() => goto(`${env.PUBLIC_CLIENT_URL}/beer`)}>
      Начать
    </button>
  </div>
  <img
    class="animate-pulse absolute -z-10 -rotate-[25deg] -right-40 top-24"
    src="ltp.png"
    alt="" />
  <div class="flex flex-col mb-4">
    <div class="flex text-white text-4xl">Заведения</div>
    <div
      class="overflow-x-scroll flex flex-row mt-4 space-x-3 [&::-webkit-scrollbar]:hidden">
      <Button
        class="p-0 bg-cyan-500 focus:ring-0 
        min-w-80 text-start"
        on:click={() => {
          changeLocation(Locations.shroom)
          goto(`${env.PUBLIC_CLIENT_URL}/bar`)
        }}>
        <div class="mt-4 mx-2 min-w-72 text-start p-0">
          <Shroom>
            <p class="mb-3">Секретный бар с пивом и мак-н-чизами</p>
            <p>15:00 - 02:00</p>
          </Shroom>
        </div>
      </Button>
      <Button
        class="p-0 bg-cyan-500 focus:ring-0
        min-w-80 text-start"
        on:click={() => {
          changeLocation(Locations.golodranets)
          goto(`${env.PUBLIC_CLIENT_URL}/bar`)
        }}>
        <div class="space-y-4 mt-4 mx-2 min-w-72 text-start p-0">
          <Golodranets>
            <p class="mb-3">
              Бар с многолетней историей и широким выбором пива
            </p>
            <p>15:00 - 02:00</p>
          </Golodranets>
        </div>
      </Button>
      <Button
        class="p-0 bg-cyan-500 focus:ring-0 
        min-w-80 text-start"
        on:click={() => {
          changeLocation(Locations.lager)
          goto(`${env.PUBLIC_CLIENT_URL}/bar`)
        }}>
        <div class="space-y-4 mt-4 mx-2 min-w-72 text-start p-0">
          <Lager>
            <p class="mb-3">Молодой бар с бильярдом и шаффлбордом</p>
            <p>17:00 - 02:00</p>
          </Lager>
        </div>
      </Button>
      <Button
        class="p-0 focus:ring-0 bg-cyan-500
        min-w-80 text-start"
        on:click={() => {
          changeLocation(Locations.butylochka)
          goto(`${env.PUBLIC_CLIENT_URL}/bar`)
        }}>
        <div class="space-y-4 mt-4 mx-2 min-w-72 text-start p-0">
          <Butylochka>
            <p class="mb-3">Боттл шоп по соседству с Голодранцем</p>
            <p>12:00 - 23:00</p>
          </Butylochka>
        </div>
      </Button>
    </div>
  </div>
</div>
