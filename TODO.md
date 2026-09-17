# TODO

문서 생산 환경 세팅 진행 상황. 마지막 업데이트 2026-09-17.

## 완료

* 폴더 뼈대 생성: `templates/`, `assets/`, `references/`, `archive/`, `skills/{word,powerpoint,excel,pdf,markdown-docs}/`
* Anthropic 공식 docx/pptx/xlsx/pdf skill을 벤더 중립적인 `skills/`에 가져옴
* `.claude/skills`, `.agents/skills`를 공통 `skills/`로 연결하는 junction 구조와 `setup-skills.ps1` 추가
* `.claude/settings.local.json` 권한 스코프 설정: Read/Write/Edit/Glob/Grep/WebSearch는 항상 허용, Bash는 python 실행 + LibreOffice/PowerPoint 탐지 명령으로만 제한, `mcp__ide__executeCode`는 차단
* `.gitignore` 추가 (`.claude/settings.local.json` 제외)
* `CLAUDE.md`를 문서 생산용으로 재작성 (기존 코딩 가이드라인 버전 대체)
* 루트 구조 재편: `Jinsu/`(개인), `Teia/`(회사)를 최상위 소유자 구분으로 두고, 각각 `projects/<name>/{source,working,final}/` 보유
* 4개 skill(`word`/`powerpoint`/`excel`/`pdf`)이 이름·설명 기준으로 정상 트리거되는 것 확인 — 추가 손볼 것 없음
* Markdown 파일 작성·편집·검수용 공통 `markdown-docs` skill 추가
* 모든 포맷이 함께 참조하는 `identity/STYLE.md` 초안과 에이전트별 조건부 참조 규칙 추가
* `identity/STYLE.md`에 Markdown 구조, 정보 요소, 이식성, 검수 규칙 반영

## 남은 것

* **Word 스타일 구체화** — 페이지, 제목, 본문, 표, 머리말·꼬리말과 템플릿 규칙 결정 필요
* **PowerPoint 스타일 구체화** — 화면 비율, 슬라이드 구조, 제목·본문 크기, 시각 자료와 템플릿 규칙 결정 필요
* **Excel 스타일 구체화** — 시트 구조, 입력·수식 셀, 표, 차트, 인쇄 영역과 템플릿 규칙 결정 필요
* **PDF 스타일 구체화** — 독립 제작과 다른 포맷에서 변환할 때의 페이지·탐색·배포 규칙 결정 필요
* **SKILL.md 문체** — 가져온 Anthropic skill 파일들이 여전히 원본의 건조한 문체 그대로. 다시 쓸지, 어떤 톤으로 쓸지 결정 필요
* **QA 시각 검수 방법** — CLAUDE.md Quality 섹션에 "결과물을 시각적으로 검수"라고 되어 있지만, 실제로 렌더링/스크린샷해서 확인하는 절차는 아직 없음 (PDF뿐 아니라 PPTX/DOCX/XLSX도 필요)
* **`references/`, `archive/` 폴더** — 뼈대만 만들어두고 용도·보존 정책 미정
* **Bash 권한 범위** — 지금은 `python *`/`python3 *`를 문서 생성 스크립트로 한정하지 않고 넓게 허용 중이고, LibreOffice/PowerPoint 탐지 명령도 열려있음. 너무 넓다고 느껴지면 재검토
