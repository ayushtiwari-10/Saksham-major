# TODO List for TeacherDashboard Finances and Schedule Sections

## Finances Section
- [x] Add state variables for earnings, payments, totals, loading, error in Finances.jsx
- [x] Implement useEffect to fetch data from /teacher/finances using authService.get
- [x] Parse API response to set earnings array for chart, payments array for table, and totals for cards
- [x] Add loading spinner and error message display in UI
- [x] Update finance cards to display dynamic totals instead of hardcoded values

## Schedule Section
- [x] Change events to useState and add useEffect to fetch from /teacher/schedule on mount
- [x] Modify addEvent function to POST to /teacher/schedule with event data and update local state on success
- [x] Keep local delete functionality (no backend DELETE endpoint available)
- [x] Add loading/error states for API calls
- [x] Add loading spinner and error message display in UI for Schedule section
