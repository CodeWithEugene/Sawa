;; ================================================================
;; Rule pack split-v0 (older)
;;
;; Kept to show what happens when the two agents run different rule
;; versions: v0 has no recollection-after-dispute defeater, so the
;; agents' proofs differ and Sawa refuses to offer signing.
;; ================================================================

(rule split-v0 artefact (stv 1.0 0.9))
(rule split-v0 co-edit (stv 1.0 0.83))
(rule split-v0 other-party-statement (stv 1.0 0.78))
(rule split-v0 recollection (stv 1.0 0.5))
(rule split-v0 received-before-created (stv 1.0 0.9))

(policy split-v0 origination 75.0)
(policy split-v0 development 25.0)
