# Memo App

A simple memo application built with React frontend and Supabase backend.

## Features

- Add, view, edit, and delete memos
- Real-time data synchronization with Supabase
- Deployed on GitHub Pages

## Setup

1. Clone this repository.
2. Install dependencies: `npm install`
3. Set up Supabase:
   - Go to [Supabase](https://supabase.com) and create an account if you don't have one.
   - Create a new project.
   - In the Supabase dashboard, go to the SQL Editor.
   - Run the following SQL script to create the `memos` table:

     ```sql
     CREATE TABLE memos (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       title TEXT NOT NULL,
       content TEXT NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );
     ```

   - Go to Settings > API in the Supabase dashboard.
   - Copy the Project URL and the anon public key.
4. Update `src/App.js`:
   - Replace `'YOUR_SUPABASE_URL'` with your Project URL.
   - Replace `'YOUR_SUPABASE_ANON_KEY'` with your anon public key.
5. Run locally: `npm start`
6. Deploy to GitHub Pages: `npm run deploy` (after pushing to GitHub)

## Technologies

- **Frontend**: React
  - Component-based architecture for modular UI
  - Hooks (useState, useEffect) for state management
  - Responsive CSS for mobile compatibility
- **Backend**: Supabase
  - PostgreSQL database for data storage
  - Real-time API for CRUD operations
  - Row Level Security (RLS) for data protection
- **Deployment**: GitHub Pages
  - Static site hosting for the React app
  - Automated deployment via GitHub Actions (gh-pages package)
- **Styling**: CSS
  - Custom CSS with media queries for responsive design
  - Mobile-first approach for optimal mobile experience

## Architecture and Data Flow

### Application Architecture

The app follows a client-server architecture:

- **Client (React App)**: Handles UI rendering, user interactions, and state management
- **Server (Supabase)**: Provides database storage and API endpoints

### Data Flow

1. **Initialization**:
   - App loads and initializes Supabase client with URL and API key
   - `useEffect` hook fetches existing memos from Supabase on component mount

2. **Adding a Memo**:
   - User fills the form and clicks "Add Memo"
   - Form data is sent to Supabase via `supabase.from('memos').insert()`
   - On success, new memo is added to local state and UI updates

3. **Viewing Memos**:
   - Memos are displayed in a list from local state
   - Data is fetched once on load and updated after each CRUD operation

4. **Editing a Memo**:
   - User clicks "Edit" button on a memo item
   - Inline editing mode activates with pre-filled form
   - User modifies and saves changes
   - Update request sent to Supabase via `supabase.from('memos').update()`
   - Local state updated on success

5. **Deleting a Memo**:
   - User clicks "Delete" button
   - Confirmation (implicit via UI) and delete request to Supabase
   - Memo removed from local state and UI

### Database Schema

```sql
CREATE TABLE memos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,  -- Unique identifier
  title TEXT NOT NULL,                             -- Memo title
  content TEXT NOT NULL,                           -- Memo content
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() -- Creation timestamp
);
```

### API Interactions

- **Read**: `supabase.from('memos').select('*').order('created_at', { ascending: false })`
- **Create**: `supabase.from('memos').insert([{ title, content }])`
- **Update**: `supabase.from('memos').update({ title, content }).eq('id', id)`
- **Delete**: `supabase.from('memos').delete().eq('id', id)`

All operations are asynchronous and use promises for error handling.
