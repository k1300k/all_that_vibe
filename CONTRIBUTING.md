# Contributing to Planner's Lego

Planner's Lego를 개선하는 데 기여해 주셔서 감사합니다!

## 개발 방법론: 바이브코딩 프롬프트 방식

이 프로젝트는 **바이브코딩 프롬프트 방식**으로 개발되었습니다.

### 바이브코딩이란?

사용자의 자연어 프롬프트 질의를 기반으로 프로그램을 단계적으로 진화시키는 개발 방식입니다.

**특징:**
- 각 버전은 실제 사용자 프롬프트에서 시작
- 점진적 기능 추가 (incremental)
- 대화형 개발 프로세스
- 명확한 진화 추적 가능

## 기여 가이드라인

### 1. 이슈 생성

새로운 기능이나 버그를 발견하면 먼저 이슈를 생성해 주세요.

### 2. 개발 환경 설정

```bash
# Fork 및 Clone
git clone https://github.com/your-username/all_that_vibe.git
cd all_that_vibe

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 3. 브랜치 전략

- `main`: 프로덕션 브랜치
- `feature/*`: 새로운 기능
- `fix/*`: 버그 수정
- `docs/*`: 문서 개선

```bash
git checkout -b feature/your-feature-name
```

### 4. 커밋 컨벤션

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드/설정 변경

**예시:**
```
feat(mcp): add new market research template

- Added detailed market analysis MCP
- Integrated with existing workflow
- Updated documentation

Closes #123
```

### 5. Pull Request

1. 변경사항을 커밋하고 푸시
2. GitHub에서 Pull Request 생성
3. 상세한 설명 작성
4. 리뷰 대기

## 코드 스타일

- TypeScript strict mode 사용
- ESLint 규칙 준수
- Prettier로 포맷팅
- 컴포넌트는 함수형 컴포넌트 사용

## 테스트

```bash
# ESLint 실행
npm run lint

# 빌드 테스트
npm run build
```

## 문서 업데이트

새로운 기능을 추가할 때는:
1. README.md 업데이트
2. 코드 주석 추가
3. 필요시 별도 문서 작성

## 질문이 있나요?

- 이슈를 통해 질문
- 또는 k1300k@github.com으로 문의

감사합니다! 🙏
