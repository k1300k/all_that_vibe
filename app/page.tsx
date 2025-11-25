'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MCPCanvas from '@/components/MCPCanvas';
import Toolbar from '@/components/Toolbar';
import WorkflowPanel from '@/components/WorkflowPanel';
import NodeSettingsPanel from '@/components/NodeSettingsPanel';
import { useFlowStore } from '@/store/useFlowStore';

export default function Home() {
    const [panelMode, setPanelMode] = useState<'save' | 'load' | null>(null);
    const { selectedNodeId } = useFlowStore();

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
            <Toolbar
                onSaveClick={() => setPanelMode('save')}
                onLoadClick={() => setPanelMode('load')}
            />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <MCPCanvas />
                {selectedNodeId && <NodeSettingsPanel />}
            </div>
            <WorkflowPanel
                isOpen={panelMode !== null}
                onClose={() => setPanelMode(null)}
                mode={panelMode || 'save'}
            />
        </div>
    );
}
