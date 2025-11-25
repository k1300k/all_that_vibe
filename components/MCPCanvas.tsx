'use client';

import React, { useCallback, useRef } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    BackgroundVariant,
    Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useFlowStore } from '@/store/useFlowStore';
import MCPNode from './nodes/MCPNode';
import { MCPNodeData } from '@/types/mcp';

const nodeTypes = {
    mcpNode: MCPNode,
};

export default function MCPCanvas() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
        useFlowStore();

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
            if (!reactFlowBounds) return;

            const templateData = event.dataTransfer.getData('application/reactflow');
            if (!templateData) return;

            const template = JSON.parse(templateData);

            // Calculate position relative to the canvas
            const position = {
                x: event.clientX - reactFlowBounds.left - 160,
                y: event.clientY - reactFlowBounds.top - 50,
            };

            const newNode: Node<MCPNodeData> = {
                id: `${template.id}-${Date.now()}`,
                type: 'mcpNode',
                position,
                data: {
                    label: template.label,
                    category: template.category,
                    description: template.description,
                    inputs: {
                        userPrompt: '',
                        upstreamData: '',
                    },
                    systemPromptTemplate: template.systemPromptTemplate,
                    outputResult: '',
                    status: 'idle',
                },
            };

            addNode(newNode);
        },
        [addNode]
    );

    return (
        <div ref={reactFlowWrapper} className="flex-1 h-screen">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                fitView
                className="bg-gray-50"
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={16}
                    size={1}
                    color="#e5e7eb"
                />
                <Controls className="bg-white rounded-lg shadow-md" />
                <MiniMap
                    className="bg-white rounded-lg shadow-md border border-gray-200"
                    nodeColor={(node) => {
                        const colors: Record<string, string> = {
                            strategy: '#10B981',
                            structure: '#3B82F6',
                            resource: '#8B5CF6',
                            dev: '#F59E0B',
                        };
                        return colors[(node.data as MCPNodeData)?.category] || '#6B7280';
                    }}
                />
            </ReactFlow>
        </div>
    );
}
