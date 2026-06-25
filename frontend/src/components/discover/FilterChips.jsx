import FilterChip from "../ui/FilterChip";

export default function FilterChips({ filters, activeFilters, onToggle }) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
      {filters.map((filter) => (
        <FilterChip
          key={filter}
          label={filter}
          active={activeFilters.includes(filter)}
          onClick={() => onToggle(filter)}
        />
      ))}
    </div>
  );
}
