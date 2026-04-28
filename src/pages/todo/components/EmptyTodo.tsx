import { FaRegListAlt } from "react-icons/fa";


const EmptyTodo = ({activeFilter} : {activeFilter: string}) => {
    return (
        <div className="text-center text-gray-500 py-12">
            <FaRegListAlt className="mx-auto mb-2 text-4xl" />
            <p className="text-lg font-medium">
                {
                    activeFilter === "all" ? "No tasks yet" :
                    activeFilter === "active" ?
                    "No active tasks" :
                    "No completed tasks"
                }
            </p>
            <p className="text-sm">Add a task to get started</p>
        </div>
    )
}

export default EmptyTodo;