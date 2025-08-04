import { Heading } from "../../../components";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { Button, Form, Divider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

type FormData = {
    email: string;
    password: string;
};

const Signup = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form Data:", data);
    };

    const handleGoogleLogin = () => {
        console.log("Google login triggered");
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-md bg-transparent rounded-xl p-8 space-y-6">
                <Heading text="Sign Up" />
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

                    <Form.Item >
                        <Button size="large" type="primary" htmlType="submit" className="w-full mt-4">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center text-gray-800">Already have an account? <Link to="/login" className="text-blue-500 hover:underline hover:text-blue-700">Login</Link></div>
                <Divider>or</Divider>
                <Button
                    size="large"
                    icon={<GoogleOutlined />}
                    type="default"
                    className="w-full"
                    onClick={handleGoogleLogin}
                >
                    Sign up with Google
                </Button>
            </div>
        </div>
    );
};

export default Signup;