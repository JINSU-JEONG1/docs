# TODO

문서 생산 환경 세팅 진행 상황. 마지막 업데이트 2026-09-16.

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

## 남은 것

* **문서 디자인 스타일 방향** — Claude 기본 스타일(IBM Plex 폰트, 네이비/브래스 팔레트)이 마음에 안 든다고 하셨고, 대안 방향은 아직 미정. `templates/<format>/`을 채우려면 이게 먼저 정해져야 함. 관련 메모리: `feedback_no_anthropic_style`
* **SKILL.md 문체** — 가져온 Anthropic skill 파일들이 여전히 원본의 건조한 문체 그대로. 다시 쓸지, 어떤 톤으로 쓸지 결정 필요
* **QA 시각 검수 방법** — CLAUDE.md Quality 섹션에 "결과물을 시각적으로 검수"라고 되어 있지만, 실제로 렌더링/스크린샷해서 확인하는 절차는 아직 없음 (PDF뿐 아니라 PPTX/DOCX/XLSX도 필요)
* **`references/`, `archive/` 폴더** — 뼈대만 만들어두고 용도·보존 정책 미정
* **Bash 권한 범위** — 지금은 `python *`/`python3 *`를 문서 생성 스크립트로 한정하지 않고 넓게 허용 중이고, LibreOffice/PowerPoint 탐지 명령도 열려있음. 너무 넓다고 느껴지면 재검토
