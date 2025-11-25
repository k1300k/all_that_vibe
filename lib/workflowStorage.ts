import { Node, Edge } from 'reactflow';
import { MCPNodeData } from '@/types/mcp';

export interface WorkflowMetadata {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface SavedWorkflow {
    metadata: WorkflowMetadata;
    nodes: Node<MCPNodeData>[];
    edges: Edge[];
}

const STORAGE_KEY = 'mcp_workflows';

export function saveWorkflow(
    name: string,
    description: string,
    nodes: Node<MCPNodeData>[],
    edges: Edge[]
): WorkflowMetadata {
    const workflows = listWorkflows();

    const metadata: WorkflowMetadata = {
        id: `workflow_${Date.now()}`,
        name,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const workflow: SavedWorkflow = {
        metadata,
        nodes,
        edges,
    };

    workflows.push(workflow);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));

    return metadata;
}

export function loadWorkflow(id: string): SavedWorkflow | null {
    const workflows = listWorkflows();
    const workflow = workflows.find((w) => w.metadata.id === id);
    return workflow || null;
}

export function listWorkflows(): SavedWorkflow[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
        return JSON.parse(stored);
    } catch (error) {
        console.error('Failed to parse workflows:', error);
        return [];
    }
}

export function deleteWorkflow(id: string): void {
    const workflows = listWorkflows();
    const filtered = workflows.filter((w) => w.metadata.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function updateWorkflow(
    id: string,
    nodes: Node<MCPNodeData>[],
    edges: Edge[]
): void {
    const workflows = listWorkflows();
    const index = workflows.findIndex((w) => w.metadata.id === id);

    if (index !== -1) {
        workflows[index].nodes = nodes;
        workflows[index].edges = edges;
        workflows[index].metadata.updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));
    }
}
