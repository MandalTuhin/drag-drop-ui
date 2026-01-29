import { defineStore } from 'pinia';

export interface Node {
  id: string;
  label: string;
}

export interface Container {
  id: string;
  name: string;
  numCol: number;
  nodes: Node[];
}

export const useNodeStore = defineStore('nodeStore', {
  state: () => ({
    workspaceContainers: [] as Container[],
    availableNodes: [
      { id: '1', label: 'Input Field' },
      { id: '2', label: 'Select Box' },
      { id: '3', label: 'Checkbox' },
      { id: '4', label: 'Text Area' },
      { id: '5', label: 'Date Picker' },
    ] as Node[],
  }),
  actions: {
    addContainer(name: string) {
      this.workspaceContainers.push({
        id: crypto.randomUUID(),
        name,
        numCol: 1,
        nodes: []
      });
    },
    updateContainerNumCol(containerId: string, numCol: number) {
      const container = this.workspaceContainers.find(c => c.id === containerId);
      if (container) {
        container.numCol = numCol > 0 ? numCol : 1; // Ensure numCol is at least 1
      }
    },
    updateContainerNodes(containerId: string, nodes: Node[]) {
      const container = this.workspaceContainers.find(c => c.id === containerId);
      if (container) {
        container.nodes = nodes;
      }
    },
    removeContainer(containerId: string) {
      this.workspaceContainers = this.workspaceContainers.filter(c => c.id !== containerId);
    }
  }
});
