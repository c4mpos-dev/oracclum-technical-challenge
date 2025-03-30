import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fromUnixTime, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

import { api } from "../lib/axios";
import { Question } from "../components/Question";

import vef5Logo from "../assets/vef5.png"
import { Loading } from "../components/Loading";

export interface FirestoreTimestamp {
    _seconds: number;
    _nanoseconds: number;
}

interface Question {
    id: string;
    question: string;
    answer?: string[];
    createdAt: FirestoreTimestamp; 
}

export function Questions() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        try {
            const response = await api.get("/search-questions");
            setQuestions(response.data); 
            setIsLoading(false);
        } catch (error) {
            console.error("Erro ao buscar perguntas:", error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const convertTimestamp = (timestamp: FirestoreTimestamp) => {
        const date = fromUnixTime(timestamp._seconds);
        return formatDistanceToNow(date, { locale: ptBR, addSuffix: true }); 
    };

    return (
        <div className="flex flex-col w-full h-screen">
            <header className="flex items-center justify-between px-6 py-4 bg-base-red">
                <img src={vef5Logo} className="w-[150px]" />
                <p onClick={() => navigate("/")} className="flex items-center gap-4 font-bold transition-all hover:cursor-pointer hover:scale-105"><FontAwesomeIcon icon={faBackward}/>Voltar para página principal</p>
            </header>

            {isLoading ? (
                <Loading />
            ) : (
                questions.length > 0 ? (
                    <div className="flex flex-col justify-center items-center w-full bg-base-background">
                        <div className="flex flex-col mt-6 mb-6 gap-6">
                            {questions.map((question, index) => (
                                <div key={index}>
                                    <Question 
                                        id={question.id}
                                        question={question.question} 
                                        answer={question.answer} 
                                        createdAt={convertTimestamp(question.createdAt)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full h-full justify-center items-center">
                        <h1 className="text-base-red font-bold text-2xl uppercase animate-bounce">
                            Perguntas ainda não foram feitas.
                        </h1>
                    </div>
                )
            )}

            <footer className="flex justify-between items-center bg-[#350502] p-8">
                <div>
                    <h2 className="text-xl font-semibold">
                        Feito por{' '}
                        <a href="https://github.com/c4mpos-dev" className="underline transition-all hover:animate-pulse">
                            Cauã Campos
                        </a>
                    </h2>
                    <p className="text-sm">Copyright © 2025 - Todos os direitos reservados</p>
                </div>
                <div className="flex gap-4">
                    <a href="https://github.com/c4mpos-dev" target="_blank">
                        <img src="assets/logos/logos--github-icon.svg" alt="GitHub" />
                    </a>
                    <a href="https://www.instagram.com/c4mp02/" target="_blank" rel="noopener noreferrer">
                        <img src="assets/logos/logos--instagram-icon.svg" alt="Instagram" />
                    </a>
                    <a href="https://www.linkedin.com/in/cau%C3%A3-campos/" target="_blank" rel="noopener noreferrer">
                        <img src="assets/logos/logos--linkedin-icon.svg" alt="LinkedIn" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
