import styled from "styled-components";
import { Input, Button } from "antd";

export const Container = styled.div`
    text-align: center;
    margin-top: 100px;
`;

export const LoginInput = styled(Input)`
    padding: 15px;
    border-radius: 50px;
    width: 300px;
    border: 1px solid black;
`;

export const LoginButton = styled(Button)`
    border: 1px solid black;
    width: 200px;
    border-radius: 50px;
`;
