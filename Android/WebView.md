## 웹뷰 사용하기

1. Manifest

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.webview">

    <!--인터넷 권한-->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

- `<uses-permission android:name="android.permission.INTERNET" />` : 기기로부터 INTERNET사용 permission을 받는다.

2. MainActivity

```java

public class MainActivity extends AppCompatActivity {

    private EditText mAddressEdit;
    private WebView mWebView;
    private Button mMoveButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mAddressEdit = findViewById(R.id.address_edit);
        mWebView = findViewById(R.id.web_view);
        mMoveButton = findViewById(R.id.move_button);

        //웹뷰 설정
        WebSettings webSettings = mWebView.getSettings();
        //Javascript사용 가능하도록 설정
        webSettings.setJavaScriptEnabled(true);

        //기본적으로 해야 웹뷰가됨 하지않으면 기존의 프로그램으로 이동
        // 사용하지 않으면 암시적 인텐트처럼 됨
        mWebView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageFinished(WebView view, String url){
                Toast.makeText(MainActivity.this, "로딩 끝", Toast.LENGTH_SHORT).show();
            }
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon){
                Toast.makeText(MainActivity.this, "로딩 시작", Toast.LENGTH_SHORT).show();
            }
        });
        mAddressEdit.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_SEARCH){
                    //mMovieButton의 onClick이벤트를 호출
                    mMoveButton.callOnClick();

                    //getSystemService 메소드는 시스템에서 제공되는 각종 서비스를 가져오는 방법
                    InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
                    // 소프트 키보드 내리기
                    imm.hideSoftInputFromWindow(v.getWindowToken(),0);
                    return true; //이벤트를 소비
                }
                return false;
            }
        });
    }

    public void onClick(View view) {
        String address = mAddressEdit.getText().toString();

        if(address.startsWith("http://") == false){
            address = "http://" + address;
        }

        mWebView.loadUrl(address);

    }

    //뒤로가기 키 재정의
    @Override
    public void onBackPressed() {
        //만약 웹뷰에 기록이있다면
        if (mWebView.canGoBack()) {
            //이전 페이지로 이동
            mWebView.goBack();
        } else {
            //없다면 뒤로가기가 동장한다.
            super.onBackPressed();
        }
    }


    // 메뉴바를 만들어준다

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()){
            case R.id.action_back:
                if (mWebView.canGoBack()) {
                    mWebView.goBack();
                }
                return true;
            case R.id.action_forward:
                if(mWebView.canGoForward()){
                    mWebView.goForward();
                }
                return true;
            case R.id.action_refresh:
                mWebView.reload();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}

```
