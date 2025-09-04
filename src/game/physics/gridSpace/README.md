# Grid Space Collision System

## Overview
The Grid Space system provides efficient spatial indexing for collision detection by dividing the game world into a dynamically-sized grid of cells. The grid expands automatically as items move through the space, ensuring all items are always tracked. This allows the physics engine to quickly identify potential collisions by only checking items that occupy the same or neighbouring cells.

## Grid Dimensions
- **Cell size**: Each cell is 16×16×12 units (matching the game's block dimensions)
- **Initial state**: Starts completely empty (no cells allocated)
- **Dynamic sizing**: Cells are created on-demand as items are added
- **Coordinate system**: Supports negative coordinates without offset calculations
- **Sparse storage**: Only cells containing items are stored in memory

## Core Components

### GridSpace Class
The main class that manages the spatial index. It tracks which items occupy which cells and updates this mapping as items move through the game world.

### Data Structures
- **Cell Map**: `Map<string, Set<Item>>` - Maps cell coordinates (as "x,y,z" strings) to Sets of items occupying that cell
- **Item-to-Cells Map**: `Map<Item, Set<string>>` - Tracks which cells each item currently occupies for efficient updates when items move

### Key Features
- Maps `UnionOfAllItemInPlayTypes` items to their occupied grid cells
- Tracks which cells each item occupies for O(1) position updates
- No boundary tracking needed - supports infinite coordinate space
- Efficiently updates cell occupancy when items move via `updateItem`
- Provides efficient neighbour queries for collision detection
- Handles items that span multiple cells (based on their bounding boxes)
- Each cell stores a Set of items, allowing fast insertion/removal and duplicate prevention
- Prevents duplicate additions - throws error if item already exists in grid

## API Methods
- **addItem(item)**: Add a new item to the grid at its current position
- **removeItem(item)**: Remove an item from the grid completely
- **updateItem(item)**: Update an item's position in the grid after it has moved
- **iterateItemNeighbourhood(item)**: Generator yielding all items sharing cells with the given item

## Performance Benefits
- Reduces collision checks from O(n²) to approximately O(n)
- Particularly effective in rooms with many items spread across the space
- Sets provide O(1) add/remove/has operations for items in cells
- Item position updates are efficient - only affected cells are modified
- True sparse storage - empty cells are removed automatically
- String key generation is fast and predictable