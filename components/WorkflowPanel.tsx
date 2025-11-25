'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, FileText } from 'lucide-react';
import { saveWorkflow, listWorkflows, deleteWorkflow, SavedWorkflow } from '@/lib/workflowStorage';
import { useFlowStore } from '@/store/useFlowStore';

interface WorkflowPanelProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'save' | 'load';
}

export default function WorkflowPanel({ isOpen, onClose, mode }: WorkflowPanelProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [workflows, setWorkflows] = useState<SavedWorkflow[]>([]);
    const [message, setMessage] = useState('');

    const { nodes, edges, setNodes, setEdges } = useFlowStore();

    useEffect(() => {
        if (isOpen && mode === 'load') {
            setWorkflows(listWorkflows());
        }
    }, [isOpen, mode]);

    const handleSave = () => {
        if (!name.trim()) {
            setMessage('워크플로우 이름을 입력하세요');
            return;
        }

        try {
            saveWorkflow(name, description, nodes, edges);
            setMessage('워크플로우가 저장되었습니다!');
            setName('');
            setDescription('');
            setTimeout(() => {
                onClose();
                setMessage('');
            }, 1500);
        } catch (error) {
            setMessage('저장 중 오류가 발생했습니다');
        }
    };

    const handleLoad = (workflow: SavedWorkflow) => {
        setNodes(workflow.nodes);
        setEdges(workflow.edges);
        setMessage('워크플로우를 불러왔습니다!');
        setTimeout(() => {
            onClose();
            setMessage('');
        }, 1500);
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('이 워크플로우를 삭제하시겠습니까?')) {
            deleteWorkflow(id);
            setWorkflows(listWorkflows());
            setMessage('워크플로우가 삭제되었습니다');
            setTimeout(() => setMessage(''), 2000);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
            <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800">
                        {mode === 'save' ? '워크플로우 저장' : '워크플로우 불러오기'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {mode === 'save' ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    이름 *
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="예: Week 1 완성본"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    설명
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="이 워크플로우에 대한 설명을 입력하세요..."
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                />
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                                <p className="text-sm text-gray-600">
                                    <strong>노드 수:</strong> {nodes.length}개<br />
                                    <strong>연결 수:</strong> {edges.length}개
                                </p>
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
                            >
                                <Save className="w-4 h-4" />
                                <span>저장</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {workflows.length === 0 ? (
                                <div className="text-center py-12">
                                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">저장된 워크플로우가 없습니다</p>
                                </div>
                            ) : (
                                workflows.map((workflow) => (
                                    <div
                                        key={workflow.metadata.id}
                                        className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer"
                                        onClick={() => handleLoad(workflow)}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold text-gray-800">
                                                {workflow.metadata.name}
                                            </h3>
                                            <button
                                                onClick={(e) => handleDelete(workflow.metadata.id, e)}
                                                className="p-1 hover:bg-red-50 rounded text-red-500"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {workflow.metadata.description && (
                                            <p className="text-sm text-gray-600 mb-2">
                                                {workflow.metadata.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span>{workflow.nodes.length}개 노드</span>
                                            <span>{workflow.edges.length}개 연결</span>
                                            <span>{new Date(workflow.metadata.createdAt).toLocaleDateString('ko-KR')}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {message && (
                        <div className={`mt-4 p-3 rounded-md ${message.includes('오류') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                            <p className="text-sm">{message}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
