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

- React
- Supabase
- GitHub Pages
