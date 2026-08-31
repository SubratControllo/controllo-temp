import { Search } from 'lucide-react';

const filterClassName = 'min-h-[42px] cursor-pointer rounded-[14px] border-0 bg-[#eef4f2] px-[15px] text-[.72rem] text-muted transition-colors aria-pressed:bg-navy aria-pressed:text-white';

export function DirectorySearch({ label, value, onChange }) {
  return (
    <label className="flex h-12 min-w-[320px] items-center gap-2.5 rounded-[14px] border border-line bg-white px-4 max-[760px]:min-w-0">
      <Search className="w-[18px] text-teal" aria-hidden="true" />
      <span className="absolute -m-px size-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
        {label}
      </span>
      <input
        className="w-full border-0 bg-transparent outline-0 [font:inherit]"
        type="search"
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function DirectoryFilters({ items, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          className={filterClassName}
          key={item}
          type="button"
          aria-pressed={value === item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
