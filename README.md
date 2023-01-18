[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FHH-campUs%2FcampUs_FE&count_bg=%235185A6&title_bg=%2380A3D6&icon=riseup.svg&icon_color=%23FFFFFF&title=Visitors&edge_flat=false)](https://hits.seeyoufarm.com)

# 🏕️ [CampUs] 날씨 기반 캠핑 장소 추천 서비스

### 어떤 날 어디로 언제 캠핑 갈까?

캠핑은 저희 **CampUs** 와 함께! <br>

다른 사람들의 `후기`나 원하는 캠핑 장소의 `날씨`, 그리고 캠핑 장소의 `유형`, `운영 기간`, `편의 시설`, 
`테마 환경`, `체험 프로그램` 등 여러 가지 캠핑 정보를 활용해 나에게 알맞는 캠핑 계획을 세우시는 건 어떨까요?

![서비스 시연 영상 - Clipchamp로 제작](https://user-images.githubusercontent.com/83018778/209465837-b70c0904-1900-494f-95bd-25594fa88095.gif)

  
### [🚗 CampUs를 체험해보세요!](https://camp-us.co.kr/)  

<br/>

## Contents | 목차
1. [⌛ TimeLine | 타임라인](#-timeline-|-타임라인)
2. [🪛 Architecture | 아키텍쳐](#-architecture-|-아키텍쳐)
3. [💡Feature | 구현 기능](#-feature-|-구현-기능)
4. [🖼️ ERD | 데이터 구조도](#-erd-|-데이터-구조도)
5. [🛠️ Stacks | 사용 스택](#-stacks-|-사용-스택)
6. [⚽ Trouble Shooting | 트러블 슈팅](#-trouble-shooting-|-트러블-슈팅)
7. [🪛 PATCH NOTES | 패치 노트](#-patch-notes-|-패치-노트)
8. [👨‍💻👩‍💻Who Made It | 서비스를 가꾼 사람들](#-who-made-it-|-서비스를-가꾼-사람들)

<br/>


## ⌛ TimeLine | 타임라인
- 총 프로젝트 기간 11월 4일 ~ 12월 15일 (6주)
- 12월 10일 배포 및 런칭

<br/>



## 🪛 Architecture | 아키텍쳐

![title](https://github.com/HH-campUs/campUs_FE/blob/master/public/Architecture.png)   

<br/>

## 🖼️ ERD | 데이터 구조도
<details>
  <summary> ERD 보기 </summary>
  <div markdown="1">
    <img src="https://github.com/HH-campUs/campUs_FE/blob/master/public/ERD.png" alt="image">
  </div>
</details>
<br/>

## 💡Feature | 구현 기능

#### 🌧️ 캠핑을 떠나기 전! 갑자기 비가 내리면 어떡하지..?
  ```
  걱정마세요. CampUs에서는 지역 검색으로 캠핑장 조회 시, 금일로부터 최대 8일까지의 날씨 정보를 제공해드립니다. 
  미리 확인하시고 더욱 더 즐거운 캠핑이 되실 수 있을 겁니다.
  ```
#### 🤔 이번 주말.. 나는 떠날꺼야. 근데 어디가 떠나기 좋은 곳이지?
  ```
  저희 서비스에서는 자체 알고리즘을 통해 금주 날씨가 가장 좋은 지역을 추천해주고, 해당 지역의 캠핑장들을 
  소개시켜 드립니다.
  ```
#### ☝ 나는 지역별 뿐만 아니라 키워드 형태의 캠핑장 목록이 보고싶어
  ```
  CampUs에서는 지역별 검색 뿐만 아니라, 키워드 검색, 카테고리 별 캠핑장 조회, 그리고 현재 인기가 많은 캠핑장을 
  제공함으로써, 캠핑들의 선택을 다채롭게 해드립니다.
  ```
#### 🗺️ 빨리 갔다오고싶은데.. 근교에 어디 좋은 캠핑장 없나?
  ```
  현 위치 조회에 동의하시면, 내 주변 30km 내의 어떤 캠핑장이 있는지 확인할 수 있어요!
  근교에 위치해있는 캠핑장 정보도 제공해드려요~
  ```
#### 🙋‍♀️ 캠핑장 정보 어디까지 알아보고 오셨어요?
  ```
  저희 CampUs에 연결된 캠핑장 정보는 위치, 영업날짜, 반려동물 반입, 부대시설, 주변이용시설 등의 다양한 정보를 제공드리고 
  있으며,  해당 캠핑장을 이용했던 사람들의 리뷰를 보고, 반대로 쓰기도 가능해요!
  ```
  
#### ✏️ 이 캠핑장으로 이번주 토요일에 떠날 예정인데 따로 볼 수 있게 관리하고 싶어요
  ```
  마음에 드는 캠핑장을 찜해서 챙겨서보고, 더 나아가 정말로 가고싶은 캠핑장을 여행일정으로 등록해 보세요! 
  CampUs가 여러분의 캠핑일정을 관리해드립니다.
  ```
<br/>


## 🛠️ Stacks | 사용 스택
**Front End**
<br/>
<br/>
<img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=Typescript&logoColor=black"> <img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=REACT&logoColor=black"> <img src="https://img.shields.io/badge/REACT QUERY-FF4154?style=for-the-badge&logo=React Query&logoColor=white"> <img src="https://img.shields.io/badge/RECOIL-0078D4?style=for-the-badge&logo=RECOIL&logoColor=black"> <img src="https://img.shields.io/badge/STYLED-COMPONENTS-DB7093?style=for-the-badge&logo=STYLEDCOMPONENTS&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
<img src="https://img.shields.io/badge/AXIOS-5A29E4?style=for-the-badge&logo=AXIOS&logoColor=white">
<img src="https://img.shields.io/badge/REACT ROUTER-CA4245?style=for-the-badge&logo=REACTROUTER&logoColor=white">

<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=GITHUB&logoColor=white"> <img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=for-the-badge&logo=VISUAL STUDIO CODE&logoColor=white"> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=NETLIFY&logoColor=white">

<br/>

<details>
  <summary>Typescript</summary>
  <div markdown="6">
  <div>
  자바스크립트는 동적타입의 언어로 런타임 시 변수의 타입이 결정되기 때문에
  코드를 실행 시키기전까지 에러를 알 수 없기 때문에 치명적이다.
  그에 반해 TypeScript는 정적 타입 언어로 컴파일 단계에서 오류를 포착할 수 있는 장점이 있으며
  명시적인 정적 타입 지정은 개발자의 의도를 명확하게 코드로 작성 할 수 있고
  코드의 가독성을 높이고 예측할 수 있게 하며 디버깅이 쉽기 때문에 사용
</div>
  </div>
 </details>
 
 <details>
  <summary>Recoil</summary>
  <div markdown="7">
  <div>
  props drilling을 방지하기 위해 다른컴포넌트에 사용되는 전역상태 관리 라이브러리가 필요하다고 판단하였습니다. 
  redux-thunk / redux-toolkit도 있었지만 서버상태 관리를 react-query가 하기 때문에 좀 더 가볍고 직관적인 recoil을 선택하였습니다.
</div>
  </div>
 </details>
 
 <details>
  <summary>React Query</summary>
  <div markdown="8">
  <div>
  캠핑장/날씨 api 데이터를 효율적으로 사용 하기위해서 리액트 쿼리를 사용하였습니다.
  useState/useEffect 등 코드들의 중복도 줄여주고, 캐싱을 해주기때문에 더 나은 사용자환경을 만들수 있었습니다.
</div>
  </div>
 </details>

<br/>

## ⚽ Trouble Shooting | 트러블 슈팅
<details>
  <summary> 캠핑장 / 날씨API 사용 </summary>
  <div markdown="2">
<div>

    1. 요구사항

    1) 사용가능한 캠핑장 / 날씨 api 찾기
    2) 서비스 목적에 맞는 api 선별.
    
    2. 선택지
    
    캠핑장 : 공공Data / gocamping.
    날씨 : 공공Data / openWetherAPI / accuweatherAPI
    
    3. 의견 조율/결정
    
    - 캠핑장

    공공data는 전국 캠핑장들을 관리하기 위한 데이터로 판단이 되어 goCamping api를 사용하기로 결정.
    이후 서비스 목적에 맞는 데이터들을 선별해서 사용함.
    
    - 날씨
    
    공공data의 경우 서비스 목적에 맞는 데이터라기 보다는 데이터분석에 알맞는 api로 생각이 되었음.
    (적설량, 5.0m지중온도, 풍속 품질검사 등 데이터가 예보와는 맞지 않다고 판단함)
    accuweather의 경우 예보일이 5일로 openWeather보다 상대적으로 짧아서 최종적으로 openWeatherAPI를 사용하기로 결정.
    
    해외의 api이다 보니 좌표값 설정이 서울로 지정 되어 있어 서비스에 맞게
    전국을 특별/광역시와 도로 나눈 이후 좌표값설정을 통하여 지역에 맞는 날씨와 필요한 데이터 api를 가져옴
    또한 apiCall이 하루 1000건으로 제한이 되어 있어, 프론트에서 계속 호출하는 것이 아닌
    백엔드 서버에 api정보들을 담아서 FE는 BE로 api호출을 하고, BE는 지정된 시간에 api호출을 하여 효율적으로 운영 함.
</div>
  </div>
</details>

<details>
  <summary> 데이터 api사용 / 카카오 맵 이용 </summary>
  <div markdown="3">
<div>

     1. 문제상황

    카카오맵 사용시 X,Y좌표에 캠핑장 좌표가 담기지 않는 에러가 발생함.

    2. 문제해결과정

    1 ) useEffect로 카카오맵이 실행을 하다 보니, 백엔드에서 좌표값을 받아서 변수로 
        처리해 준다 하여도 맵component는 Mount되어 있기 때문에 맵이 동작하지 않는다고 판단.
    2 ) useEffect외부에서 변수(X,Y)가 바뀔때마다 재 랜더링을 할수 있도록 의존성배열에
        변수 값 추가 및 일정기간 이후에 다시 동작하도록 setTimeout함수 구현.
    3 ) 그럼에도 불구하고 동작하지 않고 똑같은 문제가 발생함.
    4 ) 맵component의 좌표 값에 하드코딩으로 숫자를 넣어주면 잘 동작한다는 것을 확인 한 후, 백엔드에서 받아오는 api데이터를 확인 함.
    
    5-1 ) 프론트 : 데이터를 한번에 받아오는 것이 아닌 한번 받아온 데이터를 다시 변수에 담은 후 사용하여 undefined에러가 발생하게 되었고 경로도 맞지 않음을 확인.
    5-2 )백엔드 : 경로 수정이 되었으나 프론트와 소통을 하지 못한 문제가 있었음을 확인.
    6 ) 데이터 경로 수정하여 맵 구현 

    3. 의견조율 및 결정

    1 ) 프론트 에서는 가능하면 데이터를 2중으로 받아오지 않도록 하기로 함.
    2 ) 백엔드 에서는 사소한 경로변경도 소통 후 수정하기로 함.
</div>
  </div>
</details>

<details>
  <summary> openWether API request scheduling</summary>
  <div markdown="4">
<div>

     1. 요구사항

    날씨 정보는 매일 업데이트 되므로, 당일+7일의 날씨를 받아오기 위해 자동화의 필요성

    2. 문제상황
    매일 사람이 접속하지 않는 시간에 request 요청을 보내는것은 서버관리와 운영에 있어서 효율이 좋지 못함

    3. 선택지 및 의견조율

    한적한 시간대인 새벽5시마다 openWether API에 요청을 보낸 후 DB삭제후 새로 생성
    (매일 기온과 날씨 정보가 변하기 떄문에 업데이트 대신 삭제후 생성으로 선택)
    1) node-cron을 이용하여 server.ts에 예약코드를 넣어서 실행
    2) node-schedule를 이용하여 server.ts에 예약코드를 넣어서 실행
</div>
  </div>
</details>

<details>
  <summary> 지역별 및 주제별 캠핑장 조회시 총 캠핑장 갯수 조회 / 성능 개선</summary>
  <div markdown="5">
<div>

    1. 요구사항

    doNm:도이름, numOfRows : 한 페이지에 들어갈 갯수, pageNo : 페이지 숫자, sort : 정렬 값

    지역별 및 주제별 캠핑장 조회시 doNm, numOfRows, pageNo, sort의 값을 받아 
    디비에 접근하여 해당 컬럼의 모든 캠핑장의 숫자와 페이지네이션해서 캠핑장의 정보를 보내준다.

     2. 문제상황

    캠핑장 조회시 페이지네이션을 해서 보내게 된다면 총 캠핑장의 숫자를 뽑아 낼 수 없다.

    3. 선택지 

    1) MySQL 쿼리문으로 구현
    2) 시퀄라이즈 ORM으로 구현

    4 . 의견 조율

    1번) MySQL 쿼리문을 전체조회,페이지네이션 코드를 나누어 작성하여 총 갯수를 조회 할 때는 전체 조회 쿼리문 사용, 페이지네이션을 구현 할 때는 두개의 쿼리문을 합쳐서 사용

    2번) 시퀄라이즈 ORM으로 op.like로 전체조회와,페이지네이션 코드를 나누어서 구현

    5. 의견 결정

    시퀄라이즈 ORM을 사용 할 시 중복 코드가 발생하여 코드가 길어지기 떄문에 
    중복코드 없이 처리 가능한 MySQL 쿼리문을 사용하는 것으로 선택
</div>
  </div>
</details>

<br/>

## 🪛 PATCH NOTES | 패치 노트

- ver.0.1 : 2022-12-10 / 베타 버전 런칭 및 유저 피드백 통계
- ver.1.0 : (2022-12-19 예정) / 성능 개선에 관한 내부 테스트 후, 정식 버전 재배포  

<br/>

## 👨‍💻👩‍💻Who Made It | 서비스를 가꾼 사람들
|이름|포지션|Github or Email|
|------|---|----------|
|김지헌|`BackEnd (Leader)`|https://github.com/KJIHEON|
|문지현|`BackEnd`|https://github.com/JiHyeunM|
|최원선|`BackEnd`|https://github.com/wonsunny|
|이상원|`FrontEnd (Sub Leader)`|https://github.com/buddle6091|
|배인원|`FrontEnd`|https://github.com/wonstruckk|
|김지원|`Designer`|janeblue@naver.com|
