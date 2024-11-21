<script>
	import Calendar from '$lib/components/calendar.svelte';
	import CreatePanels from '$lib/components/createPanels.svelte';
	import Pinned from '$lib/components/pinned.svelte';
	import Recent from '$lib/components/recent.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';
	import Todo from '$lib/components/todo.svelte';
	import Topbar from '$lib/components/topbar.svelte';
</script>

<div class="w-screen lg:h-screen">
	<div class="flex h-full w-full">
		<div class="hidden h-full w-1/12 border-r-2 lg:block">
			<Sidebar />
		</div>
		<div class="h-full w-full lg:flex lg:w-11/12">
			<div class="h-full flex-col lg:flex lg:w-2/3 lg:border-r-2">
				<div class="w-full border-b-2 p-2 lg:p-4">
					<Topbar />
				</div>

				<div class="w-full gap-4 border-b-2 lg:flex lg:grow lg:p-4">
					<div class="flex h-64 grow flex-col gap-4 border-b-2 p-2 lg:h-full lg:border-none lg:p-0">
						<h2>Recent</h2>
						<div class="grow overflow-y-scroll pr-4">
							{#each Array.from({ length: 5 }) as _}
								<Recent />
							{/each}
						</div>
					</div>
					<div class="flex h-64 flex-col gap-4 p-2 lg:h-full lg:w-96 lg:p-0">
						<h2>To do</h2>
						<Todo />
					</div>
				</div>

				<div class="flex h-64 w-full flex-col border-b-2 p-2 lg:h-2/6 lg:border-none lg:p-4">
					<h2>Pinned</h2>
					<div class="flex grow gap-4 overflow-x-scroll py-4">
						{#each Array.from({ length: 10 }) as _}
							<Pinned />
						{/each}
					</div>
				</div>
			</div>
			<div class="lg:h-full lg:w-1/3">
				<div class="flex h-64 w-full flex-col border-b-2 p-4 lg:h-2/3">
					<h2>Calendar</h2>
					<Calendar />
				</div>
				<div class="flex h-64 flex-col gap-4 p-4 lg:h-1/3">
					<h2>Create</h2>
					<div class="w-full grow">
						<CreatePanels />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
