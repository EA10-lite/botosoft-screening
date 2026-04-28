

type TodoFilterProps = {
    filter: string;
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

const TodoFilter = ({
    filter,
    activeFilter,
    setActiveFilter
}: TodoFilterProps) => {
    return (
        <button
            className={`px-8 py-2 rounded-md text-white cursor-pointer ${filter === activeFilter ? "bg-[#515460]" : "bg-[#515460] opacity-50"}`}
            onClick={() => setActiveFilter(filter)}
        >
            <span className="capitalize">{filter}</span>
        </button>
    )
}

export default TodoFilter;