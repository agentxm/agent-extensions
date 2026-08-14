# Synthetic authority conflict

Catalog revision `c18` says versions 2.1.0 are active. The deployment inventory
says some cohorts use 2.0.4, but its snapshot lacks a capture time and source
identity. The policy registry references an unavailable cohort mapping. No
source is declared authoritative when these records conflict.

