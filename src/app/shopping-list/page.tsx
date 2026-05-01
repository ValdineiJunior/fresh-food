"use client";

import React, { useEffect, useState } from "react";
import { getAllSeasonalItems } from "@/data/seasonal";

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
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);

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

  // Load seasonal items for tags
  useEffect(() => {
    const seasonalItems = getAllSeasonalItems();
    const allItems = [
      ...seasonalItems.fruits,
      ...seasonalItems.legumes,
      ...seasonalItems.greensAndHerbs,
    ];
    setAvailableTags(allItems);
    setFilteredTags(allItems);
  }, []);

  // Filter tags based on input with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (input.trim() === "") {
        // Show first 10 available tags when input is empty
        setFilteredTags(availableTags);
      } else {
        // Show filtered tags when user is typing, limited to 10
        const filtered = availableTags.filter((tag) =>
          tag.toLowerCase().startsWith(input.toLowerCase().trim())
        );
        setFilteredTags(filtered);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [input, availableTags]);

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

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      addItem();
    }
  }

  function removeItem(itemId: string) {
    if (!selectedList) return;

    // Find the item being removed to check if it's a tag
    const itemToRemove = selectedList.items.find((item) => item.id === itemId);

    setLists((prev) =>
      prev.map((list) =>
        list.id === selectedListId
          ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
          : list
      )
    );

    // If the removed item was one of the seasonal items, add it back to available tags
    if (itemToRemove) {
      const seasonalItems = getAllSeasonalItems();
      const allSeasonalItems = [
        ...seasonalItems.fruits,
        ...seasonalItems.legumes,
        ...seasonalItems.greensAndHerbs,
      ];

      if (allSeasonalItems.includes(itemToRemove.name)) {
        setAvailableTags((prev) => {
          // Only add if not already present
          if (!prev.includes(itemToRemove.name)) {
            return [...prev, itemToRemove.name];
          }
          return prev;
        });
        // Also update filtered tags if the input matches
        if (
          input.trim() === "" ||
          itemToRemove.name.toLowerCase().startsWith(input.toLowerCase().trim())
        ) {
          setFilteredTags((prev) => {
            // Only add if not already present
            if (!prev.includes(itemToRemove.name)) {
              return [...prev, itemToRemove.name];
            }
            return prev;
          });
        }
      }
    }
  }

  function addItemFromTag(tag: string) {
    if (!selectedList) return;

    // Add the tag as an item to the selected list
    setLists((prev) =>
      prev.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: [{ id: crypto.randomUUID(), name: tag }, ...list.items],
            }
          : list
      )
    );

    // Remove the tag from available tags
    setAvailableTags((prev) => prev.filter((t) => t !== tag));
    // Also remove from filtered tags
    setFilteredTags((prev) => prev.filter((t) => t !== tag));

    // Clear input
    setInput("");
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
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Lista de compras
          </h1>
          <p className="text-muted">
            Crie sua primeira lista de compras.
          </p>
        </header>
        <button
          type="button"
          onClick={() => setShowNewListForm(true)}
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
        >
          Criar primeira lista
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          Lista de compras
        </h1>
        <p className="text-muted">
          Gerencie suas listas e adicione frutas, legumes e verduras — com
          sugestões da safra.
        </p>
      </header>

      {/* Lists Management */}
      <div className="space-y-4 no-print">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Suas listas</h2>
          <button
            type="button"
            onClick={() => setShowNewListForm(true)}
            className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
          >
            Nova lista
          </button>
        </div>

        {/* Lists Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border">
          {lists.map((list) => (
            <div key={list.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedListId(list.id)}
                className={`rounded-t-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  selectedListId === list.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:bg-primary-muted hover:text-foreground"
                }`}
              >
                {list.name}
              </button>
              <button
                type="button"
                onClick={() => startEditingList(list.id)}
                className="text-xs text-muted hover:text-foreground"
                aria-label={`Editar ${list.name}`}
              >
                ✏️
              </button>
              {lists.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteList(list.id)}
                  className="text-xs text-red-600 hover:text-red-800"
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
        <div className="no-print rounded-xl border border-border bg-surface-muted p-4">
          <div className="flex flex-wrap gap-2">
            <input
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createNewList()}
              placeholder="Nome da nova lista"
              className="min-w-[12rem] flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
              autoFocus
            />
            <button
              type="button"
              onClick={createNewList}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Criar
            </button>
            <button
              type="button"
              onClick={() => {
                setShowNewListForm(false);
                setNewListName("");
              }}
              className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-muted"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Edit List Name Form */}
      {editingListId && (
        <div className="no-print rounded-xl border border-border bg-surface-muted p-4">
          <div className="flex flex-wrap gap-2">
            <input
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveListName()}
              className="min-w-[12rem] flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
              autoFocus
            />
            <button
              type="button"
              onClick={saveListName}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingListId(null);
                setEditingName("");
              }}
              className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-muted"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Selected List Content */}
      {selectedList && (
        <div className="space-y-4">
          {/* Input Field */}
          <div className="no-print flex flex-wrap gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite um item ou escolha das sugestões abaixo..."
              className="min-w-[12rem] flex-1 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
            />
            <button
              type="button"
              onClick={addItem}
              className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Adicionar
            </button>
          </div>

          {/* Quick Add Tags */}
          <div className="no-print space-y-3">
            <h4 className="text-sm font-semibold text-muted">
              {input.trim() ? "Sugestões" : "Adicionar rapidamente"}
            </h4>

            {/* Tags Display */}
            <div className="flex flex-wrap gap-2">
              {filteredTags
                .slice()
                .sort()
                .map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => addItemFromTag(tag)}
                    className="rounded-full border border-primary/20 bg-primary-muted px-3 py-1 text-xs font-medium text-primary transition hover:border-primary/35 hover:bg-primary/10"
                  >
                    {tag}
                  </button>
                ))}
            </div>

            {filteredTags.length === 0 && input.trim() && (
              <p className="py-2 text-center text-sm text-muted">
                Nenhum item encontrado para &quot;{input}&quot;
              </p>
            )}
          </div>

          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface shadow-sm print:shadow-none">
            {selectedList.items.length === 0 && (
              <li className="p-4 text-sm text-muted">
                Nenhum item nesta lista.
              </li>
            )}
            {selectedList.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 print:py-2"
              >
                <span className="text-foreground">{item.name}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="no-print text-sm font-medium text-muted hover:text-foreground"
                  aria-label={`Remover ${item.name}`}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className="no-print flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyList}
              className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-muted"
            >
              Copiar
            </button>
            <button
              type="button"
              onClick={printList}
              className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-muted"
            >
              Imprimir
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
