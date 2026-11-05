# gRPC

Google이 개발한 고성능 오픈소스 RPC(Remote Procedure Call) 프레임워크입니다.
HTTP/2 기반으로 동작하며, Protocol Buffers를 인터페이스 정의 언어(IDL)로 사용합니다.
MSA 환경에서 서비스 간 내부 통신에 주로 활용됩니다.

---

## 1. REST vs gRPC

| 항목 | REST | gRPC |
|---|---|---|
| 프로토콜 | HTTP/1.1 | HTTP/2 |
| 데이터 포맷 | JSON (텍스트) | Protocol Buffers (바이너리) |
| 속도 | 상대적으로 느림 | 최대 10배 빠름 |
| 인터페이스 정의 | OpenAPI (선택) | .proto 파일 (필수) |
| 코드 생성 | 수동 또는 도구 활용 | protoc로 자동 생성 |
| 스트리밍 | 제한적 (SSE, WebSocket 별도) | 양방향 스트리밍 기본 지원 |
| 브라우저 지원 | 완전 지원 | 미지원 (gRPC-Web 필요) |
| 주요 용도 | 외부 API, 브라우저 통신 | 내부 서비스 간 통신 |

> **선택 기준**: 브라우저나 외부 클라이언트가 직접 호출하면 REST, 서비스 간 내부 통신이면 gRPC.

---

## 2. Protocol Buffers (proto3)

gRPC의 인터페이스를 정의하는 언어입니다. `.proto` 파일에 메시지(데이터 구조)와 서비스(메서드)를 선언하면, `protoc` 컴파일러가 각 언어에 맞는 코드를 자동 생성합니다.

### 기본 문법

```protobuf
syntax = "proto3";                          // proto3 버전 선언 (필수)

package user;                               // 네임스페이스 (패키지 충돌 방지)

option java_package = "com.example.user";  // 언어별 옵션
option go_package = "./user";

// 메시지 정의 (데이터 구조)
message User {
  int64  id       = 1;   // 필드번호 1 (절대 변경 금지 — 직렬화 키로 사용됨)
  string name     = 2;
  string email    = 3;
  bool   is_admin = 4;
  repeated string roles = 5;  // repeated = 배열/리스트
}

message GetUserRequest {
  int64 user_id = 1;
}

message GetUserResponse {
  User user = 1;
}

// 서비스 정의 (API 메서드)
service UserService {
  rpc GetUser (GetUserRequest) returns (GetUserResponse);
}
```

### 주요 스칼라 타입

| proto3 타입 | Java | Go | Python | 설명 |
|---|---|---|---|---|
| `double` | double | float64 | float | 64bit 부동소수점 |
| `float` | float | float32 | float | 32bit 부동소수점 |
| `int32` | int | int32 | int | 32bit 정수 |
| `int64` | long | int64 | int | 64bit 정수 |
| `bool` | boolean | bool | bool | 불리언 |
| `string` | String | string | str | UTF-8 문자열 |
| `bytes` | ByteString | []byte | bytes | 바이트 배열 |

### 필드 번호 규칙

```protobuf
message Example {
  string name = 1;   // 1~15: 1바이트로 인코딩 (자주 쓰는 필드에 할당)
  string desc = 16;  // 16~2047: 2바이트로 인코딩
}
```

- 필드 번호는 한 번 배포되면 **절대 변경 불가** — 바이너리 직렬화의 키로 사용되어 변경 시 데이터 깨짐
- 필드를 삭제할 때는 번호를 `reserved`로 예약해서 재사용 방지

```protobuf
message User {
  reserved 3, 4;           // 삭제된 필드 번호 재사용 금지
  reserved "old_email";    // 삭제된 필드명 재사용 금지
  int64  id   = 1;
  string name = 2;
}
```

### Well-Known Types (구글 공식 제공 타입)

```protobuf
import "google/protobuf/timestamp.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";

message Order {
  google.protobuf.Timestamp created_at = 1;  // 타임스탬프
  google.protobuf.StringValue nickname  = 2;  // nullable 문자열 (proto3 기본값 null 불가 문제 해결)
}

service OrderService {
  rpc DeleteOrder (DeleteOrderRequest) returns (google.protobuf.Empty);  // 반환값 없을 때
}
```

---

## 3. 4가지 통신 방식

### 3-1. Unary RPC — 단순 요청/응답

가장 기본적인 방식. HTTP REST와 동일한 1:1 요청/응답 패턴입니다.

```protobuf
service UserService {
  rpc GetUser (GetUserRequest) returns (GetUserResponse);
}
```

```
Client                    Server
  │──── GetUser(req) ────►│
  │◄─── GetUserResponse ──│
```

**사용 예**: 단건 조회, 생성, 수정, 삭제

---

### 3-2. Server Streaming RPC — 서버 스트리밍

클라이언트가 요청을 한 번 보내면, 서버가 스트림으로 여러 응답을 연속해서 보냅니다.

```protobuf
service NotificationService {
  rpc Subscribe (SubscribeRequest) returns (stream Notification);
  //                                        ^^^^^^ stream 키워드
}
```

```
Client                         Server
  │── SubscribeRequest ───────►│
  │◄── Notification(1) ────────│
  │◄── Notification(2) ────────│
  │◄── Notification(3) ────────│
  │◄── (stream end) ───────────│
```

**사용 예**: 실시간 알림, 대용량 데이터 다운로드, 로그 스트리밍

---

### 3-3. Client Streaming RPC — 클라이언트 스트리밍

클라이언트가 스트림으로 여러 요청을 보내고, 서버가 모두 받은 후 응답을 한 번 보냅니다.

```protobuf
service UploadService {
  rpc UploadFile (stream FileChunk) returns (UploadResult);
  //              ^^^^^^ stream 키워드
}
```

```
Client                         Server
  │──── FileChunk(1) ──────────►│
  │──── FileChunk(2) ──────────►│
  │──── FileChunk(3) ──────────►│
  │──── (stream end) ──────────►│
  │◄─── UploadResult ───────────│
```

**사용 예**: 파일 업로드, 대용량 데이터 집계, IoT 센서 데이터 수집

---

### 3-4. Bidirectional Streaming RPC — 양방향 스트리밍

클라이언트와 서버가 동시에 독립적으로 스트림을 주고받습니다. 두 스트림은 서로 독립적으로 동작합니다.

```protobuf
service ChatService {
  rpc Chat (stream ChatMessage) returns (stream ChatMessage);
  //         ^^^^^^                       ^^^^^^
}
```

```
Client                         Server
  │──── Message("안녕") ───────►│
  │◄─── Message("반가워") ───────│
  │──── Message("잘지내?") ─────►│
  │◄─── Message("응 잘지내") ────│
  │           (동시 진행)         │
```

**사용 예**: 실시간 채팅, 게임 서버, 실시간 협업 도구

---

## 4. 핵심 개념

### 4-1. Channel & Stub

**Channel**: 서버와의 연결을 나타내는 객체. 실제 TCP 연결을 추상화합니다.
**Stub**: Channel을 통해 서버의 메서드를 호출하는 클라이언트 객체. protoc가 자동 생성합니다.

```java
// Java 예시
ManagedChannel channel = ManagedChannelBuilder
    .forAddress("user-service", 50051)
    .usePlaintext()   // 개발환경. 운영은 반드시 TLS 사용
    .build();

UserServiceGrpc.UserServiceBlockingStub stub =
    UserServiceGrpc.newBlockingStub(channel);  // 동기 스텁

// 비동기 스텁도 존재
UserServiceGrpc.UserServiceStub asyncStub =
    UserServiceGrpc.newStub(channel);
```

| Stub 종류 | 동작 방식 | 용도 |
|---|---|---|
| `BlockingStub` | 응답 올 때까지 스레드 블로킹 | 단순 동기 처리 |
| `Stub` (async) | 콜백/Future 기반 비동기 | 논블로킹 처리 |
| `FutureStub` | ListenableFuture 반환 | Unary 전용 비동기 |

---

### 4-2. Metadata

HTTP의 헤더에 해당합니다. 인증 토큰, 요청 ID, 언어 설정 등 비즈니스 데이터 외의 부가 정보를 전달합니다.

```java
// 클라이언트에서 메타데이터 전송
Metadata metadata = new Metadata();
metadata.put(
    Metadata.Key.of("authorization", Metadata.ASCII_STRING_MARSHALLER),
    "Bearer eyJhbGci..."
);

UserServiceGrpc.UserServiceBlockingStub stub =
    MetadataUtils.attachHeaders(baseStub, metadata);
```

```java
// 서버에서 메타데이터 수신
public void getUser(GetUserRequest req, StreamObserver<GetUserResponse> observer) {
    String token = Context.current()
        .call(() -> AUTHORIZATION_KEY.get());  // Interceptor에서 추출한 값 사용
}
```

---

### 4-3. Interceptor (인터셉터)

모든 RPC 호출에 공통 로직을 적용하는 미들웨어입니다. 인증, 로깅, 트레이싱, 에러 핸들링을 여기서 처리합니다.

```java
// 서버 인터셉터 예시 — JWT 인증
public class AuthInterceptor implements ServerInterceptor {

    @Override
    public <Req, Resp> ServerCall.Listener<Req> interceptCall(
        ServerCall<Req, Resp> call,
        Metadata headers,
        ServerCallHandler<Req, Resp> next
    ) {
        String token = headers.get(AUTHORIZATION_KEY);

        if (!isValid(token)) {
            call.close(Status.UNAUTHENTICATED.withDescription("유효하지 않은 토큰"), new Metadata());
            return new ServerCall.Listener<>() {};  // 빈 리스너 반환으로 처리 중단
        }

        // 다음 핸들러로 진행
        return next.startCall(call, headers);
    }
}
```

```java
// 클라이언트 인터셉터 예시 — 요청 로깅
public class LoggingInterceptor implements ClientInterceptor {

    @Override
    public <Req, Resp> ClientCall<Req, Resp> interceptCall(
        MethodDescriptor<Req, Resp> method,
        CallOptions callOptions,
        Channel next
    ) {
        log.info("gRPC 호출: {}", method.getFullMethodName());
        return next.newCall(method, callOptions);
    }
}
```

---

### 4-4. Status Code & Error Handling

gRPC는 HTTP 상태코드 대신 자체 Status Code를 사용합니다.

| 코드 | 이름 | 의미 | HTTP 유사 |
|---|---|---|---|
| 0 | `OK` | 성공 | 200 |
| 1 | `CANCELLED` | 클라이언트가 요청 취소 | - |
| 2 | `UNKNOWN` | 알 수 없는 에러 | 500 |
| 3 | `INVALID_ARGUMENT` | 잘못된 요청 파라미터 | 400 |
| 4 | `DEADLINE_EXCEEDED` | 타임아웃 초과 | 408 |
| 5 | `NOT_FOUND` | 리소스 없음 | 404 |
| 6 | `ALREADY_EXISTS` | 이미 존재함 | 409 |
| 7 | `PERMISSION_DENIED` | 권한 없음 | 403 |
| 8 | `RESOURCE_EXHAUSTED` | 리소스 한도 초과 (Rate Limit) | 429 |
| 12 | `UNIMPLEMENTED` | 구현되지 않은 메서드 | 501 |
| 14 | `UNAVAILABLE` | 서버 일시 불가 (재시도 가능) | 503 |
| 16 | `UNAUTHENTICATED` | 인증 정보 없음/만료 | 401 |

```java
// 서버에서 에러 반환
@Override
public void getUser(GetUserRequest req, StreamObserver<GetUserResponse> observer) {
    User user = userRepository.findById(req.getUserId());

    if (user == null) {
        observer.onError(
            Status.NOT_FOUND
                .withDescription("사용자를 찾을 수 없습니다. id=" + req.getUserId())
                .asRuntimeException()
        );
        return;
    }

    observer.onNext(GetUserResponse.newBuilder().setUser(user).build());
    observer.onCompleted();
}
```

```java
// 클라이언트에서 에러 처리
try {
    GetUserResponse response = stub.getUser(request);
} catch (StatusRuntimeException e) {
    if (e.getStatus().getCode() == Status.Code.NOT_FOUND) {
        // 404 처리
    } else if (e.getStatus().getCode() == Status.Code.UNAUTHENTICATED) {
        // 토큰 갱신 후 재시도
    }
}
```

---

### 4-5. Deadline (데드라인)

타임아웃과 유사하지만, **절대 시간**으로 설정합니다. 마이크로서비스 체인(A → B → C)에서 전파되어 전체 체인의 응답시간을 제어합니다.

```java
// 클라이언트에서 데드라인 설정
GetUserResponse response = stub
    .withDeadlineAfter(3, TimeUnit.SECONDS)  // 3초 안에 응답 없으면 DEADLINE_EXCEEDED
    .getUser(request);
```

> **Deadline vs Timeout 차이**: Timeout은 각 구간의 상대 시간, Deadline은 최초 요청부터의 절대 종료 시각. 서비스 A가 B를 호출할 때 남은 Deadline을 그대로 전파하면, 전체 체인이 원래 Deadline 안에서 처리됩니다.

```java
// Deadline 전파 예시 (A → B → C 체인)
public void processOrder(Request req, StreamObserver<Response> observer) {
    // 현재 컨텍스트의 Deadline을 하위 서비스 호출에도 그대로 적용
    Context currentContext = Context.current();
    userStub.withDeadline(currentContext.getDeadline()).getUser(...);
}
```

---

### 4-6. TLS / 인증

```java
// 서버 — TLS 설정
Server server = ServerBuilder.forPort(50051)
    .useTransportSecurity(
        new File("server.crt"),   // 인증서
        new File("server.key")    // 개인키
    )
    .addService(new UserServiceImpl())
    .build();

// 클라이언트 — TLS 연결
ManagedChannel channel = NettyChannelBuilder
    .forAddress("user-service", 50051)
    .sslContext(GrpcSslContexts.forClient()
        .trustManager(new File("ca.crt"))  // CA 인증서로 서버 검증
        .build())
    .build();
```

---

### 4-7. Reflection & gRPC-UI

서버에 Reflection 서비스를 등록하면, 클라이언트가 `.proto` 파일 없이도 서비스 목록과 메서드를 조회할 수 있습니다. 개발/테스트 환경에서 Postman처럼 gRPC를 테스트할 수 있게 해줍니다.

```java
// 서버에 Reflection 등록 (개발 환경에서만 사용 권장)
Server server = ServerBuilder.forPort(50051)
    .addService(new UserServiceImpl())
    .addService(ProtoReflectionService.newInstance())  // Reflection 등록
    .build();
```

**테스트 도구**:
- **grpcurl** — curl과 유사한 CLI 도구
- **grpcui** — 브라우저 기반 GUI (Postman과 유사)
- **Postman** — v9.7 이후 gRPC 지원

```bash
# grpcurl 사용 예시
grpcurl -plaintext localhost:50051 list                          # 서비스 목록
grpcurl -plaintext localhost:50051 list user.UserService        # 메서드 목록
grpcurl -plaintext -d '{"user_id": 1}' localhost:50051 user.UserService/GetUser
```

---

## 5. .proto 파일 설계 원칙

```
api/grpc/
  proto/
    user/
      v1/
        user.proto          # 메시지 정의
        user_service.proto  # 서비스 정의
    order/
      v1/
        order.proto
        order_service.proto
    common/
      v1/
        common.proto        # 공통 메시지 (Pagination, Error 등)
```

**버전 관리**: 패키지에 `v1`, `v2`를 포함하면 하위 호환성 유지하면서 버전 업그레이드 가능

```protobuf
// 하위 호환 변경 (안전)
// - 새 필드 추가 (기존 클라이언트는 모르는 필드를 무시)
// - optional 필드 추가

// 하위 비호환 변경 (위험 — 절대 금지)
// - 기존 필드 번호 변경
// - 기존 필드 타입 변경
// - 기존 필드 삭제 (reserved로 예약해야 함)
```

---

## 6. MSA에서의 활용 패턴

```
[Browser / Mobile]
        │  REST (JSON)
        ▼
[API Gateway]
        │  gRPC (내부 통신)
        ├──────────────► [User Service :50051]
        ├──────────────► [Order Service :50052]
        └──────────────► [Payment Service :50053]
```

- **외부 ↔ API Gateway**: REST/HTTP (브라우저 호환성)
- **내부 서비스 간**: gRPC (성능, 타입 안전성)
- **API Gateway에서 변환**: REST → gRPC 트랜스코딩 (`google.api.http` 옵션 활용)

```protobuf
import "google/api/annotations.proto";

service UserService {
  rpc GetUser (GetUserRequest) returns (GetUserResponse) {
    option (google.api.http) = {
      get: "/v1/users/{user_id}"   // REST 엔드포인트도 동시 지원
    };
  }
}
```
