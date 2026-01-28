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
