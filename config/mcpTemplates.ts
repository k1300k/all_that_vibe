import { MCPTemplate } from '@/types/mcp';

export const mcpTemplates: MCPTemplate[] = [
    // Week 1: Strategy Category
    {
        id: 'market-research',
        label: '시장조사',
        category: 'strategy',
        week: 1,
        description: '타겟 시장 동향 분석',
        icon: '🔍',
        systemPromptTemplate: '너는 시장조사 전문가야. 주어진 주제와 타겟 정보를 바탕으로 시장 동향을 분석해줘.',
        inputPlaceholder: '주제, 타겟 연령, 국가 등을 입력하세요...',
    },
    {
        id: 'competitor-analysis',
        label: '경쟁사 분석',
        category: 'strategy',
        week: 1,
        description: '주요 경쟁사 및 시장 포지셔닝 분석',
        icon: '⚔️',
        systemPromptTemplate: '너는 비즈니스 전략 컨설턴트야. 시장 내 주요 경쟁사를 분석하고 우리의 차별화 포인트를 제시해줘.',
        inputPlaceholder: '분석할 서비스 분야와 주요 경쟁사를 입력하세요...',
    },
    {
        id: 'persona',
        label: '페르소나',
        category: 'strategy',
        week: 1,
        description: '타겟 유저 프로필 생성',
        icon: '👤',
        systemPromptTemplate: '너는 UX 리서치 전문가야. 시장조사 결과를 바탕으로 구체적인 타겟 페르소나를 작성해줘.',
        inputPlaceholder: '페르소나 요구사항을 입력하세요...',
    },
    {
        id: 'service-concept',
        label: '서비스 컨셉',
        category: 'strategy',
        week: 1,
        description: '핵심 서비스 컨셉 및 가치 제안',
        icon: '💡',
        systemPromptTemplate: '너는 프로덕트 전략가야. 시장 분석과 페르소나를 바탕으로 차별화된 서비스 컨셉을 제시해줘.',
        inputPlaceholder: '서비스의 핵심 아이디어를 입력하세요...',
    },
    {
        id: 'service-definition',
        label: '서비스 정의',
        category: 'strategy',
        week: 1,
        description: '서비스 목표 및 타겟 명확화',
        icon: '🎯',
        systemPromptTemplate: '너는 서비스 기획자야. 서비스의 목표, 타겟 고객, 핵심 기능을 명확하게 정의해줘.',
        inputPlaceholder: '서비스의 목적과 제공 가치를 입력하세요...',
    },

    // Week 2: Structure Category
    {
        id: 'ia-design',
        label: 'IA 설계',
        category: 'structure',
        week: 2,
        description: '메뉴 트리 및 정보 구조 생성',
        icon: '🏗️',
        systemPromptTemplate: '너는 정보 아키텍처 전문가야. 서비스 컨셉과 핵심 기능을 바탕으로 IA(Information Architecture)를 설계해줘.',
        inputPlaceholder: '서비스 컨셉, 핵심 기능 리스트를 입력하세요...',
    },
    {
        id: 'user-story',
        label: 'User Story',
        category: 'structure',
        week: 2,
        description: '사용자 스토리 작성',
        icon: '📝',
        systemPromptTemplate: '너는 애자일 PM이야. Given-When-Then 형식으로 사용자 스토리를 작성해줘.',
        inputPlaceholder: '페르소나와 기능 명세를 입력하세요...',
    },

    // Week 3: Resource Category
    {
        id: 'prd',
        label: 'PRD 작성',
        category: 'resource',
        week: 3,
        description: '상세 요구사항 정의서 생성',
        icon: '📋',
        systemPromptTemplate: '너는 프로덕트 매니저야. IA 구조와 User Story를 바탕으로 상세한 PRD(Product Requirements Document)를 작성해줘.',
        inputPlaceholder: 'PRD에 포함할 추가 요구사항을 입력하세요...',
    },
    {
        id: 'feature-spec',
        label: '기능 명세서',
        category: 'resource',
        week: 3,
        description: '상세 기능 스펙 및 요구사항',
        icon: '📊',
        systemPromptTemplate: '너는 테크니컬 라이터야. PRD를 바탕으로 개발팀이 이해할 수 있는 상세한 기능 명세서를 작성해줘.',
        inputPlaceholder: '명세화할 기능을 입력하세요...',
    },
    {
        id: 'test-case',
        label: '테스트 케이스',
        category: 'resource',
        week: 3,
        description: 'QA 테스트 시나리오 작성',
        icon: '✅',
        systemPromptTemplate: '너는 QA 엔지니어야. 기능 명세서를 바탕으로 테스트 케이스와 시나리오를 작성해줘.',
        inputPlaceholder: '테스트할 기능과 시나리오를 입력하세요...',
    },

    // Week 4: Dev Category
    {
        id: 'code-gen',
        label: 'Code Gen',
        category: 'dev',
        week: 4,
        description: 'HTML/JS 초안 생성',
        icon: '💻',
        systemPromptTemplate: '너는 프론트엔드 개발자야. PRD를 바탕으로 프로토타입을 위한 HTML/JavaScript 코드를 생성해줘.',
        inputPlaceholder: '구현할 기능이나 페이지를 입력하세요...',
    },
    {
        id: 'vibe-coding',
        label: 'Vibe Coding 연결',
        category: 'dev',
        week: 4,
        description: '바이브코딩 연동 준비',
        icon: '🚀',
        systemPromptTemplate: '너는 통합 전문가야. 생성된 코드를 Vibe Coding 플랫폼으로 연동하기 위한 구조와 가이드를 제시해줘.',
        inputPlaceholder: '연동할 서비스 정보를 입력하세요...',
    },
];

export const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
        strategy: '#10B981',
        structure: '#3B82F6',
        resource: '#8B5CF6',
        dev: '#F59E0B',
    };
    return colors[category] || '#6B7280';
};

export const getWeekColor = (week: number): string => {
    const colors: Record<number, string> = {
        1: '#10B981', // Green
        2: '#3B82F6', // Blue
        3: '#8B5CF6', // Purple
        4: '#F59E0B', // Orange
    };
    return colors[week] || '#6B7280';
};
