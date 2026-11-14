import { useState } from "react";

function AddOpportunityForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Workshops",
    city: "",
    date: "",
    capacity: "",
    price: "",
    description: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { title, city, date, capacity, price, description } = formData;

    if (!title.trim() || !city.trim() || !date || !capacity || price === "") {
      setError("Please complete all required fields.");
      return;
    }

    if (Number(capacity) < 0 || Number(price) < 0) {
      setError("Capacity and price cannot be negative.");
      return;
    }

    if (Number(capacity) <= 0) {
      setError("Capacity must be greater than zero.");
      return;
    }

    if (new Date(`${date}T00:00:00`) < new Date(new Date().toDateString())) {
      setError("Please select a future date.");
      return;
    }

    const newOpportunity = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category: formData.category,
      city: city.trim(),
      date,
      capacity: Number(capacity),
      availableSeats: Number(capacity),
      price: Number(price),
      description: description.trim(),
      featured: false,
    };

    onAdd(newOpportunity);

    setFormData({
      title: "",
      category: "Workshops",
      city: "",
      date: "",
      capacity: "",
      price: "",
      description: "",
    });

    setError("");
  }

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-[#E8D8C5] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#C87968]">
          Share an opportunity
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#302B31]">
          Add a new opportunity
        </h2>

        <p className="mt-2 text-sm text-[#6D6265]">
          Help people discover new learning and career opportunities.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block font-semibold text-[#302B31]"
          >
            Opportunity title *
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter opportunity title"
            className="w-full rounded-xl border border-[#E8D8C5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C87968]"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="new-category"
              className="mb-2 block font-semibold text-[#302B31]"
            >
              Category *
            </label>
            <select
              id="new-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#E8D8C5] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C87968]"
            >
              <option>Workshops</option>
              <option>Career Events</option>
              <option>Short Courses</option>
              <option>Community Activities</option>
              <option>Technology</option>
              <option>Entrepreneurship</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="city"
              className="mb-2 block font-semibold text-[#302B31]"
            >
              City *
            </label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="e.g. Kigali"
              className="w-full rounded-xl border border-[#E8D8C5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C87968]"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="mb-2 block font-semibold text-[#302B31]"
            >
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#E8D8C5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C87968]"
            />
          </div>

          <div>
            <label
              htmlFor="capacity"
              className="mb-2 block font-semibold text-[#302B31]"
            >
              Capacity *
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              value={formData.capacity}
              onChange={handleChange}
              required
              placeholder="e.g. 30"
              className="w-full rounded-xl border border-[#E8D8C5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C87968]"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="price"
            className="mb-2 block font-semibold text-[#302B31]"
          >
            Price (RWF) *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Enter 0 if free"
            className="w-full rounded-xl border border-[#E8D8C5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C87968]"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block font-semibold text-[#302B31]"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe this opportunity..."
            className="w-full rounded-xl border border-[#E8D8C5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C87968]"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-[#C87968] px-6 py-3 font-semibold text-white transition hover:bg-[#A96052] focus:outline-none focus:ring-2 focus:ring-[#C87968] focus:ring-offset-2"
          >
            Add Opportunity
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[#E8D8C5] px-6 py-3 font-semibold text-[#302B31] transition hover:bg-[#F7F3ED]"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddOpportunityForm;
