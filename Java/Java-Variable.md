## 자바의 변수와 자료형

- 각 자료형은 차지하는 메모리 공간의 크기가 다르다.

```java

public class Main {
	public static void main(String[] args) {
        int intType = 100;
		double doubleType = 150.5;
		String stringType = "신은총";

		System.out.println(intType);
		System.out.println(doubleType);
		System.out.println(stringType);

        	}

}

```

- 변수 앞 `int`,`double`,`String`은 변수의 자료형을 뜻하며 해당하는 자료값만 담을 수 있다.
- 변수 명은 사용자 마음대로 지정할 수 있다.
- JAVA에서는 Python과는 다르게 변수의 자료형을 꼭 지정해 주어야한다.

**자바에서 자주 사용되는 자료형**

- int
- long
- double
- boolean
- char
- String
- StringBuffer
- List
- Map

**원의 넓이 구하는 예제**

```java
public class Main {
	final static double PI = 3.141592;
	// 상수는 final이라는 문법을 사용함. (절대로 바뀔수없음)
	public static void main(String[] args) {
		int r = 30;
		System.out.println(r*r*PI);
	}

}
```

```java

public class Main {
	final static int INT_MAX = 2147483647;
	// int형이 가질 수 있는 최대값
	public static void main(String[] args) {
		int a = INT_MAX;
		System.out.println(a+1);
	}
}

>> -2147483648

```

- int형의 표현 범위는 `-2147483648 ~ 2147483647` 이다

**사칙연산 프로그램 예제**

```java

public class Main {

	public static void main(String[] args) {

		int a = 1;
		int b = 2;
		System.out.println("a + b = " + (a+b));
		System.out.println("a - b = " + (a+b));
		System.out.println("a * b = " + (a*b));
		System.out.println("a / b = " + (a/b));

		// int a = 0.5 // 오류발생 ==> int는 정수만 혀용되기 때문
		int a = (int) 0.5; // 형변환
		System.out.println(a);   // 뒷자리는 버림

		// double b = 0.5;
		// int a = (int) (b+0.5);
		// System.out.println(a);
	}

}

```

**double변수형으로 평균 구하기**

```java
public class Main {

	public static void main(String[] args) {

		double a = 10.3;
		double b = 4.3;
		double c = 23.1;

		System.out.println((a+b+c)/3);

		for (char i='a'; i<='z'; i++) {
			System.out.println(i);
		}
		int a = 200;
		System.out.println("10진수 : " + a);
		System.out.format("8진수 : %o\n", a);
		System.out.format("16진수 : %x", a);


	}

}
```

**String 변수형과 substring**

```java
public class Main {

	public static void main(String[] args) {

		String name = "John Doe";
		System.out.println(name);
		System.out.println(name.substring(0,1));
		System.out.println(name.substring(3,6));
		System.out.println(name.substring(5,8));
		System.out.println(name.substring(0,4));
	}

}
```

- Java의 string은 class로 만들어져있어서 내장 매소드를 사용 가능하다 ( python의 string slicing과 동일)
