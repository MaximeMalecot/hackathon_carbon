interface QuestionProps {
    nbQuestion: number;
    labelQuestion: string;
}
export const Question = ({ nbQuestion, labelQuestion }: QuestionProps) => {
    return (
        <>
            <h2 className="card-title">Question : {nbQuestion}</h2>
            <h4 className="text-lg mb-5">{labelQuestion}</h4>
        </>
    );
};
