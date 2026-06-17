# UNI&CORE — GitHub Pages 라이브 배포 가이드

GitHub Pages는 **무료 정적 호스팅**이며, 저장소에 올린 파일(HTML·CSS·JS·**이미지·영상 포함**)을 그대로 서빙합니다.
→ 기기 사진(`assets/img/`)과 영상(`assets/video/`)을 저장소에 함께 커밋하면 **실사진·영상이 자동으로 표시**됩니다.

> ⚠️ 보안상 제가 회원님 GitHub 계정에 직접 로그인하거나 push 할 수 없습니다.
> 아래 단계는 회원님이 진행하시면 되며, 화면을 보며 단계별로 안내해 드릴 수 있습니다.

---

## 0. 올릴 파일 (이 폴더 전체)
```
index.html  products.html  product-detail.html  cart.html
ai-analysis.html  skin-quiz.html  about.html  community.html  support.html
derma.html  derma-home.html  derma-10.html  derma-10-pro.html  derma-hand.html
manifest.json  .nojekyll
assets/style.css  assets/app.js
assets/img/      ← 기기 사진 (derma10.png, dermahome.png, dermahand.png …)
assets/video/    ← 영상 (derma10pro.mp4, device.mp4 …)
```
> **기기 사진·영상을 먼저 `assets/img/`, `assets/video/`에 넣은 뒤** 올리면, 라이브에서 바로 보입니다.
> (사진을 `dermahome.png`, `derma10.png` 등 안내된 파일명으로 저장)

---

## 방법 A. 웹 업로드 (가장 쉬움, Git 불필요)
1. https://github.com 로그인 → 우측 상단 **+ → New repository**
2. Repository name: `unincore` (또는 원하는 이름) · **Public** 선택 → **Create repository**
3. 새 저장소 화면에서 **uploading an existing file** 클릭
4. 이 폴더의 **모든 파일과 `assets` 폴더**를 드래그&드롭 → **Commit changes**
   - (폴더째 끌어다 놓으면 하위 파일까지 함께 업로드됩니다)
5. **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** / **/(root)** → **Save**
6. 1~2분 후 상단에 라이브 주소 표시:
   `https://<your-id>.github.io/unincore/`  → **라이브 완료**

## 방법 B. Git 명령 (CLI)
```bash
cd "E:\유니앤코어\클로드개발\유니앤코어동남사이트개발"
git init
git add .
git commit -m "UNI&CORE site"
git branch -M main
git remote add origin https://github.com/<your-id>/unincore.git
git push -u origin main
```
이후 **Settings → Pages**에서 main / root 선택. 코드 수정 후 `git push` 하면 자동 반영됩니다.

---

## 커스텀 도메인 — www.unincore.net (무료 HTTPS)
1. **Settings → Pages → Custom domain** 에 `www.unincore.net` 입력 → Save
   - 저장소 루트에 `CNAME` 파일(내용: `www.unincore.net`)이 자동 생성됩니다.
2. 도메인 등록기관 DNS에 레코드 추가:
   - `www` → CNAME → `<your-id>.github.io`
   - 루트(`unincore.net`) → A 레코드 4개:
     `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`
3. Pages 설정에서 **Enforce HTTPS** 체크 (인증서 자동 발급, 무료)

---

## 라이브 점검 체크리스트
- [ ] 라이브 주소 접속 → 메인 영상·제품 이미지 표시
- [ ] 상단 메뉴(SHOP / DERMA / AI / STORY / COMMUNITY / SUPPORT) 이동
- [ ] DERMA → 기기 사진 표시 (assets/img 에 파일 추가 시)
- [ ] 제품 가격 ₱(페소) 표기, 장바구니 동작
- [ ] 모바일 햄버거 메뉴

준비되시면 GitHub 화면을 띄워 주세요 — 저장소 생성부터 Pages 활성화·도메인 연결까지 클릭 위치를 짚어 드리겠습니다.
