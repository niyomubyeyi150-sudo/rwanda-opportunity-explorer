function OpportunityCard({ opportunity, isSaved, onSave }) {
  const {
    id,
    title,
    category,
    city,
    date,
    description,
    capacity,
    availableSeats,
    price,
    featured,
  } = opportunity;

  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  const isFullyBooked = availableSeats <= 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8D8C5] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* BADGES */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-[#F7F3ED] px-3 py-1 text-xs font-semibold text-[#8F574B]">
          {category}
        </span>

        {featured && (
          <span className="rounded-full bg-[#E8D8C5] px-3 py-1 text-xs font-semibold text-[#8F574B]">
            Featured
          </span>
        )}
      </div>

      {/* OPPORTUNITY DETAILS */}
      <div className="mt-5 flex-1">
        <h3 className="text-xl font-bold text-[#302B31]">{title}</h3>

        <p className="mt-3 text-sm leading-6 text-[#6D6265]">{description}</p>

        <div className="mt-5 space-y-3 text-sm text-[#6D6265]">
          <p>
            <span className="font-semibold text-[#302B31]">Location:</span>{" "}
            {city}
          </p>

          <p>
            <span className="font-semibold text-[#302B31]">Date:</span>{" "}
            {formattedDate}
          </p>

          <p>
            <span className="font-semibold text-[#302B31]">Price:</span>{" "}
            {price === 0 ? (
              <span className="font-semibold text-green-700">Free</span>
            ) : (
              `${price.toLocaleString("en-RW")} RWF`
            )}
          </p>

          <p>
            <span className="font-semibold text-[#302B31]">Places:</span>{" "}
            {availableSeats} of {capacity} remaining
          </p>
        </div>
      </div>

      {/* AVAILABILITY STATUS */}
      <div className="mt-5">
        {isFullyBooked ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm font-semibold text-red-700">
            Fully booked
          </p>
        ) : (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-center text-sm font-semibold text-green-700">
            Available
          </p>
        )}
      </div>

      {/* SAVE BUTTON */}
      <button
        type="button"
        onClick={() => onSave(id)}
        className="mt-4 w-full rounded-xl border border-[#C87968] px-4 py-3 font-semibold text-[#C87968] transition hover:bg-[#C87968] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C87968] focus:ring-offset-2"
      >
        {isSaved ? "Unsave Opportunity" : "Save Opportunity"}
      </button>
    </article>
  );
}

export default OpportunityCard;
