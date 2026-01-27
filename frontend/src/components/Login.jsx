import { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { Button, Link, Input } from "@mui/material";
import { USER_AVATAR_URL } from "../constants";
import { auth } from "../utilities/firebase";
import { validateForm } from "../utilities/validator";
import AuthHero from "./AuthHero";

export default function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onAuthClickHandler = async (e) => {
        e.preventDefault();
        const message = validateForm(email, password);
        setError(message);
        if (message) return;
        if (!isLogin) {
            setIsLoading(true);
            //Sign Up logic
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log("User from Sign up: ", user);
                    await updateProfile(user, {
                        displayName: name,
                        photoURL: USER_AVATAR_URL,
                    })
                    setIsLoading(false);
                    navigate("/home");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(`${errorCode}-${errorMessage}`);
                });
        } else {
            //Sign In Logic
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    localStorage.setItem('uid', auth.currentUser.uid);
                    const user = userCredential.user;
                    console.log("User from Sign in: ", user);
                    navigate("/home");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === "auth/invalid-credential") {
                        setError("Invalid Credentials");
                    } else {
                        setError(`${errorCode}-${errorMessage}`);
                    }
                });
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 shadow-xl bg-linear-to-b from-[#19A974] via-[#18A36B] to-[#0F8F5F]">
                <AuthHero />
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center mt-12">
                <h1 className="mb-6 text-5xl text-black">
                    Expense Tracker App
                </h1>
                <div className="w-full max-w-md shadow-xl py-6 px-6 bg-white text-black rounded-4xl">
                    <h1 className="flex justify-center pb-4 text-2xl">
                        {isLogin ? "Log In" : "Sign Up"}
                    </h1>
                    <form onSubmit={onAuthClickHandler}>
                        {!isLogin && (
                            <>
                                <div className="flex px-3 pb-3">
                                    <div className="p-1 whitespace-nowrap pr-10">
                                        Name
                                    </div>
                                    <Input
                                        className="block w-full rounded-md bg-gray-200 pl-1 pr-4"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        <div className="flex px-3 pb-3">
                            <div className="p-1 pr-11">Email</div>
                            <Input
                                className="block w-full rounded-md bg-gray-200 pl-1 pr-4"
                                type="text"
                                placeholder="abc@xyz.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value.trim());
                                }}
                                onClick={() => setError("")}
                            />
                        </div>
                        <div className="flex px-3 pb-3">
                            <div className="p-1 pr-3">Password</div>
                            <Input
                                className="block w-full rounded-md bg-gray-200 pl-1 pr-4"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value.trim());
                                }}
                                onClick={() => setError("")}
                            />
                        </div>
                        <div className="flex justify-center pt-6">
                            <Button
                                variant="contained"
                                type="submit"
                                onClick={onAuthClickHandler}
                                disabled={isLoading}
                            >
                                {isLogin ? "Log In" : "Sign Up"}
                            </Button>
                        </div>
                    </form>
                    <div className="flex justify-center pt-6 text-red-600">
                        {error}
                    </div>
                    <div className="flex justify-center pt-6">
                        {isLogin ? "Not a member?" : "Already have an account?"}
                        <Link
                            variant="outlined"
                            className="cursor-pointer pl-2"
                            onClick={() => {
                                setError("");
                                setEmail("");
                                setPassword("");
                                setName("");
                                setIsLogin((prev) => !prev);
                            }}
                            disabled={isLoading}
                        >
                            {isLogin ? "Sign Up" : "Login"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
