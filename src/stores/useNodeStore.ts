import { defineStore } from 'pinia';
import initialNodes from '@/assets/data/nodes.json';
import { NodeService } from '@/services/nodeService';
import type { Node, Container, BackendResponse } from '@/types/workspace';

export type { Node, Container, BackendResponse };

export const useNodeStore = defineStore('nodeStore', {
  state: () => ({
    workspaceContainers: [] as Container[],
    availableNodes: NodeService.transformBackendNodes(initialNodes as BackendResponse),
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
        
        if (container) {
          // Rescue standard nodes (non-spacers) and return them to the sidebar
          const nodesToReturn = container.nodes.filter(n => n.label !== '[ || ]');
          this.availableNodes.push(...nodesToReturn);

          // Remove the container
          this.workspaceContainers.splice(containerIndex, 1);
        }
      }
    },
    isContainerNameUnique(name: string): boolean {
      const normalizedName = name.trim().toLowerCase();
      return !this.workspaceContainers.some(c => c.name.toLowerCase() === normalizedName);
    }
  }
});
