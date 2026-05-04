# Soridam (소리담) — Studio Sori

한국 전통 가양주 **소리담**의 소개 사이트. DH2026 (Digital Humanities 2026) 국제학술대회 기증주.

- 공개 URL: https://hursoo.github.io/soridam/
- 양조자: 김미자 (Kim Mija) / Studio Sori
- 수상: 제15회 대한민국명주대상 탁주 부문 금상 (2025-11-01)

## 로컬 미리보기

Ruby + Bundler 필요.

```
bundle install
bundle exec jekyll serve
```

브라우저에서 `http://localhost:4000/soridam/` 접속.

## 구조

| 경로 | 역할 |
|---|---|
| `_config.yml` | Jekyll 설정 (baseurl 포함) |
| `_data/content.yml` | 한/영 모든 텍스트 콘텐츠 (한 곳에서 수정) |
| `_layouts/default.html` | 공통 레이아웃 (헤더·푸터·언어 토글) |
| `index.html` | 메인 페이지 |
| `assets/css/main.css` | 스타일 |
| `assets/js/lang-toggle.js` | 한/영 토글 로직 |
| `assets/img/` | 로고·이미지 |

## 콘텐츠 수정

대부분의 텍스트는 `_data/content.yml`에서 `ko:` 와 `en:` 두 블록을 모두 수정하면 됩니다.
새 섹션을 추가하려면 (1) `content.yml`에 키를 추가하고 (2) `index.html`에 `data-i18n="섹션.키"` 속성으로 바인딩합니다.

## 배포

`main` 브랜치에 push하면 GitHub Pages가 자동 빌드합니다.
저장소 Settings → Pages → Source = "Deploy from a branch" → Branch = `main` / `/ (root)` 로 설정하세요.

## 로고 파일

`assets/img/soridam-logo.jpg` — Studio Sori 워드마크 로고.
