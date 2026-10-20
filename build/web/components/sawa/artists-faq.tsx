"use client"

import Link from "next/link"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type Faq = { q: string; a: React.ReactNode }

const FAQS: Faq[] = [
  {
    q: "Is This Legal Advice?",
    a: (
      <p>
        No. Sawa helps two writers reach and record an agreement about who wrote what. It is not legal advice and it is not
        arbitration. If you have a question about a contract or a dispute, speak to a music lawyer.
      </p>
    ),
  },
  {
    q: "What If We Were Three Writers?",
    a: (
      <p>
        Today Sawa settles songs between two writers, one agent each. Sessions with more writers are the next item on our{" "}
        <Link href="/about#roadmap">roadmap</Link>.
      </p>
    ),
  },
  {
    q: "What About My Collecting Society?",
    a: (
      <p>
        You still register your song with your own society. Sawa gives you a signed record that names every rights holder and
        keeps the composition and the master apart, so every writer can register the same shares. In Kenya, check the Kenya
        Copyright Board&apos;s current list of licensed societies before you register. More on this for{" "}
        <Link href="/platforms#societies">collecting societies</Link>.
      </p>
    ),
  },
  {
    q: "Does It Work Offline?",
    a: (
      <p>
        Not yet. The prototype runs in your browser and needs a connection to reach the two agents. Agents that run on your own
        device are on our <Link href="/about#roadmap">roadmap</Link>.
      </p>
    ),
  },
  {
    q: "What Does It Cost?",
    a: (
      <p>
        Sawa is a prototype and the demo is free. Our plan is for Sawa to stay free for writers, with licensing platforms paying
        to connect to it. This is a concept, not a published price.
      </p>
    ),
  },
  {
    q: "Is My Data Used To Train AI?",
    a: (
      <p>
        No. Nothing you bring to Sawa is used to train any AI model. Read more in{" "}
        <Link href="/trust">Trust And Safety</Link>.
      </p>
    ),
  },
]

export function ArtistsFaq() {
  return (
    <Accordion className="max-w-4xl border-t border-white/15">
      {FAQS.map(({ q, a }) => (
        <AccordionItem key={q} value={q} className="border-b border-white/15">
          <AccordionTrigger className="py-6 text-[1.2rem] font-medium tracking-[-0.02em] text-white hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-white/60">
            {q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-[1.05rem] leading-relaxed text-white/70 [&_a]:text-white [&_a]:hover:text-nairobi">
            {a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
