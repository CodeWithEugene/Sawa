"""Minimal s-expression parser for MeTTa results."""
from __future__ import annotations

from typing import Union

Atom = Union[str, float, list["Atom"]]


def _tokens(text: str) -> list[str]:
    return text.replace("(", " ( ").replace(")", " ) ").split()


def _atom(tok: str) -> Atom:
    try:
        return float(tok)
    except ValueError:
        return tok


def parse(text: str) -> Atom:
    tokens = _tokens(text)
    pos = 0

    def read() -> Atom:
        nonlocal pos
        tok = tokens[pos]
        pos += 1
        if tok == "(":
            items: list[Atom] = []
            while tokens[pos] != ")":
                items.append(read())
            pos += 1
            return items
        return _atom(tok)

    return read()


def stv(node: Atom) -> tuple[float, float]:
    """``(stv f c)`` to a tuple."""
    if not (isinstance(node, list) and len(node) == 3 and node[0] == "stv"):
        raise ValueError(f"not an stv: {node}")
    return float(node[1]), float(node[2])
