import { Input } from "@/components/ui/input";
import { SearchBarProps } from "@/types/types";



export const SearchBar = ({ searchUserId, setSearchUserId, onSearch }: SearchBarProps) => (
  <div className="mb-6 flex justify-center gap-2 max-w-sm mx-auto">
    <Input
      type="text"
      placeholder="Enter user ID"
      value={searchUserId}
      onChange={(e) => setSearchUserId(e.target.value)}
      className="border-primary focus:border-primary"
    />
    <button
      onClick={onSearch}
      className="px-4 py-2 bg-primary text-white rounded"
    >
      Search
    </button>
  </div>
); 