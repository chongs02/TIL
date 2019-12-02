## 암시적 인텐트 활용

**common-intent**

- https://developer.android.com/guide/components/intents-common#java

**MainActivity**

```java
public class MainActivity extends AppCompatActivity {

    static final int REQUEST_SELECT_CONTACT = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //layout setting
        setContentView(R.layout.activity_main);
    }

    //xml과 연결된 onclick 이벤트 : 전화걸기 버튼과 연결되어있다.
    public void dialPhone(View view) {
        //phone_number_edit의 text를 string으로 바꿔 dialPhoneNumber 기능을 실행한다.
        EditText editText = findViewById(R.id.phone_number_edit);
        dialPhoneNumber(editText.getText().toString());
    }
    private void dialPhoneNumber(String phoneNumber) {
        //Intent를 만든다. : Intent는 다양한 기능이 내장되어있다.
        Intent intent = new Intent(Intent.ACTION_DIAL);
        intent.setData(Uri.parse("tel:" + phoneNumber));

        // intent를 수행할수 있는 액티비티가 있는지 검사 (테블릿등은 전화기능이 없음)
        if (intent.resolveActivity(getPackageManager()) != null){
            //intent를 실행한다.
            startActivity(intent);

        }
    }
    // 연락처를 연결하는 Button
    public void contactPhone(View view) {
        Button contactButton = findViewById(R.id.contact_button);
        contactPhone();
    }

    private void contactPhone() {
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType(ContactsContract.CommonDataKinds.Phone.CONTENT_TYPE);

        if(intent.resolveActivity(getPackageManager())!=null){
            //phone북에서 고른 데이터를 intent와 함께 실행하여 결과를 받아온다.
            startActivityForResult(intent,REQUEST_SELECT_CONTACT);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_SELECT_CONTACT && resultCode == RESULT_OK) {
            Uri contactUri = data.getData();

            String[] projection = new String[]{ContactsContract.CommonDataKinds.Phone.NUMBER};
            // Cursor 객체에 contact 데이터를 저장하여 넘겨준다.
            Cursor cursor = getContentResolver().query(contactUri, projection,
                    null, null, null);
            // If the cursor returned is valid, get the phone number
            if (cursor != null && cursor.moveToFirst()) {
                //가져온 객체중 원하는 정보의 index를 가져와
                int numberIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER);
                //전화번호를 가져온다.
                String number = cursor.getString(numberIndex);
                // Do something with the phone number

                dialPhoneNumber(number);
            }
        }
    }
}

```
