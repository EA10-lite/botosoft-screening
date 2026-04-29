import { useTodoStore } from "../../store/todoStore"
import { useEffect, useMemo, useState } from "react";
import { TodoItem, TodoForm, EmptyTodo, TodoFilter } from "./components";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const FILTERS = ["all", "active", "completed"]

const Todo = () => {
    const [activeFilter, setActiveFilter] = useState<string>("all")
    const { addTodo, todos, deleteTodo, toggleTodo, fetchTodos, isLoading, clearCompleted, reorderTodos } = useTodoStore();
    const [task, setTask] = useState<string>('')

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addTodo(task)
        setTask('')
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = todos.findIndex((t) => t.id === active.id);
            const newIndex = todos.findIndex((t) => t.id === over.id);
            reorderTodos(oldIndex, newIndex);
        }
    }

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            if (activeFilter === "all") return true
            if (activeFilter === "active") return !todo.completed
            if (activeFilter === "completed") return todo.completed
        })
    }, [todos, activeFilter])

    const completedCount = useMemo(() => todos.filter(t => t.completed).length, [todos]);

    return (
        <div className="min-h-screen bg-[#f3f4f6]">
            <header>
                <div className="bg-black py-6">
                    <div className='max-w-[1280px] mx-auto px-4'>
                        <h4 className="text-white text-lg font-[500]">Welcome to Todo App</h4>
                    </div>
                </div>
                <div className="bg-[#2a2c33] py-6">
                    <div className='max-w-[1280px] mx-auto px-4'>
                        <TodoForm
                            task={task}
                            setTask={setTask}
                            handleSubmit={handleSubmit}
                        />

                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                {FILTERS.map((filter) => (
                                    <TodoFilter
                                        key={filter}
                                        filter={filter}
                                        activeFilter={activeFilter}
                                        setActiveFilter={setActiveFilter}
                                    />
                                ))}
                            </div>
                            {completedCount > 0 && (
                                <button
                                    onClick={clearCompleted}
                                    className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    Clear completed ({completedCount})
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-[1280px] mx-auto px-4 py-8 space-y-4">
                {isLoading && todos.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">Loading todos...</div>
                ) : filteredTodos?.length <= 0 ? (
                    <EmptyTodo activeFilter={activeFilter} />
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <SortableContext
                                items={filteredTodos.map(t => t.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {filteredTodos.map((todo) => (
                                    <TodoItem
                                        key={todo.id}
                                        id={todo.id}
                                        todo={todo.text}
                                        handleDelete={() => deleteTodo(todo.id)}
                                        handleToggle={() => toggleTodo(todo.id)}
                                        isCompleted={todo.completed}
                                    />
                                ))}
                            </SortableContext>
                        </div>
                    </DndContext>
                )}
            </div>
        </div>
    )
}

export default Todo