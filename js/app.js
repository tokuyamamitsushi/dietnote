//Firebase初期設定
var config = {
    apiKey: "AIzaSyCovvfGmI149S8BDfCf1YGyxkhHZRxvQ5Y",
    authDomain: "dietnotemain.firebaseapp.com",
    databaseURL: "https://dietnotemain.firebaseio.com",
    storageBucket: "dietnotemain.appspot.com",
    messagingSenderId: "621190478690"
};
firebase.initializeApp(config);



//DOM取得
var inputarea = document.getElementById('input-area');
var newuser = document.getElementById('newuser');
var login = document.getElementById('login');
var logout = document.getElementById('logout');
var info = document.getElementById('info');



//新規登録処理

//ボタンがクリックされた時の処理
newuser.addEventListener('click', function (e) {

    //メールアドレス・パスワードを取得
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    //新規ユーザーを登録
    firebase.auth().createUserWithEmailAndPassword(email, password)

        //catch関数をチェックしてエラーメッセージの内容を確認します
        .catch(function (error) {
            alert('登録できません（' + error.message + '）');
        });
});



//ログイン処理
login.addEventListener('click', function (e) {

    //メールアドレス・パスワードを取得
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // 既存ユーザーのログイン機能
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            alert('ログインできません（' + error.message + '）');
        });
});



//ログアウト処理
logout.addEventListener('click', function () {
    //ログアウトの機能
    firebase.auth().signOut();
});


//認証状態の確認
firebase.auth().onAuthStateChanged(function (user) {

    //もしログインの時、loginDisplayを表示する
    if (user) {
        loginDisplay();
    }

    //もしログアウトの時、logoutDisplayを表示する
    else {
        logoutDisplay();
    }
});



function loginDisplay() {

    //ログインの時、hideのクラスを削除してログアウトを表示する
    logout.classList.remove('hide');

    //ログインしている時、メール、PWの入力項目を削除する
    inputarea.classList.add('hide');

    //ログイン後のページ遷移する
    location.href = 'https://tokuyamamitsushi.github.io/dietnote/daily.html';


    //テキストを表示する
    info.textContent = "ログイン中です！！！！！";
}


function logoutDisplay() {

    //ログアウトの時、ログアウトのボタンは、非表示にする
    logout.classList.add('hide');

    //ログアウトの時、メールとPWの箇所を表示する
    inputarea.classList.remove('hide');

    // //ログアウト後のページ遷移する
    // location.href = 'https://tokuyamamitsushi.github.io/dietnote/';


    info.textContent = "";
}