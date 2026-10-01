# Confetti — Application Architecture

## Introduction

Confetti is a birthday calendar application designed to make remembering and managing birthdays simple.

The application provides a sleek, pared-back interface for tracking birthdays, organising people into Circles, viewing upcoming birthdays and managing birthday reminders.

The initial product will be built as a responsive web application, with a native mobile application planned for a later stage.


## Layout

### Primary Navigation

The application has four main navigation destinations:

- Calendar
- Upcoming
- Circles
- Reminders

A separate **Add Birthday** action is accessible throughout the main application.

### Secondary Screens

#### Add Birthday
A full-screen form accessible from the main application screens. It allows the user to create a new person and birthday.

#### Person Detail
Displays the information stored about an individual. It can be accessed by selecting a person from Calendar, Upcoming or Circles.

#### Circle Detail
Displays the people belonging to a particular Circle and information associated with that Circle.


# Pages


## Calendar

The Calendar is the application's home screen and primary visual interface. It displays birthdays within a navigable monthly calendar.

### Contains

- Confetti logo and branding
- Next Up birthday banner
- Circle filter
- Month navigation
- Monthly calendar
- Visual indicators for dates containing birthdays
- Selected-day interface

### Behaviour

Users can navigate between months.

Dates containing birthdays are visually identified within the calendar.

Selecting a date opens a day UI containing any birthdays on that date.

If birthdays exist on the selected date, each person is displayed and can be opened to view their Person Detail.

The user can also add another birthday to the selected date.

If no birthdays exist, an empty state is displayed with the option to add a birthday. The selected date should automatically populate the relevant fields in the Add Birthday form.

The Next Up component automatically displays the next upcoming birthday date. If multiple people share the next birthday date, all of them should be represented.

### Logic Challenges

- Generate the correct calendar for a given month and year
- Navigate between months and years
- Correctly position dates within the calendar grid
- Match birthdays to their corresponding calendar dates
- Support multiple birthdays on the same date
- Distinguish today, selected dates and birthday dates
- Filter birthdays by Circle
- Calculate the next upcoming birthday
- Handle multiple people sharing the next birthday
- Handle year rollover, e.g. December → January
- Determine behaviour for leap-year birthdays


## Upcoming

Upcoming provides a chronological list of future birthdays.

### Contains

- Page title
- Circle filter
- Birthday cards
- Date-based sections

### Behaviour

Birthdays are ordered chronologically from the current date.

They are grouped into meaningful sections such as:

- This Week
- Later This Month
- Following months

The list covers the upcoming 12-month birthday cycle and uses normal page scrolling rather than infinite scrolling.

Selecting a birthday opens the relevant Person Detail screen.

### Logic Challenges

- Calculate the next occurrence of each person's birthday
- Sort birthdays chronologically
- Group birthdays into the correct time periods
- Handle the transition into the following year
- Apply Circle filtering without affecting chronological ordering


## Circles

Circles allow users to organise people into groups such as Family, Friends or Work.

### Contains

- Page title
- Circle cards
- Number of people within each Circle
- Add Circle option
- Uncategorized section
- Circle Detail view

### Behaviour

Each Circle displays its name, colour and number of people assigned to it.

Selecting a Circle opens its Circle Detail screen containing the people assigned to that Circle.

People without an assigned Circle appear within Uncategorized.

Users can create and manage their own Circles.

### Logic Challenges

- Correctly associate people with Circles
- Calculate the number of people belonging to each Circle
- Handle people who have no Circle
- Determine whether a person can belong to one or multiple Circles

### Outstanding Questions

- Should deleting a Circle require confirmation?
- What happens to people when their Circle is deleted?
- Can a person belong to multiple Circles?
- Should users be able to manually assign someone to Uncategorized, or should this only represent people without a Circle?


## Reminders

Reminders controls how users are notified about upcoming birthdays.

### Contains

- Default reminder schedule
- Reminder delivery time
- Notification channels
- Notification preview

### Initial Web Version

The initial implementation will focus primarily on the reminder settings UI and storing the user's preferences.

Actual native push-notification functionality will be introduced as part of the later mobile application.

### Future Logic Challenges

- Calculate when each reminder should be triggered
- Handle user time zones
- Schedule notifications reliably
- Allow global reminder defaults
- Potentially allow per-person reminder overrides
- Prevent duplicate notifications


## Add Birthday

Add Birthday allows a new person and their birthday information to be added.

### Contains

- First name
- Surname
- Birthday
- Optional birth year
- Circle
- Reminder preferences
- Gift notes
- Photo
- Cancel
- Save

### Logic Challenges

- Form validation
- Allow birthday year to be optional
- Prevent invalid dates
- Determine whether duplicate people should be allowed
- Associate the person with the correct Circle
- Save the new person to the database
- Immediately update relevant application UI after creation


## Person Detail

Person Detail displays the information stored about an individual.

It can be accessed from Calendar, Upcoming and Circle Detail.

### Contains

- Name
- Photo
- Circle
- Birthday
- Next birthday / countdown
- Reminder information
- Gift notes
- Edit functionality

### Logic Challenges

- Calculate the person's next birthday
- Calculate age when birth year is known
- Hide age when birth year is unknown
- Keep changes synchronised across Calendar, Upcoming and Circles
- Handle deletion safely


# Tech Stack

## Web

- **Next.js** — web application framework and server-side functionality
- **React** — user interface
- **TypeScript** — application language
- **Tailwind CSS** — styling
- **Supabase** — backend platform
- **PostgreSQL** — relational database
- **Supabase Auth** — user authentication
- **Supabase Storage** — profile images where required

Next.js will handle the application's server-side functionality and communication with Supabase. A separate Express/Node.js backend is not currently required.

CRUD operations will allow birthday, person and Circle data to be created, retrieved, updated and deleted.

The UI should update immediately following successful create, edit and delete operations.

## Mobile — Future

- React Native
- Expo
- TypeScript
- Existing Supabase backend

The mobile application will use the same underlying database and business concepts as the web application.

The repository may be converted into a monorepo when mobile development begins so that appropriate types, validation and business logic can be shared between web and mobile.


# Testing & Monitoring

Automated testing will focus primarily on important application and business logic.

Initial test areas include:

- Calendar generation
- Birthday date calculations
- Next birthday calculation
- Birthday sorting
- Upcoming birthday grouping
- Circle filtering
- Optional birth years
- Year rollover
- Leap-year behaviour

Component and integration tests will cover important user interactions.

End-to-end testing can later cover critical flows such as adding, editing and deleting birthdays.

**Sentry** will be used for production error monitoring.

Introduction ✓

Layout ✓

Pages
 ├── Calendar ✓
 ├── Upcoming ✓
 ├── Circles ✓
 ├── Reminders
 ├── Add Birthday
 ├── Person Detail
 ├── Circle Detail
 └── Edit Birthday / Person

Shared Components
 ├── BirthdayCard
 ├── CircleFilter
 ├── FloatingNav
 ├── CalendarGrid
 ├── CalendarDay
 ├── DaySheet
 ├── CircleCard
 └── Form components

Data Model
 ├── User
 ├── Person
 ├── Circle
 ├── Reminder
 └── ReminderSettings

Application State
 ├── selected date
 ├── selected month
 ├── active Circle filter
 └── authenticated user

Business Logic
 ├── calendar generation
 ├── next birthday
 ├── upcoming birthday sorting
 ├── birthday grouping
 ├── age calculation
 └── Circle filtering

Data Layer
 ├── reads
 ├── create
 ├── update
 └── delete

Authentication

Error / Loading / Empty States

Testing Strategy

Monitoring
 └── Sentry

Future Mobile Architecture
 └── Expo / React Native

Outstanding Decisions