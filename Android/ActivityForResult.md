## Activity

```
Activity Exam
├── Java
    ├── com.example.activityexam
        ├── MainActivity.java
        └── SecondActivity.java
├── layout
        ├── activity_main.xml
        └── activity_second.xml
├──
└── ...
```

## MainActivity에서 데이터를 전송하면 SecondActivity에서 데이터를 받고 결과를 돌려주는 Activity를 만든다.

1. Mainactivity

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    //REQUEST CODE를 미리 선언
    public static final int REQUEST_CODE = 1000;
    // 위젯을 불러와 변수로 선언한다
    private EditText mNameEditText;
    private EditText mAgeEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 위젯변수를 xml의 id에 있는 위젯과 매칭 시킴
        mNameEditText = findViewById(R.id.name_edit);
        mAgeEditText = findViewById(R.id.age_edit);

        // submit button을 onclick이벤트를 선언
        findViewById(R.id.submit_button).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        //data를 담을 그릇을 만든다
        Intent intent = new Intent(this, SecondActivity.class);

        // 그릇에 데이터를 담는다
        intent.putExtra("name", mNameEditText.getText().toString());
        intent.putExtra("age",mAgeEditText.getText().toString());

        // activity를 실행하고 result를 받을 준비를 한다.
        // setResult()를 호출하고 finsh()가 되면 onActivityResult가 호출됨
        startActivityForResult(intent, REQUEST_CODE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        // result를 받으면 requestCode와 resultCode, data를 받는다
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == REQUEST_CODE && resultCode == RESULT_OK && data != null){


            String result = data.getStringExtra("result");

            //Data를 받아 Toast로 띄워준다.
            Toast.makeText(this, result, Toast.LENGTH_SHORT).show();
        }
    }
}

```

2. SecondAcitivity

```java
public class SecondActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView mMessageTextView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        //전달한 intent를 받아온다
        Intent intent = getIntent();
        // intent에서 받은 정보를 변수에 저장
        String name = intent.getStringExtra("name");
        String age = intent.getStringExtra("age");


        mMessageTextView = findViewById(R.id.message_edit_text);
        //TextViwe 그릇에 정보를 담는다
        mMessageTextView.setText(age + "살" + name);

        //result button을 클릭하였을때 이벤트를 발생시킨다
        findViewById(R.id.result_button).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        //새로운 Intent를 만든다
        Intent intent = new Intent();
        //Intent에 정보를 담는다
        intent.putExtra("result", mMessageTextView.getText().toString());

        //RESULT_OK code와 함께 intent를 담아 반송한다.
        setResult(RESULT_OK, intent);
        //SecondActivity는 finish되어 사라짐.
        finish();
    }
}

```
