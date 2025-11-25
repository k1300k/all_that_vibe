'use client';

import React from 'react';
import { useFlowStore } from '@/store/useFlowStore';
import { exportToJSON, exportToMarkdown, downloadFile } from '@/lib/exportUtils';
import { Download, FileJson, FileText } from 'lucide-react';

export default function ExportButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    const { nodes, edges } = useFlowStore();

    const handleExportJSON = () => {
        const json = exportToJSON(nodes, edges);
        const timestamp = new Date().toISOString().split('T')[0];
        downloadFile(json, `workflow_${timestamp}.json`, 'application/json');
        setIsOpen(false);
    };

    const handleExportMarkdown = () => {
        const markdown = exportToMarkdown(nodes, edges);
        const timestamp = new Date().toISOString().split('T')[0];
        downloadFile(markdown, `workflow_report_${timestamp}.md`, 'text/markdown');
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
                <Download className="w-4 h-4" />
                <span>내보내기</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                        <div className="py-1">
                            <button
                                onClick={handleExportJSON}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FileJson className="w-4 h-4 text-blue-500" />
                                <div className="text-left">
                                    <div className="font-medium">JSON</div>
                                    <div className="text-xs text-gray-500">워크플로우 구조</div>
                                </div>
                            </button>
                            <button
                                onClick={handleExportMarkdown}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FileText className="w-4 h-4 text-green-500" />
                                <div className="text-left">
                                    <div className="font-medium">Markdown</div>
                                    <div className="text-xs text-gray-500">결과 리포트</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
