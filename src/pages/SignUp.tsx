import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";

import { Loading } from "../components/Loading";

const signUpSchema = z.object({
    email: z.string().email("E-mail inválido").min(1, "O e-mail é obrigatório"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof signUpSchema>;

export function SignUp() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(signUpSchema)
    });

    const [createUserWithEmailAndPassword, user, loading] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();
    document.title = "Cadastro";

    const onSubmit = async (data: FormData) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        reset();
    };

    if (loading) return <Loading />;

    if (user) {
        navigate("/");
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('../../assets/covers/capa-principal.jpg')" }}>
            <div className="flex flex-col justify-center items-center w-full h-screen bg-black/90">
                <img src="../../assets/logos/vef5.png" className="w-72 mb-5" />
                <div className="flex flex-col justify-center items-center w-[450px] pt-8 bg-base-background/70 border border-white/10 rounded-2xl transition-all hover:bg-base-background">
                    <h1 className="text-3xl font-bold uppercase mb-6">Cadastro</h1>

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
                            className={`w-full border border-base-red/50 rounded-lg p-2 mb-2 ${!errors.password ? "mb-5" : "mb-2"}`}
                            {...register("password")}
                            autoComplete="new-password"
                        />
                        {errors.password && <p className="mb-2 text-sm font-bold text-red-500 animate-pulse">{errors.password.message}</p>}

                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                            className="w-full border border-base-red/50 rounded-lg p-2 mb-2"
                            {...register("confirmPassword")}
                            autoComplete="new-password"
                        />
                        {errors.confirmPassword && <p className="text-sm font-bold text-red-500 animate-pulse">{errors.confirmPassword.message}</p>}

                        <button 
                            type="submit" 
                            className="w-36 mt-6 p-2 font-bold bg-base-red rounded-lg transition-all hover:cursor-pointer hover:border hover:shadow-md hover:shadow-white/50 hover:scale-110"
                        >
                            Cadastre-se
                        </button>
                    </form>

                    <footer className="flex justify-end items-center gap-4 w-full mt-8 px-6 py-3 text-sm bg-base-background border-t border-white/10 rounded-b-2xl">
                        <span className="">Já tem conta?</span>
                        <button 
                            className="px-3 py-2 text-xs font-bold bg-base-red rounded-lg transition-all hover:cursor-pointer hover:border hover:shadow-md hover:shadow-white/50 hover:scale-105"
                            onClick={() => navigate("/login")}
                        >
                            Entrar
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}