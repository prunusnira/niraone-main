# nira.one main hub

- 개인 홈페이지 허브
- 다른 사이트로 이동하는 링크 역할을 수행함

## 배포

`master` 브랜치에 푸시하거나 GitHub Actions에서 `Deploy` 워크플로를 수동 실행하면 사이트를 빌드한 뒤 S3에 동기화하고 CloudFront 캐시를 무효화함. S3 동기화에는 `--delete`가 적용되어 빌드 결과에 없는 기존 파일도 삭제됨.

워크플로를 사용하려면 저장소 설정에 다음 값을 등록해야 함.

- Actions 변수: `AWS_REGION`, `AWS_S3_BUCKET`, `AWS_CLOUDFRONT_DISTRIBUTION_ID`
- Actions 시크릿: `AWS_ROLE_ARN`
- AWS IAM 역할: GitHub Actions OIDC를 신뢰하고 대상 S3 버킷의 목록 조회, 객체 업로드 및 삭제 권한과 대상 CloudFront 배포의 무효화 권한을 가짐
