'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { mcpTemplates, getWeekColor } from '@/config/mcpTemplates';

export default function Sidebar() {
    const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1]); // Week 1 expanded by default

    const onDragStart = (event: React.DragEvent, template: any) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(template));
        event.dataTransfer.effectAllowed = 'move';
    };

    const toggleWeek = (weekNumber: number) => {
        setExpandedWeeks((prev) =>
            prev.includes(weekNumber)
                ? prev.filter((w) => w !== weekNumber)
                : [...prev, weekNumber]
        );
    };

    const weeks = [
        {
            number: 1,
            title: '블렛팅 기획 & 전략',
            subtitle: '서비스 전략 수립',
            emoji: '🎯',
        },
        {
            number: 2,
            title: '구조 설계 & UX',
            subtitle: '서비스 뼈대 구축',
            emoji: '🏗️',
        },
        {
            number: 3,
            title: '개발 리소스 & 요구사항',
            subtitle: 'PRD 문서 완성',
            emoji: '📋',
        },
        {
            number: 4,
            title: 'Vibe Coding & Demo',
            subtitle: '프로토타입 구현',
            emoji: '🚀',
        },
        {
            number: 5,
            title: 'Service Flow',
            subtitle: '단계별 플로우 구성',
            emoji: '🔄',
        },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                <h2 className="text-base font-bold text-gray-900 mb-0.5">Component Library</h2>
                <p className="text-xs text-gray-500">5주 커리큘럼 · 22 MCPs</p>
            </div>

            {/* Week Sections */}
            <div className="flex-1 overflow-y-auto p-3">
                {weeks.map((week) => {
                    const weekTemplates = mcpTemplates.filter((t) => t.week === week.number);
                    const isExpanded = expandedWeeks.includes(week.number);

                    if (weekTemplates.length === 0) return null;

                    return (
                        <div key={week.number} className="mb-3">
                            {/* Week Header - Clickable */}
                            <button
                                onClick={() => toggleWeek(week.number)}
                                className="w-full p-2.5 rounded-lg transition-all hover:bg-gray-50 group"
                                style={{
                                    backgroundColor: isExpanded
                                        ? `${getWeekColor(week.number)}08`
                                        : 'transparent',
                                }}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2 flex-1">
                                        {/* Chevron Icon */}
                                        <div className="text-gray-400 transition-transform">
                                            {isExpanded ? (
                                                <ChevronDown className="w-4 h-4" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4" />
                                            )}
                                        </div>

                                        <span className="text-lg">{week.emoji}</span>

                                        <div className="text-left flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <h3
                                                    className="text-xs font-bold"
                                                    style={{ color: getWeekColor(week.number) }}
                                                >
                                                    Week {week.number}
                                                </h3>
                                                <span className="text-xs text-gray-400">·</span>
                                                <span className="text-xs text-gray-500">
                                                    {weekTemplates.length}
                                                </span>
                                            </div>
                                            <p className="text-xs font-medium text-gray-700 line-clamp-1">
                                                {week.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {/* MCP Templates - Collapsible */}
                            <div
                                className="overflow-hidden transition-all duration-300 ease-in-out"
                                style={{
                                    maxHeight: isExpanded ? `${weekTemplates.length * 80}px` : '0px',
                                    opacity: isExpanded ? 1 : 0,
                                }}
                            >
                                <div className="mt-2 space-y-1.5 pl-6">
                                    {weekTemplates.map((template) => (
                                        <div
                                            key={template.id}
                                            draggable
                                            onDragStart={(e) => onDragStart(e, template)}
                                            className="p-2.5 bg-white rounded-lg border border-gray-200 cursor-move hover:shadow-md hover:border-gray-300 transition-all group/item"
                                            style={{
                                                borderLeftWidth: '3px',
                                                borderLeftColor: getWeekColor(week.number),
                                            }}
                                        >
                                            <div className="flex items-start gap-2">
                                                <span className="text-base mt-0.5 flex-shrink-0">{template.icon}</span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold text-xs text-gray-800 mb-0.5 line-clamp-1">
                                                        {template.label}
                                                    </div>
                                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                                        {template.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-500 text-center font-medium">
                    Planner&apos;s Lego v0.3
                </p>
            </div>
        </div>
    );
}
