import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { Script, runInNewContext } from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("inline scripts parse", () => {
  for (const [, source] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Script(source);
});

test("contact form opens the documented number with all visitor fields", () => {
  const source = html.split("\n").find((line) => line.startsWith('$("#fm").addEventListener("submit"'));
  const expected = html.match(/https:\/\/wa\.me\/(\d{13})/)[1];
  const fields = { "#fn": "Ana & Bia", "#fs": "Consulta", "#fms": "Detalhe do pedido", "#fd": "2026-09-10" };
  let destination;
  let prevented = false;
  runInNewContext(source, {
    $: (selector) => selector === "#fm"
      ? { addEventListener: (_event, submit) => submit({ preventDefault: () => { prevented = true; } }) }
      : { value: fields[selector] },
    window: { open: (url) => { destination = new URL(url); } },
  });
  assert.ok(prevented);
  assert.equal(destination.pathname, "/" + expected);
  const message = destination.searchParams.get("text");
  assert.ok(message.includes(fields["#fn"]));
  assert.ok(message.includes(fields["#fs"]));
  assert.ok(message.includes(fields[source.includes('$("#fms")') ? "#fms" : "#fd"]));
});
