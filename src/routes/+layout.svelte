<script lang="ts">
  import '../app.css'
  import { env } from '$env/dynamic/public'
  import { goto } from '$app/navigation'
</script>

<header class="bg-cyan-500 h-16">
  <div class="h-full flex">
    <div class="flex w-full items-center justify-center">
      <button on:click={() => goto(`${env.PUBLIC_CLIENT_URL}`)}>
        <img class="w-12" src="logo.png" alt="" />
      </button>
    </div>
  </div>
</header>
<body class="flex flex-col bg-zinc-900 h-full overflow-y-scroll">
  <slot />
</body>
