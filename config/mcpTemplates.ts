import { MCPTemplate } from '@/types/mcp';

export const mcpTemplates: MCPTemplate[] = [
    // Week 1: 블렛팅 기획 & 전략
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
        systemPromptTemplate: '너는 서비스 기획 전문가야. 서비스 컨셉을 바탕으로 명확한 서비스 정의와 핵심 가치를 도출해줘.',
        inputPlaceholder: '서비스의 목표와 범위를 입력하세요...',
    },
    {
        id: 'platform-selection',
        label: '서비스 형태 선택',
        category: 'strategy',
        week: 1,
        description: '웹/앱/하이브리드 중 최적 플랫폼 선택',
        icon: '📱',
        systemPromptTemplate: '너는 기술 아키텍트야. 서비스 특성과 타겟을 고려하여 최적의 플랫폼(웹/네이티브앱/하이브리드)을 추천해줘.',
        inputPlaceholder: '서비스 특성 및 제약사항을 입력하세요...',
    },
    {
        id: 'mvp-features',
        label: '핵심 기능 정의 (MVP)',
        category: 'strategy',
        week: 1,
        description: 'MVP를 위한 필수 기능 목록',
        icon: '⭐',
        systemPromptTemplate: '너는 프로덕트 매니저야. MoSCoW 방법론을 활용하여 Must have 기능들을 정의해줘.',
        inputPlaceholder: '구현하고 싶은 모든 기능을 나열하세요...',
    },

    // Week 2: 구조 설계 & UX
    {
        id: 'ia-design',
        label: 'IA 설계',
        category: 'structure',
        week: 2,
        description: '정보 구조 및 사이트맵',
        icon: '🏗️',
        systemPromptTemplate: '너는 정보 아키텍처 전문가야. 서비스의 논리적인 정보구조와 네비게이션을 설계해줘.',
        inputPlaceholder: '서비스의 주요 메뉴와 구조를 설명하세요...',
    },
    {
        id: 'user-story',
        label: 'User Story',
        category: 'structure',
        week: 2,
        description: '사용자 관점의 기능 정의',
        icon: '📝',
        systemPromptTemplate: '너는 애자일 코치야. "As a [user], I want to [action], so that [benefit]" 형식으로 유저 스토리를 작성해줘.',
        inputPlaceholder: '사용자 여정을 설명하세요...',
    },
    {
        id: 'admin-panel',
        label: '관리자 페이지 기획',
        category: 'structure',
        week: 2,
        description: '백오피스 및 관리 시스템 설계',
        icon: '⚙️',
        systemPromptTemplate: '너는 백오피스 설계 전문가야. 사용자 관리, 콘텐츠 관리, 분석 등 필요한 관리 기능을 정의해줘.',
        inputPlaceholder: '관리해야 할 데이터와 기능을 나열하세요...',
    },

    // Week 3: 개발 리소스 & 요구사항
    {
        id: 'prd-writing',
        label: 'PRD 작성',
        category: 'resource',
        week: 3,
        description: '상세 요구사항 명세서',
        icon: '📋',
        systemPromptTemplate: '너는 기술 PM이야. IA 설계와 User Story를 바탕으로 상세한 요구사항 명세서(PRD)를 작성해줘.',
        inputPlaceholder: 'PRD에 포함될 세부 요구사항을 입력하세요...',
    },
    {
        id: 'functional-spec',
        label: '기능 명세서',
        category: 'resource',
        week: 3,
        description: '세부 기능 스펙 정의',
        icon: '📊',
        systemPromptTemplate: '너는 기능 명세 전문가야. 각 기능의 입력, 출력, 제약사항을 상세히 작성해줘.',
        inputPlaceholder: '명세가 필요한 기능을 입력하세요...',
    },
    {
        id: 'test-case',
        label: '테스트 케이스',
        category: 'resource',
        week: 3,
        description: 'QA 및 테스트 시나리오',
        icon: '✅',
        systemPromptTemplate: '너는 QA 엔지니어야. 기능별 테스트 케이스와 검증 기준을 작성해줘.',
        inputPlaceholder: '테스트가 필요한 기능을 입력하세요...',
    },

    // Week 4: Vibe Coding & Demo
    {
        id: 'code-gen',
        label: 'Code Gen',
        category: 'dev',
        week: 4,
        description: 'AI 기반 코드 생성',
        icon: '💻',
        systemPromptTemplate: '너는 풀스택 개발자야. PRD를 바탕으로 실제 구현 가능한 코드를 생성해줘.',
        inputPlaceholder: '생성할 컴포넌트나 기능을 설명하세요...',
    },
    {
        id: 'vibe-coding',
        label: 'Vibe Coding 연결',
        category: 'dev',
        week: 4,
        description: 'Vibe Coding 플랫폼 연동',
        icon: '🚀',
        systemPromptTemplate: '너는 Vibe Coding 전문가야. 생성된 코드를 Vibe Coding 프로젝트로 변환해줘.',
        inputPlaceholder: 'Vibe Coding 설정을 입력하세요...',
    },

    // Week 5: Phase 별 상세 항목 (New Day 스타일)
    // Phase 1: 플랫폼 기획
    {
        id: 'target-definition',
        label: '서비스 컨셉 및 타겟 정의',
        category: 'planning',
        week: 5,
        description: '서비스의 핵심 가치와 타겟 사용자 명확화',
        icon: '🎯',
        systemPromptTemplate: '너는 서비스 전략가야. Value Proposition Canvas를 활용하여 고객의 니즈와 우리의 제안을 매칭해줘.',
        inputPlaceholder: '타겟 고객과 핵심 가치를 입력하세요...',
    },

    // Phase 5: Service Flow (직렬형 플로우)
    {
        id: 'service-start',
        label: '서비스 시작점',
        category: 'flow',
        week: 5,
        description: '랜딩 페이지 및 진입점 설계',
        icon: '🟢',
        systemPromptTemplate: '너는 UX 디자이너야. 사용자가 처음 만나는 랜딩 페이지의 구조와 핵심 메시지를 설계해줘.',
        inputPlaceholder: '서비스명과 초기 화면 요구사항을 입력하세요...',
    },
    {
        id: 'auth-setup',
        label: '인증 방식 설정',
        category: 'flow',
        week: 5,
        description: '로그인 및 회원가입 플로우',
        icon: '🔒',
        systemPromptTemplate: '너는 인증 전문가야. 구글/카카오 OAuth와 이메일 인증 플로우를 설계해줘.',
        inputPlaceholder: '인증 방식과 제약사항을 입력하세요...',
    },
    {
        id: 'core-logic-ai',
        label: 'AI 핵심 로직',
        category: 'flow',
        week: 5,
        description: 'Vibe Coding으로 핵심 기능 구현',
        icon: '✨',
        systemPromptTemplate: '너는 AI 프롬프트 엔지니어야. 자연어로 작성된 기획을 실행 가능한 코드로 변환하는 프롬프트를 작성해줘.',
        inputPlaceholder: '핵심 기능을 자연어로 상세히 설명하세요...',
    },
    {
        id: 'payment-integration',
        label: '결제 게이트웨이',
        category: 'flow',
        week: 5,
        description: 'Toss/Stripe 결제 연동',
        icon: '💳',
        systemPromptTemplate: '너는 결제 시스템 전문가야. 결제 PG사 선택 기준과 구독 상품 설계를 도와줘.',
        inputPlaceholder: '결제 상품과 가격 정책을 입력하세요...',
    },
    {
        id: 'conditional-flow',
        label: '조건부 플로우',
        category: 'flow',
        week: 5,
        description: 'If/Else 분기 로직 설계',
        icon: '🔀',
        systemPromptTemplate: '너는 비즈니스 로직 설계자야. 조건에 따른 사용자 경험 분기를 설계해줘.',
        inputPlaceholder: '조건문 로직을 입력하세요 (예: IF user.plan == Premium)...',
    },
    {
        id: 'service-end',
        label: '서비스 종료점',
        category: 'flow',
        week: 5,
        description: '완료 화면 및 성공 페이지',
        icon: '🏁',
        systemPromptTemplate: '너는 CX 디자이너야. 사용자의 성공 경험을 극대화하는 완료 화면을 설계해줘.',
        inputPlaceholder: '최종 성공 페이지 URL과 메시지를 입력하세요...',
    },
];

// Helper functions
export function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        strategy: '#10B981',    // Green
        structure: '#3B82F6',   // Blue
        resource: '#8B5CF6',    // Purple
        dev: '#F59E0B',         // Orange
        planning: '#EC4899',    // Pink
        flow: '#06B6D4',        // Cyan
    };
    return colors[category] || '#6B7280';
}

export function getWeekColor(week: number): string {
    const colors: Record<number, string> = {
        1: '#10B981',  // Green - Strategy
        2: '#3B82F6',  // Blue - Structure
        3: '#8B5CF6',  // Purple - Resource
        4: '#F59E0B',  // Orange - Dev
        5: '#EC4899',  // Pink - Planning & Flow
    };
    return colors[week] || '#6B7280';
}
