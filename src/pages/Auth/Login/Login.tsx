import { Heading } from "../../../components";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { Button, Form, Divider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, signInWithEmailAndPassword, } from "../../../firebase/";
import toast from "react-hot-toast";
import { googleLogin } from "../../../helpers";

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("you're loggedIn");
            setTimeout(() => navigate("/"), 700);
        } catch (err) {
            toast.error("Password or Email can be wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await googleLogin();
            setTimeout(() => navigate("/"), 700);
        } catch (err) {
            toast.error("Failed. Try Again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-md bg-transparent rounded-xl p-8 space-y-6">
                <Heading text="Login" />
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-4">
                    <Form.Item
                        label="Email"
                        validateStatus={errors.email ? "error" : ""}
                        help={
                            errors.email ? (
                                <div className="text-red-700 text-right text-xs">
                                    {errors.email.message}
                                </div>
                            ) : null
                        }
                    >
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email",
                                },
                            }}
                            render={({ field }) => (
                                <div className="relative w-full">
                                    <input
                                        {...field}
                                        placeholder="Enter your email"
                                        className={`w-full border-0 border-b ${errors.email ? "!border-red-500" : "border-gray-400"
                                            } focus:border-blue-500 focus:outline-none py-2 text-base bg-transparent pr-8`}
                                    />
                                    <MdEmail
                                        size={18}
                                        className={`absolute bottom-2 right-2 ${errors.email ? "text-red-500" : "text-blue-900"
                                            }`}
                                    />
                                </div>
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        validateStatus={errors.email ? "error" : ""}
                        help={
                            errors.password ? (
                                <div className="text-red-700 text-right text-xs">
                                    {errors.password.message}
                                </div>
                            ) : null
                        }
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <div className="relative w-full">
                                    <input
                                        {...field}
                                        placeholder="Enter your password"
                                        className={`w-full border-0 border-b ${errors.email ? "!border-red-500" : "border-gray-400"
                                            } focus:border-blue-500 focus:outline-none py-2 text-base bg-transparent pr-8`}
                                    />
                                    <MdEmail
                                        size={18}
                                        className={`absolute bottom-2 right-2 ${errors.email ? "text-red-500" : "text-blue-900"
                                            }`}
                                    />
                                </div>
                            )}
                        />
                    </Form.Item>

                    <Form.Item >
                        <Button loading={loading} size="large" type="primary" htmlType="submit" className="w-full mt-4">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center text-gray-800">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline hover:text-blue-700">Signup</Link></div>
                <Divider>or</Divider>
                <Button
                    disabled={loading}
                    size="large"
                    icon={<GoogleOutlined />}
                    type="default"
                    className="w-full"
                    onClick={handleGoogleLogin}
                >
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
};

export default Login;