# Vue Drag-Drop Application Workflow

This document outlines the architecture and workflows of the Vue 3 + Pinia drag-and-drop system.

## 1. System Architecture

### Core Technologies
- **Vue 3 (Composition API)**: Frontend framework.
- **Pinia**: State management for workspace data.
- **VueDraggablePlus**: Library for drag-and-drop functionality (wrapper for SortableJS).
- **Tailwind CSS**: Styling.

### Data Model (`src/stores/useNodeStore.ts`)
- `Node`: `{ id: string, label: string }`
- `Container`: `{ id: string, name: string, numCol: number, nodes: Node[] }`
- `State`:
    - `availableNodes`: List of source elements in the sidebar.
    - `workspaceContainers`: List of containers currently in the workspace.

## 2. Component Hierarchy

```text
App.vue
├── NodeSidebarSource.vue (Source of draggable elements)
├── WorkSpace.vue (Main drop zone for containers)
│   ├── AddContainerForm.vue (Form to add new containers)
│   ├── DragIndicator.vue (Visual line between containers)
│   └── SubContainer.vue (Individual container wrapper)
│       ├── ContainerHeader.vue (Handle, Name, Col Config, Delete)
│       └── DraggableNodeGrid.vue (Internal grid for nodes)
│           ├── DragIndicators.vue (Visual lines between nodes)
│           └── NodeItem.vue (Individual draggable node)
└── TrashZone.vue (Drop zone to delete nodes)
```

## 3. Detailed Workflows

### A. Managing Containers (Top-Level)
1.  **Creation**: Use `AddContainerForm.vue` to trigger `store.addContainer(name)`.
2.  **Reordering**: `WorkSpace.vue` uses `VueDraggable` on `store.workspaceContainers`.
    - Handle: `.container-handle` (in `ContainerHeader.vue`).
    - Visual Feedback: `DragIndicator.vue` shows a yellow horizontal line where the container will be placed.
3.  **Deletion**: Triggered by the delete button in `ContainerHeader.vue` calling `store.removeContainer(id)`.
4.  **Layout**: `SubContainer.vue` updates `numCol` which determines the width of `NodeItem` wrappers via CSS grid logic in `DraggableNodeGrid.vue`.

### B. Managing Nodes (Inside Containers)
1.  **Dragging from Sidebar**:
    - `NodeSidebarSource.vue` uses `clone` mode.
    - When a node is dropped into a `DraggableNodeGrid.vue`, it's added to that container's `nodes` array.
2.  **Moving Between/Within Containers**:
    - `DraggableNodeGrid.vue` uses `group="nodeGroup"`.
    - This allows nodes to be dragged between different containers or rearranged within the same container.
3.  **Visual Indicators**:
    - `useDragIndicators.ts` tracks mouse position relative to nodes.
    - `DragIndicators.vue` displays a green vertical line (`indicatorSide`: 'left' | 'right') to show the exact insertion point.
4.  **Deletion**:
    - Nodes are dragged into `TrashZone.vue`.
    - The `onAdd` event in `TrashZone.vue` clears the internal `trash` ref, effectively removing the node from the store since `v-model` is synced.

## 4. State Synchronization
- Most `VueDraggable` components use `v-model` directly with store state or `computed` properties with `get/set`.
- This ensures that every drag action immediately updates the Pinia store, keeping the UI in sync with the underlying data.
