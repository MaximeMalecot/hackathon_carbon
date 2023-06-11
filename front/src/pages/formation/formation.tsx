import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mapperFormationChapter } from "../../helpers";
import { FORMATION_TYPE, Formation, FormationChapters } from "../../interfaces";
import formationService from "../../services/formation.service";
interface ProgressionFormation {
    chaptersDone: Array<string>;
    progressionPercentage: {
        unit: string;
        value: number;
    };
}
export default function FormationPage() {
    const [sortedChapters, setSortedChapters] = useState<FormationChapters[]>(
        []
    );
    const [formation, setFormation] = useState<Formation | null>(null);
    const [progression, setProgression] = useState<ProgressionFormation | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [formationChapters, setFormationChapters] = useState<
        FormationChapters[]
    >([]);
    const params = useParams<{ id: string }>();

    const sorteChapters = useCallback(() => {
        const res = formationChapters.sort((a, b) => {
            return a.order - b.order;
        });
        setSortedChapters(res);
    }, [formationChapters]);

    const getIcon = useCallback((val: FORMATION_TYPE): string => {
        if (val === FORMATION_TYPE.COURS) {
            return "📚";
        }
        return "❓";
    }, []);

    const fetchFormation = useCallback(async () => {
        const response = await formationService.getFormation(params.id ?? "");
        setFormation(response);
    }, [params]);

    const fetchProgression = useCallback(async () => {
        const response = await formationService.getCurrentFormationProgression(
            params.id ?? ""
        );
        setProgression(response);
    }, [params]);

    const fetchChapter = useCallback(async () => {
        const response = await formationService.getFormationChapters(
            params.id ?? ""
        );
        if (response.length > 0) {
            response.map((item: any) => {
                const newItem = mapperFormationChapter(item);
                setFormationChapters((prev) => [...prev, newItem]);
            });
        }
    }, [params]);

    useEffect(() => {
        if (!isLoading) {
            Promise.all([fetchChapter(), fetchFormation(), fetchProgression()]);
        }
        setIsLoading(false);
    }, [isLoading]);

    useEffect(() => {
        sorteChapters();
    }, [formationChapters]);

    const checkChapterDone = useCallback(
        (id: string): boolean => {
            if (progression?.chaptersDone?.includes(id)) {
                return true;
            }
            return false;
        },
        [progression]
    );
    return (
        <div className="formation-liste overflow-auto">
            <h1 className="text-4xl mb-5">Formations {formation?.title}</h1>
            <ul className="steps steps-vertical w-full gap-4 py-4">
                {sortedChapters.map((chapter, index) => (
                    <li
                        key={index}
                        data-content={getIcon(chapter.type)}
                        className={`step ${
                            checkChapterDone(chapter.id) ? "step-success" : null
                        } w-full`}
                    >
                        {chapter.type === FORMATION_TYPE.QUIZ.toUpperCase() ? (
                            <Link
                                to={`/formation/quiz/${chapter.id}`}
                                className="w-full"
                            >
                                <div className="card w-full bg-base-100 shadow-md">
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            Chapter {index + 1} : {chapter.name}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <Link
                                to={`/formation/cours/${chapter.id}`}
                                className="w-full"
                            >
                                <div className="card w-full bg-base-100 shadow-md">
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            Chapter {index + 1} : {chapter.name}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
