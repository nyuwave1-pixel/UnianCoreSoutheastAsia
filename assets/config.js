/* UNI&CORE 사이트 ↔ 어드민 백엔드(MemberAuth) 연동 설정.
   - AUTH_API: 비워두면 데모(localStorage) 모드. 실제 연동 시 백엔드 주소로 설정.
       로컬 개발:  http://localhost:4000/api/v1/member-auth
       운영:       https://<배포된 어드민 API 도메인>/api/v1/member-auth
       ※ 백엔드 CORS_ORIGINS 에 이 사이트 출처를 등록해야 함.
   - AUTH_COUNTRY: 가입 기본 국가(폼에서 선택하면 그 값이 우선). PH/TH/ID/VN/MY. */
window.UNICORE_CONFIG = {
  AUTH_API: '',          // 예: 'http://localhost:4000/api/v1/member-auth'  ← 연동 시 채우기
  AUTH_COUNTRY: 'PH',
};
