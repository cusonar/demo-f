"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from "@ant-design/pro-components";
import { theme } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";

type LoginType = "phone" | "account";

export default function Login() {
  const { token } = theme.useToken();

  const iconStyles: CSSProperties = {
    marginInlineStart: "16px",
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="System Name"
          subTitle="Login"
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"ID"}
            rules={[
              {
                required: true,
                message: "ID를 입력하세요.",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
              strengthText:
                "Password should contain numbers, letters and special characters, at least 8 characters long.",
              statusRender: (value) => {
                const getStatus = () => {
                  if (value && value.length > 12) {
                    return "ok";
                  }
                  if (value && value.length > 6) {
                    return "pass";
                  }
                  return "poor";
                };
                const status = getStatus();
                if (status === "pass") {
                  return (
                    <div style={{ color: token.colorWarning }}>강도 : 중간</div>
                  );
                }
                if (status === "ok") {
                  return (
                    <div style={{ color: token.colorSuccess }}>강도 : 강</div>
                  );
                }
                return <div style={{ color: token.colorError }}>강도 : 약</div>;
              },
            }}
            placeholder={"Password"}
            rules={[
              {
                required: true,
                message: "Password를 입력하세요.",
              },
            ]}
          />
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              자동 로그인
            </ProFormCheckbox>
            <a
              style={{
                float: "right",
              }}
            >
              패스워드를 잃어버리셨나요?
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
}
