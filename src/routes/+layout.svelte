<script lang="ts">
  import '../app.css'
  import { goto } from '$app/navigation'

  import { CLIENT_URL } from '$lib/data'
</script>

<header class="bg-cyan-500 h-16">
  <div class="h-full flex">
    <div class="flex w-full items-center justify-center">
      <button on:click={() => goto(`${CLIENT_URL}`)}>
        <img class="w-12" src="logo.png" alt="" />
      </button>
    </div>
  </div>
</header>
<body class="flex flex-col bg-zinc-900 h-full overflow-y-scroll">
  <slot />
</body>
