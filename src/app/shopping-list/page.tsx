"use client";

import React, { useEffect, useState } from "react";

type Item = { id: string; name: string };

type ShoppingList = {
  id: string;
  name: string;
  items: Item[];
  createdAt: Date;
};

export default function ShoppingListPage() {
  const [lists, setLists] = useState<ShoppingList[]>(() => {
    // Initialize with a default list on first visit
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("shopping-lists")
    ) {
      return [
        {
          id: crypto.randomUUID(),
          name: "Lista Principal",
          items: [],
          createdAt: new Date(),
        },
      ];
    }
    return [];
  });

  const [selectedListId, setSelectedListId] = useState<string>("");
  const [input, setInput] = useState("");
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newListName, setNewListName] = useState("");

  // Load lists from localStorage on mount
  useEffect(() => {
    const savedLists = localStorage.getItem("shopping-lists");
    if (savedLists) {
      const parsedLists = JSON.parse(savedLists).map(
        (list: Omit<ShoppingList, "createdAt"> & { createdAt: string }) => ({
          ...list,
          createdAt: new Date(list.createdAt),
        })
      );
      setLists(parsedLists);
      if (parsedLists.length > 0 && !selectedListId) {
        setSelectedListId(parsedLists[0].id);
      }
    }
  }, [selectedListId]);

  // Save lists to localStorage during rendering
  const [prevLists, setPrevLists] = useState(lists);
  if (lists !== prevLists) {
    setPrevLists(lists);
    if (lists.length > 0) {
      localStorage.setItem("shopping-lists", JSON.stringify(lists));
    }
  }

  const selectedList = lists.find((list) => list.id === selectedListId);

  function createNewList() {
    const name = newListName.trim() || "Nova Lista";
    const newList: ShoppingList = {
      id: crypto.randomUUID(),
      name,
      items: [],
      createdAt: new Date(),
    };
    setLists((prev) => [...prev, newList]);
    setSelectedListId(newList.id);
    setNewListName("");
    setShowNewListForm(false);
  }

  function deleteList(listId: string) {
    if (lists.length === 1) return; // Don't delete the last list
    setLists((prev) => prev.filter((list) => list.id !== listId));
    if (selectedListId === listId) {
      const remainingLists = lists.filter((list) => list.id !== listId);
      setSelectedListId(remainingLists[0]?.id || "");
    }
  }

  function startEditingList(listId: string) {
    const list = lists.find((l) => l.id === listId);
    if (list) {
      setEditingListId(listId);
      setEditingName(list.name);
    }
  }

  function saveListName() {
    if (editingListId && editingName.trim()) {
      setLists((prev) =>
        prev.map((list) =>
          list.id === editingListId
            ? { ...list, name: editingName.trim() }
            : list
        )
      );
    }
    setEditingListId(null);
    setEditingName("");
  }

  function addItem() {
    const name = input.trim();
    if (!name || !selectedList) return;

    setLists((prev) =>
      prev.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: [{ id: crypto.randomUUID(), name }, ...list.items],
            }
          : list
      )
    );
    setInput("");
  }

  function removeItem(itemId: string) {
    if (!selectedList) return;

    setLists((prev) =>
      prev.map((list) =>
        list.id === selectedListId
          ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
          : list
      )
    );
  }

  function copyList() {
    if (!selectedList) return;
    const text = selectedList.items.map((item) => `- ${item.name}`).join("\n");
    navigator.clipboard.writeText(text);
  }

  function printList() {
    window.print();
  }

  if (lists.length === 0) {
    return (
      <section className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Lista de Compras
          </h1>
          <p className="text-foreground/80">
            Crie sua primeira lista de compras.
          </p>
        </header>
        <button
          onClick={() => setShowNewListForm(true)}
          className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Criar Primeira Lista
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Lista de Compras</h1>
        <p className="text-foreground/80">
          Gerencie suas listas de compras e adicione frutas e verduras.
        </p>
      </header>

      {/* Lists Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Suas Listas</h2>
          <button
            onClick={() => setShowNewListForm(true)}
            className="rounded-md bg-foreground text-background px-3 py-1 text-sm font-medium hover:opacity-90"
          >
            Nova Lista
          </button>
        </div>

        {/* Lists Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-foreground/10">
          {lists.map((list) => (
            <div key={list.id} className="flex items-center gap-2">
              <button
                onClick={() => setSelectedListId(list.id)}
                className={`px-3 py-2 rounded-t-md text-sm font-medium transition-colors ${
                  selectedListId === list.id
                    ? "bg-foreground text-background"
                    : "text-foreground/80 hover:text-foreground hover:bg-foreground/10"
                }`}
              >
                {list.name}
              </button>
              <button
                onClick={() => startEditingList(list.id)}
                className="text-xs text-foreground/60 hover:text-foreground"
                aria-label={`Editar ${list.name}`}
              >
                ✏️
              </button>
              {lists.length > 1 && (
                <button
                  onClick={() => deleteList(list.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                  aria-label={`Deletar ${list.name}`}
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* New List Form */}
      {showNewListForm && (
        <div className="rounded-lg border border-foreground/10 p-4 bg-foreground/5">
          <div className="flex gap-2">
            <input
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createNewList()}
              placeholder="Nome da nova lista"
              className="flex-1 rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40"
              autoFocus
            />
            <button
              onClick={createNewList}
              className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Criar
            </button>
            <button
              onClick={() => {
                setShowNewListForm(false);
                setNewListName("");
              }}
              className="rounded-md border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/10"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Edit List Name Form */}
      {editingListId && (
        <div className="rounded-lg border border-foreground/10 p-4 bg-foreground/5">
          <div className="flex gap-2">
            <input
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveListName()}
              className="flex-1 rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40"
              autoFocus
            />
            <button
              onClick={saveListName}
              className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Salvar
            </button>
            <button
              onClick={() => {
                setEditingListId(null);
                setEditingName("");
              }}
              className="rounded-md border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/10"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Selected List Content */}
      {selectedList && (
        <div className="space-y-4">
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
            {selectedList.items.length === 0 && (
              <li className="p-4 text-sm text-foreground/70">
                Nenhum item nesta lista.
              </li>
            )}
            {selectedList.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-3"
              >
                <span>{item.name}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-foreground/70 hover:text-foreground"
                  aria-label={`Remover ${item.name}`}
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
        </div>
      )}
    </section>
  );
}
