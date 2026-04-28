import { useTodoStore } from "../../store/todoStore"
import { useMemo, useState } from "react";
import { TodoItem, TodoForm, EmptyTodo, TodoFilter } from "./components";

const FILTERS = ["all", "active", "completed"]

const Todo = () => {
    const [activeFilter, setActiveFilter] = useState<string>("all")
    const { addTodo, todos, deleteTodo, toggleTodo } = useTodoStore();
    const [task, setTask] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        addTodo(task)
        setTask('')
    }

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            if (activeFilter === "all") return true
            if (activeFilter === "active") return !todo.completed
            if (activeFilter === "completed") return todo.completed
        })
    }, [todos, activeFilter])

    return (
        <div className="min-h-screen">
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
                    </div>
                </div>
            </header>

            <div className="max-w-[1280px] mx-auto px-4 py-8 space-y-4">
                {filteredTodos?.length <= 0 ? (
                    <EmptyTodo activeFilter={activeFilter} />
                ) : (
                    <div className="">
                        {filteredTodos?.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo.text}
                                handleDelete={() => deleteTodo(todo.id)}
                                handleToggle={() => toggleTodo(todo.id)}
                                isCompleted={todo.completed}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}



export default Todo