[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FHH-campUs%2FcampUs_FE&count_bg=%235185A6&title_bg=%2380A3D6&icon=riseup.svg&icon_color=%23FFFFFF&title=Visitors&edge_flat=false)](https://hits.seeyoufarm.com)

# 🏕️ [CampUs] 날씨 기반 캠핑 장소 추천 서비스

### 어떤 날 어디로 언제 캠핑 갈까?

캠핑은 저희 **CampUs** 와 함께! <br>

다른 사람들의 `후기`나 원하는 캠핑 장소의 `날씨`, 그리고 캠핑 장소의 `유형`, `운영 기간`, `편의 시설`, 
`테마 환경`, `체험 프로그램` 등 여러 가지 캠핑 정보를 활용해 나에게 알맞는 캠핑 계획을 세우시는 건 어떨까요?


  
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
  저희 CampUs에 연결된 캠핑장 정보는 위치, 영업날짜, 반려동물 반입, 부대시설, 주변이용시설 등의 다양한 정보를 제공드리고 있으며,
  해당 캠핑장을 이용했던 사람들의 리뷰를 보고, 반대로 쓰기도 가능해요!
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

**Back End**
<br/>
<br/>
<img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=Typescript&logoColor=black"> <img src="https://img.shields.io/badge/NODE.JS-339933?style=for-the-badge&logo=NODE.JS&logoColor=black"> <img src="https://img.shields.io/badge/EXPRESS-000000?style=for-the-badge&logo=Express&logoColor=white"> <img src="https://img.shields.io/badge/MYSQL-4479A1?style=for-the-badge&logo=MYSQL&logoColor=white"> <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=PM2&logoColor=white"> <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white"> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white">
<img src="https://img.shields.io/badge/SEQUELIZE-52B0E7?style=for-the-badge&logo=SEQUELIZE&logoColor=white">
<img src="https://img.shields.io/badge/MULTER-F46519?style=for-the-badge&logo=MULTER&logoColor=white">
<img src="https://img.shields.io/badge/AXIOS-5A29E4?style=for-the-badge&logo=AXIOS&logoColor=white">

<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=GITHUB&logoColor=white"> <img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=for-the-badge&logo=VISUAL STUDIO CODE&logoColor=white"> <img src="https://img.shields.io/badge/AMAZON EC2-ff9900?style=for-the-badge&logo=AMAZON EC2&logoColor=white"> <img src="https://img.shields.io/badge/AMAZON S3-569A31?style=for-the-badge&logo=AMAZON S3&logoColor=white">

<br/>

## ⚽ Trouble Shooting | 트러블 슈팅


<br/>

## 🪛 PATCH NOTES | 패치 노트



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
