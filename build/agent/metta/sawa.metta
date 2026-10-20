;; ================================================================
;; Sawa reasoning layer.
;;
;; Two Omega agents each replay their own memory into their own atom
;; space, then run this file over it. Every truth value is produced by
;; Omega's own lib_nal.metta (|-nal), loaded unmodified.
;;
;; Atoms the host stages from an agent's memory:
;;   (active-pack <pack>)
;;   (dispute-began <unix-time>)
;;   (ev <id> <kind> <author> <time> <element> <role> <writer> <pos|neg>)
;;   (received <writer> <element> <time>)   ; writer received another's artefact
;;   (withdrawn <id>)                       ; contested and withdrawn premise
;; Atoms the host stages after revision (ephemeral):
;;   (stmt <role> <element> <writer> (stv f c))
;; ================================================================

;; ----------------------------------------------------------------
;; Small helpers
;; ----------------------------------------------------------------

(= (exists $results) (if (== $results ()) False True))

(= (rule-tv $rid)
   (match &self (active-pack $p)
     (match &self (rule $p $rid $tv) $tv)))

;; ----------------------------------------------------------------
;; Defeater conditions
;; ----------------------------------------------------------------

;; D1 condition: $by received another writer's artefact for $el before $t.
(= (received-before $by $el $t)
   (exists (collapse
     (match &self (received $by $el $tr)
       (if (< $tr $t) yes (empty))))))

;; A contemporaneous record for $el: any non-recollection evidence made
;; before the dispute began. Indexed once per replay as (has-record $el).
(= (index-records)
   (match &self (dispute-began $td)
     (match &self (ev $id $k $a $t $el $r $w $p)
       (if (and (< $t $td) (not (== $k recollection)))
           (add-atom &self (has-record $el))
           (empty)))))

(= (contemporaneous-record $el)
   (exists (collapse (match &self (has-record $el) yes))))

;; D2 condition: a recollection written after the dispute began, about an
;; element that has a contemporaneous record.
(= (after-dispute-with-record $t $el)
   (match &self (dispute-began $td)
     (if (>= $t $td) (contemporaneous-record $el) False)))

;; Only packs that carry the D2 rule apply it (split-v0 does not).
(= (pack-has $rid)
   (exists (collapse (match &self (active-pack $p) (match &self (rule $p $rid $tv) yes)))))

;; ----------------------------------------------------------------
;; Rule selection: which reliability rule (or defeater) applies to a
;; piece of evidence, and which statement it supports.
;; Returns (<rule-id> <role>).
;; ----------------------------------------------------------------

(= (select artefact $by $t $el $role)
   (if (and (== $role originated) (received-before $by $el $t))
       (received-before-created developed)
       (artefact $role)))

(= (select recollection $by $t $el $role)
   (if (and (pack-has recollection-after-dispute) (after-dispute-with-record $t $el))
       (recollection-after-dispute $role)
       (recollection $role)))

(= (select co-edit $by $t $el $role) (co-edit $role))
(= (select other-party-statement $by $t $el $role) (other-party-statement $role))

;; ----------------------------------------------------------------
;; Derivation: each piece of evidence becomes a truth-valued statement
;; through one NAL deduction:
;;   (observed id) (stv 1.0 0.9)          the event is on record (hash)
;;   (==> (observed id) (role el writer))  the selected rule's reliability
;;   |-  (role el writer) (stv f c)
;; Counter-claims (neg) are negated with Omega's Truth_Negation.
;; ----------------------------------------------------------------

(= (polarise pos $tv) $tv)
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
                   (empty))))))))

(= (derive-all)
   (let $_ (collapse (index-records))
     (match &self (ev $id $kind $by $t $el $role $w $pol) (derive $id))))

;; ----------------------------------------------------------------
;; Revision: merge two pieces of evidence about the same statement.
;; (The host folds a statement's evidence through this, step by step,
;; so every intermediate truth value is in the proof.)
;; ----------------------------------------------------------------

(= (revise $s $tv1 $tv2)
   (let ($s2 $tv) (|-nal ($s $tv1) ($s $tv2))
     (if (== $s2 $s) $tv (empty))))

;; ----------------------------------------------------------------
;; Bands: Omega's documented action thresholds.
;; ----------------------------------------------------------------

(= (band (stv $f $c))
   (if (and (>= $f 0.6) (>= $c 0.5))
       settled
       (if (and (>= $f 0.3) (>= $c 0.2)) needs-confirmation unsupported)))

(= (settled? $role $el $w)
   (exists (collapse
     (match &self (stmt $role $el $w $tv)
       (if (== (band $tv) settled) yes (empty))))))

;; ----------------------------------------------------------------
;; Resolution and shares, from the writers' agreed policy atoms.
;; An element needs at least one settled originator. A developer is a
;; writer with a settled "developed" statement who is not an originator.
;; ----------------------------------------------------------------

(= (writers) (collapse (match &self (writer $w $city) $w)))

(= (originators $el)
   (collapse (match &self (writer $w $city)
     (if (settled? originated $el $w) $w (empty)))))

(= (developers $el)
   (collapse (match &self (writer $w $city)
     (if (and (settled? developed $el $w) (not (settled? originated $el $w))) $w (empty)))))

(= (policy $name)
   (match &self (active-pack $p) (match &self (policy $p $name $v) $v)))

(= (weight $el)
   (match &self (active-pack $p) (match &self (weight $p $el $v) $v)))

;; Share (percent of the element) for writer $w.
(= (element-share $el $w $os $ds)
   (let* (($no (size-atom $os))
          ($nd (size-atom $ds)))
     (if (== $no 0)
         blocked
         (if (is-member $w $os)
             (if (== $nd 0)
                 (/ 100.0 $no)
                 (/ (policy origination) $no))
             (if (is-member $w $ds)
                 (/ (policy development) $nd)
                 0.0)))))

(= (is-member $x $list)
   (if (== $list ()) False
       (if (== (car-atom $list) $x) True (is-member $x (cdr-atom $list)))))

;; Resolve one element: (resolved el weight (originators) (developers) ((w share) ...))
(= (resolve $el)
   (let* (($os (originators $el))
          ($ds (developers $el))
          ($ws (writers))
          ($shares (collapse (let $w (superpose $ws) ($w (element-share $el $w $os $ds))))))
     (resolved $el (weight $el) $os $ds $shares)))

(= (resolve-all)
   (match &self (element $el $right) (resolve $el)))

(= (clear-stmts)
   (collapse (match &self (stmt $r $e $w $tv) (remove-atom &self (stmt $r $e $w $tv)))))
