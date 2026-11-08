# TODO

문서 생산 환경 세팅과 포맷별 고도화 진행 상황. 마지막 업데이트 2026-11-06.

## 완료

* 폴더 뼈대 생성: `templates/`, `assets/`, `skills/{word,powerpoint,excel,pdf,markdown-docs}/`
* Anthropic 공식 docx/pptx/xlsx/pdf skill을 벤더 중립적인 `skills/`에 가져옴
* `.claude/skills`, `.agents/skills`를 공통 `skills/`로 연결하는 junction 구조와 `setup-skills.ps1` 추가
* `.claude/settings.local.json` 권한 스코프 설정 이력 있음. 현재 파일은 없으므로 당시 설정이 지금도 적용된다고 보지는 않음
* `.gitignore` 추가 (`.claude/settings.local.json` 제외)
* `CLAUDE.md`를 문서 생산용으로 재작성 (기존 코딩 가이드라인 버전 대체)
* 루트 구조 재편: `Jinsu/`(개인), `Teia/`(회사)를 최상위 소유자 구분으로 둠
* 폴더 번호 규칙 적용: 10의 자리 대분류, 1의 자리 소분류. `Jinsu/`와 `Teia/`의 대분류를 같게 맞춤
* `Teia/`는 로컬 전용으로 두고 회사 자료를 git 이력에서 제거
* 쓰지 않는 `references/`, `archive/` 폴더 삭제, `.idea/`를 git 추적에서 제외
* 4개 skill(`word`/`powerpoint`/`excel`/`pdf`)이 이름·설명 기준으로 정상 트리거되는 것 확인 — 추가 손볼 것 없음
* Markdown 파일 작성·편집·검수용 공통 `markdown-docs` skill 추가
* 모든 포맷이 함께 참조하는 `identity/STYLE.md` 초안과 에이전트별 조건부 참조 규칙 추가
* `identity/STYLE.md`에 Markdown 구조, 정보 요소, 이식성, 검수 규칙 반영
* Word 기준 샘플 선택: 문서 모양은 [Microsoft Professional Business Report](https://word.cloud.microsoft/create/en/business-templates/), 기술 문서 구성은 [Smartsheet Software Technical Specification](https://www.smartsheet.com/free-technical-specification-templates)
* Word 원본 2개를 `templates/word/reference/`에 보관하고, 선택한 기준과 기본 목차를 `identity/STYLE.md`에 기록

## 남은 것

Word → PowerPoint → Excel → PDF 순서로 하나씩 진행합니다.

* [ ] **Word** — 1번 서식과 3번 구성을 결합한 샘플 한 개를 보고 한글 문서의 기본 서식 정리
* [ ] **PowerPoint** — 화면 비율·제목·본문·대표 배치 정리
* [ ] **Excel** — 시트·입력/수식 셀·숫자 형식·인쇄 기준 정리
* [ ] **PDF** — 제작/변환·글꼴·페이지·링크 검수 기준 정리
* [ ] **스킬 문체** — 각 포맷을 작업할 때 한국어의 짧고 명확한 지시문으로 정리. 기존 제작·검수 주의사항 유지
* [ ] **스타일 일치** — 스킬의 글꼴·색상 지침을 공통 스타일 가이드와 맞추기
* [ ] **시각 검수** — Word·PPT의 기존 절차 확인, PDF·Excel의 부족한 절차 보완
* [ ] **환경 확인** — 도구 설치 여부와 실제 권한 설정 확인. 현재 `.claude/settings.local.json`은 없음
