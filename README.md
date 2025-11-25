# Planner's Lego

AI 서비스 기획 교육용 MCP(Modular Component for Planning) 플랫폼

## 기능

- 🎨 드래그 앤 드롭으로 노드 배치
- 🔗 노드 연결을 통한 데이터 흐름
- 🤖 AI 기반 콘텐츠 생성 (Mock)
- 📊 실시간 시각화
- 🗺️ 미니맵 및 무한 캔버스

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어보세요.

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Flow
- Zustand

## 사용 방법

1. 왼쪽 사이드바에서 MCP를 선택하여 드래그
2. 캔버스에 드롭하여 노드 생성
3. 노드의 오른쪽 핸들을 다른 노드의 왼쪽 핸들에 연결
4. 각 노드에 입력값을 작성하고 실행 버튼 클릭
5. 연결된 노드는 이전 노드의 결과를 자동으로 받아옴

## PRD

자세한 제품 요구사항은 `prd.mdx` 파일을 참조하세요.
