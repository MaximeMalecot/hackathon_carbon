import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateQuiz, CreateRessource, DisplayChapters } from "../../components";
import { ChapterTypes } from "../../constants";
import { CreateQuizChapterDto } from "../../interfaces";
import FormationService from "../../services/formation.service";

interface QuizOrRessource {
    title: string;
    description: string;
    file?: File;
}

export default function CreationChapterFormation() {
    const [chapterName, setChapterName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const navigate = useNavigate();

    const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapterName(e.target.value);
    };
    const params = useParams();

    const handleSubmit = useCallback(
        async (value: QuizOrRessource) => {
            if (!chapterName) return toast.error("Missing field(s)");
            const data: CreateQuizChapterDto = {
                chapter: { name: chapterName },
                [type]: value,
            };

            const id = params?.id ?? "";
            if (type === ChapterTypes.QUIZ) {
                const res: any = await FormationService.createChapterQuiz({
                    id,
                    data,
                });
                if (res?.quiz?._id) {
                    console.log(res.quiz._id);
                    navigate(`/gestion-formations/quiz/${res.quiz._id}`);
                }
            } else if (type === ChapterTypes.RESOURCE) {
                const res = await FormationService.createChapterResource({
                    id,
                    data,
                });

                if (!res.resource._id) return toast.error("Missing field(s)");
                await FormationService.addResourceChapter({
                    id: res.resource._id,
                    data: data,
                });
            }

            window.location.reload();
        },
        [chapterName, params, type]
    );

    return (
        <div>
            <h1 className="text-4xl mb-5">
                Création de chapitre pour la formation
            </h1>
            <form>
                <div className="flex flex-col items-center">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Nom du chapitre</span>
                        </label>
                        <input
                            onChange={setName}
                            value={chapterName}
                            type="text"
                            name="name"
                            placeholder="Ex: Formation React"
                            className="input input-bordered w-full max-w-xs"
                        />
                        <select
                            onChange={(e) => setType(e.target.value)}
                            className="select select-bordered w-full max-w-xs mt-5 capitalize"
                        >
                            <option disabled selected>
                                Type
                            </option>
                            <option>{ChapterTypes.QUIZ}</option>
                            <option>{ChapterTypes.RESOURCE}</option>
                        </select>
                        {type === ChapterTypes.QUIZ ? (
                            <CreateQuiz submit={handleSubmit} />
                        ) : (
                            type === ChapterTypes.RESOURCE && (
                                <CreateRessource submit={handleSubmit} />
                            )
                        )}
                    </div>
                </div>
            </form>
            <DisplayChapters />
        </div>
    );
}
