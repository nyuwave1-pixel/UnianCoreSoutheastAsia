#!/bin/bash
# ============================================================
#  UNI&CORE SEA — 시놀로지 NAS 자동 백업 스크립트
#  GitHub 저장소(원본) -> NAS 공유폴더로 고정 시간 백업
#  설치: DSM > 제어판 > 작업 스케줄러 > 생성 > 예약된 작업 >
#        사용자 정의 스크립트  (사용자: root, 일정: 매일 원하는 시각)
#  아래 DEST 경로만 본인 NAS 공유폴더에 맞게 수정하세요.
# ============================================================

set -u

# ---- 설정 (필요시 수정) -------------------------------------
REPO_ZIP="https://github.com/nyuwave1-pixel/UnianCoreSoutheastAsia/archive/refs/heads/main.zip"
DEST="/volume1/web/unicore-backup"   # ← NAS 백업 폴더 (예: /volume1/homes/admin/unicore-backup)
KEEP=14                              # 보관할 백업 개수 (오래된 것 자동 삭제)
# -------------------------------------------------------------

STAMP="$(date +%Y%m%d_%H%M%S)"
mkdir -p "$DEST"
TMP_ZIP="$DEST/.tmp_${STAMP}.zip"

echo "[$(date)] UNI&CORE 백업 시작 -> $DEST/$STAMP"

# 1) GitHub에서 전체 프로젝트 ZIP 내려받기
if ! curl -fsSL "$REPO_ZIP" -o "$TMP_ZIP"; then
  echo "[ERROR] GitHub 다운로드 실패. 네트워크/URL 확인 필요."
  exit 1
fi

# 2) 타임스탬프 폴더에 압축 해제 (7z 우선, 없으면 unzip)
mkdir -p "$DEST/$STAMP"
if command -v 7z >/dev/null 2>&1; then
  7z x "$TMP_ZIP" -o"$DEST/$STAMP" >/dev/null 2>&1
elif command -v unzip >/dev/null 2>&1; then
  unzip -q "$TMP_ZIP" -d "$DEST/$STAMP"
else
  echo "[ERROR] 7z/unzip 없음. DSM 패키지센터에서 설치 필요."
  rm -f "$TMP_ZIP"; exit 1
fi
rm -f "$TMP_ZIP"

# 3) 'latest' 폴더에 최신본 복사 (항상 최신 결과물 유지)
SRC_DIR="$(find "$DEST/$STAMP" -maxdepth 1 -type d -name 'UnianCoreSoutheastAsia*' | head -n1)"
if [ -n "$SRC_DIR" ]; then
  rm -rf "$DEST/latest"
  cp -r "$SRC_DIR" "$DEST/latest"
fi

# 4) 오래된 백업 정리 (최신 KEEP개만 보관)
ls -1dt "$DEST"/2*/ 2>/dev/null | tail -n +$((KEEP+1)) | while read -r old; do
  rm -rf "$old"
done

echo "[$(date)] 백업 완료: $DEST/$STAMP  (latest 갱신됨, 보관 ${KEEP}개)"
