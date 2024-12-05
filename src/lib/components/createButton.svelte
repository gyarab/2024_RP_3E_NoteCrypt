<script>
	import Button from './button.svelte';
</script>

<Button
  colorScheme="secondary"
  preset="fill"
  disableDefaults={true}
  additionalStyle="rounded-full fixed p-4 bottom-8 right-8 flex items-center justify-center transition-colors"
>
  <span class="material-symbols-outlined">edit</span>
</Button>
