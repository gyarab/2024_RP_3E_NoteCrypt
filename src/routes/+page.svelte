<div class="w-screen lg:h-screen">
	<div class="flex h-full w-full">
		<div class="hidden h-full w-1/12 border-r-2 lg:block"></div>
		<div class="h-full w-full lg:flex lg:w-11/12">
			<div class="h-full flex-col lg:flex lg:w-2/3 lg:border-r-2">
				<div class="w-full border-b-2 p-4">
					<div class="flex h-10 gap-4 lg:h-16">
						<div class="aspect-square h-full rounded-full border-2 border-black"></div>
						<div class="h-full grow rounded-full border-2 border-black"></div>
						<div class="aspect-square h-full rounded-full border-2 border-black"></div>
						<div class="aspect-square h-full rounded-full border-2 border-black"></div>
					</div>
				</div>
				<div class="flex h-64 w-full flex-col border-b-2 p-4 lg:h-2/6">
					<h2>Pinned</h2>
					<div class="flex grow gap-4 overflow-x-scroll py-4">
						{#each Array.from({ length: 10 }) as _}
							<div class="aspect-square h-full rounded-xl border-2 border-black bg-gray-200"></div>
						{/each}
					</div>
				</div>
				<div class="lg:flex w-full gap-4 border-b-2 p-4 lg:grow lg:border-none">
					<div class="flex lg:h-full h-64 grow flex-col gap-4">
						<h2>Recent</h2>
						<div class="grow overflow-y-scroll pr-4">
							{#each Array.from({ length: 10 }) as _}
								<div class="mb-4 h-1/2 w-full rounded-xl border-2 border-black bg-gray-200"></div>
							{/each}
						</div>
					</div>
					<div class="flex flex-col gap-4 lg:w-96 lg:h-full h-64">
            <h2>To do:</h2>
						<div class="h-full rounded-xl w-full border-2 border-black"></div>
					</div>
				</div>
			</div>
			<div class="lg:h-full lg:w-1/3">
				<div class="h-64 w-full border-b-2 lg:h-2/3"></div>
				<div class="h-64 w-full lg:h-1/3"></div>
			</div>
		</div>
	</div>
</div>
