<script lang="ts" module>
	let mermaidInitialized = false;
	let mermaidModule: typeof import("mermaid").default | null = null;

	async function getMermaid() {
		if (!mermaidModule) {
			mermaidModule = (await import("mermaid")).default;
		}

		return mermaidModule;
	}
</script>

<script lang="ts">
	import { browser } from "$app/environment";

	type Props = {
		chart: string;
		title: string;
		description?: string;
		class?: string;
	};

	let { chart, title, description = "", class: className = "" }: Props = $props();

	let svg = $state("");
	let error = $state("");
	let host: HTMLDivElement | null = null;

	function getChartId() {
		if (!browser) return "mermaid-ssr";
		return `mermaid-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
	}

	async function renderChart(source: string) {
		if (!browser) return;

		error = "";

		const mermaid = await getMermaid();

		if (!mermaidInitialized) {
			mermaid.initialize({
				startOnLoad: false,
				securityLevel: "loose",
				theme: "base",
				themeVariables: {
					background: "#f8f7f4",
					primaryColor: "#e7d8b8",
					primaryTextColor: "#312b23",
					primaryBorderColor: "#8f7a52",
					lineColor: "#8f7a52",
					secondaryColor: "#dde7df",
					secondaryTextColor: "#1f3025",
					tertiaryColor: "#f5efe4",
					tertiaryTextColor: "#3d352c",
					mainBkg: "#f8f7f4",
					nodeBorder: "#8f7a52",
					clusterBkg: "#f0e7d5",
					clusterBorder: "#b69c66",
					fontFamily: "ui-sans-serif, system-ui, sans-serif"
				}
			});
			mermaidInitialized = true;
		}

		try {
			const { svg: nextSvg, bindFunctions } = await mermaid.render(getChartId(), source);
			svg = nextSvg;
			if (host) bindFunctions?.(host);
		} catch (caught) {
			svg = "";
			error = caught instanceof Error ? caught.message : "Failed to render Mermaid diagram.";
		}
	}

	$effect(() => {
		chart;
		void renderChart(chart);
	});
</script>

<div class={className}>
	<div class="rounded-[1.5rem] border border-border/60 bg-linear-to-br from-background via-background to-muted/40 p-4 shadow-sm">
		<div class="mb-4 flex items-start justify-between gap-3">
			<div>
				<h3 class="text-lg font-semibold tracking-tight">{title}</h3>
				{#if description}
					<p class="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
				{/if}
			</div>
			<div class="rounded-full border border-border/70 bg-background px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
				Live
			</div>
		</div>

		<div
			bind:this={host}
			data-mermaid-preview
			class="min-h-[18rem] overflow-x-auto rounded-[1.25rem] border border-border/60 bg-[radial-gradient(circle_at_top,_rgba(231,216,184,0.35),_transparent_48%),linear-gradient(180deg,_rgba(255,255,255,0.86),_rgba(248,247,244,0.94))] p-4"
		>
			{#if svg}
				{@html svg}
			{:else if error}
				<div class="flex min-h-[16rem] items-center justify-center rounded-[1rem] border border-dashed border-destructive/30 bg-destructive/5 px-4 text-center text-sm text-destructive">
					{error}
				</div>
			{:else}
				<div class="flex min-h-[16rem] items-center justify-center text-sm text-muted-foreground">
					Rendering diagram...
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	[data-mermaid-preview] :global(svg) {
		display: block;
		height: auto;
		margin: 0 auto;
		max-width: 100%;
	}
</style>
