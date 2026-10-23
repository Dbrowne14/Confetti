# Confetti — Supabase & Backend Roadmap

## Goal

Move Confetti from a completed responsive UI using local/mock data into a real, persistent, multi-user application backed by Supabase.

The overall order is:

**Supabase Setup → Database Design → Reads → Writes → CRUD → Auth → Ownership → RLS → Reminders → Production Hardening → Mobile**

The important principle is to introduce these concepts one at a time rather than treating "add Supabase" as a single task.

---

# Phase 1 — Supabase Foundation

## 1. Create the Supabase project

### Tasks

- [x] Create a Supabase project
- [x] Understand what Supabase is providing
- [x] Locate the project URL
- [x] Locate the appropriate API keys
- [x] Understand which keys can and cannot be exposed to the browser

### I should understand

Supabase is not simply a database.

For Confetti it will eventually provide:

- PostgreSQL database
- Authentication
- Row Level Security
- Database API
- potentially scheduled/backend functionality later

### Completion criteria

I have a Supabase project and understand the basic pieces Confetti will use.

---

## 2. Connect Next.js to Supabase

### Tasks

- [x] Install the required Supabase packages
- [x] Add Supabase environment variables to `.env.local`
- [x] Ensure secrets are not committed to Git
- [x] Create the appropriate Supabase server client
- [x] Create a browser client only if it is actually required
- [x] Understand where each client can be used
- [x] Make one simple query from Next.js
- [x] Confirm the application can communicate with Supabase

### I should understand

The basic data path:

    Next.js
        ↓
    Supabase client
        ↓
    Supabase API
        ↓
    PostgreSQL

I should also understand the difference between:

    Server Component / Server Action
                ↓
        server-side Supabase

and:

    Client Component
                ↓
        browser-side Supabase

I should not blindly create both clients without understanding why each exists.

### Completion criteria

Confetti can successfully communicate with my Supabase project.

---

# Phase 2 — Database Design

Do not create tables until the domain model has been considered properly.

---

## 3. Design the `people` table

Current application model:

    type Person = {
      id: number;
      firstName: string;
      surname: string | null;
      birthMonth: number;
      birthDay: number;
      birthYear: number | null;
      circleId: number | null;
      giftNotes: string | null;
    };

### Decisions to make

- [x] Integer IDs vs UUIDs - going with integer for person and circle Id and 
- [x] Keep birthday as month/day/year columns vs PostgreSQL date - going with month/day year
- [x] How an unknown birth year should be represented - null
- [x] Which fields are nullable
- [x] Whether `created_at` is required - yes
- [x] Whether `updated_at` is required - yes
- [x] Month constraints
- [x] Day constraints
- [x] Whether impossible dates should be prevented at DB level or application level - application level
- [ ] Database naming conventions
- [ ] Application naming conventions

Likely database naming:

    first_name
    surname
    birth_month
    birth_day
    birth_year
    circle_id
    gift_notes

while TypeScript may continue using:

    firstName
    birthMonth
    circleId

### I should understand

Database rows and TypeScript objects represent the same domain information but do not necessarily need identical naming or types.

### Completion criteria

I can explain why each `people` column exists and why its database type was chosen.

---

## 4. Design the `circles` table

Current application model:

    type Circle = {
      id: number;
      name: string;
      colour: string;
    };

### Decisions to make

- [ ] ID strategy
- [ ] Required fields
- [ ] Colour representation
- [ ] Whether timestamps are useful
- [ ] Relationship to people
- [ ] What happens when a circle is deleted

Expected relationship:

    circles
       ↑
       │ circle_id
       │
    people

`circle_id = NULL` should represent:

    Uncategorised

Uncategorised should remain a UI/domain concept rather than a fake Circle database row unless there is a strong reason otherwise.

### Important deletion decision

Likely behaviour:

    Delete Circle
         ↓
    Circle disappears
         ↓
    People survive
         ↓
    people.circle_id becomes NULL
         ↓
    They become Uncategorised

### Completion criteria

I understand the relationship between people and circles and what the database should do when that relationship changes.

---

# Phase 3 — Create & Seed the Database

## 5. Create the tables

Once the schema decisions are understood:

- [ ] Create `circles`
- [ ] Create `people`
- [ ] Add primary keys
- [ ] Add foreign key from `people.circle_id` to `circles.id`
- [ ] Add appropriate nullable fields
- [ ] Add constraints
- [ ] Add timestamps if decided
- [ ] Configure circle deletion behaviour
- [ ] Inspect the resulting schema in Supabase

### Completion criteria

The database structure represents Confetti's current domain model correctly.

---

## 6. Seed existing development data

Move representative mock data into Supabase.

### Include

- [ ] Multiple people
- [ ] Multiple circles
- [ ] People in different circles
- [ ] At least one uncategorised person
- [ ] At least one person without a birth year
- [ ] Gift notes where relevant
- [ ] Upcoming birthdays suitable for testing Calendar/Next Up

### Verify

- [ ] People appear correctly in Supabase
- [ ] Circles appear correctly
- [ ] Foreign-key relationships are correct
- [ ] NULL circle relationships work
- [ ] NULL birth years work

### Completion criteria

Supabase contains a representative copy of the data Confetti currently uses locally.

---

# Phase 4 — Supabase Reads

The first application integration should be READ ONLY.

Do not build mutations yet.

---

## 7. Replace `getPeople()` with Supabase

Current conceptual flow:

    Local/mock data
          ↓
      getPeople()
          ↓
       Person[]
          ↓
         UI

Target:

    Supabase
        ↓
    getPeople()
        ↓
     Person[]
        ↓
    existing UI

### Tasks

- [ ] Query `people`
- [ ] Handle Supabase query errors
- [ ] Return correctly typed data
- [ ] Decide whether database rows need mapping into application models
- [ ] Replace the current mock implementation
- [ ] Keep existing component APIs where possible

### Test

- [ ] Calendar birthdays appear
- [ ] Next Up works
- [ ] Upcoming works
- [ ] Selected Day works
- [ ] Profile works
- [ ] Birthday ages work
- [ ] Unknown birth years work

### Important principle

Functions such as:

    getBirthdaysForDate()
    getNextBirthday()
    getUpcomingBirthdays()

should not need to care whether `Person[]` came from:

    mock data
    Supabase
    an API
    SQLite
    something else

They operate on the domain model.

### Completion criteria

Calendar behaves exactly as before, but its people come from Supabase.

---

## 8. Replace `getCircle()` / circle reads

Create the real circle query.

Target:

    Supabase
        ↓
    getCircles()
        ↓
     Circle[]
        ↓
    existing UI

### Test

- [ ] Circle filters
- [ ] Circles page
- [ ] Circle colours
- [ ] Circle member counts
- [ ] People belonging to circles
- [ ] Uncategorised people
- [ ] Add Birthday circle selector
- [ ] Profile circle information

### Completion criteria

All read-only Confetti data comes from Supabase.

---

# Phase 5 — Data Layer Review

Before mutations, stop and make sure the data architecture remains understandable.

---

## 9. Review where Supabase code lives

Potential structure:

    lib/
      supabase/
        server.ts
        client.ts

    data/
      people.ts
      circles.ts

Exact folders should emerge from actual requirements rather than being created speculatively.

### Questions to answer

- [ ] Where should `getPeople()` live?
- [ ] Where should `getCircles()` live?
- [ ] Do we need `getPerson()`?
- [ ] Where do database types live?
- [ ] Where do application/domain types live?
- [ ] Do DB rows need mapping into application models?
- [ ] Should components know anything about Supabase?

### Principle

Avoid scattering this throughout UI components:

    supabase
      .from("people")
      .select(...)

Prefer a clear data boundary.

### Completion criteria

Components consume application data without needing to understand how Supabase queries work.

---

# Phase 6 — Add Birthday / First Write

This is the first major backend feature.

---

## 10. Connect Add Birthday to Supabase

Existing UI already exists.

Now connect it to a real mutation.

Target flow:

    Add Birthday
          ↓
       Form data
          ↓
      Validation
          ↓
     Server Action
          ↓
    Supabase INSERT
          ↓
      people table
          ↓
    Revalidate data
          ↓
    Calendar updates

### Tasks

- [ ] Understand how Server Actions work
- [ ] Submit the existing form
- [ ] Read form values
- [ ] Validate input
- [ ] Convert application values into database values
- [ ] Insert into Supabase
- [ ] Detect successful insert
- [ ] Refresh/revalidate affected data
- [ ] Close Add Birthday on success

### Important

Do not rebuild the Add Birthday UI.

The existing form should become connected to real data.

### Completion criteria

I can:

    Add Birthday
        ↓
    see birthday in Calendar
        ↓
    refresh browser
        ↓
    birthday still exists

This is the first major persistence milestone.

---

# Phase 7 — Validation & Mutation UX

## 11. Add proper validation

Consider introducing Zod here.

### Validate

- [ ] First name
- [ ] Birthday day
- [ ] Birthday month
- [ ] Optional birth year
- [ ] Optional surname
- [ ] Optional circle
- [ ] Optional gift notes
- [ ] Valid combinations of date values

### Understand

Validation may exist at multiple layers:

    UI
     ↓
    application/server validation
     ↓
    database constraints

These serve different purposes.

---

## 12. Add mutation states

Expected flow:

    Save
     ↓
    Pending
     ↓
     ├── Success
     │      ↓
     │   Revalidate
     │      ↓
     │   Close
     │
     └── Error
            ↓
       Keep form open
            ↓
       Show useful error

### Test

- [ ] Valid submission
- [ ] Invalid submission
- [ ] Missing required field
- [ ] No birth year
- [ ] No circle
- [ ] Gift notes
- [ ] Database error
- [ ] Double-click Save
- [ ] Pending state
- [ ] Failed mutation does not lose entered data

### Completion criteria

Add Birthday behaves like a proper production form rather than merely successfully calling INSERT.

---

# Phase 8 — Edit People

## 13. Connect Profile → Edit

Existing conceptual UI:

    Person
      ↓
    Profile
      ↓
     Edit
      ↓
    Add Birthday form

Now connect it to Supabase UPDATE.

Target:

    Existing Person
          ↓
    Pre-populated form
          ↓
        UPDATE
          ↓
       Supabase
          ↓
      Revalidate
          ↓
     Updated UI

### Tasks

- [ ] Load existing person values
- [ ] Distinguish Add vs Edit mode
- [ ] Preserve current Add Birthday behaviour
- [ ] Update correct database row
- [ ] Validate update
- [ ] Handle pending state
- [ ] Handle errors
- [ ] Revalidate affected pages/data
- [ ] Close on success

### Test

- [ ] Edit name
- [ ] Edit surname
- [ ] Edit birthday
- [ ] Add/remove birth year
- [ ] Change circle
- [ ] Remove circle
- [ ] Edit gift notes
- [ ] Refresh browser
- [ ] Updated data persists

### Completion criteria

Editing a person persists after a complete browser refresh.

---

# Phase 9 — Delete People

## 14. Implement person deletion

Target:

    Profile
       ↓
     Delete
       ↓
    Confirmation
       ↓
    Supabase DELETE
       ↓
    Revalidate
       ↓
    UI updates

### Tasks

- [ ] Add appropriate confirmation
- [ ] Delete correct database row
- [ ] Handle pending state
- [ ] Handle errors
- [ ] Close Profile appropriately
- [ ] Revalidate affected data

### Test

- [ ] Correct person deleted
- [ ] Cancel does nothing
- [ ] Calendar updates
- [ ] Upcoming updates
- [ ] Next Up updates
- [ ] Circles update
- [ ] Profile closes
- [ ] Browser refresh confirms deletion

### Completion criteria

People CRUD is complete:

    CREATE  ✓
    READ    ✓
    UPDATE  ✓
    DELETE  ✓

---

# Phase 10 — Circle CRUD

People CRUD should be stable before starting this phase.

---

## 15. Create Circles

Connect the existing New Circle UI.

### Tasks

- [ ] Validate circle name
- [ ] Validate/select colour
- [ ] INSERT circle
- [ ] Handle pending state
- [ ] Handle errors
- [ ] Revalidate Circles UI

---

## 16. Edit Circles

### Tasks

- [ ] Rename circle
- [ ] Change colour
- [ ] UPDATE Supabase
- [ ] Refresh affected people/calendar colours
- [ ] Handle errors

---

## 17. Manage circle membership

Implement:

- [ ] Add person to circle
- [ ] Move person between circles
- [ ] Remove person from circle
- [ ] Make person Uncategorised

Conceptually:

    Person
       ↓
    circle_id

Changing membership should normally mean updating `people.circle_id`.

---

## 18. Delete Circles

Expected behaviour:

    Delete Circle
         ↓
    Circle removed
         ↓
    People remain
         ↓
    circle_id = NULL
         ↓
    Uncategorised

### Test

- [ ] Empty circle deletion
- [ ] Circle containing one person
- [ ] Circle containing many people
- [ ] People survive
- [ ] People appear under Uncategorised
- [ ] Calendar still works
- [ ] Filters update

### Completion criteria

People and Circles are fully persistent and editable.

---

# Milestone 1 — Database-Backed Confetti

STOP here and perform a full regression test.

### Data

- [ ] People loaded from Supabase
- [ ] Circles loaded from Supabase
- [ ] Add person
- [ ] Edit person
- [ ] Delete person
- [ ] Create circle
- [ ] Edit circle
- [ ] Delete circle
- [ ] Change circle membership
- [ ] Uncategorised works

### UI

- [ ] Calendar
- [ ] Selected Day
- [ ] Next Up
- [ ] Upcoming
- [ ] Circles
- [ ] Circle filters
- [ ] Profile
- [ ] Add Birthday
- [ ] Reminders UI unaffected

### Persistence

- [ ] Full refresh preserves changes
- [ ] Browser restart preserves changes

### Responsive

- [ ] Mobile still works
- [ ] Desktop still works
- [ ] Bottom sheets still work
- [ ] No new overflow issues

Do not start authentication until this milestone is stable.

---

# Phase 11 — Authentication

Now Confetti moves from:

    one application's data

to:

    individual users' data

---

## 19. Understand Supabase Auth

Before implementing the UI, understand:

    Authentication
         =
    "Who are you?"

This is different from:

    Authorization
         =
    "What are you allowed to access?"

### Topics

- [ ] Supabase users
- [ ] Sessions
- [ ] Cookies
- [ ] Server-side session access
- [ ] Client-side auth state where needed
- [ ] Login persistence

---

## 20. Choose authentication method

Possible initial options:

- [ ] Email/password
- [ ] Magic link
- [ ] Google

Start with the simplest experience appropriate for Confetti.

Additional providers can be added later.

---

## 21. Build authentication flow

### Tasks

- [ ] Sign up
- [ ] Log in
- [ ] Log out
- [ ] Persist session
- [ ] Handle invalid login
- [ ] Handle expired session
- [ ] Protect authenticated application routes
- [ ] Redirect logged-out users appropriately
- [ ] Avoid unnecessary client-side auth checks where the server can handle them

### Completion criteria

Confetti reliably knows which authenticated user is using the application.

---

# Phase 12 — User Ownership

Authentication alone does not make the data private.

Now associate application data with users.

---

## 22. Add ownership to the schema

Schema evolves toward:

    auth.users
         │
         ├──────────────┐
         ↓              ↓
       people         circles
       user_id        user_id

### Tasks

- [ ] Add `user_id` to people
- [ ] Add `user_id` to circles
- [ ] Add appropriate foreign keys
- [ ] Decide NULL behaviour
- [ ] Migrate existing development data
- [ ] New people automatically belong to current user
- [ ] New circles automatically belong to current user

---

## 23. Scope reads to the current user

Conceptually:

    Logged-in user
          ↓
      getPeople()
          ↓
    only their people

and:

    Logged-in user
          ↓
     getCircles()
          ↓
    only their circles

### Completion criteria

Different users see different Confetti data.

---

# Phase 13 — Row Level Security

This is one of the most important learning phases.

---

## 24. Understand RLS

The distinction:

    Authentication
          ↓
    Who are you?

    Authorization / RLS
          ↓
    Which database rows
    can you access?

Do not rely solely on application code such as:

    .eq("user_id", user.id)

for security.

The database itself should reject unauthorised access.

---

## 25. Add RLS to `people`

Policies should ensure a user can only:

- [ ] SELECT their own people
- [ ] INSERT their own people
- [ ] UPDATE their own people
- [ ] DELETE their own people

### Test

Attempts to access another user's rows should fail even if application-level filtering is bypassed.

---

## 26. Add RLS to `circles`

Policies should ensure a user can only:

- [ ] SELECT their own circles
- [ ] INSERT their own circles
- [ ] UPDATE their own circles
- [ ] DELETE their own circles

Also consider relationship integrity:

A user should not be able to assign one of their people to another user's circle.

### Completion criteria

Database security matches the ownership model.

---

# Phase 14 — Multi-User Security Testing

## 27. Create two test accounts

Create:

    Account A

and:

    Account B

Give them different:

- people
- birthdays
- circles
- gift notes

---

## 28. Test isolation

Verify:

- [ ] A sees A's people
- [ ] A sees A's circles
- [ ] B sees B's people
- [ ] B sees B's circles
- [ ] A cannot read B's people
- [ ] A cannot edit B's people
- [ ] A cannot delete B's people
- [ ] A cannot read B's circles
- [ ] A cannot modify B's circles
- [ ] B cannot access A's data
- [ ] Invalid direct database/API operations are rejected

### Completion criteria

User isolation is enforced by the database rather than merely hidden by the UI.

---

# Milestone 2 — Real Multi-User Confetti

At this point Confetti has:

- [ ] PostgreSQL persistence
- [ ] People CRUD
- [ ] Circle CRUD
- [ ] Authentication
- [ ] User ownership
- [ ] Row Level Security
- [ ] Multi-user isolation

The application is now fundamentally a real multi-user product rather than a frontend prototype.

---

# Phase 15 — Persist Reminder Settings

The Reminders UI already exists.

Now make the settings real.

Do NOT send reminders yet.

---

## 29. Design reminder preference data

Potential information:

    1 week before    on/off
    1 day before     on/off
    On the day       on/off

    Delivery time

    Email enabled
    Push enabled

    Timezone

### Decisions

- [ ] One preferences row per user?
- [ ] How reminder offsets are represented
- [ ] Time representation
- [ ] Timezone representation
- [ ] Default settings
- [ ] Email setting
- [ ] Push setting

Do not overdesign per-person reminder overrides yet unless they are required for current functionality.

---

## 30. Create reminder preferences table

### Tasks

- [ ] Create schema
- [ ] Associate with authenticated user
- [ ] Add appropriate constraints
- [ ] Add RLS
- [ ] Define defaults

---

## 31. Connect Reminders UI

Target:

    Reminders UI
         ↓
    User changes setting
         ↓
       Supabase
         ↓
    Persistent preference

### Tasks

- [ ] Fetch settings
- [ ] Display current settings
- [ ] Toggle schedule settings
- [ ] Update delivery time
- [ ] Toggle email
- [ ] Store push preference if appropriate
- [ ] Handle pending state
- [ ] Handle errors

### Test

- [ ] Change settings
- [ ] Refresh browser
- [ ] Settings persist
- [ ] Log out/in
- [ ] Settings persist
- [ ] Account A settings don't affect Account B

### Completion criteria

Reminder preferences are persistent user data.

---

# Phase 16 — Web V1 Hardening

Before introducing actual scheduled reminders or a mobile app, stabilise the web application.

---

## 32. Loading states

Review:

- [ ] Initial Calendar load
- [ ] Upcoming
- [ ] Circles
- [ ] Profile
- [ ] Add Birthday mutations
- [ ] Circle mutations
- [ ] Authentication
- [ ] Reminder preferences

Avoid unnecessary loading UI if Server Components can render complete data.

---

## 33. Error states

Handle:

- [ ] Supabase unavailable
- [ ] Query failure
- [ ] Mutation failure
- [ ] Auth failure
- [ ] Validation failure
- [ ] Missing record
- [ ] Invalid route/state

Errors should be useful without exposing sensitive implementation details.

---

## 34. Empty states

Test:

- [ ] Brand-new account
- [ ] No birthdays
- [ ] No upcoming birthdays
- [ ] No circles
- [ ] All people uncategorised
- [ ] Empty selected date

A brand-new user's first experience is particularly important.

---

## 35. Accessibility regression

Recheck:

- [ ] Keyboard navigation
- [ ] Focus containment
- [ ] Focus restoration
- [ ] Forms
- [ ] Error messages
- [ ] Dialogs
- [ ] Bottom sheets
- [ ] Profile drawer
- [ ] Authentication forms

---

## 36. Responsive regression

Recheck approximately:

- [ ] 320px
- [ ] 375px
- [ ] 390px
- [ ] 430px
- [ ] 440px
- [ ] Tablet
- [ ] Desktop

Database integration should not accidentally destabilise the completed responsive work.

---

## 37. Production environment

### Tasks

- [ ] Configure Vercel environment variables
- [ ] Confirm production Supabase configuration
- [ ] Ensure secrets are not exposed
- [ ] Production build passes
- [ ] Lint passes
- [ ] TypeScript passes
- [ ] Deploy
- [ ] Test production authentication
- [ ] Test production CRUD
- [ ] Test RLS in production
- [ ] Test on real mobile device

### Completion criteria

Confetti Web V1 is stable and usable.

---

# Milestone 3 — Confetti Web V1

At this point:

- [ ] Responsive UI complete
- [ ] Real PostgreSQL database
- [ ] People CRUD
- [ ] Circle CRUD
- [ ] Authentication
- [ ] User-specific data
- [ ] RLS
- [ ] Persistent reminder preferences
- [ ] Production deployment
- [ ] Mobile web tested
- [ ] Desktop tested

This is the point where the core web product is complete.

---

# Phase 17 — Email Reminder Engine

Only start actual reminder delivery after the underlying data and user model are stable.

---

## 38. Design reminder calculation

Conceptually:

    People
      +
    Birthday dates
      +
    Reminder preferences
      +
    User timezone
      +
    Current date/time
          ↓
    Which reminders are due?

### Consider

- [ ] Birthday occurrence calculation
- [ ] Unknown birth year
- [ ] Leap-day birthdays
- [ ] User timezone
- [ ] Reminder offsets
- [ ] Delivery time
- [ ] Disabled reminders

Keep reminder calculation separate from email delivery.

---

## 39. Scheduled execution

Introduce a mechanism that periodically asks:

    Are any reminders due?

### Understand

This is different from a normal request/response flow.

The user does not need to have Confetti open for a reminder to be sent.

Potential architecture:

    Scheduler
        ↓
    Reminder job
        ↓
    Supabase
        ↓
    Find due reminders
        ↓
    Delivery service

---

## 40. Email delivery

Likely use a transactional email provider such as Resend.

Target:

    Reminder due
        ↓
    Generate message
        ↓
    Send email
        ↓
    Record successful delivery

### Tasks

- [ ] Configure email provider
- [ ] Create email template
- [ ] Send test email
- [ ] Connect reminder engine
- [ ] Handle provider errors
- [ ] Record sends

---

## 41. Prevent duplicate reminders

This is important.

If a scheduler runs multiple times, Confetti must not send:

    Happy Birthday reminder
    Happy Birthday reminder
    Happy Birthday reminder

for the same event.

Design idempotency/delivery records.

### Test

- [ ] Scheduler runs twice
- [ ] Reminder sent once
- [ ] Failed sends can retry appropriately
- [ ] Preference changes are respected

### Completion criteria

Confetti can reliably send real birthday email reminders.

---

# Phase 18 — Prepare for Mobile

Do not immediately create a monorepo just because a mobile app is planned.

First determine what is genuinely reusable.

---

## 42. Review shared domain logic

Potentially reusable:

- [ ] Person types
- [ ] Circle types
- [ ] Reminder types
- [ ] Birthday calculations
- [ ] Upcoming birthday calculations
- [ ] Validation schemas
- [ ] API/data contracts
- [ ] Date utilities

Probably not directly reusable:

- [ ] Next.js components
- [ ] Tailwind web UI
- [ ] HTML-specific components
- [ ] BottomSheet implementation
- [ ] Web navigation

Principle:

    Share domain logic.

Do not force web and native UI to share implementation merely because they represent the same design.

---

# Phase 19 — Monorepo

Only introduce this once there is meaningful shared code.

Potential structure:

    confetti/
      apps/
        web/
        mobile/

      packages/
        domain/
        validation/
        types/

Exact structure should be driven by real reuse.

### Tasks

- [ ] Move web app into workspace structure
- [ ] Extract genuinely shared domain logic
- [ ] Extract validation
- [ ] Extract shared types where appropriate
- [ ] Ensure web still builds
- [ ] Avoid unnecessary packages

### Completion criteria

The monorepo exists because there is real code worth sharing, not simply because there are two apps.

---

# Phase 20 — Mobile App

## 43. Create mobile application

Likely React Native / Expo.

### Initial goal

Do not immediately recreate every feature.

First prove:

    Mobile app
        ↓
    Authentication
        ↓
    Supabase
        ↓
    User's birthdays

### Tasks

- [ ] Create mobile app
- [ ] Connect Supabase
- [ ] Authentication
- [ ] Fetch people
- [ ] Fetch circles
- [ ] Display basic Calendar/Upcoming data

---

## 44. Rebuild Confetti UI natively

Recreate the existing visual language using native components.

### Features

- [ ] Mobile navigation
- [ ] Calendar
- [ ] Upcoming
- [ ] Circles
- [ ] Add Birthday
- [ ] Selected Day sheet
- [ ] Profile
- [ ] Reminders

Reuse domain logic where appropriate.

Do not try to directly reuse web HTML/Tailwind components.

---

# Phase 21 — Push Notifications

Once the mobile app exists, add real push delivery.

---

## 45. Device registration

Conceptually:

    User installs app
          ↓
    Notification permission
          ↓
    Device receives push token
          ↓
    Token stored against user

### Tasks

- [ ] Request permission appropriately
- [ ] Obtain push token
- [ ] Store token
- [ ] Handle token refresh/expiry
- [ ] Handle multiple devices

---

## 46. Connect push to reminder engine

The reminder engine should not care whether delivery is email or push until the delivery stage.

Target architecture:

                    Reminder engine
                          ↓
                    Reminder due
                          ↓
                 User preferences
                          ↓
                 ┌────────┴────────┐
                 ↓                 ↓
               Email             Push
                 ↓                 ↓
              Resend             Expo /
                              push provider

### Completion criteria

Users can receive birthday reminders without opening Confetti.

---

# Phase 22 — Final Product Hardening

## 47. Reminder edge cases

Test:

- [ ] Timezones
- [ ] Daylight-saving changes
- [ ] Feb 29 birthdays
- [ ] Birthday edited after reminder scheduled
- [ ] Person deleted
- [ ] User changes reminder settings
- [ ] User changes delivery time
- [ ] User disables email
- [ ] Push token expires
- [ ] Multiple devices
- [ ] Failed email
- [ ] Failed push
- [ ] Duplicate scheduler execution

---

## 48. Product testing

Test complete user journeys.

### New user

    Sign up
      ↓
    Empty Confetti
      ↓
    Add Circle
      ↓
    Add Birthday
      ↓
    Calendar
      ↓
    Upcoming
      ↓
    Reminder

### Existing user

    Log in
      ↓
    Existing birthdays
      ↓
    Edit person
      ↓
    Move circle
      ↓
    Change reminder settings

### Multi-device

    Web
      ↕
    Supabase
      ↕
    Mobile

Changes should remain consistent.

---

# Final Roadmap Overview

## Stage 1 — UI

- [x] Desktop UI
- [x] Responsive UI
- [x] Mobile navigation
- [x] Mobile sheets
- [x] Calendar
- [x] Upcoming
- [x] Circles
- [x] Profile
- [x] Add Birthday UI
- [x] Reminders UI

---

## Stage 2 — Database

- [ ] Supabase project
- [ ] Supabase connection
- [ ] People schema
- [ ] Circles schema
- [ ] Seed data
- [ ] People reads
- [ ] Circle reads
- [ ] Data layer cleanup

---

## Stage 3 — CRUD

- [ ] Add person
- [ ] Validation
- [ ] Mutation states
- [ ] Edit person
- [ ] Delete person
- [ ] Create circle
- [ ] Edit circle
- [ ] Delete circle
- [ ] Circle membership

---

## Stage 4 — Users & Security

- [ ] Supabase Auth
- [ ] Login
- [ ] Signup
- [ ] Logout
- [ ] Protected app
- [ ] User ownership
- [ ] People RLS
- [ ] Circle RLS
- [ ] Two-account security testing

---

## Stage 5 — Reminder Persistence

- [ ] Reminder schema
- [ ] Fetch reminder preferences
- [ ] Update reminder preferences
- [ ] Reminder RLS

---

## Stage 6 — Web V1

- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Accessibility regression
- [ ] Responsive regression
- [ ] Production configuration
- [ ] Production deployment
- [ ] Real-device testing

---

## Stage 7 — Reminder Delivery

- [ ] Reminder calculation engine
- [ ] Timezones
- [ ] Scheduled execution
- [ ] Email provider
- [ ] Email reminders
- [ ] Delivery records
- [ ] Idempotency
- [ ] Retry handling

---

## Stage 8 — Mobile

- [ ] Identify shared domain logic
- [ ] Monorepo
- [ ] Mobile app shell
- [ ] Mobile authentication
- [ ] Mobile Supabase integration
- [ ] Native Calendar
- [ ] Native Upcoming
- [ ] Native Circles
- [ ] Native Add Birthday
- [ ] Native Profile
- [ ] Native Reminders

---

## Stage 9 — Push

- [ ] Notification permissions
- [ ] Device tokens
- [ ] Token persistence
- [ ] Push provider
- [ ] Reminder → push delivery
- [ ] Multiple devices
- [ ] Expired tokens
- [ ] Push failure handling

---

# Immediate Next Steps

Do not work ahead into authentication, reminders or mobile yet.

The next sequence is:

    1. Create Supabase project
              ↓
    2. Connect Next.js
              ↓
    3. Design people schema
              ↓
    4. Design circles schema
              ↓
    5. Create tables
              ↓
    6. Seed test data
              ↓
    7. Replace getPeople()
              ↓
    8. Replace getCircles()

## First working milestone

The immediate target is:

> Open Confetti and see exactly the same Calendar, Upcoming, Circles and Profile UI I have now — but every person and circle displayed on screen has come from PostgreSQL through Supabase rather than local mock data.

Only once that works cleanly should I start connecting Add Birthday to INSERT.