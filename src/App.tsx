import React, { useEffect } from "react";
import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import { useSelector } from "react-redux";
import Login from "./components/login/Login";
import { useAppDispatch, useAppSelector } from "./components/app/hooks";
import { auth } from "./firebase";
import { login, logout } from "./components/features/userSlice";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "./utils/ErrorFallBack";

function App() {
  //Reduxから今のstate取得
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  //
  useEffect(() => {
    //onAuthStateChanged:ユーザーの認証状態が変更されたときに
    ////呼び出されるコールバック関数を登録するためのメソッド
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        // console.log(loginUser);

        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <ErrorBoundary FallbackComponent={fallbackRender}>
            <Sidebar />
          </ErrorBoundary>

          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
