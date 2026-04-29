import { BsCheck2 } from "react-icons/bs";
import { LuTrash2, LuGripVertical } from "react-icons/lu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TodoItemProps = {
    id: string;
    todo: string;
    handleDelete: () => void;
    handleToggle: () => void;
    isCompleted: boolean;
}

const TodoItem = ({ id, todo, handleDelete, handleToggle, isCompleted }: TodoItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={`p-6 border-b border-gray-300 last:border-b-0 bg-white ${isDragging ? 'shadow-lg rounded-lg' : ''}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button {...attributes} {...listeners} className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                        <LuGripVertical size={20} />
                    </button>
                    <button
                        onClick={handleToggle}
                        className={`w-6 h-6 border border-gray-300 flex items-center justify-center cursor-pointer rounded-md ${isCompleted ? "bg-[#515460]" : "bg-transparent"}`}
                    >
                        {isCompleted && <BsCheck2 size={16} color="white" />}
                    </button>
                    <p className={`text-gray-900 text-sm font-[500] ${isCompleted ? 'line-through text-gray-500' : ''}`}>{todo}</p>
                </div>

                <button
                    className="text-red-500 hover:text-red-600 cursor-pointer p-2"
                    onClick={handleDelete}
                >
                    <LuTrash2 />
                </button>
            </div>
        </div>
    )
}

export default TodoItem;