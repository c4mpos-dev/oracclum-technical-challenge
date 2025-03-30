import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Answer } from "./Answer";
import { api } from "../lib/axios";

const answerSchema = z.object({
    answer: z.string().min(3, "A resposta deve ter pelo menos 3 caracteres."),
});

type AnswerFormData = z.infer<typeof answerSchema>;

interface QuestionProps {
    id: string;
    question: string;
    answer?: string[];
    createdAt: string;
}

export function Question({ id, question, answer = [], createdAt }: QuestionProps) {
    const [answers, setAnswers] = useState<string[]>(answer);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AnswerFormData>({
        resolver: zodResolver(answerSchema),
    });

    const onSubmit = async (data: AnswerFormData) => {
        try {
            setIsLoading(true);
            await api.post(`/questions/${id}/answers`, { answer: data.answer }); 
            setAnswers((prevAnswers) => [...prevAnswers, data.answer]);
            setIsLoading(false);

            reset(); 
        } catch (error) {
            console.error("Erro ao enviar resposta:", error);
        }
    };

    return (
        <div className="flex flex-col w-[700px] p-6 rounded-lg bg-base-background-divs border border-base-red/20">
            <div className="flex justify-between items-center w-full mb-6">
                <div className="flex flex-col items-start gap-0.5">
                    <span className="text-sm text-gray-400">Fã de Velozes & Furiosos: Pergunta</span>
                </div>
                <span className="text-sm text-gray-400">{createdAt}</span>
            </div>

            <div className="mb-6">
                <p className="text-gray-200">{question}</p>
            </div>

            <div className="border-t border-t-base-red pt-6">
                <span className="font-bold">Responda</span>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-start w-full">
                    <textarea
                        placeholder="Digite sua resposta..."
                        className="w-full h-24 mt-3 px-3 py-2 bg-neutral-900 border border-base-red rounded-lg resize-none"
                        {...register("answer")}
                    ></textarea>

                    {errors.answer && <p className="text-red-500 text-sm mt-2 font-bold animate-pulse">{errors.answer.message}</p>}

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="disabled:cursor-not-allowed disabled:bg-base-red/50 flex justify-center w-36 mt-4 p-2 font-bold bg-base-red rounded-lg transition-all hover:cursor-pointer hover:border hover:shadow-md hover:shadow-white/50 hover:scale-110"
                    >
                        {isLoading ?
                            <div className="w-4 h-4 border-2 border-t-2 border-t-transparent rounded-full animate-spin"></div>
                        : ( <p>Publicar</p> 
                        )}
                    </button>
                </form>
            </div>

            {(answers && answers.length > 0) ? (
                answers.map((ans, index) => (
                    <div key={index}>
                        <Answer answer={ans} />
                    </div>
                ))
            ) : (
                <p className="mt-4 text-gray-400">Não há respostas ainda.</p>
            )}
        </div>
    );
}