# database

데이터베이스 스키마, 쿼리, 트랜잭션과 마이그레이션 등 구현 자료를 둡니다. 데이터 소유권과 모델링 판단은 architecture/data에서 다룹니다.

## 주제 폴더

| 폴더 | 다루는 개념 |
|---|---|
| [connection-management](connection-management/README.md) | 데이터베이스 연결과 풀의 사용·수명 관리를 다룹니다. |
| [migrations](migrations/README.md) | 서비스 변경에 맞춰 데이터 구조를 안전하게 변경하는 절차를 다룹니다. |
| [performance](performance/README.md) | 실행 계획, 인덱스와 쿼리 성능 개선을 다룹니다. |
| [queries](queries/README.md) | 데이터 조회·변경 쿼리와 결과 처리 방식을 다룹니다. |
| [schema](schema/README.md) | 테이블·문서 구조와 제약 조건을 구현하는 내용을 다룹니다. |
| [transactions](transactions/README.md) | 여러 데이터 변경을 원자적으로 처리하고 동시성을 제어하는 개념을 다룹니다. |

