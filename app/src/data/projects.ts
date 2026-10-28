export type Metric = { label: string; value: string }

export type CaseStudy = {
  problem: string
  constraints: string[]
  approach: { title: string; body: string }[]
  result: string
  retrospective: string
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  summary: string
  discipline: string
  role: string
  year: number | null
  timeline: string | null
  stack: string[]
  metrics: Metric[]
  cover: string | null
  links: { live: string | null; repo: string | null }
  featured: boolean
  order: number
  caseStudy: CaseStudy
}

/**
 * Every number here comes from the project notes.
 * Where a fact is unknown, it is `null` and the UI omits it.
 */
export const projects: Project[] = [
  {
    slug: 'air-gapped-notes',
    title: 'Air-Gapped Notes',
    subtitle: 'A privacy-first local AI research and editing assistant',
    summary:
      'A fully offline retrieval-augmented assistant inside Obsidian: local embeddings, local inference, zero network traffic.',
    discipline: 'Local AI',
    role: 'Design and implementation',
    year: null,
    timeline: null,
    stack: ['Ollama', 'Obsidian', 'Smart Connections', 'nomic-embed-text', 'llama3.2'],
    metrics: [
      { label: 'Hardware', value: '8 GB RAM' },
      { label: 'Model', value: '2B params' },
      { label: 'Network calls', value: '0' },
    ],
    cover: null,
    links: { live: null, repo: null },
    featured: true,
    order: 1,
    caseStudy: {
      problem:
        'Cloud assistants are convenient, but using one for a personal knowledge base means every note you search — journals, credentials, unfinished ideas — leaves your machine. I wanted retrieval-augmented answers over my own notes without that trade.',
      constraints: [
        'Dell Latitude 3420: Intel i3, 8 GB RAM, no GPU.',
        'The OS and browser already consume 4–5 GB, leaving a narrow memory margin.',
        'Any claim of privacy had to be verifiable, not asserted.',
      ],
      approach: [
        {
          title: 'Split the system in two',
          body: 'Obsidian plugins act as the body — parsing Markdown and coordinating queries. Ollama acts as the brain, serving models over loopback at 127.0.0.1:11434. Nothing crosses a network boundary.',
        },
        {
          title: 'Embed locally',
          body: 'nomic-embed-text converts note chunks into vectors. Smart Connections caches them inside .obsidian, so the index never leaves the vault.',
        },
        {
          title: 'Retrieve before generating',
          body: 'A query runs a cosine-similarity search across the local vector cache to pull the most relevant passages. Retrieval is what makes the answer grounded in my notes rather than the model’s memory.',
        },
        {
          title: 'Generate on-device',
          body: 'llama3.2 — a 2B quantised model — synthesises the answer from those passages. Small enough to fit the memory budget without swapping.',
        },
        {
          title: 'Prove the air gap',
          body: 'The final test was physical: disconnect Wi-Fi and Ethernet, then query the vault. Inference kept working, which is the only evidence of privacy that actually counts.',
        },
      ],
      result:
        'Question-answering over the vault with zero network calls during retrieval or generation, confirmed by running with both network adapters disconnected.',
      retrospective:
        'Matching model size to hardware mattered more than raw capability: a 2B model that fits beats a 7B model that swaps. Next step is ingesting external logs and research files into the index automatically, instead of converting them to Markdown by hand.',
    },
  },
  {
    slug: 'autonomous-portfolio-agent',
    title: 'Autonomous Portfolio Management Agent',
    subtitle: 'A coding agent confined to a single repository',
    summary:
      'An agent that maintains this site from inside a scoped repository, with git snapshots as the safety net and hard token budgets as the constraint.',
    discipline: 'Tooling',
    role: 'Design and implementation',
    year: null,
    timeline: null,
    stack: ['OpenCode', 'Git', 'Cloud LLM APIs'],
    metrics: [
      { label: 'TPM ceiling', value: '8,000' },
      { label: 'Autonomous tool calls', value: '6' },
    ],
    cover: null,
    links: { live: null, repo: null },
    featured: true,
    order: 2,
    caseStudy: {
      problem:
        'Maintaining a portfolio site is mostly low-value friction: context switching, file shuffling, layout tweaks. Chat assistants do not remove that — they hand you code to paste. I wanted an agent that could operate on the repository directly.',
      constraints: [
        'Same constrained machine: Intel i3, 8 GB RAM.',
        'Free-tier cloud inference with hard tokens-per-minute ceilings.',
        'The agent must never see anything outside the repository.',
      ],
      approach: [
        {
          title: 'Scope by working directory',
          body: 'Launched from the repository root, the agent’s workspace is that directory. It has no visibility into personal documents, system configuration, or other projects. The boundary is structural, not a promise.',
        },
        {
          title: 'A ReAct loop, not a chat box',
          body: 'The agent reasons, acts, then observes the result before choosing its next move — mapping the codebase with Glob and Read, applying edits, and printing a diff for review. The useful shift is from receiving snippets to reviewing actions.',
        },
        {
          title: 'Snapshot before every write',
          body: 'Git is the undo mechanism. A layout change that goes sideways is one checkout away from recovery, which is what makes autonomous edits acceptable at all.',
        },
        {
          title: 'Route around the token wall',
          body: 'Large models blew the per-minute budget mid-task. The fix was routing — reasoning models for planning, high-throughput mid-sized models for generation — rather than retrying and burning quota.',
        },
      ],
      result:
        'Mapping an unfamiliar directory took six autonomous Glob/Read calls with no manual navigation. Routing deep context through the largest model hit 9,233 tokens against an 8,000 TPM cap, which forced the routing change rather than a retry loop.',
      retrospective:
        'Autonomy is only safe with guardrails: one scoped directory plus version control turns a risky agent into a reversible one. Next is an AGENTS.md in the repository root so styling conventions and component structure persist between sessions.',
    },
  },
  {
    slug: 'smartqueue-lte',
    title: 'SmartQueue LTE',
    subtitle: 'A low-latency network optimization gateway',
    summary:
      'Rebuilt a home network around SQM and bufferbloat control on an LTE link, then reverted it when the numbers did not justify the added complexity.',
    discipline: 'Networking',
    role: 'Design and implementation',
    year: null,
    timeline: null,
    stack: ['OpenWrt', 'SQM', 'CAKE', 'cake-autorate'],
    metrics: [],
    cover: null,
    links: { live: null, repo: null },
    featured: true,
    order: 3,
    caseStudy: {
      problem:
        'Our connection had the wrong problem. Throughput was fine; latency under load was not. Video calls stuttered and online games were unplayable whenever anything else was downloading.',
      constraints: [
        'No budget for new hardware, so the obvious purchase had to be justified or dropped.',
        'One spare router with unknown firmware and unknown capability.',
        'A single 12 V DC power output for two devices.',
      ],
      approach: [
        {
          title: 'Understand the link before buying',
          body: 'The ISP aggregates two bands, so a 5G/CAT 6+ router could combine them and offer dual-band Wi-Fi. That was a plausible purchase — but it was buying around a problem I had not diagnosed yet.',
        },
        {
          title: 'Flash the spare',
          body: 'Unlocked the second router and installed OpenWrt, which opened up SQM, per-packet queueing, and local monitoring that stock firmware hides.',
        },
        {
          title: 'Split gateway from access point',
          body: 'The LTE modem was bridged into Layer 2 passthrough and became the gateway; the OpenWrt box became the wireless access point. Structurally similar to Starlink’s bypass mode, where a dedicated modem feeds a separate router.',
        },
        {
          title: 'Attack bufferbloat with CAKE',
          body: 'SQM with the CAKE algorithm keeps the queue short by shaping traffic. A fixed bandwidth setting failed in both directions: set too low it throttled throughput, set too high bufferbloat returned.',
        },
        {
          title: 'Make the limit dynamic',
          body: 'cake-autorate adjusts the shaper from real-time link speed instead of a hard-coded number — which is what a variable cellular link actually requires.',
        },
        {
          title: 'Recover what the shaper cost',
          body: 'Resolving local subnets and trimming link-layer framing overhead clawed back some of the throughput the shaper gave up — the parts of the pipeline that had nothing to do with bufferbloat.',
        },
        {
          title: 'Power both from one cable',
          body: 'A 5 V supply stepped up to 12 V through a boost converter. It worked, and it was the least advisable part of the build.',
        },
      ],
      result:
        'Latency under load improved enough to make the setup usable day to day, but the OpenWrt gateway never matched the primary router on raw throughput. The hybrid ran for a while — heavy downloads on one network, low-latency browsing on the other — before being retired.',
      retrospective:
        'I reverted to the original single router. The honest result is that the experiment did not beat the baseline enough to justify the complexity. What it did buy was the ability to diagnose a link instead of buying around it — measure first, because hardware is the expensive way to learn.',
    },
  },
]

export const disciplines = ['All', ...Array.from(new Set(projects.map((p) => p.discipline)))]

export function getProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug)
}

export function nextProject(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug)
  return projects[(index + 1) % projects.length]
}
