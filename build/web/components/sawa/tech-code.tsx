import { cn } from "@/lib/utils"

/**
 * Dark code blocks for the technology page. Snippets are copied verbatim
 * from build/agent/metta/sawa.metta, build/agent/metta/packs/split-v1.metta
 * and build/agent/sawa/reconcile.py. Keep them in sync when those change.
 */

function Line({ text }: { text: string }) {
  const i = text.indexOf(";")
  if (i === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <span className="text-white/40">{text.slice(i)}</span>
    </>
  )
}

export function CodeBlock({ file, code, className }: { file: string; code: string; className?: string }) {
  const lines = code.replace(/\n$/, "").split("\n")
  return (
    <figure className={cn("overflow-hidden rounded-2xl bg-[#0b0b0d] text-white ring-1 ring-white/10", className)}>
      <figcaption className="flex items-center gap-2 border-b border-white/10 px-5 py-3 font-mono text-xs text-white/50">
        <span className="size-2 rounded-full bg-nairobi" aria-hidden />
        {file}
      </figcaption>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[0.8rem] leading-relaxed text-white/90">
        <code>
          {lines.map((l, n) => (
            <span key={n} className="block">
              <Line text={l} />
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}

export const SNIPPETS = {
  derive: `(= (polarise pos $tv) $tv)
(= (polarise neg $tv) (Truth_Negation $tv))

(= (derive $id)
   (match &self (ev $id $kind $by $t $el $role $w $pol)
     (if (exists (collapse (match &self (withdrawn $id) yes)))
         (empty)
         (let ($rid $role2) (select $kind $by $t $el $role)
           (let $rtv (rule-tv $rid)
             (let ($c $tv) (|-nal ((observed $id) (stv 1.0 0.9))
                                  ((==> (observed $id) ($role2 $el $w)) $rtv))
               (if (== $c ($role2 $el $w))
                   (derived $id $kind ($role2 $el $w) $pol $rid $rtv (polarise $pol $tv))
                   (empty))))))))`,

  d1: `;; D1 condition: $by received another writer's artefact for $el before $t.
(= (received-before $by $el $t)
   (exists (collapse
     (match &self (received $by $el $tr)
       (if (< $tr $t) yes (empty))))))

(= (select artefact $by $t $el $role)
   (if (and (== $role originated) (generated-before $el $t))
       (generated-before-edited developed)
       (if (and (== $role originated) (received-before $by $el $t))
           (received-before-created developed)
           (artefact $role))))`,

  d2: `;; D2 condition: a recollection written after the dispute began, about an
;; element that has a contemporaneous record.
(= (after-dispute-with-record $t $el)
   (match &self (dispute-began $td)
     (if (>= $t $td) (contemporaneous-record $el) False)))

(= (select recollection $by $t $el $role)
   (if (and (pack-has recollection-after-dispute) (after-dispute-with-record $t $el))
       (recollection-after-dispute $role)
       (recollection $role)))`,

  d3: `;; D3 condition: an AI generator produced a version of $el before $t.
(= (generated-before $el $t)
   (exists (collapse
     (match &self (ev $id ai-generation $a $tg $el $r $w $p)
       (if (< $tg $t) yes (empty))))))

;; An AI generator's export: evidence that the part was generated, never
;; that a person wrote it.
(= (select ai-generation $by $t $el $role) (ai-generation generated))`,

  revise: `(= (revise $s $tv1 $tv2)
   (let ($s2 $tv) (|-nal ($s $tv1) ($s $tv2))
     (if (== $s2 $s) $tv (empty))))`,

  band: `(= (band (stv $f $c))
   (if (and (>= $f 0.6) (>= $c 0.5))
       settled
       (if (and (>= $f 0.3) (>= $c 0.2)) needs-confirmation unsupported)))`,

  pack: `;; reliability rules: (rule <pack> <id> <stv>)
(rule split-v1 artefact (stv 1.0 0.9))                    ; hashed, timestamped file
(rule split-v1 co-edit (stv 1.0 0.83))                    ; shared document edit history
(rule split-v1 other-party-statement (stv 1.0 0.78))      ; the other writer, against own interest
(rule split-v1 recollection (stv 1.0 0.5))                ; own account, own favour

;; defeaters
(rule split-v1 received-before-created (stv 1.0 0.9))     ; D1: made after receiving the other's version: development
(rule split-v1 ai-generation (stv 1.0 0.9))                 ; AI generator export: the part was generated
(rule split-v1 generated-before-edited (stv 1.0 0.9))        ; D3: edited after an AI generated it: development
(rule split-v1 recollection-after-dispute (stv 1.0 0.3))  ; D2: recollection after the dispute began

;; split policy (agreed in "Jua", 2025)
(policy split-v1 origination 75.0)
(policy split-v1 development 25.0)`,

  hash: `def proof_hash(body: dict) -> str:
    canonical = json.dumps(body, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    return hashlib.sha256(canonical.encode()).hexdigest()`,

  atoms: `;; Atoms the host stages from an agent's memory:
;;   (active-pack <pack>)
;;   (dispute-began <unix-time>)
;;   (ev <id> <kind> <author> <time> <element> <role> <writer> <pos|neg>)
;;   (received <writer> <element> <time>)   ; writer received another's artefact
;;   (withdrawn <id>)                       ; contested and withdrawn premise`,
} as const
