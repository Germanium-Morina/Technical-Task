# Task Manager App

A personal task manager built with React Native and Expo (TypeScript).

## Prerequisites

- Node.js 18+
- npm 9+
- [Expo Go](https://expo.dev/go) app installed on your iOS or Android device

## Setup & Run

```bash
git clone https://github.com/Germanium-Morina/technical-task.git
cd technical-task
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone, or press:
- `a` — Android emulator
- `i` — iOS simulator (macOS only)
- `w` — Browser (web)

## Features Implemented

- **Task list screen** — shows all tasks in a scrollable list
- **Add task** — form with title (required, min 3 chars) and optional description
- **Toggle status** — tap the circle checkbox to mark a task pending or completed
- **Delete task** — tap ✕ on a task row (with confirmation alert)
- **Task detail screen** — full view with status, description, and action buttons
- **Input validation** — empty or short title shows an inline error, blocks submission
- **Empty state** — friendly message when no tasks exist
- **Search** — real-time filter by task title
- **Filter tabs** — filter by All / Pending / Completed
- **AsyncStorage persistence** — tasks survive app restarts
- **Navigation** — stack navigation between List → Add → Detail screens
- **Tip of the Day** — motivational tip fetched from the Advice Slip API

## Public API

Uses the [Advice Slip API](https://api.adviceslip.com/advice) — no API key required.  
Returns a short motivational tip displayed at the top of the task list.

## Project Structure

```
src/
  screens/       TaskListScreen, AddTaskScreen, TaskDetailScreen
  components/    TaskItem, TipCard, EmptyState, SearchBar, FilterTabs
  hooks/         useTasks (CRUD + persistence), useAdvice (API)
  storage/       AsyncStorage helper functions
  types/         Task TypeScript interface
  utils/         Date formatter
App.tsx          Navigation setup
```

## Tech Stack

- React Native 0.85 + Expo SDK 56
- TypeScript
- React Navigation (Native Stack)
- AsyncStorage
- Advice Slip API
