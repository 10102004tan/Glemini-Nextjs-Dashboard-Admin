'use client';
import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import { useState } from "react";
import AxiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
import FormInputTextarea from "@/components/FormInputTextarea";
import Markdown from 'react-markdown';
import Modal from 'react-modal';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function NotificationPage() {
    const [data, setData] = useState({
        title: '',
        body: '',
        type: '',
        senderId: "671df08d23841e253cc38506",
        content: ''
    });
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.title || !data.body || !data.type || !data.content) {
            toast("Please fill all fields !!!", {
                type: "error",
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
            });
            return;
        }
        AxiosInstance.post('/admin/notification/send', {
            ...data
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                setData({
                    title: '',
                    body: '',
                    type: '',
                    senderId: "671df08d23841e253cc38506",
                    content: ''
                });
                toast("Success !!!", {
                    type: "success",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            }
        }).catch(error => console.error(error));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    return (
        <LayoutAdmin>
            <section className="bg-gray-100">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="lg:col-span-2 lg:py-12">
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <h5 className="pb-3 border-b-2 font-semibold">Markdown show content</h5>
                                <Markdown>
                                    {data.content}
                                </Markdown>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormInput label="Title" name="title" value={data.title} onChange={handleChange} />
                                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                    <div>
                                        <label
                                            htmlFor="Option1"
                                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            tabIndex="0"
                                        >
                                            <input onChange={handleChange} className="sr-only" id="Option1" type="radio" tabIndex="-1" value={"SYS-001"} name="type" />

                                            <span className="text-sm"> Thông báo bảo trì </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="Option2"
                                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            tabIndex="0"
                                        >
                                            <input onChange={handleChange} className="sr-only" id="Option2" type="radio" tabIndex="-1" value={"SYS-002"} name="type" />

                                            <span className="text-sm"> Thông báo tính năng mới </span>
                                        </label>
                                    </div>
                                </div>
                                <FormInputTextarea label="Body" name="body" value={data.body} onChange={handleChange} rows={4} />
                                <FormInputTextarea label="Content" name="content" value={data.content} onChange={handleChange} rows={8} />
                                <FormButton type="submit" title="Send Notification" />
                            </form>
                        </div>
                    </div>
                </div>


                <Modal
                    isOpen={false}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>
            </section>
        </LayoutAdmin>
    )
}