"use client";

import React from "react";

type Item = { id: string; name: string };

export default function ShoppingListPage() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [input, setInput] = React.useState("");

  function addItem() {
    const name = input.trim();
    if (!name) return;
    setItems((prev) => [{ id: crypto.randomUUID(), name }, ...prev]);
    setInput("");
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function copyList() {
    const text = items.map((it) => `- ${it.name}`).join("\n");
    navigator.clipboard.writeText(text);
  }

  function printList() {
    window.print();
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Lista de Compras</h1>
        <p className="text-foreground/80">
          Adicione frutas e verduras, depois copie ou imprima sua lista.
        </p>
      </header>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Adicione um item (ex.: maçãs)"
          className="flex-1 rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40"
        />
        <button
          onClick={addItem}
          className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Adicionar
        </button>
      </div>

      <ul className="divide-y divide-foreground/10 border border-foreground/10 rounded-md">
        {items.length === 0 && (
          <li className="p-4 text-sm text-foreground/70">Nenhum item ainda.</li>
        )}
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between p-3">
            <span>{it.name}</span>
            <button
              onClick={() => removeItem(it.id)}
              className="text-sm text-foreground/70 hover:text-foreground"
              aria-label={`Remover ${it.name}`}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button
          onClick={copyList}
          className="rounded-md border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/10"
        >
          Copiar
        </button>
        <button
          onClick={printList}
          className="rounded-md border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/10"
        >
          Imprimir
        </button>
      </div>
    </section>
  );
}
