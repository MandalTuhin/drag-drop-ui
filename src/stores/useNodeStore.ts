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
      { id: 'spacer', label: '[ || ]' },
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
      const containerIndex = this.workspaceContainers.findIndex(c => c.id === containerId);
      if (containerIndex !== -1) {
        const container = this.workspaceContainers[containerIndex];
        
        // Rescue standard nodes (non-spacers) and return them to the sidebar
        const nodesToReturn = container.nodes.filter(n => n.label !== '[ || ]');
        this.availableNodes.push(...nodesToReturn);

        // Remove the container
        this.workspaceContainers.splice(containerIndex, 1);
      }
    },
    isContainerNameUnique(name: string): boolean {
      const normalizedName = name.trim().toLowerCase();
      return !this.workspaceContainers.some(c => c.name.toLowerCase() === normalizedName);
    }
  }
});
