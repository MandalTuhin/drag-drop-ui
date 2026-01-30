import type { BackendResponse, Node } from '@/types/workspace'

/**
 * NodeService handles all data transformations and API interactions
 * related to draggable nodes.
 */
export const NodeService = {
  /**
   * Transforms the raw Vardef response from the backend into 
   * a format the frontend workspace can use.
   */
  transformBackendNodes(data: BackendResponse): Node[] {
    // 1. Map backend entries to our Node interface
    const nodes: Node[] = Object.entries(data).map(([id, vardef]) => ({
      id,
      label: vardef.label || id // Fallback to id if label is missing
    }))

    // 2. Inject frontend-only utility nodes (like the spacer)
    nodes.push({ id: 'spacer', label: '[ || ]' })

    return nodes
  }
}
