# Planner's Lego (플래너스 레고)

> AI 서비스 기획 플랫폼 - 노드 기반 MCP(Modular Components for Planning) 워크플로우 빌더

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📌 프로젝트 소개

**Planner's Lego**는 비개발자 서비스 기획자를 위한 노드 기반 AI 기획 플랫폼입니다. 레고 블록을 조립하듯 MCP(Modular Components for Planning)를 연결하여 시장조사부터 코드 생성까지 전체 기획 프로세스를 시각적으로 구성할 수 있습니다.

### 핵심 기능

- 🧩 **22개 MCP 템플릿** - 5주 커리큘럼 기반 체계적 구성
- 🎯 **노드 기반 워크플로우** - 드래그 앤 드롭으로 간편한 구성
- 🔗 **데이터 플로우** - 노드 간 자동 데이터 전달
- 💾 **워크플로우 관리** - 로컬 저장/불러오기 지원
- 📤 **다양한 내보내기** - JSON, Markdown 형식 지원
- 🎨 **직관적 UX** - 접을 수 있는 사이드바, 노드 설정 패널
- 🔄 **Service Flow** - newday 기반 직렬형 플로우 빌더

## 🏗️ 기술 스택

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Node Canvas**: [React Flow](https://reactflow.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 프로젝트 구조

```
all_that_vibe/
├── app/                    # Next.js App Router
│   ├── globals.css         # 전역 스타일
│   ├── layout.tsx          # 루트 레이아웃
│   └── page.tsx            # 메인 페이지
├── components/             # React 컴포넌트
│   ├── nodes/              # React Flow 노드
│   │   └── MCPNode.tsx     # MCP 노드 컴포넌트
│   ├── ExportButton.tsx    # 내보내기 버튼
│   ├── MCPCanvas.tsx       # 메인 캔버스
│   ├── NodeSettingsPanel.tsx # 노드 설정 패널
│   ├── ProgramInfoModal.tsx  # 프로그램 정보 모달
│   ├── Sidebar.tsx         # 사이드바
│   ├── Toolbar.tsx         # 툴바
│   └── WorkflowPanel.tsx   # 워크플로우 패널
├── config/                 # 설정 파일
│   └── mcpTemplates.ts     # MCP 템플릿 정의
├── lib/                    # 유틸리티 함수
│   ├── exportUtils.ts      # 내보내기 유틸
│   └── workflowStorage.ts  # 워크플로우 저장
├── store/                  # State Management
│   └── useFlowStore.ts     # Zustand 스토어
├── types/                  # TypeScript 타입
│   └── mcp.ts              # MCP 타입 정의
├── next.config.js          # Next.js 설정
├── tailwind.config.js      # Tailwind 설정
├── tsconfig.json           # TypeScript 설정
├── vercel.json             # Vercel 배포 설정
└── package.json            # 의존성 관리
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.17 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/k1300k/all_that_vibe.git
cd all_that_vibe

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📚 4주 커리큘럼 구조

### Week 1: 블렛팅 기획 & 전략 🎯
- 🔍 시장조사 (Market Research)
- ⚔️ 경쟁사 분석 (Competitor Analysis)
- 👤 페르소나 (Persona)
- 💡 서비스 컨셉 (Service Concept)
- 🎯 서비스 정의 (Service Definition)

### Week 2: 구조 설계 & UX 🏗️
- 🏗️ IA 설계 (IA Design)
- 📝 User Story

### Week 3: 개발 리소스 & 요구사항 📋
- 📋 PRD 작성 (PRD Writing)
- 📊 기능 명세서 (Functional Specification)
- ✅ 테스트 케이스 (Test Case)

### Week 4: Vibe Coding & Demo 🚀
- 💻 Code Gen
- 🚀 Vibe Coding 연결 (Vibe Coding Connection)

### Week 5: Service Flow 🔄
- 🎯 서비스 컨셉 및 타겟 정의 (Target Definition)
- 🟢 서비스 시작점 (Service Start)
- 🔒 인증 방식 설정 (Auth Setup)
- ✨ AI 핵심 로직 (Core Logic AI)
- 💳 결제 게이트웨이 (Payment Integration)
- 🔀 조건부 플로우 (Conditional Flow)
- 🏁 서비스 종료점 (Service End)

## 🎯 주요 기능 상세

### 1. 노드 기반 워크플로우
- 드래그 앤 드롭으로 MCP 추가
- 노드 간 연결로 데이터 흐름 구성
- 실시간 노드 실행 및 결과 확인

### 2. 워크플로우 관리
- 로컬 스토리지 기반 저장
- 워크플로우 이름 및 설명 추가
- 저장된 워크플로우 목록 관리
- 워크플로우 불러오기 및 삭제

### 3. 내보내기 기능
- **JSON 형식**: 전체 워크플로우 구조
- **Markdown 형식**: 사람이 읽기 쉬운 리포트

### 4. 접을 수 있는 사이드바
- Week별 섹션 확장/축소
- 부드러운 애니메이션
- 12개 MCP 한눈에 확인

### 5. 노드 설정 패널
- 선택된 노드 상세 정보
- 연결된 노드 확인
- 빠른 실행 버튼

## 🎨 UX/UI 특징

- **직관적인 3칸 레이아웃**: 사이드바 | 캔버스 | 설정 패널
- **시각적 피드백**: 노드 선택 시 인디고 링 표시
- **통합 디자인 시스템**: 일관된 색상, 간격, 타이포그래피
- **반응형 디자인**: 다양한 화면 크기 지원

## 📖 개발 이력

프로그램 내 "정보" 버튼을 클릭하면 전체 개발 버전 이력을 확인할 수 있습니다.

- **v0.1**: 초기 프로젝트 설정 및 기본 6 MCP 구현
- **v0.2**: 12 MCP 완성, 워크플로우 관리, 내보내기 기능
- **v0.3**: UX 디자인 전면 개선
- **v0.4**: 프로그램 정보 모달 및 개발 이력 추가
- **v0.5**: Week 5 Service Flow 추가 (22 MCPs)

## 🤝 기여 방법

이 프로젝트는 **바이브코딩 프롬프트 방식**으로 개발되었습니다. 
각 버전은 실제 사용자 프롬프트를 기반으로 점진적으로 진화했습니다.

## 📄 라이선스

MIT License

## 👤 제작자

- GitHub: [@k1300k](https://github.com/k1300k)
- Repository: [all_that_vibe](https://github.com/k1300k/all_that_vibe)

## 🔗 관련 링크

- [Vibe Block Coding](https://github.com/k1300k/vide-block-coding) - 관련 프로젝트
- [React Flow Documentation](https://reactflow.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Made with ❤️ using Vibe Coding Prompt Method**
