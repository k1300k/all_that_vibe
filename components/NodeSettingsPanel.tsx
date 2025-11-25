'use client';

import React from 'react';
import { X, Play, Trash2, Copy, ArrowRight, Clock } from 'lucide-react';
import { useFlowStore } from '@/store/useFlowStore';
import { getCategoryColor, getWeekColor } from '@/config/mcpTemplates';

export default function NodeSettingsPanel() {
    const { nodes, edges, selectedNodeId, setSelectedNodeId, executeNode, updateNodeData } = useFlowStore();

    const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null;

    if (!selectedNode) return null;

    // Find connected nodes
    const upstreamNodes = edges
        .filter((e) => e.target === selectedNodeId)
        .map((e) => nodes.find((n) => n.id === e.source))
        .filter(Boolean);

    const downstreamNodes = edges
        .filter((e) => e.source === selectedNodeId)
        .map((e) => nodes.find((n) => n.id === e.target))
        .filter(Boolean);

    const handleClose = () => {
        setSelectedNodeId(null);
    };

    const handleRun = async () => {
        if (selectedNodeId) {
            await executeNode(selectedNodeId);
        }
    };

    const categoryColor = getCategoryColor(selectedNode.data.category);

    // Determine week from category (simplified)
    const weekNumber =
        selectedNode.data.category === 'strategy' ? 1 :
            selectedNode.data.category === 'structure' ? 2 :
                selectedNode.data.category === 'resource' ? 3 : 4;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-20 z-30 lg:hidden"
                onClick={handleClose}
            />

            {/* Panel */}
            <div className="fixed lg:relative right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-xl z-40 flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="font-bold text-sm text-gray-900">Node Settings</h3>
                    <button
                        onClick={handleClose}
                        className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Node Info */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Node Information
                        </h4>
                        <div
                            className="p-3 rounded-lg border-l-4"
                            style={{
                                backgroundColor: `${categoryColor}08`,
                                borderLeftColor: categoryColor,
                            }}
                        >
                            <div className="flex items-start gap-2 mb-2">
                                <span className="text-xl">
                                    {selectedNode.data.label.includes('시장') ? '🔍' :
                                        selectedNode.data.label.includes('경쟁') ? '⚔️' :
                                            selectedNode.data.label.includes('페르소나') ? '👤' :
                                                selectedNode.data.label.includes('컨셉') ? '💡' :
                                                    selectedNode.data.label.includes('정의') ? '🎯' :
                                                        selectedNode.data.label.includes('IA') ? '🏗️' :
                                                            selectedNode.data.label.includes('User') ? '📝' :
                                                                selectedNode.data.label.includes('PRD') ? '📋' :
                                                                    selectedNode.data.label.includes('명세서') ? '📊' :
                                                                        selectedNode.data.label.includes('테스트') ? '✅' :
                                                                            selectedNode.data.label.includes('Code') ? '💻' :
                                                                                selectedNode.data.label.includes('Vibe') ? '🚀' : '✨'}
                                </span>
                                <div className="flex-1">
                                    <h5 className="font-semibold text-sm text-gray-900">
                                        {selectedNode.data.label}
                                    </h5>
                                    <p className="text-xs text-gray-600 mt-0.5">
                                        {selectedNode.data.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <span
                                    className="px-2 py-0.5 rounded-full font-medium"
                                    style={{
                                        backgroundColor: getWeekColor(weekNumber),
                                        color: 'white',
                                    }}
                                >
                                    Week {weekNumber}
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                    {selectedNode.data.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Status
                        </h4>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <div
                                className={`w-2.5 h-2.5 rounded-full ${selectedNode.data.status === 'idle' ? 'bg-gray-400' :
                                    selectedNode.data.status === 'loading' ? 'bg-blue-500 animate-pulse' :
                                        selectedNode.data.status === 'success' ? 'bg-green-500' :
                                            'bg-red-500'
                                    }`}
                            />
                            <span className="text-sm font-medium text-gray-700">
                                {selectedNode.data.status === 'idle' ? '대기' :
                                    selectedNode.data.status === 'loading' ? '실행 중...' :
                                        selectedNode.data.status === 'success' ? '완료' :
                                            '오류'}
                            </span>
                        </div>
                    </div>

                    {/* Connections */}
                    {(upstreamNodes.length > 0 || downstreamNodes.length > 0) && (
                        <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Connections
                            </h4>
                            <div className="space-y-2">
                                {upstreamNodes.length > 0 && (
                                    <div>
                                        <p className="text-xs text-gray-600 mb-1.5 flex items-center gap-1">
                                            <ArrowRight className="w-3 h-3 rotate-180" />
                                            Upstream ({upstreamNodes.length})
                                        </p>
                                        <div className="space-y-1 pl-4">
                                            {upstreamNodes.map((node) => (
                                                <div
                                                    key={node!.id}
                                                    className="text-xs py-1.5 px-2 bg-blue-50 border border-blue-200 rounded text-blue-900"
                                                >
                                                    {node!.data.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {downstreamNodes.length > 0 && (
                                    <div>
                                        <p className="text-xs text-gray-600 mb-1.5 flex items-center gap-1">
                                            <ArrowRight className="w-3 h-3" />
                                            Downstream ({downstreamNodes.length})
                                        </p>
                                        <div className="space-y-1 pl-4">
                                            {downstreamNodes.map((node) => (
                                                <div
                                                    key={node!.id}
                                                    className="text-xs py-1.5 px-2 bg-purple-50 border border-purple-200 rounded text-purple-900"
                                                >
                                                    {node!.data.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Quick Actions
                        </h4>
                        <div className="space-y-2">
                            <button
                                onClick={handleRun}
                                disabled={selectedNode.data.status === 'loading'}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                            >
                                <Play className="w-4 h-4" />
                                <span>Run Node</span>
                            </button>

                            {selectedNode.data.outputResult && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Clock className="w-3.5 h-3.5 text-green-600" />
                                        <span className="text-xs font-semibold text-green-900">
                                            최근 실행 결과 있음
                                        </span>
                                    </div>
                                    <p className="text-xs text-green-700">
                                        노드에서 전체 결과를 확인하세요
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
