<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import Golodranets from '../../components/Golodranets.svelte'
  import Shroom from '../../components/Shroom.svelte'
  import Lager from '../../components/Lager.svelte'
  import Butylochka from '../../components/Butylochka.svelte'
  import { Locations, Categories, Subcategories, Styles } from './enums'
  import type { Beer, FilterBeer } from './types'
  import { env } from '$env/dynamic/public'
  import { fly, type FlyParams } from 'svelte/transition'

  let location_page = true
  let location: Locations

  let category_page = false
  let category: Categories

  let subcategory_page = false
  let subcategory: Subcategories | null

  let style_page = false
  let style: Styles | null

  let result_page = false

  let isClickedS = false
  let isClickedB = false
  let isClickedG = false
  let isClickedL = false

  let inFlyParams: FlyParams = {
    x: 200,
    duration: 250,
    delay: 250,
  }

  let outFlyParams: FlyParams = {
    x: -200,
    duration: 250,
  }

  function flyBack() {
    inFlyParams.x = -200
    outFlyParams.x = 200
  }

  function flyForward() {
    inFlyParams.x = 200
    outFlyParams.x = -200
  }

  let beer: Promise<Array<Beer>>

  async function get_result_beer(
    location: Locations,
    category: Categories,
    subcategory: Subcategories | null,
    style: Styles | null
  ): Promise<Array<Beer>> {
    const categoryKey =
      Object.keys(Categories)[Object.values(Categories).indexOf(category)]

    const subcategoryKey =
      subcategory != null
        ? Object.keys(Subcategories)[
            Object.values(Subcategories).indexOf(subcategory)
          ]
        : ''

    const styleKey =
      style != null
        ? Object.keys(Styles)[Object.values(Styles).indexOf(style)]
        : ''

    const filter: FilterBeer = {
      location: location,
      category: categoryKey,
      subcategory: subcategoryKey,
      style: styleKey,
    }

    const response = await fetch(`${env.PUBLIC_API_URL}/result_beer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filter),
    })
    const result = await response.json()
    return result
  }
</script>

<div class="h-full">
  {#if location_page}
    <div
      class="flex flex-col h-full"
      in:fly={inFlyParams}
      out:fly={outFlyParams}>
      <div class="text-white text-5xl p-2">Выберите заведение</div>
      <div
        class="overflow-x-scroll flex flex-row [&::-webkit-scrollbar]:hidden">
        <Button
          class="space-y-4 mt-4 mx-2 {isClickedS
            ? 'bg-fuchsia-500'
            : 'bg-cyan-500'} min-w-80 text-start p-0"
          on:click={() => {
            location = Locations.shroom
            isClickedS = true
            isClickedB = false
            isClickedG = false
            isClickedL = false
          }}>
          <Shroom />
        </Button>
        <Button
          class="space-y-4 mt-4 mx-2 {isClickedG
            ? 'bg-fuchsia-500'
            : 'bg-cyan-500'} min-w-80 text-start p-0"
          on:click={() => {
            location = Locations.golodranets
            isClickedG = true
            isClickedS = false
            isClickedL = false
            isClickedB = false
          }}>
          <Golodranets />
        </Button>
        <Button
          class="space-y-4 mt-4 mx-2 {isClickedL
            ? 'bg-fuchsia-500'
            : 'bg-cyan-500'} min-w-80 text-start p-0"
          on:click={() => {
            location = Locations.lager
            isClickedL = true
            isClickedS = false
            isClickedG = false
            isClickedB = false
          }}>
          <Lager />
        </Button>
        <Button
          class="space-y-4 mt-4 mx-2 {isClickedB
            ? 'bg-fuchsia-500'
            : 'bg-cyan-500'} min-w-80 text-start p-0"
          on:click={() => {
            location = Locations.butylochka
            isClickedB = true
            isClickedS = false
            isClickedG = false
            isClickedL = false
          }}>
          <Butylochka />
        </Button>
      </div>
      <div class="flex justify-center mt-16">
        {#if location == null}
          <Button
            class="bg-fuchsia-500 py-4 px-16 text-white text-xl rounded-lg"
            disabled
            on:click={() => {
              location_page = false
              category_page = true
            }}>
            Далее
          </Button>
        {:else}
          <Button
            class="bg-fuchsia-500 py-4 px-16 text-white text-xl rounded-lg"
            on:click={() => {
              flyForward()
              location_page = false
              category_page = true
            }}>
            Далее
          </Button>
        {/if}
      </div>
    </div>
  {:else if category_page}
    <div in:fly={inFlyParams} out:fly={outFlyParams}>
      <div class="text-white text-5xl pt-2 px-2 pb-4">Выберите категорию</div>
      <div class="flex justify-center flex-col py-4 px-2">
        <div
          class="bg-cyan-500 ps-2 flex items-center border border-gray-700 rounded mb-2 w-full">
          <p class="text-white text-base mx-auto py-2">
            {location}
          </p>
        </div>
        <div
          class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
          <input
            id="bordered-radio-classic"
            type="radio"
            value="Классическое"
            bind:group={category}
            class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
          <label
            for="bordered-radio-classic"
            class="w-full py-5 ms-3 text-xl text-white">Классическое</label>
        </div>
        <div
          class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
          <input
            id="bordered-radio-sweet"
            type="radio"
            value="Сладкое"
            bind:group={category}
            class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
          <label
            for="bordered-radio-sweet"
            class="w-full py-5 ms-3 text-xl text-white">Сладкое</label>
        </div>
        <div
          class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
          <input
            id="bordered-radio-sour"
            type="radio"
            value="Кислое"
            bind:group={category}
            class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
          <label
            for="bordered-radio-sour"
            class="w-full py-5 ms-3 text-xl text-white">Кислое</label>
        </div>
        <div
          class="flex items-center ps-4 border border-gray-700 rounded bg-fuchsia-500">
          <input
            id="bordered-radio-salty"
            type="radio"
            value="Соленое"
            bind:group={category}
            class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
          <label
            for="bordered-radio-salty"
            class="w-full py-5 ms-3 text-xl text-white">Соленое</label>
        </div>
      </div>
      <div class="flex justify-center mt-12">
        <Button
          class="bg-cyan-500 py-4 px-8 text-white text-xl rounded-lg mr-2"
          on:click={() => {
            flyBack()
            location_page = true
            category_page = false
          }}>
          &#8592;
        </Button>
        {#if category == null}
          <Button
            class="bg-fuchsia-500 py-4 px-16 text-white text-xl rounded-lg"
            disabled
            on:click={() => {
              category_page = false
              subcategory_page = true
            }}>
            Далее
          </Button>
        {:else}
          <Button
            class="bg-fuchsia-500 py-4 px-16 text-white text-xl rounded-lg"
            on:click={() => {
              flyForward()
              category_page = false
              subcategory_page = true
            }}>
            Далее
          </Button>
        {/if}
      </div>
    </div>
  {:else if subcategory_page}
    <div in:fly={inFlyParams} out:fly={outFlyParams}>
      <div class="text-white text-5xl pt-2 px-2 pb-4">
        Выберите подкатегорию
      </div>
      <div class="flex justify-center flex-col py-4 px-2">
        <div
          class="bg-cyan-500 ps-2 flex items-center border border-gray-700 rounded mb-2 w-full">
          <p class="text-white text-base mx-auto py-2">
            {location} &#8594; {category}
          </p>
        </div>
        {#if category == 'Классическое'}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-lager"
              type="radio"
              value="Лагер"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-lager" class="text-xl">Лагер</label>
              <p class="text-l">фильтрованное</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-wheat"
              type="radio"
              value="Пшеничное"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-wheat" class="text-xl"
                >Пшеничное</label>
              <p class="text-l">нефильтрованное</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-ipa"
              type="radio"
              value="IPA"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-ipa" class="text-xl">IPA</label>
              <p class="text-l">горький эль</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-darkale"
              type="radio"
              value="Темный эль"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-darkale" class="text-xl"
                >Темный эль</label>
            </div>
          </div>
        {:else if category == 'Сладкое'}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sweet-mead"
              type="radio"
              value="Мид"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-sweet-mead" class="text-xl">Мид</label>
              <p class="text-l">напиток брожения на основе меда</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sweet-sourale"
              type="radio"
              value="Саур Эль"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-sweet-sourale" class="text-xl"
                >Саур Эль</label>
              <p class="text-l">кисло-сладкий эль</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sweet-gose"
              type="radio"
              value="Гозе"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-sweet-gose" class="text-xl"
                >Гозе</label>
              <p class="text-l">сладко-соленый эль</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sweet-cider"
              type="radio"
              value="Сидр"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-sweet-cider" class="text-xl"
                >Сидр</label>
              <p class="text-l">напиток брожения на основе яблок</p>
            </div>
          </div>
        {:else if category == 'Кислое'}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sour-lambic"
              type="radio"
              value="Гез / Ламбик"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-sour-lambic" class="text-xl"
                >Гез / Ламбик</label>
              <p class="text-l">дикий эль</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sour-sourale"
              type="radio"
              value="Саур Эль"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-sour-sourale" class="text-xl"
                >Саур Эль</label>
              <p class="text-l">кислый эль</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sour-gose"
              type="radio"
              value="Гозе"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-sour-gose" class="text-xl">Гозе</label>
              <p class="text-l">кисло-соленый эль</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sour-cider"
              type="radio"
              value="Сидр"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-sour-cider" class="text-xl"
                >Сидр</label>
              <p class="text-l">напиток брожения на основе яблок</p>
            </div>
          </div>
        {:else if category == 'Соленое'}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-salty-tomatoes"
              type="radio"
              value="Томатное"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-salty-tomatoes" class="text-xl"
                >Томатное</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-salty-shrooms"
              type="radio"
              value="Грибное"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-salty-shrooms" class="text-xl"
                >Грибное</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-salty-other"
              type="radio"
              value="Другое"
              bind:group={subcategory}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-salty-other" class="text-xl"
                >Другое</label>
            </div>
          </div>
        {/if}
      </div>
      <div class="flex flex-grow justify-center items-end mt-12">
        <Button
          class="bg-cyan-500 py-4 px-8 text-white text-xl rounded-lg mr-2"
          on:click={() => {
            flyBack()
            subcategory = null
            category_page = true
            subcategory_page = false
          }}>
          &#8592;
        </Button>
        {#if subcategory == null}
          <Button
            class="bg-fuchsia-500 py-4 px-16 text-white text-xl rounded-lg"
            disabled
            on:click={() => {
              subcategory_page = false
              style_page = true
            }}>
            Далее
          </Button>
        {:else}
          <Button
            class="bg-fuchsia-500 py-4 px-16 text-white text-xl rounded-lg"
            on:click={() => {
              flyForward()
              subcategory_page = false
              if (category == 'Соленое') {
                style = null
                beer = get_result_beer(
                  location,
                  category,
                  subcategory,
                  style
                ).then((data) => {
                  return data
                })
                result_page = true
              } else {
                style_page = true
              }
            }}>
            Далее
          </Button>
        {/if}
      </div>
    </div>
  {:else if style_page}
    <div in:fly={inFlyParams} out:fly={outFlyParams}>
      <div class="text-white text-5xl pt-2 px-2 pb-4">Выберите стиль</div>
      <div class="flex justify-center flex-col py-4 px-2">
        <div
          class="bg-cyan-500 ps-2 flex items-center border border-gray-700 rounded mb-2 w-full">
          <p class="text-white text-base mx-auto py-2">
            {location} &#8594; {category} &#8594; {subcategory}
          </p>
        </div>
        {#if subcategory == Subcategories.lager}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-lager-pale"
              type="radio"
              value="Светлый лагер"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-lager-pale" class="text-xl"
                >Светлый лагер</label>
              <p class="text-l">сладко-цветочное</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-lager-amber"
              type="radio"
              value="Янтарный лагер"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-lager-amber" class="text-xl"
                >Янтарный лагер</label>
              <p class="text-l">хлебно-сладковатое</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-lager-dark"
              type="radio"
              value="Темный лагер"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-lager-dark" class="text-xl"
                >Темный лагер</label>
              <p class="text-l">орехово-хлебное</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-lager-pilsner"
              type="radio"
              value="Пилснер"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-lager-pilsner" class="text-xl"
                >Пилснер</label>
              <p class="text-l">горько-цветочное</p>
            </div>
          </div>
        {:else if subcategory == Subcategories.wheat}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-wheat-wheatbeer"
              type="radio"
              value="Витбир"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-wheat-wheatbeer" class="text-xl"
                >Витбир</label>
              <p class="text-l">сладко-цитрусовое</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-wheat-saison"
              type="radio"
              value="Сейзон"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-wheat-saison" class="text-xl"
                >Сейзон</label>
              <p class="text-l">сухое и горькое</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-wheat-berliner"
              type="radio"
              value="Берлинер Вайссе"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-wheat-berliner" class="text-xl"
                >Берлинер Вайссе</label>
              <p class="text-l">молочно-кислое</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-wheat-weisse"
              type="radio"
              value="Вайсбир"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-wheat-weisse" class="text-xl"
                >Вайсбир</label>
              <p class="text-l">бананово-гвоздичное</p>
            </div>
          </div>
        {:else if subcategory == Subcategories.ipa}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-ipa-wc"
              type="radio"
              value="West Coast IPA"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-ipa-wc" class="text-xl"
                >West Coast IPA</label>
              <p class="text-l">сильно горькое и сухое</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-ipa-ne"
              type="radio"
              value="New England IPA"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-ipa-ne" class="text-xl"
                >New England IPA</label>
              <p class="text-l">сочное, ароматное и горькое</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-ipa-mountain"
              type="radio"
              value="Mountain IPA"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-ipa-mountain" class="text-xl"
                >Mountain IPA</label>
              <p class="text-l">среднее между West Coast и New England</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-ipa-cold"
              type="radio"
              value="Cold IPA"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-ipa-cold" class="text-xl"
                >Cold IPA</label>
              <p class="text-l">освежающее и горькое</p>
            </div>
          </div>
        {:else if subcategory == Subcategories.dark_ale}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-darkale-stout"
              type="radio"
              value="Стаут / Портер"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-darkale-stout" class="text-xl"
                >Стаут / Портер</label>
              <p class="text-l">жжено-кофейное</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-darkale-balticporter"
              type="radio"
              value="Baltic Портер"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-darkale-balticporter" class="text-xl"
                >Baltic Портер</label>
              <p class="text-l">орехово-карамельное</p>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-darkale-barleywine"
              type="radio"
              value="Барливайн"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-2 ms-3 text-white">
              <label for="bordered-radio-darkale-barleywine" class="text-xl"
                >Барливайн</label>
              <p class="text-l">карамельно-цветочное</p>
            </div>
          </div>
        {:else if subcategory == Subcategories.mead}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-mead-berries"
              type="radio"
              value="Ягодное"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-mead-berries" class="text-xl"
                >Ягодное</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-mead-fruits"
              type="radio"
              value="Фруктовое"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-mead-fruits" class="text-xl"
                >Фруктовое</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-mead-classic"
              type="radio"
              value="Без добавок"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-mead-classic" class="text-xl"
                >Без добавок</label>
            </div>
          </div>
        {:else if category == 'Сладкое' && subcategory == 'Саур Эль'}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sourale-berries"
              type="radio"
              value="Ягодное"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-sourale-berries" class="text-xl"
                >Ягодное</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sourale-fruits"
              type="radio"
              value="Фруктовое"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-sourale-fruits" class="text-xl"
                >Фруктовое</label>
            </div>
          </div>
        {:else if category == 'Сладкое' && subcategory == 'Гозе'}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-gose-berries"
              type="radio"
              value="Ягодное"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-gose-berries" class="text-xl"
                >Ягодное</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-gose-fruits"
              type="radio"
              value="Фруктовое"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-gose-fruits" class="text-xl"
                >Фруктовое</label>
            </div>
          </div>
        {:else if subcategory == 'Сидр'}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-cider-berries"
              type="radio"
              value="Ягодное"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-cider-berries" class="text-xl"
                >Ягодное</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-cider-fruits"
              type="radio"
              value="Фруктовое"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-cider-fruits" class="text-xl"
                >Фруктовое</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-cider-classic"
              type="radio"
              value="Без добавок"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-cider-classic" class="text-xl"
                >Без добавок</label>
            </div>
          </div>
        {:else if subcategory == 'Гез / Ламбик'}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-lambic-berries"
              type="radio"
              value="Ягодное"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-lambic-berries" class="text-xl"
                >Ягодное</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-lambic-classic"
              type="radio"
              value="Без добавок"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-lambic-classic" class="text-xl"
                >Без добавок</label>
            </div>
          </div>
        {:else if category == 'Кислое' && subcategory == 'Саур Эль'}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sourale-berries"
              type="radio"
              value="Ягодное"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-sourale-berries" class="text-xl"
                >Ягодное</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sourale-fruits"
              type="radio"
              value="Фруктовое"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-sourale-fruits" class="text-xl"
                >Фруктовое</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-sourale-classic"
              type="radio"
              value="Без добавок"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-sourale-classic" class="text-xl"
                >Без добавок</label>
            </div>
          </div>
        {:else if category == 'Кислое' && subcategory == 'Гозе'}
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-gose-berries"
              type="radio"
              value="Ягодное"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-gose-berries" class="text-xl"
                >Ягодное</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-gose-fruits"
              type="radio"
              value="Фруктовое"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-gose-fruits" class="text-xl"
                >Фруктовое</label>
            </div>
          </div>
          <div
            class="flex items-center ps-4 border border-gray-700 rounded mb-2 bg-fuchsia-500">
            <input
              id="bordered-radio-gose-classic"
              type="radio"
              value="Без добавок"
              bind:group={style}
              class="w-4 h-4 text-cyan-600 bg-gray-700 focus:ring-cyan-500 ring-offset-gray-800 focus:ring-2 border-gray-600" />
            <div class="flex flex-col w-full py-5 ms-3 text-white">
              <label for="bordered-radio-gose-classic" class="text-xl"
                >Без добавок</label>
            </div>
          </div>
        {/if}
      </div>
      <div class="flex flex-grow justify-center items-end mt-12">
        <Button
          class="bg-cyan-500 py-4 px-8 text-white text-xl rounded-lg mr-2"
          on:click={() => {
            flyBack()
            subcategory_page = true
            style_page = false
            style = null
          }}>
          &#8592;
        </Button>
        {#if style == null}
          <Button
            class="bg-fuchsia-500 py-4 px-16 text-white text-xl rounded-lg"
            disabled
            on:click={() => {
              style_page = false
              result_page = true
            }}>
            Далее
          </Button>
        {:else}
          <Button
            class="bg-fuchsia-500 py-4 px-16 text-white text-xl rounded-lg"
            on:click={() => {
              flyForward()
              style_page = false
              result_page = true
              beer = get_result_beer(
                location,
                category,
                subcategory,
                style
              ).then((data) => {
                return data
              })
            }}>
            Далее
          </Button>
        {/if}
      </div>
    </div>
  {:else if result_page}
    <div in:fly={inFlyParams} out:fly={outFlyParams}>
      <div class="text-white text-5xl pt-2 px-2 pb-4">Результат</div>
      <div class="flex justify-center flex-col pt-4 pb-2 px-2">
        <div
          class="bg-cyan-500 px-2 flex items-center border border-gray-700 rounded mb-2 w-full">
          <p class="text-white text-base mx-auto py-2">
            {#if category == 'Соленое'}
              {location} &#8594; {category} &#8594; {subcategory}
            {:else}
              {location} &#8594; {category} &#8594; {subcategory} &#8594; {style}
            {/if}
          </p>
        </div>
      </div>
      <div
        class="overflow-x-scroll flex flex-row [&::-webkit-scrollbar]:hidden">
        {#await beer}
          <div></div>
        {:then beer}
          {#each beer as beer}
            <div
              class="space-y-4 mx-2 bg-fuchsia-500 max-w-56 min-w-56 text-start p-0">
              <div>
                <img src={beer.img_url} class="pt-0" alt="" />
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
                <div class="m-2 px-2 bg-cyan-500 min-h-12">
                  <p class="pt-2 px-1 text-md font-normal text-white">
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
            flyBack()
            result_page = false
            if (category == 'Соленое') {
              subcategory_page = true
            } else {
              style_page = true
            }
          }}>
          &#8592;
        </Button>
      </div>
    </div>
  {/if}
</div>
