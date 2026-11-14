function OpportunityFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  availableOnly,
  setAvailableOnly,
  savedOnly,
  setSavedOnly,
  sortBy,
  setSortBy,
  onReset,
}) {
  return (
    <section className="mb-8 rounded-2xl border border-[#E8D8C5] bg-white p-5 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* SEARCH */}
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-semibold text-[#302B31]"
          >
            Search opportunities
          </label>

          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title or city..."
            className="w-full rounded-xl border border-[#E8D8C5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C87968]"
          />
        </div>

        {/* CATEGORY FILTER */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-semibold text-[#302B31]"
          >
            Category
          </label>

          <select
            id="category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="w-full rounded-xl border border-[#E8D8C5] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C87968]"
          >
            <option value="All">All Categories</option>
            <option value="Workshops">Workshops</option>
            <option value="Career Events">Career Events</option>
            <option value="Short Courses">Short Courses</option>
            <option value="Community Activities">Community Activities</option>
            <option value="Technology">Technology</option>
            <option value="Entrepreneurship">Entrepreneurship</option>
          </select>
        </div>

        {/* SORT */}
        <div>
          <label
            htmlFor="sort"
            className="mb-2 block text-sm font-semibold text-[#302B31]"
          >
            Sort by
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full rounded-xl border border-[#E8D8C5] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C87968]"
          >
            <option value="date">Earliest date</option>
            <option value="title">Title A–Z</option>
            <option value="seats">Most available seats</option>
          </select>
        </div>
      </div>

      {/* CHECKBOX FILTERS */}
      <div className="mt-5 flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-[#302B31]">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(event) => setAvailableOnly(event.target.checked)}
            className="h-4 w-4 accent-[#C87968]"
          />
          Available opportunities only
        </label>

        <label className="flex items-center gap-2 text-sm text-[#302B31]">
          <input
            type="checkbox"
            checked={savedOnly}
            onChange={(event) => setSavedOnly(event.target.checked)}
            className="h-4 w-4 accent-[#C87968]"
          />
          Saved opportunities only
        </label>

        <button
          type="button"
          onClick={onReset}
          className="ml-auto rounded-xl px-4 py-2 text-sm font-semibold text-[#C87968] transition hover:bg-[#F7F3ED] focus:outline-none focus:ring-2 focus:ring-[#C87968]"
        >
          Reset filters
        </button>
      </div>
    </section>
  );
}

export default OpportunityFilters;
