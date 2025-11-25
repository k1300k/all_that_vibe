'use client';

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Play, Loader2 } from 'lucide-react';
import { MCPNodeData } from '@/types/mcp';
import { useFlowStore } from '@/store/useFlowStore';
import { getCategoryColor } from '@/config/mcpTemplates';

export default function MCPNode({ id, data }: NodeProps<MCPNodeData>) {
    const { executeNode, updateNodeData, setSelectedNodeId, selectedNodeId } = useFlowStore();

    const isSelected = selectedNodeId === id;

    const handleRun = async () => {
        await executeNode(id);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateNodeData(id, {
            inputs: {
                ...data.inputs,
                userPrompt: e.target.value,
            },
        });
    };

    const handleNodeClick = () => {
        setSelectedNodeId(id);
    };

    const categoryColor = getCategoryColor(data.category);

    return (
        <div
            onClick={handleNodeClick}
            className={`bg-white rounded-xl shadow-lg border-2 transition-all cursor-pointer min-w-[340px] max-w-[420px] ${isSelected
                    ? 'border-indigo-500 shadow-indigo-200 shadow-2xl ring-4 ring-indigo-100'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                }`}
        >
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                className="w-4 h-4 !bg-indigo-500 !border-2 !border-white hover:!scale-125 transition-transform"
            />

            {/* Header */}
            <div
                className="px-4 py-3 rounded-t-xl text-white font-semibold flex items-center gap-2.5"
                style={{ backgroundColor: categoryColor }}
            >
                <span className="text-xl">
                    {data.label.includes('시장') ? '🔍' :
                        data.label.includes('경쟁') ? '⚔️' :
                            data.label.includes('페르소나') ? '👤' :
                                data.label.includes('컨셉') ? '💡' :
                                    data.label.includes('정의') ? '🎯' :
                                        data.label.includes('IA') ? '🏗️' :
                                            data.label.includes('User') ? '📝' :
                                                data.label.includes('PRD') ? '📋' :
                                                    data.label.includes('명세서') ? '📊' :
                                                        data.label.includes('테스트') ? '✅' :
                                                            data.label.includes('Code') ? '💻' :
                                                                data.label.includes('Vibe') ? '🚀' : '✨'}
                </span>
                <span className="text-sm">{data.label}</span>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed">{data.description}</p>

                {/* Upstream Data Display (if exists) */}
                {data.inputs.upstreamData && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
                        <p className="text-xs text-blue-700 font-semibold mb-1 flex items-center gap-1">
                            <span>⬅️</span>
                            <span>이전 단계 데이터</span>
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                            {data.inputs.upstreamData}
                        </p>
                    </div>
                )}

                {/* User Input */}
                <textarea
                    value={data.inputs.userPrompt}
                    onChange={handleInputChange}
                    placeholder={`${data.label}을(를) 위한 입력을 작성하세요...`}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    rows={3}
                    disabled={data.status === 'loading'}
                    onClick={(e) => e.stopPropagation()}
                />

                {/* Run Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRun();
                    }}
                    disabled={data.status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium text-sm shadow-sm hover:shadow-md"
                >
                    {data.status === 'loading' ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>실행 중...</span>
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4" />
                            <span>실행</span>
                        </>
                    )}
                </button>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 px-2">
                    <div
                        className={`w-2.5 h-2.5 rounded-full ${data.status === 'idle' ? 'bg-gray-400' :
                                data.status === 'loading' ? 'bg-blue-500 animate-pulse' :
                                    data.status === 'success' ? 'bg-green-500' :
                                        'bg-red-500'
                            }`}
                    />
                    <span className="text-xs font-medium text-gray-600">
                        {data.status === 'idle' ? '대기 중' :
                            data.status === 'loading' ? '실행 중' :
                                data.status === 'success' ? '완료' :
                                    '오류'}
                    </span>
                </div>

                {/* Output Result */}
                {data.outputResult && (
                    <div className="mt-3 p-3 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                        <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <span>✅</span>
                            <span>결과:</span>
                        </p>
                        <pre className="text-xs text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
                            {data.outputResult}
                        </pre>
                    </div>
                )}
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                className="w-4 h-4 !bg-purple-500 !border-2 !border-white hover:!scale-125 transition-transform"
            />
        </div>
    );
}
