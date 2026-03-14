<script lang="ts">
	import { ArrowRight, Boxes, CalendarRange, Database, GitBranch, MessagesSquare } from "@lucide/svelte";
	import MermaidPreview from "$lib/components/mermaid-preview.svelte";
	import { diagramCategories } from "$lib/mermaid-gallery";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from "$lib/components/ui/card";
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";

	const [defaultCategory] = diagramCategories;
	const totalDiagrams = diagramCategories.reduce((count, category) => count + category.diagrams.length, 0);

	const categoryIcons: Record<string, typeof GitBranch> = {
		flowcharts: GitBranch,
		sequence: MessagesSquare,
		state: Boxes,
		data: Database,
		planning: CalendarRange
	} as const;
</script>

<svelte:head>
	<title>Gallery | Mermaider</title>
	<meta
		name="description"
		content="A shadcn-styled gallery of Mermaid diagram types rendered live in SvelteKit."
	/>
</svelte:head>

<div class="bg-background min-h-screen overflow-hidden">
	<section class="relative isolate border-b border-border/60">
		<div class="pointer-events-none absolute inset-0 -z-10">
			<div class="absolute left-0 top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(231,216,184,0.34),_transparent_62%)] blur-2xl"></div>
			<div class="absolute right-[-6rem] top-16 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(201,218,207,0.30),_transparent_62%)] blur-2xl"></div>
			<div class="absolute inset-0 bg-[linear-gradient(rgba(143,122,82,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(143,122,82,0.08)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.15))]"></div>
		</div>

		<div class="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8">
			<div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
				<div class="space-y-6">
					<Badge variant="outline" class="bg-background/80 backdrop-blur">
						Mermaid Gallery in shadcn-svelte
					</Badge>

					<div class="space-y-4">
						<h1 class="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
							A curated wall of Mermaid diagram types, rendered live and styled like a proper product.
						</h1>
						<p class="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
							Browse flowcharts, sequences, states, data models, and planning views in a single
							gallery. Each example is organized by type and shown with both the rendered diagram
							and the source that created it.
						</p>
					</div>

					<div class="flex flex-wrap gap-3">
						<Button href="#gallery-tabs">
							Browse diagrams
							<ArrowRight />
						</Button>
						<Button variant="outline" href="/">
							Back home
						</Button>
					</div>
				</div>

				<Card class="border-border/60 bg-background/80 backdrop-blur">
					<CardHeader>
						<CardTitle>Collection Snapshot</CardTitle>
						<CardDescription>
							The gallery is organized by diagram intent instead of dumping every syntax into one list.
						</CardDescription>
					</CardHeader>
					<CardContent class="grid gap-4 sm:grid-cols-3">
						<div class="rounded-2xl border border-border/60 bg-muted/30 p-4">
							<div class="text-3xl font-semibold">{diagramCategories.length}</div>
							<p class="mt-1 text-sm text-muted-foreground">diagram families</p>
						</div>
						<div class="rounded-2xl border border-border/60 bg-muted/30 p-4">
							<div class="text-3xl font-semibold">{totalDiagrams}</div>
							<p class="mt-1 text-sm text-muted-foreground">rendered examples</p>
						</div>
						<div class="rounded-2xl border border-border/60 bg-muted/30 p-4">
							<div class="text-3xl font-semibold">Live</div>
							<p class="mt-1 text-sm text-muted-foreground">Mermaid output, not images</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>

	<section id="gallery-tabs" class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
		<Tabs value={defaultCategory.id} class="gap-8">
			<TabsList class="h-auto flex-wrap justify-start gap-1 rounded-2xl border border-border/60 bg-muted/70 p-1">
				{#each diagramCategories as category}
					{@const Icon = categoryIcons[category.id]}
					<TabsTrigger value={category.id} class="min-w-[9rem] flex-none px-4 py-2">
						<Icon />
						{category.label}
					</TabsTrigger>
				{/each}
			</TabsList>

			{#each diagramCategories as category}
				<TabsContent value={category.id} class="space-y-6">
					<Card class="border-border/60 bg-card/70">
						<CardHeader class="gap-3 sm:flex-row sm:items-end sm:justify-between">
							<div class="space-y-2">
								<Badge variant="outline" class="w-fit bg-background/80">
									{category.label}
								</Badge>
								<div>
									<CardTitle class="text-2xl">{category.label}</CardTitle>
									<CardDescription class="mt-2 max-w-2xl text-sm leading-6">
										{category.description}
									</CardDescription>
								</div>
							</div>
							<div class="rounded-full border border-border/60 bg-background px-4 py-2 text-sm text-muted-foreground">
								{category.diagrams.length} examples
							</div>
						</CardHeader>
					</Card>

					<div class="grid gap-6 xl:grid-cols-2">
						{#each category.diagrams as diagram}
							<Card class="overflow-hidden border-border/60 bg-card/80 shadow-sm">
								<CardContent class="space-y-5 p-5">
									<MermaidPreview
										chart={diagram.code}
										title={diagram.title}
										description={diagram.description}
									/>

									<div class="overflow-hidden rounded-[1.5rem] border border-border/60 bg-zinc-950 text-zinc-50">
										<div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
											<div>
												<p class="text-sm font-medium">{diagram.title}</p>
												<p class="text-xs text-zinc-400">{category.label} source</p>
											</div>
											<Badge class="border-white/10 bg-white/10 text-zinc-100 hover:bg-white/10">
												{diagram.id}
											</Badge>
										</div>
										<pre class="overflow-x-auto px-4 py-4 text-xs leading-6"><code>{diagram.code}</code></pre>
									</div>
								</CardContent>
							</Card>
						{/each}
					</div>
				</TabsContent>
			{/each}
		</Tabs>
	</section>
</div>
