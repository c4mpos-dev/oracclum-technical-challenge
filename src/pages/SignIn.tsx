import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";

import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
    email: z.string().email("E-mail inválido").min(1, "O e-mail é obrigatório"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof signInSchema>;

export function SignIn() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(signInSchema)
    });

    const [signInWithEmailAndPassword, authUser, loading] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        await signInWithEmailAndPassword(data.email, data.password);
        reset();
    };

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
        document.title = "Login";
    }, [user, navigate]);

    if (loading) return <Loading />;

    if (authUser) {
        navigate("/");
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('../../assets/covers/capa-principal.jpg')" }}>
            <div className="flex flex-col justify-center items-center w-full h-screen bg-black/90">
                <img src="../../assets/logos/vef5.png" className="w-72 mb-5" />
                <div className="flex flex-col justify-center items-center w-[450px] pt-8 bg-base-background/70 border border-white/10 rounded-2xl transition-all hover:bg-base-background">
                    <h1 className="text-3xl font-bold uppercase mb-6">Login</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-full px-6">
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            className={`w-full border border-base-red/50 rounded-lg p-2 ${!errors.email ? "mb-5" : "mb-2"}`}
                            {...register("email")}
                            autoComplete="username"
                        />
                        {errors.email && <p className="mb-2 text-sm font-bold text-red-500 animate-pulse">{errors.email.message}</p>}

                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            className="w-full border border-base-red/50 rounded-lg p-2 mb-2"
                            {...register("password")}
                            autoComplete="current-password"
                        />
                        {errors.password && <p className="text-sm font-bold text-red-500 animate-pulse">{errors.password.message}</p>}

                        <button 
                            type="submit" 
                            className="w-36 mt-6 p-2 font-bold bg-base-red rounded-lg transition-all hover:cursor-pointer hover:border hover:shadow-md hover:shadow-white/50 hover:scale-110"
                        >
                            Entrar
                        </button>
                    </form>

                    <footer className="flex justify-end items-center gap-4 w-full mt-8 px-6 py-3 text-sm bg-base-background border-t border-white/10 rounded-b-2xl">
                        <span className="">Ainda não tem conta?</span>
                        <button 
                            className="px-3 py-2 text-xs font-bold bg-base-red rounded-lg transition-all hover:cursor-pointer hover:border hover:shadow-md hover:shadow-white/50 hover:scale-105"
                            onClick={() => navigate("/register")}
                        >
                            Cadastre-se
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}
