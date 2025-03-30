interface AnswerProps {
    answer: string;
}

export function Answer({answer}: AnswerProps) {
    return (
        <div className="flex flex-col w-full mt-6 bg-neutral-800 rounded-lg p-4">
            <div className="flex items-center">
                <div className="flex flex-col items-start gap-0.5">
                    <span className="text-sm text-gray-400">Fã de Velozes & Furiosos: Resposta</span>
                </div>
            </div>

            <p className="mt-3.5 text-sm">{answer}</p>
        </div>
    );
}