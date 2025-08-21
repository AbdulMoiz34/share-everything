import { AuthLink, Heading } from "../../../components";
import { useForm, type SubmitHandler, Controller, type FieldError } from "react-hook-form";
import { Button, Form } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, signInWithEmailAndPassword, } from "../../../firebase/";
import toast from "react-hot-toast";
import { googleLogin } from "../../../helpers";
import { emailPattern } from "../../../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getFirebaseErrorMessage } from "../../../utils/firebaseErrors";

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
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("you're loggedIn");
            navigate("/");
        } catch (_err) {
            toast.error(getFirebaseErrorMessage(_err));
        } finally {
            setLoading(false);
        }
    };

    const googleLoginHandler = async () => {
        try {
            setLoading(true);
            await googleLogin();
            navigate("/", { replace: true });
        } catch (err) {
            toast.error("Google login failed. Try again.");
        } finally {
            setLoading(false);
        }
    }

    const emailError: FieldError | undefined = errors.email;

    const Icon = showPassword ? FaEyeSlash : FaEye;

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-md bg-transparent rounded-xl p-8 space-y-6">
                <Heading text="Login" />
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-4">
                    <Form.Item
                        label="Email"
                        help={emailError && <div className="text-red-700 text-right text-xs">{emailError?.message}</div>}
                    >
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: emailPattern
                            }}
                            render={({ field }) => (
                                <div className="relative w-full">
                                    <input
                                        {...field}
                                        placeholder="Enter your email"
                                        className={`${emailError && "!border-red-600"} w-full border-0 border-b focus:border-blue-500 focus:outline-none py-2 text-base bg-transparent pr-8`}
                                    />
                                    <MdEmail
                                        size={18}
                                        className={`${emailError && "text-red-600"} text-blue-900 absolute bottom-2 right-2`}
                                    />
                                </div>
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password">
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...field}
                                        placeholder="Enter your password"
                                        className={`w-full border-0 border-b ${errors.password ? "!border-red-500" : "border-black"
                                            } focus:border-blue-500 focus:outline-none py-2 text-base bg-transparent pr-8`}
                                    />
                                    <Icon
                                        onClick={() => setShowPassword(!showPassword)}
                                        size={18}
                                        className={`cursor-pointer hover:text-black ${errors.password ? "text-red-700" : "text-blue-900"
                                            } absolute bottom-2 right-2`}
                                    />
                                </div>
                            )}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} size="large" type="primary" htmlType="submit" className="w-full mt-4">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Button
                    disabled={loading}
                    size="large"
                    icon={<GoogleOutlined />}
                    type="default"
                    className="w-full"
                    onClick={googleLoginHandler}
                >
                    Sign in with Google
                </Button>
                <AuthLink text="Don't have an account?" linkText="signup" />
            </div>
        </div >
    );
};

export default Login;