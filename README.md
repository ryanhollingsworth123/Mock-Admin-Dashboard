**User Management Dashboard**

A responsive, TypeScript-based admin dashboard built with React, showcasing core front-end development skills such as state management, component design, API integration, and responsive UI design.

 **Project Overview**

This project is a user management dashboard that simulates a real-world admin interface. It demonstrates practical React and TypeScript skills with a focus on:

 -Fetching and managing user data from an API.
 -Filtering users by name, email, and role.
 -Sorting and paginating user lists.
 -Updating user roles and active status.
 -Responsive design for mobile and desktop.
 -Dark mode support respecting browser settings.
 -Local storage persistence of user changes.
 -Modular, reusable component architecture.

Purpose:
This project is designed to demonstrate skills relevant to front-end development roles, especially for creating dashboards, admin panels, or any application that requires managing and displaying structured data efficiently.

 **Features**
1. Data Management

 -Fetches users from a public API (https://dummyjson.com/users).
 -Allows updating user roles and active/inactive status.
 -Local storage persistence ensures changes remain after page reload.

2. Filtering & Searching

 -Search users by name or email.
 -Filter by role: Admin, Editor, Viewer.
 -Filters are persistent across page reloads.

3. Sorting

 -Sort users by name, email, or other attributes.
 -Ascending and descending sorting with visual indicators.

4. Pagination

 -Supports pagination to improve performance and user experience.

5. Responsive Design

 -Desktop-first layout: table view for wide screens.
 -Mobile card view: stacked vertical cards for small screens.

6. Dark Mode

 -Automatically respects browser’s preferred color scheme.

7. UI/UX

 -Clean, modern styling with CSS modules.
 -Hover effects, transitions, and dropdowns for actions.
 -Accessible form controls and buttons.

** Tech Stack**

React + TypeScript |	Component-based front-end development and type safety
CSS Modules	| Scoped, maintainable CSS
Fetch API	| Data fetching and asynchronous operations
Local Storage |	Persistent client-side storage
Responsive Design |	Mobile-first / desktop-first adaptability
ES6+ & Modern JS	| Clean, maintainable code practices

 **Getting Started**
 
Prerequisites:

 -Node.js >= 18
 -npm or yarn

Installation:

git clone https://github.com/yourusername/user-management-dashboard.git
cd user-management-dashboard
npm install
npm run dev


Open http://localhost:5173
 to view in the browser.

 **Future Enhancements**

 -User authentication and role-based access control.
 -Backend integration for permanent persistence.
 -Additional table features: bulk actions, inline editing.
 -Export user data (CSV/JSON).
 -Unit and integration testing with Jest + React Testing Library.
