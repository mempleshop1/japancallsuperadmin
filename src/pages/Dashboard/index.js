import axios from "axios";
import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { Row, Col, Divider, Button, Modal, message, Input } from "antd";

const Dashboard = (props) => {
    const [admins, setAdmins] = useState([]);
    const [createAdminModal, toggleCreateAdminModal] = useState(false);
    const [updateAdminModal, toggleUpdateAdminModal] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [updateId, setUpdateId] = useState("");

    useEffect(() => {
        if (localStorage.getItem("superadmin") === "loggedin") {
            //do something
            axios
                .get("/getadmins")
                .then((res) => {
                    setAdmins(res.data.admins);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            props.history.push("/");
        }
    }, [props.history]);

    const deleteAdmin = (adminid) => {
        axios
            .post("/removeadmin", { adminid: adminid })
            .then((res) => {
                const toRemove = res.data.admin;

                const afterRemoval = admins.filter((admin) => {
                    return admin._id !== toRemove._id;
                });

                setAdmins(afterRemoval);

                message.success("Admin deleted successfully !");
            })
            .catch((err) => {
                console.log(err);
                message.error("Cannot delete admin !");
            });
    };

    const createAdmin = () => {
        axios
            .post("/createadmin", { username: username, password: password })
            .then((res) => {
                let afterAdding = admins;
                afterAdding.push(res.data.admin);
                setAdmins(afterAdding);
                toggleCreateAdminModal(false);
                message.success("Admin created successfully !");
            })
            .catch((err) => {
                console.log(err);
                message.error("Admin could not be created !");
            });
    };

    const updateAdmin = () => {
        axios
            .put("/changeadmin", {
                username: username,
                password: password,
                adminid: updateId,
            })
            .then((res) => {
                const toRemove = res.data.admin;

                const afterRemoval = admins.filter((admin) => {
                    return admin._id !== toRemove._id;
                });

                let afterAdding = afterRemoval;
                afterAdding.push(res.data.admin);
                setAdmins(afterAdding);
                toggleUpdateAdminModal(false);
                setUpdateId("");
                setUsername("");
                setPassword("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeCallStatus = (adminid, callstatus) => {
        axios
            .put("/changecallstatus", {
                adminid: adminid,
                callstatus: callstatus,
            })
            .then((res) => {
                const toRemove = res.data.admin;

                const afterRemoval = admins.filter((admin) => {
                    return admin._id !== toRemove._id;
                });

                let afterAdding = afterRemoval;
                afterAdding.push(res.data.admin);
                setAdmins(afterAdding);
                message.success("Call status updated !");
            })
            .catch((err) => {
                console.log(err);
                message.error("Cannot update call status !");
            });
    };

    return (
        <>
            {/* create new admin modal */}
            <Modal
                title="Create New Admin"
                centered
                footer={null}
                visible={createAdminModal}
                onOk={() => toggleCreateAdminModal(false)}
                onCancel={() => toggleCreateAdminModal(false)}
            >
                <p>Enter following details</p>
                <br />

                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <br />
                <br />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <br />
                <br />
                <Button onClick={createAdmin}>Create</Button>
            </Modal>

            {/* update admin modal */}
            <Modal
                title="Update Admin"
                centered
                footer={null}
                visible={updateAdminModal}
                onOk={() => {
                    toggleUpdateAdminModal(false);
                    setUpdateId("");
                    setUsername("");
                    setPassword("");
                }}
                onCancel={() => {
                    toggleUpdateAdminModal(false);
                    setUpdateId("");
                    setUsername("");
                    setPassword("");
                }}
            >
                <p>Enter following details</p>
                <br />

                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <br />
                <br />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <br />
                <br />
                <Button onClick={updateAdmin}>Update</Button>
            </Modal>

            <S.Container>
                <h1>Dashboard</h1>

                <br />
                <br />

                <h3>CREATE NEW ADMIN</h3>
                <Button
                    onClick={() => toggleCreateAdminModal(true)}
                    style={{ marginRight: "10px" }}
                >
                    Create admin
                </Button>

                <Button
                    onClick={() => {
                        localStorage.setItem("superadmin", null);
                        props.history.push("/");
                    }}
                >
                    Logout
                </Button>
                <br />
                <br />

                <h3>ADMIN INFO</h3>
                <br />
                <div>
                    <Row>
                        <Col span={6}>
                            <strong>Username</strong>
                        </Col>
                        <Col span={6}>
                            <strong>Password</strong>
                        </Col>
                        <Col span={6}>
                            <strong>Call Status</strong>
                        </Col>
                        <Col span={6}>
                            <strong>Operations</strong>
                        </Col>
                    </Row>

                    {admins.length === 0 && (
                        <>
                            <br />
                            <br />
                            <br />
                            <Row>
                                <Col span={6}>Empty</Col>
                                <Col span={6}>Empty</Col>
                                <Col span={6}>Empty</Col>
                                <Col span={6}>Empty</Col>
                            </Row>
                        </>
                    )}

                    {admins.length !== 0 &&
                        admins.map((admin) => (
                            <div key={admin._id}>
                                <Divider />
                                <Row>
                                    <Col span={6}>{admin.username}</Col>
                                    <Col span={6}>{admin.password}</Col>
                                    <Col span={6}>
                                        {admin.callactive
                                            ? "On Call"
                                            : "Not On Call"}
                                        <Button
                                            size="small"
                                            style={{ marginLeft: "5px" }}
                                            onClick={() =>
                                                changeCallStatus(
                                                    admin._id,
                                                    !admin.callactive
                                                )
                                            }
                                        >
                                            Change
                                        </Button>
                                    </Col>
                                    <Col span={6}>
                                        <Button
                                            onClick={() => {
                                                toggleUpdateAdminModal(true);
                                                setUpdateId(admin._id);
                                                setUsername(admin.username);
                                                setPassword(admin.password);
                                            }}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            danger
                                            onClick={() =>
                                                deleteAdmin(admin._id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                </div>
            </S.Container>
        </>
    );
};

export default Dashboard;
