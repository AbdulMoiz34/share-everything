import { AuthLink, Heading } from "../../../components";
import { useForm, Controller, type SubmitHandler, type FieldError } from "react-hook-form";
import { Button, Form } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../../../firebase";
import { useState } from "react";
import toast from "react-hot-toast";
import { googleLogin } from "../../../helpers";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { emailPattern, passwordPattern } from "../../../constants";
import { getFirebaseErrorMessage } from "../../../utils/firebaseErrors";

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

    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Account created successfully 🎉");
            navigate("/", { replace: true });
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
    const passwordError: FieldError | undefined = errors.password;

    const Icon = showPassword ? FaEyeSlash : FaEye;

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-md bg-transparent rounded-xl p-8 space-y-6">
                <Heading text="Sign Up" />
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-4">

                    <Form.Item
                        label="Email"
                        help={emailError && <div className="text-red-700 text-right text-xs">{emailError?.message}</div>}
                    >
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required.",
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
                                        className={`${emailError && "text-red-700"} text-blue-900 absolute bottom-2 right-2`}
                                    />
                                </div>
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        help={passwordError && <div className="text-red-700 text-right text-xs">{passwordError?.message}</div>} >
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required.",
                                pattern: passwordPattern
                            }}
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

                    <Form.Item >
                        <Button loading={loading} size="large" type="primary" htmlType="submit" className="cursor-pointer w-full mt-4">
                            Sign Up
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
                    Sign up with Google
                </Button>
                <AuthLink text="Already have an account?" linkText="login" />
            </div>
        </div>
    );
};

export default Signup;