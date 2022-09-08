import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/buttons/Button";
import Header from "../components/Header";
import Footer from "./Footer";

const Join = () => {
  const email = useRef(null);
  const nickname = useRef(null);
  const password = useRef(null);
  const passwordConfirm = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  console.log(token);

  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    validate();
    const formData = new FormData();

    const data = {
      email: email.current.value,
      nickname: nickname.current.value,
      password: password.current.value,
    };

    formData.append("file", fileRef.current.files[0]);
    formData.append(
      "joinData",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios
      .post("http://3.34.48.111/api/member/signup", formData)
      .then((response) => {
        console.log(response);
        if (response.data.error === "DUPLICATE_EMAIL") {
          email.current.focus();
          document.querySelector(".error_message").innerHTML =
            "이미 가입된 이메일입니다.";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Regex
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");
  const [myEmail, setMyEmail] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const validate = () => {
    if (!validEmail.test(myEmail)) {
      alert("이메일 형식이 올바르지 않아요");
    }
    if (!validPassword.test(myPassword)) {
      alert(
        "비밀번호는 최소 8자, 하나 이상의 문자와 하나 이상의 숫자를 입력해주세요"
      );
    }
  };
  return (
    <div>
      <Header />
      <form name="file" encType="multipart/form-data" onSubmit={handleSubmit}>
        <StyledImgDiv>
          <div className="image-upload">
            <label htmlFor="file-input">
              <img
                src="https://velog.velcdn.com/images/danchoi/post/fac9c456-b1d5-41fd-b7e0-21a3feb2149f/image.png"
                alt=""
              />
            </label>

            <input id="file-input" type="file" />
          </div>
        </StyledImgDiv>

        <input type="file" name="file" ref={fileRef} />

        <StyledInputDiv>
          <div>
            <span>이메일</span>
            <input
              type="text"
              ref={email}
              value={myEmail}
              onChange={(e) => {
                setMyEmail(e.target.value);
              }}
              placeholder="이메일 입력"
            />
          </div>
          <div>
            <span>닉네임</span>
            <input type="text" ref={nickname} placeholder="닉네임 입력" />
          </div>
          <div>
            <span>비밀번호</span>
            <input
              type="password"
              ref={password}
              placeholder="문자, 숫자 혼합 8자 이상"
              value={myPassword}
              onChange={(e) => {
                setMyPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <span>비밀번호 확인</span>
            <input
              type="password"
              ref={passwordConfirm}
              placeholder="비밀번호 재입력"
            />
            <div className="error_message"></div>
          </div>
        </StyledInputDiv>
        <StyledButtonDiv margin="0 auto 60px">
          <Button
            onClick={() => {
              if (email.current.value === "") {
                email.current.focus();
                document.querySelector(".error_message").innerHTML =
                  "이메일을 입력해주세요.";
                return;
              } else if (nickname.current.value === "") {
                nickname.current.focus();
                document.querySelector(".error_message").innerHTML =
                  "닉네임을 입력해주세요.";
                return;
              } else if (password.current.value === "") {
                password.current.focus();
                document.querySelector(".error_message").innerHTML =
                  "비밀번호를 입력해주세요.";
                return;
              } else if (passwordConfirm.current.value === "") {
                password.current.focus();
                document.querySelector(".error_message").innerHTML =
                  "비밀번호 확인을 입력해주세요.";
                return;
              } else {
              }
              alert("회원가입이 완료되었습니다.");
              navigate("/login");
              handleSubmit();
            }}
          >
            가입하기
          </Button>
          <Button onClick={() => navigate("/login")}>돌아가기</Button>
        </StyledButtonDiv>
      </form>
      <Footer/>
    </div>
  );
};

const StyledImgDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .image-upload > input {
    display: none;
  }
`;

const StyledInputDiv = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: #aaa;
  margin: 2vh auto 20px;
  padding: 20px 10px;
  width: 80vw;
  box-shadow: 1px 1px 15px grey;
  border-radius: 15px;
  input {
    width: 50vw;
    height: 30px;
    margin: 15px 0;
    font-size: 16px;
    outline: none;
    border: none;
    border-bottom: 1px solid #ddd;
  }
  span {
    font-family: "Do Hyeon", sans-serif;
    font-size: 16px;
    margin: 10px;
    color: #555;
  }
  .error_message {
    color: red;
    font-size: 18px;
  }
`;
const StyledButtonDiv = styled.div`
  display: flex;
  width: 70vw;
  margin: ${props=>props.margin||"auto"};
`;

export default Join;
