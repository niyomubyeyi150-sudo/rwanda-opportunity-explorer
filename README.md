# Heza – Rwanda Opportunities Explorer
## About the Project

Heza is a React-based web application that helps people discover learning, career, and community opportunities across Rwanda.

The platform brings different opportunities together in one place, making it easier for users to explore workshops, career events, short courses, technology activities, entrepreneurship programs, and community activities.

Users can search, filter, sort, save, and add opportunities through a simple and responsive interface.

## Project Goals

The main goal of Heza is to make opportunities easier to discover and help people find activities that support their personal and professional growth.

## Technologies Used

- **React** – For building reusable user interface components.
- **Vite** – For creating and running the React development environment.
- **Tailwind CSS v4** – For styling and responsive layouts.
- **JavaScript (ES6+)** – For application logic and interactions.
- **HTML5** – For structuring the application.

## Main Features

### 1. Responsive Homepage

- Introduces the Heza platform.
- Provides navigation to different sections.
- Includes a mobile hamburger menu.
- Displays the number of opportunities, categories, and cities.

### 2. Opportunity Categories

Users can explore opportunities through different categories:

- Workshops
- Career Events
- Short Courses
- Community Activities
- Technology
- Entrepreneurship

### 3. Search and Filters

Users can find opportunities using:

- Live search by title or city.
- Category filtering.
- Available opportunities only.
- Saved opportunities only.
- Sorting by earliest date, title (A–Z), or available seats.
- Reset filters functionality.

Filters can be combined to narrow down the results.

### 4. Save Opportunities

Users can save and unsave opportunities.

The application keeps track of saved opportunity IDs using React state and provides a saved-only filter.

### 5. Add New Opportunities

Users can add opportunities through a form.

The form includes:

- Opportunity title.
- Category.
- City.
- Date.
- Capacity.
- Price.

It also validates required fields and checks that capacity and price are not negative.

After a successful submission, the new opportunity appears in the opportunity list.

### 6. Conditional Rendering and UI States

Heza demonstrates different interface states:

- **Ready:** Displays the available opportunities.
- **Loading:** Displays a loading message.
- **Error:** Displays an error message and a Try Again button.
- **Empty:** Displays a message when no opportunities match the selected filters.

The application also displays success and cancellation feedback when adding opportunities.

## How Heza Works

Heza uses React components and state management to make the application interactive.

### 1. Loading Opportunity Data

The application starts with sample opportunity data stored locally in `seedOpportunities.js`.

This data is imported into `App.jsx` and stored using the `useState` hook.

### 2. Searching and Filtering

When a user enters a search term or changes a filter, React updates the state.

The application then filters the opportunities based on the selected conditions.

For example, users can search for opportunities in Kigali and select the Workshops category at the same time.

### 3. Sorting Opportunities

Users can arrange the displayed opportunities by:

- Earliest date.
- Title in alphabetical order.
- Available seats from highest to lowest.

The original opportunity array is preserved by sorting a copied array.

### 4. Saving Opportunities

When a user clicks the save button, the opportunity ID is added to the saved IDs state.

Clicking the button again removes that ID from the saved list.

### 5. Adding Opportunities

The Add Opportunity form collects information from the user.

After validation, the new opportunity is added to the application state using an immutable state update.

### 6. Updating the Interface

React automatically updates the interface whenever relevant state changes.

This allows the search results, saved opportunities, statistics, feedback messages, and opportunity list to update without reloading the page.

## Project Structure

The main project structure is organized as follows:

```text
rwanda-opportunity-explorer/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── Heza Rwanda Opportunities Logo.png
│   │
│   ├── component/
│   │   ├── OpportunityCard.jsx
│   │   ├── OpportunityList.jsx
│   │   ├── OpportunityFilters.jsx
│   │   └── AddOpportunityForm.jsx
│   │
│   ├── data/
│   │   └── seedOpportunities.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

### Component Responsibilities

| Component | Responsibility |
|---|---|
| `App.jsx` | Manages application state and brings the main sections together. |
| `OpportunityCard.jsx` | Displays an individual opportunity. |
| `OpportunityList.jsx` | Displays the list of opportunities. |
| `OpportunityFilters.jsx` | Handles search, filtering, sorting, and resetting filters. |
| `AddOpportunityForm.jsx` | Collects and validates new opportunity information. |
| `seedOpportunities.js` | Contains the initial sample opportunity data. |

## Installation and Setup

Follow these steps to run Heza on your computer.

### 1. Clone the Repository

```bash
git clone https://github.com/niyomubyeyi150-sudo/rwanda-opportunity-explorer.git
```

### 2. Open the Project Folder

```bash
cd rwanda-opportunity-explorer
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Vite will provide a local development URL in your terminal, usually:

```text
http://localhost:5173
```

Open the URL in your browser to explore Heza.

## Author

Developed as a Week 7 Integrated React Project.

**Project Name:** Heza – Rwanda Opportunities Explorer

**Technologies:** React, Vite, Tailwind CSS v4, and JavaScript.

---

*Heza – Discover. Learn. Grow.*
