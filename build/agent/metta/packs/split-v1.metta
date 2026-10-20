;; ================================================================
;; Rule pack split-v1
;;
;; Reliability rules (how much one piece of evidence of each kind
;; supports its statement) follow Omega's grounding guidance
;; (docs/tutorial-08): primary sources about 0.9, secondary 0.7,
;; tertiary 0.4. Defeaters replace the reliability rule when their
;; condition holds (see sawa.metta).
;;
;; Policy and weights are the writers' own agreement ("jua-2025"),
;; remembered by both agents. They are data, not Sawa's opinion.
;; ================================================================

;; reliability rules: (rule <pack> <id> <stv>)
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
(policy split-v1 development 25.0)
