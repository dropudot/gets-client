<script lang="ts">
  import '../app.css'
</script>

<header class="bg-cyan-500 h-16">
  <div class="h-full flex">
    <div class="flex w-full items-center justify-center">
      <div class="text-white">logo</div>
    </div>
    <div class="absolute right-0 align-middle h-16 text-white">menu</div>
  </div>
</header>
<body class="flex flex-col bg-zinc-950 h-screen overflow-y-hidden">
  <slot />
</body>
