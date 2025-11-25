'use client';

import React from 'react';
import { Save, FolderOpen } from 'lucide-react';
import ExportButton from './ExportButton';
import ProgramInfoModal from './ProgramInfoModal';

interface ToolbarProps {
    onSaveClick: () => void;
    onLoadClick: () => void;
}

export default function Toolbar({ onSaveClick, onLoadClick }: ToolbarProps) {
    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            {/* Left side - Logo and Title */}
            <div className="flex items-center gap-3">
                <div className="text-2xl">🧩</div>
                <div>
                    <h1 className="text-lg font-bold text-gray-800">Planner's Lego</h1>
                    <p className="text-xs text-gray-500">AI 서비스 기획 플랫폼</p>
                </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
                <ProgramInfoModal />

                <button
                    onClick={onLoadClick}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700"
                >
                    <FolderOpen className="w-4 h-4" />
                    <span>불러오기</span>
                </button>

                <button
                    onClick={onSaveClick}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                >
                    <Save className="w-4 h-4" />
                    <span>저장</span>
                </button>

                <ExportButton />
            </div>
        </div>
    );
}
