# Task Manager App

A personal task manager mobile app built with React Native, Expo, and TypeScript.

---

## Important — Expo Go Version

This project uses **Expo SDK 54**. You must have **Expo Go version 54** installed on your phone.

> The latest Expo Go on the App Store / Play Store may be version 54 already. If you see an "incompatible version" error, see the troubleshooting section at the bottom of this file.

---

## Prerequisites

Make sure you have all of the following installed before you start:

| Tool | Minimum Version | How to check |
|------|----------------|--------------|
| Node.js | 18.x or higher | `node --version` |
| npm | 9.x or higher | `npm --version` |
| Expo Go (phone) | SDK 54 | Check in the app settings |

**Install Node.js:** https://nodejs.org (download the LTS version)

**Install Expo Go on your phone:**
- Android: [Play Store — Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
- iPhone: [App Store — Expo Go](https://apps.apple.com/app/expo-go/id982107779)

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/Germanium-Morina/technical-task.git
```

Then navigate into the project folder:

```bash
cd technical-task
```

---

## Step 2 — Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`. It may take 1–2 minutes the first time.

---

## Step 3 — Start the Development Server

```bash
npx expo start --clear
```

The `--clear` flag clears the Metro bundler cache — always use it on first run to avoid stale cache issues.

You will see a QR code in the terminal and a menu like this:

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

---

## Step 4 — Open the App on Your Phone

**Android:**
1. Open the **Expo Go** app
2. Tap **"Scan QR code"**
3. Point your camera at the QR code in the terminal

**iPhone:**
1. Open the default **Camera** app (not Expo Go)
2. Point it at the QR code
3. Tap the notification banner that appears at the top
4. This opens the app in Expo Go automatically

> Make sure your phone and your computer are connected to the **same Wi-Fi network**. The app will not load if they are on different networks.

---

## Alternative — Run on Emulator (no phone needed)

**Android emulator:**
1. Install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio → Virtual Device Manager → create a device → press Play
3. With the emulator running, press `a` in the Expo terminal

**iOS simulator (macOS only):**
1. Install Xcode from the Mac App Store
2. Press `i` in the Expo terminal

---

## Features

| Feature | Description |
|---------|-------------|
| Task list | Scrollable list of all your tasks |
| Add task | Form with title (required) and description (optional) |
| Toggle status | Tap the checkbox to mark a task done or pending |
| Delete task | Tap ✕ on any task (shows a confirmation alert) |
| Task detail | Full view of a task with action buttons |
| Input validation | Title must be at least 3 characters |
| Empty state | Friendly message when no tasks exist |
| Search | Real-time search by task title |
| Filter tabs | Filter by All / Pending / Completed |
| Persistence | Tasks are saved locally — survive app restarts |
| Tip of the Day | Motivational tip fetched from a public API |

---

## Public API

**Advice Slip API** — `https://api.adviceslip.com/advice`

- No API key required
- Returns a short motivational tip
- Displayed as a card at the top of the task list
- Refreshes each time the app loads

---

## Project Structure

```
Technical-Task/
├── App.tsx                        ← Navigation setup (entry point)
├── src/
│   ├── screens/
│   │   ├── TaskListScreen.tsx     ← Main screen with task list
│   │   ├── AddTaskScreen.tsx      ← Form to create a new task
│   │   └── TaskDetailScreen.tsx   ← View and manage a single task
│   ├── components/
│   │   ├── TaskItem.tsx           ← One row in the task list
│   │   ├── TipCard.tsx            ← API tip card at the top
│   │   ├── EmptyState.tsx         ← Shown when list is empty
│   │   ├── SearchBar.tsx          ← Search input
│   │   └── FilterTabs.tsx         ← All / Pending / Completed tabs
│   ├── hooks/
│   │   ├── useTasks.ts            ← All task logic (add, delete, toggle, persist)
│   │   └── useAdvice.ts           ← Fetches tip from public API
│   ├── storage/
│   │   └── taskStorage.ts         ← AsyncStorage read/write helpers
│   ├── types/
│   │   └── Task.ts                ← TypeScript Task interface
│   └── utils/
│       └── dateFormatter.ts       ← Formats ISO dates to readable strings
```

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React Native | 0.81.5 | Mobile framework |
| Expo SDK | 54 | Build tooling and device APIs |
| TypeScript | 5.9 | Type safety |
| React Navigation | 7 | Screen navigation |
| AsyncStorage | 2.2 | Local data persistence |
| Expo Vector Icons | 15 | UI icons (Ionicons) |

---

## Troubleshooting

**"Project is incompatible with this version of Expo Go"**
Your Expo Go app version does not match SDK 54. Update Expo Go from the App Store or Play Store.

**App does not load / QR code does not work**
Your phone and computer must be on the same Wi-Fi network. Disable any VPN or firewall that might block local connections.

**Metro bundler stuck or showing old code**
Stop the server (Ctrl+C) and restart with the clear flag:
```bash
npx expo start --clear
```

**`npm install` fails**
Make sure you are using Node.js 18 or higher:
```bash
node --version
```
If lower, download the latest LTS from https://nodejs.org
