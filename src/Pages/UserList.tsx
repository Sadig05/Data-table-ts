import { Form, Input,Button, TableProps, InputNumber, Popconfirm, Table, Typography, Modal } from 'antd';
import React, { useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined,} from "@ant-design/icons";
import { observer } from "mobx-react";
import { FilterConfirmProps, FilterDropdownProps,} from "antd/lib/table/interface";
import { IFilter, IUser } from "../models/User";
import { useStore } from "../stores/RootStore";
import ButtonGroup from "antd/lib/button/button-group";

import EditUserModal from '../components/EditUserModal';

const Users = () => {
  const { userStore } = useStore();


const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  

  const onAddUser = () => {
    console.log("new student");
  };

  const onEditUser =(user: IUser) => {
    console.log("editing")
  }



  const onDeleteUser = (id: number) => {
    Modal.confirm({
        title: "Are you sure, you want to delete this student record?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
            userStore.deleteUser(id).then(() => userStore.getUsers());
        },
      });
   
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                // confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={(e) => {
                clearFilters();
                confirm();
              }}
              type="default"
            >
              Reset
            </Button>
          </>
        );
      },

      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      title: "Surname",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      // clearFilters,
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
        {
          text: "Genderfluid",
          value: "Genderfluid",
        },
        {
          text: "Non-binary",
          value: "Non-binary",
        },
        {
          text: "Genderqueer",
          value: "Genderqueer",
        },
        {
          text: "Polygender",
          value: "Polygender",
        },
      ],
    },
    {
      title: "Ip",
      key: "ip_address",
      dataIndex: "ip_address",
    },

    {
      key: "5",
      title: "Actions",
      render: (user: IUser ) => {
        console.log("record: " , user.id);
        
        return (
          <>
           <EditUserModal user={user} />

            
            <DeleteOutlined
              onClick={() => {
                onDeleteUser(user.id);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onChange: TableProps<IUser>["onChange"] = (
    pagination,
    filters,
    sorting,
    e
  ) => {
    console.log("params", pagination, e);
    if (e.action == "paginate") {
      userStore.setFilters({
        _page: pagination.current,
        _limit: pagination.pageSize,
      });
    }
    if (e.action == "filter") {
      const preParse = Object.entries(filters);
      const parsedFilter: any = {};

      preParse.forEach(([key, value]) => {
        console.log(key);
        if (Array.isArray(value) && key !== "gender") {
          return (parsedFilter[key] = value[0]);
        }
        parsedFilter[key] = value;
      });

      userStore.setFilters({
        q: parsedFilter.first_name,
        gender: parsedFilter.gender,
      });
    }
  };






  return (
    <div className="App">
      <Button onClick={onAddUser}>Add user</Button>

      <Table
        pagination={{
          total: userStore.count,
          pageSizeOptions: ["10", "50", "100"],
          showSizeChanger: true,
        }}
        columns={columns}
        rowKey={"id"}
        dataSource={userStore.users}
        onChange={onChange}
      />
    </div>
  );
};

export default observer(Users);
