#!/usr/bin/env python3
"""Replace long Bash tool output with a compact useful summary."""

from __future__ import annotations

import json
import re
import sys
from typing import Any


SHORT_LINE_LIMIT = 120
SHORT_CHAR_LIMIT = 12_000
MAX_LINES = 180
MAX_CHARS = 20_000

ANSI_RE = re.compile(r"\x1b\[[0-9;?]*[ -/]*[@-~]")
IMPORTANT_RE = re.compile(
    r"("
    r"\berror\b|\berrors\b|\bfail(?:ed|ure|ures|ing)?\b|\bfatal\b|"
    r"\bexception\b|\btraceback\b|\bpanic\b|\babort(?:ed)?\b|"
    r"\bwarn(?:ing)?\b|\bdeprecated\b|\bvulnerabilit(?:y|ies)\b|"
    r"\bpassed\b|\bsuccess(?:ful|fully)?\b|\bdone\b|\bcomplete(?:d)?\b|"
    r"\bsummary\b|\btests?\b|\btest suites?\b|\bsnapshots?\b|"
    r"\bcoverage\b|\bcompiled\b|\bbuilt\b|\bduration\b|"
    r"\badded\b|\bremoved\b|\bchanged\b|\bupdated\b|\baudited\b|"
    r"^\s*(?:PASS|FAIL|ERROR|WARN)"
    r")",
    re.IGNORECASE,
)
PROGRESS_RE = re.compile(
    r"("
    r"\r|(?:^|\s)\d{1,3}(?:\.\d+)?%|"
    r"[#=]{8,}|[▏▎▍▌▋▊▉█]{3,}|"
    r"\b(?:downloading|extracting|fetching|resolving|linking|building)\b.*(?:\d+/\d+|%)"
    r")",
    re.IGNORECASE,
)


def strip_ansi(value: str) -> str:
    return ANSI_RE.sub("", value)


def stringify_response(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    if isinstance(value, list):
        return "\n".join(stringify_response(item) for item in value)
    if isinstance(value, dict):
        pieces = []
        for key in ("output", "stdout", "stderr", "text", "message", "result"):
            if key in value:
                pieces.append(stringify_response(value[key]))
        if pieces:
            return "\n".join(piece for piece in pieces if piece)
        return json.dumps(value, ensure_ascii=False, indent=2)
    return str(value)


def extract_exit_code(value: Any) -> int | None:
    if not isinstance(value, dict):
        return None
    for key in ("exit_code", "exitCode", "status", "returncode", "return_code", "code"):
        maybe = value.get(key)
        if isinstance(maybe, int):
            return maybe
    return None


def clean_lines(output: str) -> list[str]:
    normalized = output.replace("\r", "\n")
    return [strip_ansi(line).rstrip() for line in normalized.splitlines()]


def is_progress_only(raw_line: str) -> bool:
    cleaned = strip_ansi(raw_line).strip()
    if not cleaned:
        return True
    if IMPORTANT_RE.search(cleaned):
        return False
    return bool(PROGRESS_RE.search(raw_line))


def should_replace(output: str, lines: list[str]) -> bool:
    if len(lines) > SHORT_LINE_LIMIT or len(output) > SHORT_CHAR_LIMIT:
        return True
    return any(line.strip() and is_progress_only(line) for line in output.splitlines())


def nearby_important_indexes(lines: list[str]) -> set[int]:
    indexes: set[int] = set()
    for index, line in enumerate(lines):
        if IMPORTANT_RE.search(line):
            indexes.update(range(max(0, index - 2), min(len(lines), index + 3)))
    return indexes


def selected_indexes(lines: list[str], exit_code: int | None) -> list[int]:
    tail_count = 100 if exit_code not in (None, 0) else 45
    indexes = nearby_important_indexes(lines)
    indexes.update(range(max(0, len(lines) - tail_count), len(lines)))
    if exit_code not in (None, 0):
        indexes.update(range(min(30, len(lines))))
    if not indexes:
        indexes.update(range(min(10, len(lines))))
    return sorted(index for index in indexes if 0 <= index < len(lines))[:MAX_LINES]


def summarize(command: str, exit_code: int | None, output: str) -> str:
    lines = clean_lines(output)
    raw_lines = output.replace("\r", "\n").splitlines()
    noise_count = sum(1 for line in raw_lines if is_progress_only(line))

    selected: list[str] = []
    previous = -2
    for index in selected_indexes(lines, exit_code):
        raw_line = raw_lines[index] if index < len(raw_lines) else lines[index]
        if is_progress_only(raw_line):
            continue
        if previous != -2 and index > previous + 1:
            selected.append(f"... omitted {index - previous - 1} line(s) ...")
        selected.append(lines[index])
        previous = index

    body = "\n".join(selected).strip() or "(no non-progress output)"
    if len(body) > MAX_CHARS:
        body = body[:MAX_CHARS].rstrip() + "\n... output truncated by quiet_output_filter ..."

    exit_part = "unknown" if exit_code is None else str(exit_code)
    return "\n".join(
        [
            "[quiet-output-filter]",
            f"command: {command}",
            f"exit code: {exit_part}",
            f"original output: {len(lines)} line(s), {len(output)} char(s)",
            f"progress/noise lines removed: {noise_count}",
            "",
            body,
        ]
    )


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0

    if payload.get("hook_event_name") != "PostToolUse":
        return 0

    tool_input = payload.get("tool_input") or {}
    command = tool_input.get("command")
    if not isinstance(command, str):
        command = "(unknown command)"

    tool_response = payload.get("tool_response")
    output = stringify_response(tool_response)
    lines = clean_lines(output)
    if not should_replace(output, lines):
        return 0

    summary = summarize(command, extract_exit_code(tool_response), output)
    print(json.dumps({"continue": False, "stopReason": summary}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
