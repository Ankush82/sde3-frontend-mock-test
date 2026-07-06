# Assessment: Product Inventory Dashboard

You've joined a project partway through. The previous engineer built out the
UI and wired up the data flow, but left a few bugs behind and didn't finish
a couple of features. Your job is **not** to rewrite this — it's to
understand the existing code, fix what's broken, and finish what's missing.

## Setup

```bash
npm install
npm test        # run the test suite once
npm run test:watch   # re-run on file changes
npm run dev      # run the app in the browser at http://localhost:5173
```

You may use an AI assistant (Claude, Cursor, Copilot, etc.) the way you
normally would on the job: to navigate the codebase faster, to explain why a
test is failing, or to sanity-check an approach. It should not be doing the
understanding for you — you need to be able to explain every change you make.

## Time box

Give yourself **90 minutes**, uninterrupted, before you look at anything else
(including the tests you haven't fixed yet). Treat it like the real thing.

## Task

Run `npm test`. You'll see a mix of passing and failing tests across these
files:

- `src/utils/sort.ts`
- `src/utils/filter.ts`
- `src/utils/paginate.ts`
- `src/hooks/useDebouncedValue.ts`
- `src/hooks/useProducts.ts`
- `src/components/ProductList.tsx`
- `src/components/Pagination.tsx`
- `src/components/ProductDetailModal.tsx`

Each of these files has a doc comment above the relevant function/component
describing what it's supposed to do — read those requirements before you
start changing code. Some failures are **bugs** (the logic is wrong). Some
are **missing features** (the function throws "not implemented" or a piece
of UI/branching was never written). A few files have both.

Your goal: make all tests pass, without changing what the tests assert
(the tests describe the spec — treat them as fixed).

When you're done, click around the running app (`npm run dev`) and confirm
it actually behaves correctly, not just that the test suite is green —
searching, filtering, sorting, paging, and opening/closing the product
modal should all work end to end.

## Suggested approach

1. Read `npm test` output top to bottom. Don't fix anything yet — just
   build a mental list of what's broken and group it into "bug" vs
   "not implemented".
2. Open each failing source file and read its doc comment and the adjacent
   passing tests first, to understand the intended contract before you
   touch anything.
3. Fix one file at a time, re-running its test file in isolation
   (`npx vitest run src/__tests__/sort.test.ts`), rather than editing
   several files and running the whole suite blind.
4. Once tests are green, verify in the browser.

## What this is evaluating

This isn't a DSA test. It's evaluating whether you can safely make changes
in a codebase you didn't write: do you read the failing assertion and the
surrounding code before editing, or do you guess-and-check? Do you notice
when a fix in one file (e.g. `paginate.ts`) is required before another
file's tests (`useProducts.ts`) can pass? Do you verify behavior in the
running app, not just in the test runner?
