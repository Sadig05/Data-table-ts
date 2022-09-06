import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { IUser } from "../models/User";
import { formatCountdown } from "antd/lib/statistic/utils";
import UserStore from "../stores/UserStore";
import { useStore } from "../stores/RootStore";

const AddUserModal = () => {

        const genders = [
          "Male",
          "Female",
          "Genderfluid",
          "Non-binary",
          "Genderqueer",
          "Polygender",
        ];
        const { userStore } = useStore();
        const { Item, useForm } = Form;
        const [updateForm] = useForm();
      
        const [visible, setVisible] = useState(false);
        const toggleEditModal = () => {
          setVisible(!visible);
        };
      
        const onFinish = (values: IUser) => {
          console.log("Success:", values);
          userStore.postUser(values).then(() => userStore.getUsers());
          // return values;
        };
      
        const onFinishFailed = (errorInfo: any) => {
          console.log("Failed:", errorInfo);
        };
    
      



  return (
    <div>
    <Button onClick={toggleEditModal}>ADD</Button>

    <Modal
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      visible={visible}
      title="Edit user"
      onCancel={toggleEditModal}
      // onOk={toggleEditModal}
    >
      <Form
        form={updateForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          remember: true,
          first_name: "",
          last_name: "",
          email: "",
          gender: "",
          ip_address: "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        
        <Form.Item
            
          label=" First Name"
          name="first_name"
          rules={[{ required:true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label=" Last Name"
          name="last_name"
          rules={[{ required:true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required:true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Gender" name="gender"
        rules={[{required:true,}]}
        >
          <Select
            // defaultValue={user.gender}
            // onChange={(value) => {
            //   gender = value;
            // }}
          >
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Genderfluid">Genderfluid</Select.Option>
            <Select.Option value="Non-binary">Non-binary</Select.Option>
            <Select.Option value="Genderqueer">Genderqueer</Select.Option>
            <Select.Option value="Polygender">Polygender</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="IP Address"
          name="ip_address"
          rules={[{required:true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={toggleEditModal} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>
  )
  
}

export default AddUserModal;