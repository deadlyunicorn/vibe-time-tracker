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
