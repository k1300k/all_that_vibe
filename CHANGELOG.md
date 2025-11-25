# Changelog

All notable changes to Planner's Lego will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-11-25

### Added
- 프로그램 정보 모달 (Program Info Modal)
  - 전체 버전 이력 표시 (v0.1 ~ v0.4)
  - 각 버전별 사용자 프롬프트 질의 내용
  - 버전별 추가 기능 및 기술 구현 상세
  - 바이브코딩 프롬프트 방식 진화 과정 시각화
  - 서비스 소개 및 사용 가이드
- ProgramInfoModal 컴포넌트
- 버전 히스토리 데이터 구조화
- 모달 애니메이션 (fade + scale)
- 스크롤 가능한 버전 타임라인
- Vercel 배포 설정 (vercel.json)

### Fixed
- ESLint 에러 수정 (apostrophe escaping)
- 프로덕션 빌드 성공

## [0.3.0] - 2025-11-25

### Added
- 접고 펼치기 사이드바 (Collapsible Weeks)
- 우측 노드 설정 패널 (NodeSettingsPanel)
- 노드 선택 시 시각적 피드백 (인디고 링)
- 통합 디자인 시스템 (색상, 간격, 타이포그래피)
- 3칸 레이아웃 (사이드바 | 캔버스 | 설정)
- 향상된 노드 디자인 (그림자, 둥근 모서리)
- 더 큰 연결 핸들 (16px)

### Changed
- 전체 UI/UX 디자인 개선
- selectedNodeId 상태 추적 추가
- CSS 애니메이션 적용
- React Flow 스타일 커스터마이징

## [0.2.0] - 2025-11-25

### Added
- 6개 신규 MCP 추가 (총 12개)
  - 경쟁사 분석 (Competitor Analysis)
  - 서비스 컨셉 (Service Concept)
  - 서비스 정의 (Service Definition)
  - 기능 명세서 (Functional Specification)
  - 테스트 케이스 (Test Case)
  - Vibe Coding 연결 (Vibe Coding Connection)
- Week 1-4 기반 사이드바 재구성
- 워크플로우 저장/불러오기 (localStorage)
- JSON 및 Markdown 내보내기
- 툴바 및 워크플로우 패널
- workflowStorage.ts 유틸리티
- exportUtils.ts (위상 정렬 포함)
- ExportButton 컴포넌트
- WorkflowPanel 컴포넌트

### Changed
- MCP 템플릿에 week 속성 추가
- 사이드바를 카테고리에서 Week 기반으로 변경
- Week별 색상 시스템 도입

## [0.1.0] - 2025-11-25

### Added
- 초기 프로젝트 설정
  - Next.js 14 프로젝트
  - TypeScript 설정
  - Tailwind CSS 설정
- React Flow 기반 노드 캔버스
- 6개 기본 MCP 템플릿
  - 시장조사 (Market Research)
  - 페르소나 (Persona)
  - IA 설계 (IA Design)
  - User Story
  - PRD 작성 (PRD Writing)
  - Code Gen
- Zustand 상태 관리
- 드래그 앤 드롭 기능
- 노드 간 연결 및 데이터 흐름
- 모크 API 응답 (2초 지연)
- MCPNode 커스텀 컴포넌트
- Sidebar 컴포넌트
- MCPCanvas 컴포넌트
- 카테고리별 색상 구분

[0.4.0]: https://github.com/k1300k/all_that_vibe/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/k1300k/all_that_vibe/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/k1300k/all_that_vibe/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/k1300k/all_that_vibe/releases/tag/v0.1.0
