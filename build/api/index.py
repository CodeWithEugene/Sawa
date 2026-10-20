"""Vercel entry: both Sawa agents in one Python function.

Each agent still gets its own MeTTa atom space per request (see
sawa/session.py); hosting them in one function is a deployment choice.
"""
import os
import sys
from pathlib import Path

os.environ.setdefault("HOME", "/tmp")  # hyperon writes its module catalog under $HOME
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "agent"))

from sawa.app import app  # noqa: E402,F401
