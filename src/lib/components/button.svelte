<script lang="ts">
	import { type Snippet } from 'svelte';

	let {
		additionalStyle = '',
		click = () => {},
		type = 'submit',
		preset = 'fill',
		colorScheme = 'primary',
		href = null,
		disableDefaults = false,
		children
	}: {
		additionalStyle?: string;
		click?: Function;
		type?: 'submit' | 'button' | 'reset' | null | undefined;
		preset?: 'skeleton' | 'fill' | 'borderless';
		colorScheme?: 'primary' | 'secondary' | 'accent' | 'background' | 'text' | 'text800';
		href?: string | null;
		disableDefaults?: boolean;
		children: Snippet;
	} = $props();

	const colorSchemes = {
		primary: {
			c1: 'primary',
			c2: 'background',
			c3: 'primary-100'
		},
		secondary: {
			c1: 'secondary',
			c2: 'background',
			c3: 'secondary-100'
		},
		accent: {
			c1: 'accent',
			c2: 'background',
			c3: 'accent-100'
		},
		background: {
			c1: 'background',
			c2: 'primary',
			c3: 'primary-600'
		},
		text: {
			c1: 'text',
			c2: 'background',
			c3: 'primary-100'
		},
		text800: {
			c1: 'text-800',
			c2: 'background',
			c3: 'primary-100'
		}
	};

	let presets = {
		skeleton:
			'border-2 border-' +
			colorSchemes[colorScheme].c1 +
			' text-' +
			colorSchemes[colorScheme].c1 +
			' hover:bg-' +
			colorSchemes[colorScheme].c3,
		fill:
			'border-2 border-' +
			colorSchemes[colorScheme].c1 +
			' bg-' +
			colorSchemes[colorScheme].c1 +
			' text-' +
			colorSchemes[colorScheme].c2 +
			' hover:bg-' +
			colorSchemes[colorScheme].c3 +
			' hover:text-' +
			colorSchemes[colorScheme].c1,
		borderless: 'text-' + colorSchemes[colorScheme].c1 + ' hover:bg-' + colorSchemes[colorScheme].c3
	};
</script>

{#if href}
	<a {href}>
		<button
			{type}
			onclick={() => click()}
			class="{disableDefaults
				? ''
				: 'flex items-center justify-center gap-2 rounded-lg p-2 transition-colors'} {presets[
				preset
			]} {additionalStyle}"
		>
			{@render children?.()}
		</button>
	</a>
{:else}
	<button
		{type}
		onclick={() => click()}
		class="{disableDefaults
			? ''
			: 'flex items-center justify-center gap-2 rounded-lg p-2 transition-colors'} {presets[
			preset
		]} {additionalStyle}"
	>
		{@render children?.()}
	</button>
{/if}

<!-- DONT DELETE THESE DIVs - it makes tailwind include required classes -->
<div class="hidden border-accent bg-accent text-accent hover:bg-accent hover:text-accent"></div>
<div
	class="hidden border-secondary bg-secondary text-secondary hover:bg-secondary hover:text-secondary"
></div>
<div
	class="hidden border-primary bg-primary text-primary hover:bg-primary hover:text-primary"
></div>
<div
	class="hidden border-background bg-background text-background hover:bg-background hover:text-background"
></div>
<div
	class="hidden border-text-800 bg-text-800 text-text-800 hover:bg-text-800 hover:text-text-800"
></div>
<div class="hidden border-text text-text"></div>
<div class="hidden hover:bg-primary-100"></div>
<div class="hidden hover:bg-secondary-100"></div>
<div class="hidden hover:bg-accent-100"></div>
<div class="hidden hover:bg-primary-600"></div>
