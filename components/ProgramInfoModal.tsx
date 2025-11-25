'use client';

import React, { useState } from 'react';
import { Info, X, Code, Sparkles, History } from 'lucide-react';

export default function ProgramInfoModal() {
    const [isOpen, setIsOpen] = useState(false);

    const versions = [
        {
            version: 'v0.1',
            date: '2025-11-25',
            title: '초기 프로젝트 설정 및 기본 MCP 구현',
            userPrompt: '실행해주세요 (prd.mdx 파일 기반)',
            features: [
                'Next.js 14 프로젝트 초기 설정',
                'React Flow 기반 노드 캔버스 구현',
                '6개 기본 MCP 템플릿 (시장조사, 페르소나, IA설계, User Story, PRD, Code Gen)',
                'Zustand 상태 관리',
                '드래그 앤 드롭 기능',
                '노드 간 연결 및 데이터 흐름',
                '모� API 응답 (2초 지연)',
            ],
            technical: [
                'TypeScript + Tailwind CSS',
                'React Flow 커스텀 노드',
                '카테고리별 색상 구분 (Strategy, Structure, Resource, Dev)',
            ],
        },
        {
            version: 'v0.2',
            date: '2025-11-25',
            title: '4주 커리큘럼 완전 지원',
            userPrompt: '1,2,3 (추가 MCP 템플릿, Week 기반 재구성, 워크플로우 관리)',
            features: [
                '6개 신규 MCP 추가 (총 12개)',
                '- 경쟁사 분석, 서비스 컨셉, 서비스 정의',
                '- 기능 명세서, 테스트 케이스, Vibe Coding 연결',
                'Week 1-4 기반 사이드바 재구성',
                '워크플로우 저장/불러오기 (localStorage)',
                'JSON 및 Markdown 내보내기',
                '툴바 및 워크플로우 패널 추가',
            ],
            technical: [
                'workflowStorage.ts - localStorage 기반 저장',
                'exportUtils.ts - JSON/MD 변환 및 다운로드',
                '위상 정렬(Topological Sort)로 실행 순서 결정',
                'Week별 색상 코드 시스템',
            ],
        },
        {
            version: 'v0.3',
            date: '2025-11-25',
            title: 'UX 디자인 전면 개선',
            userPrompt: '1 (UX 목업 디자인 전체 적용)',
            features: [
                '접고 펼치기 사이드바 (Collapsible Weeks)',
                '우측 노드 설정 패널',
                '노드 선택 시 시각적 피드백 (인디고 링)',
                '통합 디자인 시스템 (색상, 간격, 타이포그래피)',
                '3칸 레이아웃 (사이드바 | 캔버스 | 설정)',
                '향상된 노드 디자인 (그림자, 둥근 모서리)',
                '더 큰 연결 핸들 (16px)',
            ],
            technical: [
                'selectedNodeId 상태 추적',
                'NodeSettingsPanel 컴포넌트',
                'CSS 애니메이션 (slide-in, expand/collapse)',
                'React Flow 스타일 커스터마이징',
                '반응형 3칸 레이아웃',
            ],
        },
        {
            version: 'v0.4',
            date: '2025-11-25',
            title: '프로그램 정보 및 개발 이력 추가',
            userPrompt: '프로그램 개발 이력 및 프롬프트 기반 정보 추가 (바이브코딩 프롬프트 방식)',
            features: [
                '프로그램 정보 모달 (Info 버튼)',
                '전체 개발 버전 이력 표시 (v0.1 ~ v0.4)',
                '각 버전별 실제 사용자 프롬프트 질의 내용',
                '버전별 추가 기능 및 기술 구현 상세',
                '바이브코딩 프롬프트 방식 진화 과정 시각화',
                '서비스 소개 및 사용 가이드',
            ],
            technical: [
                'ProgramInfoModal 컴포넌트',
                '버전 히스토리 데이터 구조화',
                '모달 애니메이션 (fade + scale)',
                '스크롤 가능한 버전 타임라인',
            ],
        },
    ];

    return (
        <>
            {/* Info Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                title="프로그램 정보"
            >
                <Info className="w-4 h-4" />
                <span className="hidden sm:inline">정보</span>
            </button>

            {/* Modal */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col animate-scale-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Sparkles className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Planner's Lego
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            AI 서비스 기획 플랫폼 · 바이브코딩 프롬프트 방식
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {/* Service Introduction */}
                                <div className="mb-8 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <Code className="w-5 h-5 text-indigo-600" />
                                        서비스 소개
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        <strong>Planner's Lego</strong>는 비개발자 서비스 기획자를 위한
                                        노드 기반 AI 기획 플랫폼입니다. 레고 블록을 조립하듯
                                        MCP(Modular Components for Planning)를 연결하여
                                        시장조사부터 코드 생성까지 전체 기획 프로세스를 시각적으로 구성할 수 있습니다.
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-indigo-700 border border-indigo-200">
                                            12개 MCP 템플릿
                                        </span>
                                        <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-purple-700 border border-purple-200">
                                            4주 커리큘럼
                                        </span>
                                        <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-green-700 border border-green-200">
                                            바이브코딩 방식
                                        </span>
                                    </div>
                                </div>

                                {/* Version History */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <History className="w-5 h-5 text-gray-700" />
                                        개발 버전 이력
                                    </h3>

                                    <div className="space-y-6">
                                        {versions.map((ver, idx) => (
                                            <div
                                                key={ver.version}
                                                className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0"
                                            >
                                                {/* Version Badge */}
                                                <div className="absolute -left-[17px] top-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                                    {idx + 1}
                                                </div>

                                                {/* Version Content */}
                                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                    {/* Version Header */}
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-lg font-bold text-indigo-600">
                                                                    {ver.version}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {ver.date}
                                                                </span>
                                                            </div>
                                                            <h4 className="font-semibold text-gray-900">
                                                                {ver.title}
                                                            </h4>
                                                        </div>
                                                    </div>

                                                    {/* User Prompt */}
                                                    <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                                        <p className="text-xs font-semibold text-amber-900 mb-1">
                                                            💬 사용자 프롬프트:
                                                        </p>
                                                        <p className="text-sm text-amber-800 font-mono">
                                                            "{ver.userPrompt}"
                                                        </p>
                                                    </div>

                                                    {/* Features */}
                                                    <div className="mb-3">
                                                        <p className="text-xs font-semibold text-gray-700 mb-2">
                                                            ✨ 추가된 기능:
                                                        </p>
                                                        <ul className="space-y-1">
                                                            {ver.features.map((feature, i) => (
                                                                <li
                                                                    key={i}
                                                                    className="text-sm text-gray-700 flex items-start gap-2"
                                                                >
                                                                    <span className="text-green-500 mt-0.5">•</span>
                                                                    <span>{feature}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Technical Details */}
                                                    <div>
                                                        <p className="text-xs font-semibold text-gray-700 mb-2">
                                                            🔧 기술 구현:
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {ver.technical.map((tech, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                                    <p className="text-xs text-gray-600 text-center">
                                        <strong>개발 방식:</strong> 바이브코딩 프롬프트 방식으로
                                        사용자 질의에 따라 단계적으로 진화한 프로그램입니다.
                                        <br />
                                        각 버전은 실제 사용자 프롬프트를 기반으로 구현되었습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
