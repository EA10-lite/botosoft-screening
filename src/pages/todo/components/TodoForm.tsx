import { GoPlus } from "react-icons/go";


type TodoFormProps = {
    task: string;
    setTask: (task: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TodoForm = ({
    task,
    setTask,
    handleSubmit,
}: TodoFormProps) => {
    return (
        <div className="space-y-4 mb-4">
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Add a new task"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-white placeholder:text-gray-400 focus:outline-none focus:ring-[1.5px] focus:ring-white"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="ml-2 px-4 py-3 rounded-lg bg-black text-white hidden md:flex items-center gap-2 justify-center cursor-pointer min-w-32"
                    >
                        <GoPlus size={18} />
                        <span className="uppercase">Add</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm;