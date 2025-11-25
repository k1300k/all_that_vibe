import { create } from 'zustand';
import { Node, Edge, addEdge, Connection, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow';
import { MCPNodeData, MCPNode } from '@/types/mcp';

interface FlowStore {
    nodes: Node<MCPNodeData>[];
    edges: Edge[];
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
    addNode: (node: Node<MCPNodeData>) => void;
    updateNodeData: (nodeId: string, data: Partial<MCPNodeData>) => void;
    executeNode: (nodeId: string) => Promise<void>;
    getUpstreamData: (nodeId: string) => string;
    setNodes: (nodes: Node<MCPNodeData>[]) => void;
    setEdges: (edges: Edge[]) => void;
    selectedNodeId: string | null;
    setSelectedNodeId: (id: string | null) => void;
}

export const useFlowStore = create<FlowStore>((set, get) => ({
    nodes: [],
    edges: [],
    selectedNodeId: null,

    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },

    addNode: (node: Node<MCPNodeData>) => {
        set({
            nodes: [...get().nodes, node],
        });
    },

    updateNodeData: (nodeId: string, data: Partial<MCPNodeData>) => {
        set({
            nodes: get().nodes.map((node) =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, ...data } }
                    : node
            ),
        });
    },

    getUpstreamData: (nodeId: string): string => {
        const { edges, nodes } = get();

        // Find all edges that connect to this node
        const incomingEdges = edges.filter((edge) => edge.target === nodeId);

        if (incomingEdges.length === 0) {
            return '';
        }

        // Get data from all source nodes
        const upstreamResults = incomingEdges
            .map((edge) => {
                const sourceNode = nodes.find((node) => node.id === edge.source);
                return sourceNode?.data?.outputResult || '';
            })
            .filter((result) => result.length > 0);

        return upstreamResults.join('\n\n---\n\n');
    },

    setNodes: (nodes: Node<MCPNodeData>[]) => {
        set({ nodes });
    },

    setEdges: (edges: Edge[]) => {
        set({ edges });
    },

    setSelectedNodeId: (id: string | null) => {
        set({ selectedNodeId: id });
    },

    executeNode: async (nodeId: string) => {
        const { nodes, updateNodeData, getUpstreamData } = get();
        const node = nodes.find((n) => n.id === nodeId);

        if (!node) return;

        // Set loading status
        updateNodeData(nodeId, { status: 'loading' });

        try {
            // Get upstream data from connected nodes
            const upstreamData = getUpstreamData(nodeId);

            // Simulate API call with 2 second delay (as recommended in PRD)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Generate mock response based on node type
            const mockResponse = generateMockResponse(
                node.data.label,
                node.data.inputs.userPrompt,
                upstreamData,
                node.data.systemPromptTemplate
            );

            // Update node with result
            updateNodeData(nodeId, {
                status: 'success',
                outputResult: mockResponse,
                inputs: {
                    ...node.data.inputs,
                    upstreamData,
                },
            });
        } catch (error) {
            updateNodeData(nodeId, {
                status: 'error',
                outputResult: '오류가 발생했습니다.',
            });
        }
    },
}));

// Mock response generator
function generateMockResponse(
    label: string,
    userPrompt: string,
    upstreamData: string,
    systemPrompt: string
): string {
    const hasUpstream = upstreamData.length > 0;
    const contextNote = hasUpstream ? '\n\n[이전 단계 데이터를 반영했습니다]' : '';

    const responses: Record<string, string> = {
        '시장조사': `📊 시장조사 결과:

사용자 입력: "${userPrompt}"

1. 시장 규모: 약 5조원 규모로 추정
2. 주요 트렌드:
   - AI 기반 개인화 서비스 급증
   - 모바일 퍼스트 전략 강화
   - 구독 모델 선호도 증가

3. 경쟁사 분석:
   - A사: 시장 점유율 35%
   - B사: 시장 점유율 28%
   - 기타: 37%

4. 기회 요인:
   - 틈새 시장 공략 가능
   - 차별화된 UX로 경쟁 우위 확보 가능${contextNote}`,

        '경쟁사 분석': `⚔️ 경쟁사 분석 리포트:

사용자 입력: "${userPrompt}"

**주요 경쟁사 맵핑:**

| 경쟁사 | 강점 | 약점 | 시장 점유율 |
|--------|------|------|-------------|
| A사 | 브랜드 인지도, 자본력 | UI/UX 구식, 느린 혁신 | 35% |
| B사 | 기술력, 빠른 업데이트 | 고객 서비스 부족 | 28% |
| C사 | 가격 경쟁력 | 품질 이슈 | 15% |

**우리의 차별화 포인트:**
1. AI 기반 개인화 - 경쟁사들이 아직 도입하지 않은 기술
2. 직관적 UX - 비개발자도 쉽게 사용 가능
3. 커뮤니티 중심 - 사용자간 협업 기능 강화

**시장 진입 전략:**
- 초기: 틈새 시장 공략 (스타트업 기획자)
- 중기: 기업 고객 확대
- 장기: 글로벌 시장 진출${contextNote}`,

        '서비스 컨셉': `💡 서비스 컨셉:

**핵심 컨셉:**
"${userPrompt || 'AI 기획자의 레고'}" - 누구나 쉽게 조립하는 서비스 기획

**핵심 가치 제안 (Value Proposition):**
1. **시각적 기획** - 복잡한 기획을 드래그 앤 드롭으로 단순화
2. **AI 파트너** - 각 단계마다 AI가 산출물을 자동 생성
3. **협업 중심** - 팀원과 실시간으로 기획 공유

**타겟 페르소나:**
- 비개발자 서비스 기획자
- AI 도구를 활용하고 싶은 PM
- 빠른 프로토타이핑이 필요한 스타트업

**핵심 차별성:**
기존 도구들은 "문서 작성" 중심이지만, 우리는 "시각적 흐름"으로 
기획 프로세스 자체를 혁신합니다.

**한 문장 요약:**
"AI와 함께 레고처럼 조립하는 서비스 기획 플랫폼"${contextNote}`,

        '서비스 정의': `🎯 서비스 정의서:

**서비스명:** ${userPrompt || 'Planner\'s Lego'}

**서비스 목표:**
비개발자도 AI를 활용하여 전문적인 서비스 기획 산출물을 
빠르고 효율적으로 생성할 수 있도록 돕는다.

**타겟 고객:**
- 1차: AI 서비스 기획자 교육 수강생
- 2차: 스타트업 PM 및 기획자
- 3차: 기업 디지털 전환 담당자

**핵심 기능:**
1. 노드 기반 워크플로우 빌더
2. AI 기반 산출물 자동 생성
3. 템플릿 라이브러리 (MCP)
4. 팀 협업 및 공유
5. 결과물 내보내기 (PDF, MD)

**제공 가치:**
- 기획 시간 50% 단축
- AI 활용 역량 향상
- 체계적인 산출물 관리
- 팀 커뮤니케이션 개선

**비즈니스 모델:**
- Freemium: 기본 기능 무료
- Pro: 월 $29 (고급 템플릿, 무제한 프로젝트)
- Enterprise: 맞춤형 가격 (팀 협업, 커스텀 MCP)${contextNote}`,

        '페르소나': `👤 타겟 페르소나:

**이름:** 김서비스 (28세, 여성)

**직업:** IT 스타트업 기획자

**특성:**
- 새로운 기술 트렌드에 관심이 많음
- 효율적인 업무 도구를 찾고 있음
- 시각적이고 직관적인 인터페이스 선호

**Pain Points:**
- 복잡한 기획 도구는 학습 곡선이 높음
- 팀 협업이 어려움
- AI를 활용하고 싶지만 프롬프트 작성이 어려움

**Goals:**
- 빠르고 효율적인 기획 산출물 작성
- 비개발자도 이해할 수 있는 시각적 표현
- AI를 쉽게 활용하고 싶음${contextNote}`,

        'IA 설계': `🏗️ 정보 아키텍처:

사용자 입력: "${userPrompt}"

**1. 메인 네비게이션**
   1.1 대시보드
   1.2 프로젝트 관리
   1.3 워크스페이스
   1.4 설정

**2. 워크스페이스 구조**
   2.1 캔버스 영역
   2.2 컴포넌트 라이브러리 (사이드바)
   2.3 속성 패널
   2.4 미니맵

**3. 데이터 흐름**
   - 입력 → 처리 → 출력
   - 노드 간 연결을 통한 데이터 전달${contextNote}`,

        'User Story': `📝 사용자 스토리:

**Epic:** 기획 산출물 자동 생성

**Story 1: 시장조사 노드 사용**
- Given: 기획자가 새로운 서비스를 기획하려고 할 때
- When: 시장조사 노드를 드래그하여 배치하고 타겟 정보를 입력하면
- Then: AI가 시장 동향을 분석하여 결과를 보여준다

**Story 2: 노드 연결하기**
- Given: 시장조사 결과가 있을 때
- When: 페르소나 노드를 연결하면
- Then: 시장조사 결과를 바탕으로 페르소나가 자동 생성된다

**Story 3: 워크플로 저장**
- Given: 노드를 연결하여 워크플로를 만들었을 때
- When: 저장 버튼을 클릭하면
- Then: 워크플로가 저장되어 나중에 재사용할 수 있다${contextNote}`,

        'PRD 작성': `📋 제품 요구사항 정의서 (PRD)

**1. 개요**
프로젝트: ${userPrompt || '신규 서비스'}
목적: 비개발자를 위한 노드 기반 기획 플랫폼

**2. 핵심 기능**
2.1 드래그 앤 드롭 인터페이스
2.2 AI 기반 콘텐츠 생성
2.3 노드 간 데이터 연결
2.4 실시간 미리보기

**3. 기술 스펙**
- Frontend: Next.js 14, React Flow
- State: Zustand
- AI: GPT-4 API

**4. 성공 지표**
- 사용자 만족도: 4.5/5.0 이상
- 평균 기획 시간: 기존 대비 50% 단축
- 월간 활성 사용자: 1,000명 이상${contextNote}`,

        '기능 명세서': `📊 기능 명세서 (Functional Specification):

**기능명:** ${userPrompt || '워크플로우 자동 실행'}

**기능 개요:**
사용자가 연결된 노드들을 순차적으로 자동 실행할 수 있는 기능

**상세 요구사항:**

1. **입력 조건:**
   - 최소 2개 이상의 노드가 연결되어 있어야 함
   - 모든 노드에 필수 입력값이 존재해야 함
   - 순환 연결(Cycle)이 없어야 함

2. **처리 프로세스:**
   - 위상 정렬(Topological Sort)로 실행 순서 결정
   - 각 노드를 순차적으로 실행
   - 이전 노드의 출력을 다음 노드의 입력으로 자동 전달
   - 실행 중 에러 발생 시 중단 및 롤백

3. **출력 결과:**
   - 각 노드의 실행 상태 표시
   - 최종 결과물 집계
   - 실행 로그 저장

4. **UI/UX:**
   - "전체 실행" 버튼 제공
   - 프로그레스 바로 진행 상황 표시
   - 실행 중 일시정지/취소 가능

5. **성능 요구사항:**
   - 노드당 평균 응답 시간: 2초 이하
   - 최대 동시 실행 노드: 10개${contextNote}`,

        '테스트 케이스': `✅ 테스트 케이스 (Test Cases):

**기능:** ${userPrompt || '노드 연결 및 데이터 전달'}

**TC-001: 정상적인 노드 연결**
- 전제조건: 캔버스에 2개 이상의 노드가 배치됨
- 테스트 단계:
  1. 첫 번째 노드의 출력 핸들 클릭
  2. 두 번째 노드의 입력 핸들로 드래그
  3. 마우스 릴리즈
- 예상 결과: 두 노드 사이에 연결선이 생성됨
- 실제 결과: [Pass/Fail]

**TC-002: 데이터 흐름 검증**
- 전제조건: 노드 A와 노드 B가 연결됨
- 테스트 단계:
  1. 노드 A에 입력값 작성
  2. 노드 A 실행 버튼 클릭
  3. 결과 확인 후 노드 B 실행
- 예상 결과: 노드 B에 노드 A의 출력값이 표시됨
- 실제 결과: [Pass/Fail]

**TC-003: 에러 처리**
- 전제조건: 노드가 배치됨
- 테스트 단계:
  1. 입력값 없이 실행 버튼 클릭
- 예상 결과: 에러 메시지 표시 및 상태 "error"로 변경
- 실제 결과: [Pass/Fail]

**TC-004: 저장 및 불러오기**
- 전제조건: 여러 노드가 연결된 워크플로우
- 테스트 단계:
  1. 워크플로우 저장
  2. 페이지 새로고침
  3. 저장된 워크플로우 불러오기
- 예상 결과: 모든 노드와 연결이 복원됨
- 실제 결과: [Pass/Fail]${contextNote}`,

        'Code Gen': `💻 생성된 코드:

\`\`\`html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>${userPrompt || '프로토타입'}</title>
    <style>
        body {
            font-family: 'Pretendard', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .btn-primary {
            background: #4F46E5;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>프로토타입</h1>
        <p>PRD 기반으로 생성된 기본 구조입니다.</p>
        <button class="btn-primary">시작하기</button>
    </div>

    <script>
        // 기본 인터랙션 로직
        console.log('프로토타입 로드됨');
    </script>
</body>
</html>
\`\`\`${contextNote}`,

        'Vibe Coding 연결': `🚀 Vibe Coding 연동 가이드:

**연동 준비 완료:**

사용자 입력: "${userPrompt}"

**1. 생성된 코드 구조:**
\`\`\`
project/
├── index.html (메인 페이지)
├── styles.css (스타일시트)
├── app.js (앱 로직)
└── assets/ (이미지, 폰트)
\`\`\`

**2. Vibe Coding 연동 방법:**

**Step 1: 프로젝트 생성**
사용자 입력: "${userPrompt}"

1. **프로젝트 구조 변환**
   - 기존 코드를 Vibe Coding 프로젝트 포맷으로 변환
   - package.json에 Vibe Coding 의존성 추가
   - 설정 파일 자동 생성

2. **AI 프롬프트 매핑**
   - 각 컴포넌트별 프롬프트 템플릿 생성
   - Vibe Coding API 엔드포인트 설정
   - 자연어 → 코드 변환 파이프라인 구축

3. **배포 자동화**
   - Vercel/Netlify 연동
   - CI/CD 파이프라인 설정
   - 환경 변수 관리

📦 생성된 파일:
- vibe-config.json
- prompts/ 디렉토리
- .vibe/ 설정 폴더${contextNote}`,

        // Week 5: Service Flow Templates
        '서비스 컨셉 및 타겟 정의': `🎯 서비스 컨셉 및 타겟 정의:

사용자 입력: "${userPrompt}"

**1. Value Proposition Canvas**
┌─────────────────────────────────────┐
│ 고객 프로필 (Customer Profile)        │
├─────────────────────────────────────┤
│ 고객 업무 (Jobs):                    │
│ • 빠르고 편리한 온라인 쇼핑           │
│ • 신뢰할 수 있는 상품 정보 확인       │
│                                       │
│ 고통 (Pains):                         │
│ • 복잡한 결제 프로세스                │
│ • 배송 지연 및 불확실성              │
│                                       │
│ 이득 (Gains):                         │
│ • 시간 절약                           │
│ • 다양한 선택지                       │
└─────────────────────────────────────┘

**2. 우리의 가치 제안**
• 원클릭 결제 시스템
• 실시간 배송 추적
• AI 기반 상품 추천

**3. 핵심 타겟**
- 주 타겟: 25-40세 직장인
- 월 소득: 300만원 이상
- 라이프스타일: 온라인 쇼핑 주 2회 이상${contextNote}`,

        '서비스 시작점': `🟢 서비스 시작점 설계:

사용자 입력: "${userPrompt}"

**1. 랜딩 페이지 구조**
┌──────────────────────────────────┐
│        서비스 로고 + 헤더         │
├──────────────────────────────────┤
│                                   │
│   🎯 메인 비주얼 + 핵심 메시지    │
│                                   │
│   "3분 만에 시작하는 OO 서비스"   │
│                                   │
├──────────────────────────────────┤
│  [무료로 시작하기] [더 알아보기]  │
└──────────────────────────────────┘

**2. 진입 플로우**
Step 1: 랜딩 페이지 도달
  ↓ 
Step 2: CTA 버튼 클릭
  ↓
Step 3: 회원가입/로그인 페이지
  ↓
Step 4: 메인 대시보드 진입

**3. 핵심 메시지**
- 헤드라인: "당신의 OO을 혁신하세요"
- 서브 헤드라인: "AI 기반 자동화로 80% 시간 절약"
- CTA: "지금 무료로 시작하기"

**4. 초기 화면 URL**
- Production: https://yourdomain.com
- Staging: https://staging.yourdomain.com${contextNote}`,

        '인증 방식 설정': `🔒 인증 방식 설계:

사용자 입력: "${userPrompt}"

**1. 지원 인증 방식**
✅ OAuth 2.0 소셜 로그인
  • Google OAuth
  • Kakao OAuth
  • Naver OAuth

✅ 이메일 인증
  • 이메일 + 비밀번호
  • 이메일 인증 링크 발송
  • 비밀번호 찾기 플로우

**2. 인증 플로우**
┌─────────────────────────────────────┐
│ 로그인 화면                          │
├─────────────────────────────────────┤
│ [Google로 계속하기]                  │
│ [Kakao로 계속하기]                   │
│ ────────── 또는 ──────────          │
│ 이메일: [__________]                 │
│ 비밀번호: [__________]               │
│ [로그인] [회원가입]                  │
└─────────────────────────────────────┘

**3. 보안 정책**
- JWT 토큰 기반 인증
- Access Token: 1시간 유효
- Refresh Token: 7일 유효
- HTTPS 필수
- 2FA (2단계 인증) 옵션 제공

**4. 세션 관리**
- 자동 로그인 유지 (30일)
- 다중 디바이스 로그인 허용
- 의심스러운 로그인 감지 및 알림${contextNote}`,

        'AI 핵심 로직': `✨ AI 핵심 로직 설계:

사용자 입력: "${userPrompt}"

**Vibe Coding 프롬프트 엔지니어링**

\`\`\`typescript
// AI 코어 로직 설계
const aiCoreLogic = {
  name: "스마트 추천 엔진",
  
  // 입력 데이터
  input: {
    userBehavior: "사용자 행동 데이터",
    preferences: "선호도 정보",
    context: "현재 컨텍스트"
  },
  
  // AI 프롬프트 구조
  systemPrompt: \`
    당신은 사용자 경험을 최적화하는 AI 추천 전문가입니다.
    다음 정보를 바탕으로 맞춤형 추천을 제공하세요:
    
    1. 사용자 행동 패턴 분석
    2. 유사 사용자 선호도 매칭
    3. 실시간 트렌드 반영
  \`,
  
  // 출력 형식
  output: {
    recommendations: Array<Product>,
    confidence: number,
    reasoning: string
  }
};
\`\`\`

**주요 기능**
1. 실시간 데이터 수집 및 분석
2. ML 모델 기반 예측
3. 개인화 추천 생성
4. A/B 테스트 자동화

**성능 지표**
- 응답 시간: 평균 200ms 이하
- 정확도: 85% 이상
- 사용자 만족도: 4.5/5.0 이상${contextNote}`,

        '결제 게이트웨이': `💳 결제 시스템 연동:

사용자 입력: "${userPrompt}"

**1. 지원 PG사**
• Toss Payments (국내 1순위)
• Stripe (글로벌)
• KG이니시스 (백업)

**2. 결제 수단**
✅ 신용/체크카드
✅ 계좌이체
✅ 간편결제 (카카오페이, 네이버페이)
✅ 정기결제 (구독)

**3. 구독 상품 설계**
┌────────────────────────────────┐
│ 무료 플랜 (Free)               │
│ • 기본 기능만 제공              │
│ • 월 10회 사용 제한             │
│ ₩0 /월                         │
└────────────────────────────────┘

┌────────────────────────────────┐
│ 프로 플랜 (Pro) ⭐ 추천         │
│ • 모든 기능 사용 가능           │
│ • 무제한 사용                   │
│ • 우선 지원                     │
│ ₩9,900 /월                     │
└────────────────────────────────┘

┌────────────────────────────────┐
│ 엔터프라이즈 (Enterprise)       │
│ • 커스텀 기능                   │
│ • 전담 매니저                   │
│ • SLA 보장                      │
│ 문의하기                        │
└────────────────────────────────┘

**4. 결제 플로우**
1. 상품 선택
2. 결제 정보 입력
3. PG사 승인 요청
4. 결제 완료 확인
5. Webhook으로 서비스 활성화

**5. 보안**
- PCI DSS 준수
- 카드 정보 직접 저장 금지
- 토큰화 결제 처리${contextNote}`,

        '조건부 플로우': `🔀 조건부 플로우 설계:

사용자 입력: "${userPrompt}"

**비즈니스 로직 분기 처리**

\`\`\`javascript
// 예제: 플랜별 기능 접근 제어
if (user.plan === 'Premium') {
  // 프리미엄 기능 활성화
  features = {
    ai: true,
    analytics: true,
    export: true,
    api: true
  };
  
  // 프리미엄 대시보드로 이동
  redirect(\` /premium-dashboard\`);
  
} else if (user.plan === 'Basic') {
  // 기본 기능만 제공
  features = {
    ai: false,
    analytics: true,
    export: false,
    api: false
  };
  
  // 업그레이드 배너 표시
  showUpgradeBanner();
  
} else {
  // 무료 플랜 - 제한된 기능
  features = {
    ai: false,
    analytics: false,
    export: false,
    api: false
  };
  
  // 기능 잠금 상태 표시
  showLockedFeatures();
}
\`\`\`

**조건 분기 예시**
1. **구독 상태 체크**
   - IF Premium → 모든 기능
   - ELSE → 업그레이드 유도

2. **사용량 제한**
   - IF 월 사용량 \u003c 100 → 정상 진행
   - ELSE → 플랜 업그레이드 필요

3. **지역별 서비스**
   - IF 한국 → KRW 표시
   - ELSE IF 미국 → USD 표시
   - ELSE → 기본 통화

**분기 처리 best practice**
✅ 조건은 명확하고 단순하게
✅ else 케이스 항상 처리
✅ 분기마다 로깅
✅ 사용자에게 명확한 피드백${contextNote}`,

        '서비스 종료점': `🏁 서비스 완료 화면:

사용자 입력: "${userPrompt}"

**1. 성공 페이지 디자인**
┌──────────────────────────────────┐
│             ✅                    │
│                                   │
│      성공적으로 완료되었습니다!    │
│                                   │
│   주문번호: #12345               │
│   이메일로 확인서를 발송했습니다   │
│                                   │
├──────────────────────────────────┤
│                                   │
│  다음 단계:                       │
│  • 대시보드에서 진행상황 확인      │
│  • 팀원 초대하기                  │
│  • 튜토리얼 시작하기              │
│                                   │
├──────────────────────────────────┤
│  [대시보드로 가기]  [공유하기]    │
└──────────────────────────────────┘

**2. 종료 URL**
- Success: /success?order=12345
- Confirmation: /confirm?token=abc123
- Dashboard: /dashboard

**3. 후속 액션**
✅ 확인 이메일 자동 발송
✅ 슬랙/디스코드 알림
✅ CRM에 고객 정보 등록
✅ 온보딩 플로우 시작

**4. 추적 이벤트**
\`\`\`javascript
// Google Analytics 이벤트
gtag('event', 'conversion', {
  'transaction_id': '12345',
  'value': 9900,
  'currency': 'KRW'
});

// Facebook Pixel
fbq('track', 'Purchase', {
  value: 9900,
  currency: 'KRW'
});
\`\`\`

**5. 재방문 유도**
- 감사 메시지
- 다음 단계 가이드
- 특별 혜택 제안
- SNS 공유 유도${contextNote}`,
    };

    return responses[label] || `[Mock Response]\n\n사용자 입력: "${userPrompt}"\n\n시스템: ${systemPrompt}\n\n처리 결과가 여기 표시됩니다.${contextNote}`;
}
