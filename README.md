# OmniSmartHome demo page

빌드나 설치 없이 사용할 수 있는 GitHub Pages 정적 사이트입니다.

## 파일 구성

- `index.html`: Hero, Demo carousel, Overview, Benchmark, PROME, Results
- `styles.css`: 반응형 레이아웃, 모바일 화면, reduced-motion 지원
- `script.js`: 캐러셀 버튼/방향키/Home/End, 스와이프 상태 동기화, 이전 영상 자동 정지
- `assets/images/`: 논문 Figure 1, 3, 4의 고해상도 이미지와 영상 포스터
- `assets/videos/`: G0~G4 원본 MP4 5개
- `.nojekyll`: 정적 파일 직접 배포

## 미리보기

`index.html`을 브라우저에서 열면 됩니다. 로컬 서버를 사용할 경우 이 폴더에서 `python3 -m http.server 8000`을 실행한 다음 `http://localhost:8000`으로 접속하세요.

## GitHub Pages 배포

1. 이 폴더 **안의 파일 전체**를 저장소 루트에 넣습니다. `assets`와 `.nojekyll`도 포함합니다.
2. GitHub 저장소의 Settings → Pages에서 **Deploy from a branch**를 선택합니다.
3. 업로드한 브랜치와 **/(root)**를 지정하고 저장합니다.
4. Pages 배포가 완료되면 제공되는 주소로 접속합니다.

하위 경로의 프로젝트 Pages에서도 작동하도록 모든 내부 파일 경로는 상대 경로입니다. 외부 폰트, CDN, npm 의존성, API 키가 없습니다. 동영상은 자동 재생하지 않으며, 사용자가 재생하면 소리를 들을 수 있습니다. 휴대폰에서는 스와이프 또는 G0~G4 버튼을 사용할 수 있습니다. 동영상 자체에 포커스가 있을 때 방향키는 기본 영상 컨트롤에 맡깁니다.

## 콘텐츠 출처

- 제목, 요약, Figure 1/2/3/4, 벤치마크 정의: 업로드된 논문.
- Results: Table 2의 All 열에서 여섯 PROME backbone의 grounding/goal 정확도. 최신 논문 버전에서도 해당 수치를 확인했습니다.
- 영상: 업로드한 `g0_seg00_think.mp4`~`g4_seg00_think.mp4`를 변환 없이 포함했습니다. 모두 H.264/AAC, 2560×1440입니다.
- 색상: Nerfies (https://nerfies.github.io/)에서 참고한 흰 배경, 중립 회색, 파란 포인트.
- 구성 참고: https://project-edith.github.io/ 의 연구 소개 흐름과 수평 비디오 탐색. 코드·스타일·본문은 새로 작성했습니다.
- 최종 요청에 따라 Anonymous Authors만 표시합니다. 저자 실명, 소속, 학회 이름은 넣지 않았습니다. 원본 PDF도 배포 폴더에 포함하지 않았습니다.

## 수정

영상 교체 시 파일명을 유지하면 코드 수정이 필요 없습니다. 그림은 클릭하면 원본 크기로 열립니다. 작은 화면의 결과 표는 가로 스크롤됩니다.

## Benchmark 샘플

제공된 selected_samples_paper_q의 34개 샘플을 논문 Q 번호 기준으로 배치했습니다. G0/G4는 Q1~Q4, G1/G2/G3는 Q1~Q3입니다. 각 그룹에 Synthetic 17개(이미지+WAV)와 Real-world 17개(MP4)가 위/아래로 배치됩니다.

원본 PNG/WAV/MP4는 assets/samples/syn 및 assets/samples/real에 변경 없이 복사했습니다. 영상 포스터는 첫 프레임 근처에서 추출했습니다. 카드 아래 발화 문장은 제공된 selection_manifest.json의 query를 그대로 사용합니다. 웹용 매핑은 assets/samples/samples.json에 저장되어 있습니다.

Synthetic 이미지 클릭 시 원본 이미지가 열리고, Play audio로 음성을 재생/일시정지합니다. Real-world는 기본 영상 컨트롤로 재생합니다. 다른 미디어를 재생하거나 G를 넘기면 이전 재생이 정지됩니다. 이후 파일 교체 시 이름을 유지하면 미디어 경로는 수정할 필요가 없습니다.

## 논문 문구 대조

Figure 1, 2, 3, 4 캡션은 최신 업로드 논문의 원문으로 반영했습니다(줄바꿈·HTML 서식만 정리). 설명은 Sec. 3.1의 grounding/query/feasibility 정의, Sec. 3.2의 생성 과정, Sec. 3.3의 실행·평가, Sec. 3.4의 perception tools/procedural memory, Sec. 4의 결과를 기준으로 원문 발췌 또는 축약했습니다. 화면용 소제목과 조작 안내는 UI 문구입니다.

PROME 학습에는 원문의 “a single policy-gradient update”와 “We roll out the training set once and apply a single batched update, keeping memory construction lightweight.”를 구분해 사용합니다. 수식 기호·인용 목록은 웹 설명에서 생략했습니다. 상단 +7.3 pp/+10.2 pp는 Table 2의 여섯 backbone gain의 산술평균으로, 논문에 직접 기재된 요약 수치는 아닙니다.

## 원본 Figure PDF

Figure 1~4는 제공된 main.pdf, benchmark.pdf, gen.pdf, agent.pdf를 각각 사용합니다. 원본은 assets/figures/에 변경 없이 보관하고, 웹용 이미지는 원본 PDF에서 직접 고해상도로 렌더링했습니다. 페이지에서 그림을 클릭하면 해당 원본 PDF가 열립니다.

모델 일반명은 최종 요청에 따라 Omni-LLM/omni-LLMs로 통일했습니다. Qwen3-Omni 등 실제 모델명은 그대로 유지합니다.

병렬 설명의 분량을 조정했습니다. G/Q 정의와 생성·학습·추론 단계별 문장 길이를 맞추고 논문 전문 용어를 유지했습니다. Figure 캡션과 샘플 발화는 원문을 유지했습니다.
