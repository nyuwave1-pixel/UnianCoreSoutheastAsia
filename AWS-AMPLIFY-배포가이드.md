# UNI&CORE — AWS 무료 플랜 배포 · 도메인 · 자유 개발 가이드

이 사이트는 **빌드가 필요 없는 정적 멀티페이지 사이트**(HTML/CSS/JS)입니다.
영상·제품 이미지는 원본 URL(superhero.co.kr / us.unincore.com)을 참조하므로 별도 자산 업로드 없이 동작합니다.

> ⚠️ 보안 정책상 저(AI)는 회원님의 AWS 콘솔에 **직접 로그인하거나 리소스를 생성할 수 없습니다.**
> 아래 단계는 회원님이 진행하시면 되고, 원하시면 콘솔을 띄워두신 상태에서 제가 화면을 보며 **단계별로 안내**해 드립니다.
> 모든 단계는 **프리 티어(무료) 범위** 안에서 동작합니다.

---

## 0. 배포 대상 파일 (라이브 준비 완료 ✅)

```
index.html            메인(반응형)
products.html         SHOP(카테고리·카탈로그)
product-detail.html   제품 상세 (?id=1~17)
cart.html             장바구니
ai-analysis.html      AI 피부분석
skin-quiz.html        스킨 진단 퀴즈
about.html            STORY
community.html        COMMUNITY
support.html          SUPPORT
manifest.json         PWA
assets/style.css      공통 스타일
assets/app.js         공통 헤더/푸터·제품데이터·장바구니
```

라이브 가능 여부 → **가능합니다.** 정적 파일 + 외부 URL 참조 구조라 Amplify 프리 티어로 즉시 호스팅됩니다.

---

## 1. AWS Amplify Hosting — 라이브 올리기 (무료)

### 방법 A. 수동 배포 (드래그 & 드롭) · 가장 빠름
1. 배포 폴더의 **모든 파일과 `assets` 폴더**를 함께 선택 → `deploy.zip`으로 압축
   (압축 시 `index.html`이 zip 최상단에 오도록)
2. https://ap-southeast-2.console.aws.amazon.com/amplify/home (시드니, ap-southeast-2) 로그인
3. **Create new app → Deploy without Git**
4. App name `unincore-web`, Environment `production`
5. `deploy.zip` 드래그 → **Save and deploy**
6. 수십 초 후 `https://production.xxxxxx.amplifyapp.com` HTTPS 주소 발급 → **라이브 완료**

### 방법 B. Git 연동 (자유 개발 · 자동 배포) · 추천
코드 수정 시마다 자동으로 재배포되는 **무료 CI/CD** 파이프라인입니다.
1. 이 폴더를 GitHub 저장소로 푸시 (루트에 `index.html`, `amplify.yml` 포함)
2. Amplify → **Create new app → Deploy with Git** → 저장소·브랜치(main) 선택
3. 빌드 설정은 `amplify.yml` 자동 인식 (정적이라 빌드 단계 없음)
4. **Save and deploy** → 이후 `git push` 할 때마다 자동 반영
   - 브랜치를 나눠 `develop` 환경을 추가하면 **자유롭게 실험·개발** 후 main 병합 가능

---

## 2. 자유 개발 환경 — "AWS에서 계속 개발" 옵션

| 목적 | 추천 서비스 | 프리 티어 |
|------|------------|-----------|
| 이 정적 사이트 호스팅 | **Amplify Hosting** | 빌드 1,000분·전송 15GB·저장 5GB / 월 |
| Git 푸시 자동 배포(개발 파이프라인) | **Amplify + GitHub** | 위 한도 내 무료 |
| 서버에서 직접 개발(Node/DB 등 확장) | **EC2 t3.micro** | 750시간/월 (12개월) |
| 코드형 개발 IDE | **Cloud9 / VS Code + EC2** | EC2 프리 티어 내 |
| 이미지·영상 자체 저장 | **S3** | 5GB 저장 / 월 |

> 지금 단계(정적 사이트)는 **Amplify + GitHub 연동**이 가장 적합합니다.
> 추후 회원가입·결제·AI API 등 백엔드가 필요해지면 EC2/Lambda + RDS로 확장하면 됩니다(역시 프리 티어 시작 가능).

---

## 3. 커스텀 도메인 연결 — www.unincore.net (무료 SSL)

Amplify는 도메인 연결 시 **SSL 인증서를 자동 발급·갱신**(무료)합니다.

1. Amplify 앱 → **Hosting → Custom domains → Add domain**
2. `unincore.net` 입력 → **Configure domain**
3. 서브도메인 매핑
   - `www` → 메인 브랜치
   - 루트(`unincore.net`) → `www`로 리디렉션(권장)
4. Amplify가 보여주는 **CNAME / 검증 레코드**를 도메인 DNS에 추가
   - **Route 53 사용 시**: 호스팅 영역에서 원클릭 추가 (※ 호스팅 영역은 월 $0.50 — 프리 티어 외 소액)
   - **기존 등록기관 DNS 사용 시**: 등록기관 관리페이지에 CNAME 추가 → **추가 비용 없음**
5. 검증·SSL 발급까지 보통 수십 분 ~ 수 시간 → 완료되면 `https://www.unincore.net` 라이브

> ⚠️ DNS 레코드 추가는 도메인 등록기관 계정 접근이 필요해 회원님이 직접 진행하셔야 합니다.
> Amplify가 표시하는 레코드 값을 그대로 복사해 넣으면 됩니다. (제가 화면 보며 안내 가능)

---

## 4. 비용 0원 유지 팁
- **AWS Budgets**에서 $1 예산 알림을 설정해 두면 한도 초과 시 메일 알림(무료)
- 영상·이미지는 외부 URL 참조라 Amplify 전송량을 거의 쓰지 않음
- Route 53 호스팅 영역을 만들지 않고 기존 등록기관 DNS를 쓰면 도메인 관련 추가 과금 없음

---

## 5. 라이브 점검 체크리스트
- [ ] `https://...amplifyapp.com` 접속 → 메인 영상·제품 이미지 정상 표시
- [ ] 상단 메뉴 → 전 페이지(SHOP/AI/STORY/COMMUNITY/SUPPORT) 이동 확인
- [ ] 제품 카드 클릭 → 상세 페이지(`product-detail.html?id=…`) 정상
- [ ] 장바구니 담기 → 헤더 배지 카운트 증가, cart.html 표시
- [ ] 모바일(640px 이하) 햄버거 메뉴 동작
- [ ] `www.unincore.net` 연결 후 HTTPS 자물쇠 표시

필요하신 단계에서 콘솔을 띄워주시면, 제가 화면을 보며 클릭 위치까지 안내해 드리겠습니다.
