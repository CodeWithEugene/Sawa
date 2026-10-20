"""Hyperon host for one Omega agent.

Adapted from our earlier Mizani project (credited in the README): one
``hyperon.MeTTa()`` atom space per agent, Omega's ``lib_nal.metta`` loaded
unmodified, results filtered because hyperon returns non-matching rule
applications unreduced (they contain ``$`` variables).
"""
from __future__ import annotations

import hashlib
import os
import threading
from functools import lru_cache
from pathlib import Path

# hyperon writes its module catalog under $HOME; serverless filesystems are
# read-only except /tmp.
if not os.access(os.path.expanduser("~"), os.W_OK):
    os.environ["HOME"] = "/tmp"

from hyperon import MeTTa  # noqa: E402

AGENT_DIR = Path(__file__).resolve().parent.parent
METTA_DIR = AGENT_DIR / "metta"
LIB_NAL = AGENT_DIR / "vendor" / "omega" / "lib_nal.metta"
OMEGA_RELEASE = "v0.1.20"
HYPERON_VERSION = "0.2.10"
PACKS = ("split-v1", "split-v0")


@lru_cache(maxsize=None)
def _source(path: Path) -> str:
    return path.read_text()


@lru_cache(maxsize=1)
def lib_nal_sha() -> str:
    return hashlib.sha256(_source(LIB_NAL).encode()).hexdigest()


class Engine:
    """One agent's atom space."""

    def __init__(self, pack: str = "split-v1") -> None:
        if pack not in PACKS:
            raise ValueError(f"unknown pack {pack}")
        self.pack = pack
        self.m = MeTTa()
        self.lock = threading.Lock()
        for path in (
            METTA_DIR / "shims.metta",
            LIB_NAL,  # Omega's NAL, unmodified
            METTA_DIR / "sawa.metta",
            METTA_DIR / "packs" / f"{pack}.metta",
        ):
            self.m.run(_source(path))
        self.add(f"(active-pack {pack})")

    def add(self, atoms: str) -> None:
        with self.lock:
            self.m.run(atoms)

    def run(self, code: str) -> list[str]:
        with self.lock:
            results = self.m.run(code)
        out: list[str] = []
        for r in results:
            items = r if isinstance(r, (list, tuple)) else [r]
            out.extend(str(x) for x in items if "$" not in str(x))
        return out
