'use client';
import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import { useEffect, useState } from "react";
import AxiosInstance from '@/utils/axiosInstance';
import { toast } from "react-toastify";


export default function PageManageUser() {

    const [data, setData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalImageIsOpen, setImageIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fecthData();
    }, []);

    const fecthData = async () => {
        AxiosInstance.post('/admin/user/teachers').then(res => {
            if (res.status === 200) {
                setData(res.data.metadata);
            }
        }).catch(err => { console.log(err) });
    }

    const handleDetails = (item) => {
        setSelectedUser(item);
        setIsOpen(true);
    }


    const handleImage = (url) => {
        setSelectedImage(url);
        setImageIsOpen(true);
    }

    const handleStatus = (teacher_status) => {
        AxiosInstance.post('/admin/user/update-status', {
            user_id: selectedUser._id,
            teacher_status
        }).then(res => {
            if (res.status === 200) {
                fecthData();
                setIsOpen(false);
                setSelectedUser(null);
                toast("Success !!!", {
                    type: "success",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            }
        }).catch(err => { console.log(err) });
    }


    return (
        <LayoutAdmin>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white ms-3 my-4">Manage User</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                console.log(item);
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item._id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.user[0].user_fullname}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.user[0].user_email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.teacher_status}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                            <button onClick={()=>handleDetails(item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                                Details
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                                Delete
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            
            {/* modal */}
            {
                selectedUser && (
                    <div className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 ${!modalIsOpen && "hidden"}`}>
                    <div className="bg-white w-1/2 p-8 rounded-lg">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Details</h1>
                        <div className="mt-4">
                            <p className="text-gray-800 dark:text-white">Name: {selectedUser.user[0].user_fullname}</p>
                            <p className="text-gray-800 dark:text-white">Email: {selectedUser.user[0].user_email}</p>
                            {/* list images */}
                            <div className="grid grid-cols-3 gap-4">
                                {
                                    selectedUser.file_urls.map((url, index) => {
                                        return (
                                            <div onClick={()=>handleImage(url)} key={index} className="bg-gray-200 h-40 overflow-hidden rounded cursor-pointer">
                                                <img className="" src={url} alt=""/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/* list action : reject, approve */}
                            <div className="mt-4">
                                {
                                    selectedUser.teacher_status === "pedding" && (
                                        <div className="flex gap-2">
                                            <button onClick={()=>handleStatus("active")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                                Approve
                                            </button>
                                            <button onClick={()=>handleStatus("rejected")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                                Reject
                                            </button>
                                        </div>
                                    )
                                }

                                {
                                    selectedUser.teacher_status === "active" && (
                                        <div className="flex gap-2">
                                            <button onClick={()=>handleStatus("rejected")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                                Reject
                                            </button>
                                        </div>
                                    )
                                }
                                {
                                    selectedUser.teacher_status === "rejected" && (
                                        <div className="flex gap-2">
                                            <button onClick={()=>handleStatus("active")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                                Approve
                                            </button>
                                        </div>
                                    )
                                }
                               
                            </div>
                        </div>
                        <div className="mt-4">
                            <button onClick={()=>{
                                setIsOpen(false)
                                setSelectedUser(null)
                            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
                )
            }

            {/* modal image */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 ${!modalImageIsOpen && "hidden"}`}>
                <div className="bg-white w-1/2 p-8 rounded-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Images</h1>
                    <div className="mt-4">
                        <div className="flex justify-center">
                        <img className="h-[500px] rounded" src={selectedImage} alt=""/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button onClick={()=>{
                            setImageIsOpen(false)
                            setSelectedImage(null)
                        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Close
                        </button>
                    </div>
                </div>
            </div>
          
        </LayoutAdmin>
    )
}