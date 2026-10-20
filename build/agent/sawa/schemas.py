"""Request models. Everything from the browser is validated here."""
from __future__ import annotations

from typing import Annotated, Literal, Union

from pydantic import BaseModel, Field

Id = Annotated[str, Field(pattern=r"^[A-Za-z0-9_-]{1,40}$")]
Writer = Literal["wanjiru", "malik"]
Agent = Literal["harlem", "nairobi"]


class Exchange(BaseModel):
    type: Literal["exchange"]


class Reconcile(BaseModel):
    type: Literal["reconcile"]


class Contest(BaseModel):
    type: Literal["contest"]
    record: Id
    by: Writer
    reason: Annotated[str, Field(min_length=1, max_length=280)]


class WithdrawContest(BaseModel):
    type: Literal["withdraw-contest"]
    record: Id


class Sign(BaseModel):
    type: Literal["sign"]
    writer: Writer
    name: Annotated[str, Field(min_length=2, max_length=80)]
    at: Annotated[str, Field(max_length=40)]


class Pack(BaseModel):
    type: Literal["pack"]
    agent: Agent
    version: Literal["split-v1", "split-v0"]


Event = Annotated[
    Union[Exchange, Reconcile, Contest, WithdrawContest, Sign, Pack],
    Field(discriminator="type"),
]


class RunRequest(BaseModel):
    song_id: Id
    events: Annotated[list[Event], Field(max_length=60)] = []


class JevRequest(BaseModel):
    record: Id
