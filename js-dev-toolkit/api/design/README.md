# API Design

API의 응답과 변경 규칙을 일관되게 설계하는 영역입니다. 오류 표현, 버전 관리, 재시도와 중복 요청 처리를 다룹니다.

| 폴더 | 설명 |
|---|---|
| [error-responses](error-responses/) | 오류 코드와 응답 형식을 정해 호출자가 실패 원인을 파악하고 처리하게 합니다. |
| [versioning](versioning/) | API 변경 시 기존 호출자와의 호환성과 버전 전환을 관리합니다. |
| [timeouts-and-retries](timeouts-and-retries/) | 응답을 기다리는 시간을 제한하고 재시도 가능한 실패에 대해 호출을 다시 시도합니다. |
| [idempotency](idempotency/) | 같은 요청을 반복해도 의도한 효과가 중복 발생하지 않도록 처리하는 성질입니다. |
| [rate-limiting](rate-limiting/) | 일정 시간 동안 허용하는 요청량을 제한해 서비스 자원과 사용량을 관리합니다. |
