## SharedPreference

```
Activity Exam
├── Java
    ├── com.example.sharedpreferenceexam
        ├── MainActivity.java
        ├── AppListActivity.java
        └── AppInfoAdapter.java
├── res
    ├── layout
        ├── activity_main.xml
        ├── item_app.xml
        └── activity_app_list.xml
├── build.gradle \\ app
└── ...
```

**build.gradle\app**

```gradle

dependencies {
    ...
    implementation 'androidx.preference:preference:1.1.0-alpha01'
}
```

- `preference` dependency 추가

**MainActivity**

```java
public class MainActivity extends AppCompatActivity {

    public static final int REQUEST_CODE = 1000;
    private ImageView mShortcut;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mShortcut = findViewById(R.id.shortcut_image);

        //preferences 객체 초기화
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        // shortcut이라는 key에 null을 주어 초기화 시킴
        String packageName = preferences.getString("shortcut", null);
        // value가 null이 아닐경우 (shortcut key에 선택을 통해 value가 들어있는 경우)
        if (packageName != null) {
            try {
                // device에서 value에 따른 icon을 가져와 image로 사용한다.
                Drawable icon = getPackageManager().getApplicationIcon(packageName);
                mShortcut.setImageDrawable(icon);
            } catch (PackageManager.NameNotFoundException e){
                e.printStackTrace();
            }
        }
    }

    // shortcut이미지 클릭 시
    public void onImageClicked(View view) {
        ImageView imageView = (ImageView) view;
        Drawable drawable = imageView.getDrawable();
        if (drawable != null){
            SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
            String packageName = preferences.getString("shortcut", null);
            if(packageName != null) {
                // intent에 packageName으로 app을 찾아 넣어 실행
                Intent intent = getPackageManager().getLaunchIntentForPackage(packageName);
                startActivity(intent);
            }
        }
    }

    //button을 클릭시 Applist를 보여주는 코드를 작성
    public void onButtonClicked(View view) {
        Intent intent = new Intent(this, AppListActivity.class);
        startActivityForResult(intent, REQUEST_CODE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        //Intent에 담겨온 app정보를 처리한다.
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == REQUEST_CODE && resultCode == RESULT_OK && data != null){
            ApplicationInfo info = data.getParcelableExtra("info");
            //아이콘
            Drawable icon = info.loadIcon(getPackageManager());
            mShortcut.setImageDrawable(icon);
            //preferences 초기화
            SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
            //정보 edit
            SharedPreferences.Editor edit = preferences.edit();
            //shortcut key에 package name을 담는다.
            edit.putString("shortcut", info.packageName);
            edit.apply();

        }
    }

    // backpress할때 실행 (종료확인)
    @Override
    public void onBackPressed() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("종료 확인");
        builder.setMessage("정말로 종료 하시겠습니까?");
        builder.setPositiveButton("확인", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                MainActivity.super.onBackPressed();
            }
        });
        builder.setNegativeButton("취소", null);
        builder.show();
    }
}

```

**AppListActivity**

```java
public class AppListActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_app_list);

        ListView listView = findViewById(R.id.list_view);
        //packagemanager 객체 호출
        PackageManager pm = getPackageManager();
        // 설치된 앱의 목록을 얻는다.
        List<ApplicationInfo> infos = pm.getInstalledApplications(PackageManager.GET_META_DATA);


        AppInfoAdapter adapter = new AppInfoAdapter(infos);
        // 목록을 adapter에 set
        listView.setAdapter(adapter);

        // 아이템을 클릭 시
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // 해당 position의 앱 정보를 얻어온다.
                ApplicationInfo info = (ApplicationInfo) parent.getAdapter().getItem(position);
                Intent intent = new Intent();
                //얻어온 정보를 Intent에 삽입후 돌려준다
                intent.putExtra("info", info);
                setResult(RESULT_OK, intent);
                finish();
            }
        });
    }
}
```

**AppInfoAdapter**

```java

// BaseAdapter 상속
class AppInfoAdapter extends BaseAdapter {

    private List<ApplicationInfo> mInfos;

    public AppInfoAdapter(List<ApplicationInfo> data){
        this.mInfos = data;
    }

    @Override
    public int getCount() {
        return mInfos.size();
    }

    @Override
    public Object getItem(int position) {
        return mInfos.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        //getView에서 넘어오는 contentView는 이전에 그려졌던 view를 넘긴다.
        ViewHolder holder;
        //한번도 inflate되지 않은 view라면 null로 전달경우가 되는 경우가 있으니 반드시 null체크를 해야한다.
        if(convertView == null){
            //여기다 새로 그린다.
            holder = new ViewHolder();
            //item_app.xml 가져와 인플레이트
            convertView = LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.item_app, parent, false);
            holder.imageView = convertView.findViewById(R.id.icon_image);
            holder.textView = convertView.findViewById(R.id.app_name_text);
            convertView.setTag(holder);
        } else {
            //null이 아니라면 이전에 그렸던 contentView에서 tag를 가져온다.
            holder = (ViewHolder) convertView.getTag();
        }

        ApplicationInfo info = mInfos.get(position);
        //아이콘 설정
        Drawable icon = info.loadIcon(parent.getContext().getPackageManager());
        holder.imageView.setImageDrawable(icon);
        //앱 이름 설정
        String name = String.valueOf(info.loadLabel(parent.getContext().getPackageManager()));
        holder.textView.setText(name);

        return convertView;
    }

    private static class ViewHolder {
        ImageView imageView;
        TextView textView;
    }
}
```
