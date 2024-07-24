import React from 'react';
import {Flex, Layout, theme} from 'antd/lib';
import {useRouter} from "next/router";
import TabBar from "../../shared/ui/TabBar/TabBar";


interface ILayout {
    readonly children: React.ReactNode
}

const {Header, Content, Sider} = Layout;

export const AppLayout: React.FC<ILayout> = ({children}) => {
    const router = useRouter();
    console.log(router)
    const {
        token: {borderRadiusLG},
    } = theme.useToken();
    return (
        <Flex justify="center">
            <Layout style={{minHeight: "100vh", maxWidth: "600px", background: "transparent"}}>
                <Layout style={{background: "transparent"}}>
                    <Layout style={{ background: "transparent"}}>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: "transparent",
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {children}
                            <Flex justify="center">
                                <TabBar/>
                            </Flex>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </Flex>
    );
};

