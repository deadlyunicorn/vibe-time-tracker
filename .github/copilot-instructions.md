# Copilot Instructions for Time Tracker

This is a Next.js TypeScript time tracking application with MongoDB backend. The architecture follows specific patterns for organization and data flow.

## Architecture Overview

### Directory Structure
- `app/` - Next.js app router with API routes (`app/api/`) and UI pages (`app/(root)/`)  
- `lib/` - Core business logic organized by domain:
  - `client-service/` - Frontend API calls (fetches to `/api/*`)
  - `server-service/` - Server-side business logic  
  - `db/` - Database repositories with MongoDB operations
  - `errors/` - Custom error classes and handling
  - `utils/` - Shared utilities and helpers
- `components/` - Reusable UI components (shadcn/ui based)

### Key Patterns

**Namespace Organization**: All services use TypeScript namespaces:
```typescript
export namespace EntryService {
  export const create = async (body: CreateEntryBody) => { /* ... */ }
}

export namespace TimersRepository {
  export const getActiveTimer = async (userId: number) => { /* ... */ }
}
```

**Error Handling**: Use `Utils.alertOnError()` wrapper for consistent error display:
```typescript
Utils.alertOnError(async () => {
  await EntryService.deleteEntry({ userId, startTime });
  store.removeEntry(startTime);
  Utils.dispatchAlert({ summary: "Success", type: AlertType.Success });
});
```

**State Management**: Zustand store at `app/(root)/store/` with devtools integration. Always update both server and local state.

**API Layer**: Three-tier pattern:
1. Client service (`lib/client-service/`) - Makes fetch calls
2. API route (`app/api/`) - Validates with Zod, calls repository  
3. Repository (`lib/db/`) - Direct MongoDB operations

## Development Workflows

**Local Development**:
```bash
cd application
npm run dev  # Starts on port 3000
```

**Database Setup**: Requires `MONGODB_URI` in `.env`. Uses collections: `entries`, `users`.

**Key Entity**: `TimeEntry` identified by `startTime` (not traditional ID):
```typescript
interface TimeEntry {
  project: string;
  topic: string; 
  startTime: number; // Unix timestamp, primary identifier
  endTime?: number;
  description?: string | null;
}
```

## Critical Conventions

**Authentication**: Simple localStorage-based with `UserService.getCurrentUserId()`. No JWT/sessions.

**Time Entry Lifecycle**:
1. Create active timer (`endTime` undefined)
2. Update timer (change project/topic while active)
3. Finalize timer (set `endTime`)
4. Display in entries list
5. Soft deletion! We don't remove database entries. We simply add a "deletedAt" attribute.

**Component Organization**: UI components follow atomic design - buttons in action components, confirm dialogs for destructive actions.

**Validation**: Zod schemas in API routes, custom validators in `lib/validators/`.


**Naming conventions**: Always give meaninigful names. Abbreviations are prohibited, 
  e.g. 
  sw -> BAD
  service_worker -> GOOD!

**No hard-coded strings**: If a text string is going to be used in more than one place then it needs to be a constant.

**"ANY" will get you in prison**: :any type is not allowed. We use typescript. Everything must have an interface, else it is illegal.

**DRY**: Don't Repeat Yourself. If you find yourself writing the same code multiple times, consider refactoring it into a reusable function or component!

**Keeping history**: As your changes may not be committed immediately you need to keep an action log outside of .git. Make sure to ALWAYS update the "agent.log" file at the end of every prompt where you separate actions you have performed. This is MANDATORY - never skip updating the agent.log. The entries should look something like this:

---
<No. [entry index]> <Date [Unix MS since Epoch]>

[Actions...]
[TODOs... (not completed in this prompt)]
---

## Integration Points

**MongoDB**: Direct connection via `lib/db/mongodb.ts`, collections accessed through `getCollections()`.

**UI Framework**: shadcn/ui components with Tailwind CSS. Custom data attributes (`data-slot`) for styling.

**Icons**: Lucide React icons throughout.

**State Sync**: `StoreInitializer` component handles app boot, loads user data and active timer.

## Common Tasks

**Adding new API endpoint**:
1. Create route in `app/api/[domain]/[action]/route.ts`
2. Add client service method in `lib/client-service/[domain]/`
3. Add repository method in `lib/db/[domain]/`
4. Update interfaces in `lib/interfaces/`

**Error Recovery**: All user actions wrapped in `Utils.alertOnError()` - errors show as toast notifications via `AlertListener` component.

**Command Execution**: Before attempting to run any command you should first check the OS you are currently using. The commands are different for Windows and Unix-based systems.

**Event Handling**: Use the `useEventListener` hook from `lib/hooks/useEventListener` for all event listeners instead of manually managing addEventListener/removeEventListener.

**Single Responsibility useEffects**: Each useEffect should have a single, clear purpose. Split complex effects into multiple focused effects:
```typescript
// BAD - multiple responsibilities in one effect
useEffect(() => {
  setInitialState();
  setupEventListeners();
  fetchData();
}, []);

// GOOD - separate focused effects
useEffect(() => {
  setInitialState();
}, []);

useEffect(() => {
  const cleanup = setupEventListeners();
  return cleanup;
}, []);

useEffect(() => {
  fetchData();
}, []);
```

**Event Listener Pattern**: Always use the useEventListener hook:
```typescript
import { useEventListener } from '@/lib/hooks/useEventListener';

// Use this instead of manual addEventListener
useEventListener('online', handleOnline);
useEventListener('offline', handleOffline);
```
