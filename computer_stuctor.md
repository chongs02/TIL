EDPS : Electronic Data Processing System --> Computer

컴퓨터의 구성

- H/W

  - I/O : 입출력장치 => Input과 Output
    1. Input
    2. Output
  - CPU :
    1. ALU : 산술 논리 장치
    2. CU :제어장치
    3. Memory : RAM

- S/W

  - OS

    - DIOS
    - WINDOW
    - LINUX, UNIX...

    : 성능의 극대화가 운영체제가 우수한지 아닌지를 구분함

    1.  처리량
    2.  Turn-Around-Time(응답시간)
    3.  사용가능도 : 병렬처리/다중처리 등
    4.  신뢰성

  - Application Software(사용자 프로그램)

* INTERNET

  - IRC (Chat)
  - PPT (call)
  - SMTD / POP
  - P2P
  - Telnet
  - Web
    : 프로토콜

* WEB의 기본동작

1. Client
   -> request

2. Server
   -> response

Client -> Client 서버(개인용PC) -> request -> Sever -> response -> Client 서버

OSI 7계층 (개방형 시스템) : 어떤 시스템을 클라이언트가 가지고 있던지 서로 통신하게하자
응용계층 : 서로 다른계층으로 접근할 수 있게 해주는것
포현계층 : 접근하고자하는 계층의 데이터 형태로 바꾸는 것
세션계층 : 표현계층을 조금더 쪼개는것 (주기억장치는 1byte로 쪼개어져 있는데 가상기억장치의 데이터를 받기위해서는 쪼개고 더하고 해야함)
트랜스포트 : 네트워크를 통과하기 위해 네트워크가 이해할수있는 binary data로 변환
네트워크계층 : 네트워크를 데이터가 통과
데이터계층 : 통과후 쪼개어진 데이터를 사용자가 이해할 수 있는 언어로 합치는 역할
물리계층 : Lan Card

JVM : Java virtual Memory

PVM : Python virtual Memory
