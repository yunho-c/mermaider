<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";

	const stack = [
		{
			name: "Bun",
			description: "Fast install and task runner wired into the project scripts."
		},
		{
			name: "SvelteKit",
			description: "Minimal TypeScript app scaffolded with the current sv CLI."
		},
		{
			name: "shadcn-svelte",
			description: "Tailwind v4 design tokens, utils, and starter UI components ready to use."
		}
	];
</script>

<svelte:head>
	<title>Mermaider</title>
	<meta
		name="description"
		content="A Bun, SvelteKit, and shadcn-svelte starter scaffold."
	/>
</svelte:head>

<div class="bg-background min-h-screen">
	<div class="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16 lg:px-8">
		<section class="grid flex-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
			<div class="space-y-6">
				<Badge variant="outline" class="bg-background/80">
					Scaffolded with Bun + SvelteKit + shadcn-svelte
				</Badge>

				<div class="space-y-4">
					<h1 class="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
						Mermaider is ready for feature work.
					</h1>
					<p class="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
						This starter includes TypeScript, Tailwind CSS v4, and a working
						<code class="rounded bg-muted px-1.5 py-0.5 text-sm">shadcn-svelte</code>
						setup with example components already installed.
					</p>
				</div>

				<div class="flex flex-wrap gap-3">
					<Button href="https://www.shadcn-svelte.com/docs" target="_blank" rel="noreferrer">
						Open shadcn-svelte docs
					</Button>
					<Button
						variant="outline"
						href="https://svelte.dev/docs/kit"
						target="_blank"
						rel="noreferrer"
					>
						Open SvelteKit docs
					</Button>
				</div>
			</div>

			<Card class="border-border/60 bg-card/80 backdrop-blur">
				<CardHeader>
					<CardTitle>What is included</CardTitle>
					<CardDescription>
						A small starter surface so you can confirm the stack is wired correctly.
					</CardDescription>
				</CardHeader>
				<CardContent class="grid gap-4">
					{#each stack as item}
						<div class="rounded-lg border border-border/60 bg-background/70 p-4">
							<div class="text-sm font-medium">{item.name}</div>
							<p class="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
						</div>
					{/each}
				</CardContent>
				<CardFooter class="text-sm text-muted-foreground">
					Start with <code class="rounded bg-muted px-1.5 py-0.5">bun run dev</code>.
				</CardFooter>
			</Card>
		</section>
	</div>
</div>
