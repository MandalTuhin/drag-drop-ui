import { defineStore } from 'pinia';

export interface Node {
  id: string;
  label: string;
}

export interface Container {
  id: string;
  name: string;
  maxCapacity: number;
  nodes: Node[];
}

export const useNodeStore = defineStore('nodeStore', {
  state: () => ({
    availableNodes: [] as Node[],
    workspaceContainers: [] as Container[],
  }),
  actions: {
    addContainer(name: string, capacity: number) {
      this.workspaceContainers.push({
        id: crypto.randomUUID(),
        name,
        maxCapacity: capacity,
        nodes: []
      });
    },
    // Logic to move nodes between containers
    moveNode(fromIndex: number, toIndex: number, fromContainerId: string, toContainerId: string) {
       // Implementation of DevExtreme reorder logic
    }
  }
});
