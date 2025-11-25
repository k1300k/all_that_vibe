export type MCPCategory = 'strategy' | 'structure' | 'resource' | 'dev';

export type NodeStatus = 'idle' | 'loading' | 'success' | 'error';

export interface MCPNodeData {
    label: string;
    category: MCPCategory;
    description: string;
    inputs: {
        userPrompt: string;
        upstreamData: string;
    };
    systemPromptTemplate: string;
    outputResult: string;
    status: NodeStatus;
}

export interface MCPNode {
    id: string;
    type: 'mcpNode';
    position: { x: number; y: number };
    data: MCPNodeData;
}

export interface MCPEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
}

export interface MCPTemplate {
    id: string;
    label: string;
    category: MCPCategory;
    week: number;
    description: string;
    icon: string;
    systemPromptTemplate: string;
    inputPlaceholder: string;
}
