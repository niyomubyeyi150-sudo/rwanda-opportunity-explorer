import OpportunityCard from "./OpportunityCards";

function OpportunityList({ opportunities, savedIds, onSave }) {
  if (opportunities.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#C87968] bg-white px-6 py-12 text-center">
        <h3 className="text-xl font-bold text-[#302B31]">
          No opportunities found
        </h3>

        <p className="mt-3 text-[#6D6265]">
          Try changing your search or filters to find more opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          isSaved={savedIds.includes(opportunity.id)}
          onSave={onSave}
        />
      ))}
    </div>
  );
}

export default OpportunityList;
