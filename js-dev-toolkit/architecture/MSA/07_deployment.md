# 배포 전략

---

## 컨테이너화 (Docker)

각 서비스를 컨테이너로 패키징 → 환경 차이 없이 어디서나 동일하게 실행.

```dockerfile
# 서비스별 Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```
개발 환경 → 스테이징 → 프로덕션
  모두 동일한 Docker 이미지 사용 → "내 로컬에서는 됩니다" 문제 제거
```

---

## 컨테이너 오케스트레이션 (Kubernetes)

수십~수백 개의 컨테이너를 자동으로 관리.

```
Kubernetes 제공 기능
├── Auto Scaling    — 트래픽 증가 시 Pod 자동 증가
├── Self Healing    — 죽은 컨테이너 자동 재시작
├── Rolling Update  — 무중단 배포
├── Service Discovery — 서비스 간 내부 DNS 자동 등록
└── Load Balancing  — Pod 간 자동 부하 분산
```

### 핵심 리소스

| 리소스 | 역할 |
|---|---|
| Pod | 컨테이너 실행 단위 |
| Deployment | Pod 수, 버전 관리 |
| Service | Pod에 안정적인 네트워크 주소 부여 |
| Ingress | 외부 트래픽 → 내부 서비스 라우팅 |
| ConfigMap/Secret | 환경 변수, 설정 분리 |

---

## CI/CD 파이프라인

```
코드 Push
  → [CI] 빌드 + 테스트 + Docker 이미지 빌드 + 이미지 레지스트리 Push
  → [CD] 스테이징 자동 배포
  → (승인) → 프로덕션 배포
```

### 무중단 배포 전략

| 전략 | 설명 | 위험도 |
|---|---|---|
| Rolling Update | 인스턴스를 순차적으로 교체 | 낮음 |
| Blue/Green | 신버전 환경 준비 후 트래픽 전환 | 낮음 (롤백 쉬움) |
| Canary | 일부 트래픽만 신버전으로 (5% → 50% → 100%) | 매우 낮음 |

**Blue/Green**
```
[Load Balancer]
  현재 → [Blue: v1.0]   ← 트래픽 100%
          [Green: v2.0]  ← 준비 완료

전환 → [Green: v2.0] ← 트래픽 100%
        [Blue: v1.0]  ← 대기 (문제 시 즉시 롤백)
```

---

## Service Mesh

서비스 간 통신 관련 공통 기능(mTLS, 트래픽 제어, 관찰가능성)을 인프라 레벨에서 처리.

```
기존: 각 서비스가 직접 Circuit Breaker, Retry, Tracing 코드 구현
Service Mesh: Sidecar Proxy(Envoy)가 대신 처리

[Service A] → [Envoy Proxy] --네트워크--> [Envoy Proxy] → [Service B]
                 ↑                            ↑
           (mTLS, retry,              (mTLS, tracing,
            circuit break)             metrics 수집)
```

대표 도구: Istio, Linkerd

---

## 권장 인프라 스택

```
컨테이너   → Docker
오케스트레이션 → Kubernetes (EKS/GKE/AKS)
CI/CD     → GitHub Actions / GitLab CI / ArgoCD
이미지 레지스트리 → ECR / GCR / Docker Hub
Service Mesh → Istio (복잡, 대규모) or Linkerd (단순, 경량)
```
