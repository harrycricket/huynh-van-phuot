## Identified issues

1. The filtering and sorting logic inside the useMemo hook may be inefficient due to the presence of nested function calls and potential unnecessary calculations. Additionally, the getPriority function is called multiple times within the filtering and sorting processes.
-> Improvement: Optimize the filtering and sorting by avoiding redundant calculations and consolidating operations.

2. The formattedBalances computation does not utilize useMemo, which may lead to unnecessary recalculations on every render.
--> Improvement: Memoize the formattedBalances computation to avoid recalculating it on every render.

3. The "lhsPriority" variable is used without being declared in the scope of the filtering function, which may lead to unintended results or errors.
--> Improvement: Ensure all variables are correctly declared and used within their intended scope.

4. The useMemo dependency array contains both balances and prices, which may lead to unnecessary recalculations of sortedBalances if either changes, even if it does not affect the sorting logic.
--> Improvement: Refactor to ensure that sortedBalances is only recalculated when necessary to reduce re-calculate sortedBalances to improve performance because logic to in sortedBalances so complex.

5. No key Property in list rendering.
--> Improvement: Use a unique and consistent identifier as the key.

## Explanation of refactor code to resolve the issues

1. Added useMemo hooks to formattedBalances and rows to ensure these calculations are only recomputed when their dependencies change.
2. Filter and sort operations are consolidated within a single useMemo to avoid redundant calculations.
3. Directly filtered out non-positive balances before sorting.
4. Changed key from index to balance.currency to ensure stable and unique keys for list items.
5. Added a blockchain property to WalletBalance to match the getPriority function requirement.
6. Used a dictionary for priorities in getPriority for clearer and more maintainable code.
7. Enhance getPriority instead of using switch case.
