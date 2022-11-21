<p align="center">
   <h1 align="center"> Chat Bot </h1>
   <center>
     <a href="https://github.com/10TeamPro/botProject/blob/develop/README.md">
    <img height="20px" src="https://img.shields.io/badge/EN-flag.svg?color=555555&style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNjAgMzAiIGhlaWdodD0iNjAwIj4NCjxkZWZzPg0KPGNsaXBQYXRoIGlkPSJ0Ij4NCjxwYXRoIGQ9Im0zMCwxNWgzMHYxNXp2MTVoLTMwemgtMzB2LTE1enYtMTVoMzB6Ii8+DQo8L2NsaXBQYXRoPg0KPC9kZWZzPg0KPHBhdGggZmlsbD0iIzAwMjQ3ZCIgZD0ibTAsMHYzMGg2MHYtMzB6Ii8+DQo8cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNiIgZD0ibTAsMGw2MCwzMG0wLTMwbC02MCwzMCIvPg0KPHBhdGggc3Ryb2tlPSIjY2YxNDJiIiBzdHJva2Utd2lkdGg9IjQiIGQ9Im0wLDBsNjAsMzBtMC0zMGwtNjAsMzAiIGNsaXAtcGF0aD0idXJsKCN0KSIvPg0KPHBhdGggc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEwIiBkPSJtMzAsMHYzMG0tMzAtMTVoNjAiLz4NCjxwYXRoIHN0cm9rZT0iI2NmMTQyYiIgc3Ryb2tlLXdpZHRoPSI2IiBkPSJtMzAsMHYzMG0tMzAtMTVoNjAiLz4NCjwvc3ZnPg0K">
  </a>
</center>

<center>
<img src="https://camo.githubusercontent.com/40d2104df6729c913a8ecd1045839098674a166b814164b336ba17b1c20f4c78/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f76657273696f6e2d626574612d6f72616e67652e737667">
<img src="https://img.shields.io/badge/License-MIT-green">
</center>

<h3 align="center"> 
3학년 2학기 - 오픈소스프로그래밍
</h3>

<h3 align="center">  
<a href="https://cse.jbnu.ac.kr/cse/index.do">JBNU</a>
(Winter 2022) - Team(10) Project
</h3>

</p>

---

## 📖 목차

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<details open="open">
    <summary>내용</summary>
    <ol>
    <li><a href="#About_The_Project">  ➤ 프로젝트 개요</a></li>
    <li><a href="#Feature">  ➤ 기능</a></li>
    <li><a href="#Source_Files_Description">  ➤ 소스파일 설명</a></li>
    <li><a href="#API">  ➤ API</a></li>
    <li><a href="#Requirements">  ➤ 사전 환경 설정</a></li>
    <li><a href="#Getting_Started">  ➤ 실행하기</a></li>
    <li><a href="#Contributions">  ➤ 프로젝트에 기여하기</a></li>
    <li><a href="#Documentation">  ➤ 참고 문서</a></li>
    </ol>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- ABOUT THE PROJECT -->
<h2 id="About_The_Project">🖼️ 프로젝트 개요</h2>

슬랙기반으로 실행되는 챗봇 프레임워크입니다.
전북대학교에 대한 다양한 정보를 물어 볼 수 있어요!

슬랙으로 팀과 작업을 하면서 학교에 대한 정보를 알고싶으시다면 이 오픈소스를 활용 해보세요

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Feature">📟 기능</h2>

 - 질문 & 응답
        - 학사 일정
        - 학교 급식 메뉴 ⭐(최대 3개)
        - 각 학과 사무실 정보
 - 추가 될 사항

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Source_Files_Description">📒 소스파일 설명</h2>

- /src/bot
    - 봇 클래스로 기본 Base 봇 클래스, Main Slack 봇 클래스, Test 전용 봇 클래스가 있습니다.
- greeting.js
    - 봇에게 hi하고 인사를 했을 때 응답을 주는 스크립트입니다.
- main.js
    - 여기에서 봇의 토큰을 가져와 봇을 실행하고 테스트 봇도 실행합니다.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="API">🎛️ API</h2>


[\***\*Slack Real Time Messaging\*\***](<[https://slack.dev/node-slack-sdk/rtm-api](https://slack.dev/node-slack-sdk/rtm-api)>)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Requirements">🪛 사전 환경 설정</h2>

- node -version : [up 16.x]
- slack workspace & app
    - 먼저 슬랙 워크 스페이스를 만들어주세요.
    그리고 나서 app을 추가해주세요. (rtm-api를 사용하려면 app은 class 버전이어야합니다.)
    class 버전 앱 만들기 [참고]([https://api.slack.com/authentication/basics](https://api.slack.com/authentication/basics))

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Getting_Started">⛳  실행하기</h2>

- 프로젝트 클론
    
    ```bash
    git clone https://github.com/10TeamPro/botProject.git
    ```
    
- npm 설치
    
    ```bash
    npm install
    ```
    
- 새 폴더를 만든 후 그 안에 ./config/bot.json 파일을 만드세요
    
    bot.json 파일에서 작성해야할 것
    app에 접속 후 봇 유저 토큰을 복사합니다. 토큰은 ‘xoxb-*’ 와 같은 형태입니다.
    다음과 같이 개인 토큰을 추가할 수 있습니다.
    
    ```bash
    "MAIN_TOKEN": "xoxb-YOURTOKEN",
    ```
    
- 봇 작동시키기
    
    ```bash
    node src/main.js
    ```

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Contributions">🎊 프로젝트에 기여하기</h2>

만약 저희의 코드에 버그가 있거나 개선사항이 필요하다고 생각하시면 PR을 주세요!
PR을 주실 때는 저희가 올려놓은 eslint와 prettier의 양식에 따라서 코드를 작성해 주세요!
( 관련된 문서는 노션에서도 확인할 수 있습니다 [Notion]([https://www.notion.so/ae66f937dda740eab1689d22e6f8dae1](https://www.notion.so/ae66f937dda740eab1689d22e6f8dae1)) )

이 오픈소스에 대한 모든 참여/ 참견은 환영합니다.

- PR 주세요!
- 이슈도 주세요!

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Documentation">💾 참고 문서</h2>

- [Notion](https://www.notion.so/23c3f36af9db4f3693ad66df54b00757)
