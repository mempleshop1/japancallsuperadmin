import { message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import * as S from "./styles";

const Home = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem("superadmin") === "loggedin") {
            props.history.push("/dashboard");
        }
    }, [props.history]);

    const login = () => {
        axios
            .post("/superadminlogin", {
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("superadmin", "loggedin");
                props.history.push("/dashboard");
            })
            .catch((err) => {
                message.error("Username or Password wrong !");
                console.log(err);
            });
    };

    return (
        <>
            <S.Container>
                <h1>Hi, Super Admin</h1>

                <br />

                <S.LoginInput
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />

                <br />
                <br />

                <S.LoginInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <br />
                <br />

                <S.LoginButton onClick={login}>Login</S.LoginButton>
            </S.Container>
        </>
    );
};

export default Home;
