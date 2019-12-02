```
Navigation Exam
├── Java
    ├── com.example.navigationexam
        ├── ChildActivity.java
        ├── MainActivity.java
        └── ParentActivity.java
├── res
    ├── layout
        ├── activity_main.xml
        ├── activity_child.xml
        └── activity_parent.xml
    └── ...
├── ...
└── AndroidManifest.xml
```

1. Manifest

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.navigation">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".ChildActivity" android:parentActivityName=".ParentActivity"></activity>
        <activity android:name=".ParentActivity" android:parentActivityName=".MainActivity">
            <!--android 4.0 이하에도 기능 사용시-->
            <meta-data android:name="android.support.PARENT_ACTIVITY"
                android:value=".MainActivity"></meta-data>
        </activity>
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

- `android:parentActivityName=".ParentActivity"` : 부모 Activity가 무엇인지 선언을 해주어야 한다.

2. Activity

```java
//MainActivity
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void moveParentActivity(View view) {
        //parentActivity로 이동
        startActivity(new Intent(this, ParentActivity.class));
    }

}

//ParentActivity
public class ParentActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_parent);
    }

    public void moveChildActivity(View view) {
        //ChildActivity로 이동
        startActivity(new Intent(this, ChildActivity.class));
    }
}

//ChildActivity
public class ChildActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_child);
    }
}

```

- `android:parentActivityName=""` property로 인해 뒤로가기 버튼을 사용할 수 있다.

3.  Menu 사용하기

**구조**

```
Navigation Exam
├── Java
    ├── com.example.activityexam
        ├── ChildActivity.java
        ├── MainActivity.java
        └── ParentActivity.java
├── res
    ├── layout
        ├── activity_main.xml
        ├── activity_child.xml
        └── activity_parent.xml
    ├── ...
    └── menu                     # 추가
        └── menu_main.xml        # 추가
├── ...
└── AndroidManifest.xml
```

```java
public class MainActivity extends AppCompatActivity {

    ...

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        //menu를 갖다 붙히는 클래스
        getMenuInflater().inflate(R.menu.menu_main,menu);
        return true;
    }

    //menu를 눌렀을때 처리
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) { //클릭된 아이템의 객체가 넘어옴
        switch(item.getItemId()){
            // 메뉴마다 기능 정의
            case R.id.action_menu_1:
                Toast.makeText(this,"첫번째 메뉴", Toast.LENGTH_SHORT).show();
                return true;
            case R.id.action_menu_2:
                Toast.makeText(this,"두번째 메뉴", Toast.LENGTH_SHORT).show();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
```

- 쉽게 메뉴 옵션을 사용할 수 있다.
