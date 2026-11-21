# 개발 자료 모음

개발 과정에서 참고하는 설계·구현·검증·운영 자료와 문서 양식을 모읍니다.

| 최상위 영역 | 다루는 내용 |
|---|---|
| [architecture](architecture/README.md) | 시스템 구조와 기술 선택에 대한 설계 판단 |
| [frontend](frontend/README.md) | 웹 화면과 클라이언트 구현 |
| [backend](backend/README.md) | 서버 애플리케이션과 업무 기능 구현 |
| [api](api/README.md) | 시스템 간 인터페이스와 계약 |
| [auth](auth/README.md) | 사용자·서비스 인증과 접근 권한 |
| [database](database/README.md) | 데이터베이스 스키마·쿼리·마이그레이션 구현 |
| [testing](testing/README.md) | 테스트 전략과 검증 방법 |
| [quality](quality/README.md) | 코드 품질과 자동 점검 |
| [infrastructure](infrastructure/README.md) | 실행·네트워크·배포 기반 구성 |
| [operations](operations/README.md) | 배포 후 운영과 장애 대응 |
| [development-process](development-process/README.md) | 계획부터 릴리스까지의 개발 흐름 |
| [templates](templates/README.md) | 요구사항·테스트 등 문서 양식 |

`js-dev-toolkit`을 1뎁스로 세며 메뉴는 최대 4뎁스까지 둡니다. 각 최상위 폴더의 README는 담당 범위를 요약합니다. 상세 주제는 해당 영역 아래에 두고, 아직 자료가 없는 폴더에는 `.gitkeep`을 둡니다.

**경계:** 아키텍처 문서는 시스템 구조와 설계 이유를, API 문서는 시스템 간 계약과 통신 방식을, 인증 자료는 신원 확인과 권한 관리를 다룹니다. `architecture/data`는 데이터 모델·소유권·일관성의 설계 판단을, `database`는 스키마·쿼리·마이그레이션 구현을 다룹니다. `architecture/infrastructure`는 기반 구조 선택을, `infrastructure`는 실행 환경과 구축 도구를 다룹니다. 테스트 양식은 `templates/testing`, 테스트 방법은 `testing`에 둡니다.
