import { BsCheck2 } from "react-icons/bs";
import { LuTrash2 } from "react-icons/lu";

type TodoItemProps = {
    todo: string;
    handleDelete: () => void;
    handleToggle: () => void;
    isCompleted: boolean;
}

const TodoItem = ({ todo, handleDelete, handleToggle, isCompleted }: TodoItemProps) => {
    return (
        <div className="p-6 border-b border-gray-300 last:border-b-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleToggle}
                        className={`w-6 h-6 border border-gray-300 flex items-center justify-center cursor-pointer rounded-md ${isCompleted ? "bg-[#515460]" : "bg-transparent"}`}
                    >
                        {isCompleted && <BsCheck2 size={16} color="white" />}
                    </button>
                    <p className="text-gray-900 text-sm font-[500]">{todo}</p>
                </div>


                <button
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                    onClick={handleDelete}
                >
                    <LuTrash2 />
                </button>
            </div>
        </div>
    )
}

export default TodoItem;