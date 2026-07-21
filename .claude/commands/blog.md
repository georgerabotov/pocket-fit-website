---
description: Research, write, illustrate and publish a Pocket Fit blog post via the blog-writer agent
---

Use the `blog-writer` subagent (Agent tool, `subagent_type: blog-writer`) to research, write, illustrate and publish a new Pocket Fit blog post that matches the house style.

Topic / focus keyphrase / brief: $ARGUMENTS

Follow the full playbook in `.claude/agents/blog-writer.md`:
- research 2-5 real primary sources (verify DOIs),
- write in the established voice (contrarian, evidence-first, honest about limits, no long dashes, British spelling),
- generate + optimise a hero image via MCP,
- insert at the top of the `blog` array in `lib/pocketContent.json`,
- build and verify (TOC, references, 0 long dashes, internal links resolve).

Then stop and show me the draft for review. Do NOT push unless I explicitly say to publish.
