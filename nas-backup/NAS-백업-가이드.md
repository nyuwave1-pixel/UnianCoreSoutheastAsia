# UNI&CORE SEA — 시놀로지 NAS 자동 백업 가이드

개발 결과물을 **고정 시간마다 자동으로 NAS에 백업**하는 설정입니다.
GitHub 저장소가 항상 최신 원본을 보관하고, NAS가 정해진 시각에 이를 내려받아
타임스탬프 폴더로 백업합니다. (사람 개입 없이 완전 자동)

---

## 왜 이 방식인가
- 개발/배포할 때마다 모든 파일이 GitHub(`nyuwave1-pixel/UnianCoreSoutheastAsia`)에 커밋됩니다 → **1차 백업(원본)**.
- NAS는 사설망(192.168.0.7)이라 외부에서 직접 push가 불가능하지만, **NAS가 GitHub에서 당겨오는 것은 가능**합니다.
- 따라서 NAS의 **작업 스케줄러**로 고정 시각에 자동 다운로드하면 **2차 백업(NAS 보관)**이 완성됩니다.

---

## 설치 방법 (DSM)

1. **공유폴더 준비** — File Station에서 백업 폴더를 만듭니다. 예: `web/unicore-backup`
   (스크립트의 `DEST` 값을 이 경로로 맞추세요. 예: `/volume1/web/unicore-backup`)

2. **스크립트 경로 수정** — `unicore-nas-backup.sh` 파일을 열어 `DEST=` 줄을
   본인 NAS 공유폴더 절대경로로 수정합니다.

3. **작업 스케줄러 등록**
   - DSM > **제어판** > **작업 스케줄러**
   - **생성** > **예약된 작업** > **사용자 정의 스크립트**
   - **일반**: 작업 이름 `UNICORE-백업`, 사용자 `root`
   - **일정**: 매일 / 원하는 고정 시각 (예: 새벽 03:00). 필요하면 하루 여러 번도 가능.
   - **작업 설정 > 사용자 정의 스크립트**에 아래를 붙여넣기:
     ```bash
     bash /volume1/web/unicore-backup/unicore-nas-backup.sh
     ```
     (스크립트를 둔 실제 경로로 맞추세요.)
   - 확인 후 저장.

4. **테스트** — 작업을 선택하고 **실행**을 눌러 즉시 1회 백업해 봅니다.
   `DEST` 폴더에 `YYYYMMDD_HHMMSS` 폴더와 `latest` 폴더가 생기면 성공입니다.

---

## 백업 결과 구조
```
unicore-backup/
├─ 20260618_030000/        # 시각별 스냅샷 (최근 14개 자동 보관)
│   └─ UnianCoreSoutheastAsia-main/  ... 전체 소스
├─ 20260619_030000/
├─ latest/                 # 항상 최신본 (덮어쓰기)
└─ ...
```
- `KEEP=14` → 최근 14개 스냅샷만 유지하고 오래된 건 자동 삭제(용량 관리).
- 보관 개수·경로는 스크립트 상단에서 조정 가능합니다.

---

## 필요 조건
- DSM에 `curl`과 `7z`(또는 `unzip`)가 있어야 합니다. 대부분 기본 포함이며,
  없으면 패키지센터에서 설치하세요.
- 저장소가 **Public**이라 인증 없이 다운로드됩니다. (Private로 바꾸면 토큰 필요)

---

## 참고
GitHub 전체 ZIP 수동 다운로드:
https://github.com/nyuwave1-pixel/UnianCoreSoutheastAsia/archive/refs/heads/main.zip
