<script>
	import Button from '$lib/components/button.svelte';
	import Calendar from '$lib/components/calendar.svelte';
	import CreatePanels from '$lib/components/createPanels.svelte';
	import Pinned from '$lib/components/pinned.svelte';
	import Recent from '$lib/components/recent.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';
	import Todo from '$lib/components/todo.svelte';
	import Topbar from '$lib/components/topbar.svelte';
</script>

<div class="text-text w-screen transition-colors lg:h-screen">
	<nav class="mt-4 flex items-center justify-evenly p-4 lg:hidden">
		<Button icon="add" click={() => {}} />
		<Button icon="done_all" click={() => {}} />
		<Button icon="calendar_month" click={() => {}} />
		<Button icon="keep" click={() => {}} />
	</nav>
	<div class="h-full w-full lg:flex">
		<div class="hidden h-full w-1/12 lg:block">
			<Sidebar />
		</div>
		<div class="h-full w-full lg:flex lg:w-11/12">
			<div class=" h-full flex-col lg:flex lg:w-2/3">
				<div class="w-full p-4">
					<Topbar />
				</div>

				<div
					class="text-primary my-16 flex items-center justify-center gap-2 text-center text-2xl font-bold lg:hidden"
				>
					<h1>NoteCrypt</h1>
					<span class="material-symbols-outlined text-3xl">lock</span>
				</div>

				<div class="w-full gap-4 lg:flex lg:grow lg:p-4">
					<div class="mb-4 flex h-64 grow flex-col p-4 lg:mb-0 lg:h-full lg:p-0">
						<h2 class="mb-1 text-lg font-bold lg:text-sm">Recently opened</h2>
						<div
							class="border-background-100 grow overflow-y-scroll rounded-xl border-2 pl-2 pr-2 pt-2 lg:pl-4 lg:pt-4"
						>
							{#each Array.from({ length: 5 }) as _}
								<Recent />
							{/each}
						</div>
					</div>
					<div class="mb-8 flex h-64 flex-col p-4 lg:mb-0 lg:h-full lg:w-1/3 lg:p-0">
						<h2 class="mb-1 text-lg font-bold lg:text-sm">To do</h2>
						<Todo />
					</div>
				</div>

				<div class="mb-8 flex h-64 w-full flex-col p-2 lg:mb-0 lg:h-2/6 lg:p-4">
					<h2 class="mb-1 text-lg font-bold lg:text-sm">Pinned</h2>
					<div
						class="border-background-100 flex grow gap-2 overflow-x-scroll rounded-xl border-2 p-2 pb-2 lg:gap-4 lg:p-4 lg:pb-1"
					>
						{#each Array.from({ length: 3 }) as _}
							<Pinned />
						{/each}
					</div>
				</div>
			</div>
			<div class="lg:h-full lg:w-1/3">
				<div class="mb-8 flex h-64 w-full flex-col gap-2 p-2 lg:mb-0 lg:h-2/3 lg:p-4">
					<h2 class="text-accent mb-2 text-sm font-bold">Calendar</h2>
					<Calendar />
				</div>
				<div class="mb-4 flex h-64 flex-col gap-2 p-2 lg:mb-0 lg:h-1/3 lg:p-4">
					<h2 class="text-primary text-sm font-bold">Create</h2>
					<div class="w-full grow">
						<CreatePanels />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
