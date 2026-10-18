import Head from 'next/head';
import { useState } from 'react';

const columnsConfig = [
  { key: 'todo', title: 'Plan to do' },
  { key: 'inProgress', title: 'In Progress' },
  { key: 'completed', title: 'Completed' },
];

const emptyColumns = {
  todo: [],
  inProgress: [],
  completed: [],
};

export default function TodoBoard() {
  const [columns, setColumns] = useState(emptyColumns);
  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const addItem = (columnKey) => {
    const newPoint = {
      id: `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: 'New Point',
      editable: false,
    };

    setColumns((current) => ({
      ...current,
      [columnKey]: [...current[columnKey], newPoint],
    }));
  };

  const updateItem = (columnKey, id, updates) => {
    setColumns((current) => ({
      ...current,
      [columnKey]: current[columnKey].map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const deleteItem = (columnKey, id) => {
    setColumns((current) => ({
      ...current,
      [columnKey]: current[columnKey].filter((item) => item.id !== id),
    }));
  };

  const moveItem = (sourceColumn, targetColumn, id) => {
    if (sourceColumn === targetColumn) return;

    setColumns((current) => {
      const sourceItems = [...current[sourceColumn]];
      const targetItems = [...current[targetColumn]];
      const itemIndex = sourceItems.findIndex((item) => item.id === id);

      if (itemIndex === -1) return current;

      const [movingItem] = sourceItems.splice(itemIndex, 1);
      targetItems.push({ ...movingItem, editable: false });

      return {
        ...current,
        [sourceColumn]: sourceItems,
        [targetColumn]: targetItems,
      };
    });
  };

  const handleDrop = (targetColumn) => {
    if (!draggedCard) return;
    moveItem(draggedCard.sourceColumn, targetColumn, draggedCard.id);
    setDraggedCard(null);
    setDragOverColumn(null);
  };

  return (
    <>
      <Head>
        <title>To-Do List</title>
      </Head>

      <main className="w-full">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-[-0.04em] text-white">To-do List</h1>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/65">
            Active
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {columnsConfig.map(({ key, title }) => (
            <TodoColumn
              key={key}
              columnKey={key}
              title={title}
              items={columns[key]}
              onAdd={addItem}
              onDelete={deleteItem}
              onUpdate={updateItem}
              onDrop={handleDrop}
              onDragStart={(item) => setDraggedCard({ id: item.id, sourceColumn: key })}
              onDragEnd={() => {
                setDraggedCard(null);
                setDragOverColumn(null);
              }}
              dragOverColumn={dragOverColumn}
              setDragOverColumn={setDragOverColumn}
            />
          ))}
        </div>
      </main>
    </>
  );
}

function TodoColumn({
  columnKey,
  title,
  items,
  onAdd,
  onDelete,
  onUpdate,
  onDrop,
  onDragStart,
  onDragEnd,
  dragOverColumn,
  setDragOverColumn,
}) {
  const isActive = dragOverColumn === columnKey;

  return (
    <div
      className={`min-h-[280px] rounded-[20px] border p-4 transition-all duration-200 ease-out ${
        isActive ? 'border-red-400/60 bg-red-500/10 shadow-[0_0_0_1px_rgba(255,80,90,0.24)]' : 'border-white/10 bg-black/20'
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragOverColumn(columnKey);
      }}
      onDragLeave={() => {
        setDragOverColumn((current) => (current === columnKey ? null : current));
      }}
      onDrop={(event) => {
        event.preventDefault();
        onDrop(columnKey);
      }}
    >
      <h2 className="mb-4 text-base font-medium text-white/80">{title}</h2>

      {items.length === 0 ? (
        <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 text-center text-sm text-white/40 transition-all duration-200">
          Drop card here
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <TodoCard
              key={item.id}
              item={item}
              columnKey={columnKey}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => onAdd(columnKey)}
        className="mt-4 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300/40 hover:text-white"
      >
        + Add item
      </button>
    </div>
  );
}

function TodoCard({ item, columnKey, onDelete, onUpdate, onDragStart, onDragEnd }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = 'move';
        setIsDragging(true);
        onDragStart(item);
      }}
      onDragEnd={() => {
        setIsDragging(false);
        onDragEnd();
      }}
      className={`group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left transition-all duration-200 ease-out ${
        isDragging
          ? 'scale-[0.98] rotate-[0.8deg] border-red-300/80 bg-[#1a1b20]/95 shadow-[0_16px_32px_rgba(255,80,90,0.2)] opacity-100'
          : 'hover:-translate-y-0.5 hover:border-red-300/30 hover:bg-white/[0.05]'
      }`}
    >
      {item.editable ? (
        <input
          className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-white/30"
          defaultValue={item.title}
          autoFocus
          onBlur={(event) => {
            const nextValue = event.currentTarget.value.trim() || 'New Point';
            onUpdate(columnKey, item.id, { title: nextValue, editable: false });
          }}
        />
      ) : (
        <span className="flex-1 text-sm text-white/75">{item.title}</span>
      )}

      <button
        type="button"
        className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 transition hover:border-white/20 hover:text-white"
        onClick={() => {
          onUpdate(columnKey, item.id, { editable: true });
        }}
      >
        Edit
      </button>

      <button
        type="button"
        className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 transition hover:border-white/20 hover:text-white"
        onClick={() => {
          onDelete(columnKey, item.id);
        }}
      >
        Del
      </button>
    </div>
  );
}
