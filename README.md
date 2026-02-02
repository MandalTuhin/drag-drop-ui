# Vue Drag & Drop Workspace

A powerful visual interface for building and managing nested layouts and node structures. This application allows users to drag components from a sidebar, organize them into containers, and export the final structure as JSON.

## 🚀 Features

- **Drag & Drop Interface**: Intuitive drag-and-drop system powered by `vue-draggable-plus`.
- **Nested Structures**: Create and manage deep hierarchies with nested containers.
- **Node Sidebar**: A collection of draggable source nodes ready to be placed in the workspace.
- **Workspace Management**: Organize nodes, reorder items, and manage complex layouts visually.
- **Trash Zone**: Easily remove items by dragging them to the trash area.
- **Persistence & Export**:
  - Automatically saves layout to LocalStorage.
  - Export layout configuration as a JSON file.
- **Modern UI**: Clean, responsive design built with Tailwind CSS and Lucide Icons.

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Drag & Drop**: [vue-draggable-plus](https://vue-draggable-plus.pages.dev/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/)

## 📦 Project Setup

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm

### Installation

```sh
npm install
```

### Development

Start the development server with hot-reload:

```sh
npm run dev
```

### Production Build

Type-check and build for production:

```sh
npm run build
```

### Testing

Run unit tests:

```sh
npm run test:unit
```

### Linting & Formatting

Lint and fix files:

```sh
npm run lint
```