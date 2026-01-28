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
    availableNodes: [
      { id: '1', label: 'Input Field' },
      { id: '2', label: 'Select Box' },
      { id: '3', label: 'Checkbox' },
      { id: '4', label: 'Text Area' },
      { id: '5', label: 'Date Picker' },
    ] as Node[],
    workspaceContainers: [] as Container[],
  }),
  actions: {
    addContainer(name: string, numCol: number) {
      this.workspaceContainers.push({
        id: crypto.randomUUID(),
        name,
        numCol: numCol > 0 ? numCol : 1,
        nodes: []
      });
    },
    updateContainerNumCol(containerId: string, numCol: number) {
      const container = this.workspaceContainers.find(c => c.id === containerId);
      if (container) {
        container.numCol = numCol > 0 ? numCol : 1;
      }
    },
    removeContainer(containerId: string) {
      this.workspaceContainers = this.workspaceContainers.filter(c => c.id !== containerId);
    },
    reorderContainers(fromIndex: number, toIndex: number) {
      const list = [...this.workspaceContainers];
      const [movedItem] = list.splice(fromIndex, 1);
      if (movedItem) {
        list.splice(toIndex, 0, movedItem);
        this.workspaceContainers = list;
      }
    },
    addNodeToContainer(containerId: string, node: Node, toIndex: number) {
      const container = this.workspaceContainers.find(c => c.id === containerId);
      if (container) {
        const newNode = { ...node, id: crypto.randomUUID() };
        container.nodes.splice(toIndex, 0, newNode);
        return true;
      }
      return false;
    },
    moveNodeBetweenContainers(fromContainerId: string, toContainerId: string, fromIndex: number, toIndex: number) {
      const fromContainer = this.workspaceContainers.find(c => c.id === fromContainerId);
      const toContainer = this.workspaceContainers.find(c => c.id === toContainerId);

      if (fromContainer && toContainer) {
        if (fromContainerId === toContainerId) {
          const [movedNode] = fromContainer.nodes.splice(fromIndex, 1);
          if (movedNode) {
            fromContainer.nodes.splice(toIndex, 0, movedNode);
          }
        } else {
          const [movedNode] = fromContainer.nodes.splice(fromIndex, 1);
          if (movedNode) {
            toContainer.nodes.splice(toIndex, 0, movedNode);
          }
        }
      }
    },
    removeNode(containerId: string, nodeIndex: number) {
      const container = this.workspaceContainers.find(c => c.id === containerId);
      if (container) {
        container.nodes.splice(nodeIndex, 1);
      }
    }
  }
});