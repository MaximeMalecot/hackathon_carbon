import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mapperFormationChapter } from "../../helpers";
import { FORMATION_TYPE, FormationChapters } from "../../interfaces";
import formationService from "../../services/formation.service";

export default function FormationPage() {
    const [sortedChapters, setSortedChapters] = useState<FormationChapters[]>(
        []
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
            fetchChapter();
        }
        setIsLoading(false);
    }, [isLoading]);

    useEffect(() => {
        sorteChapters();
    }, [formationChapters]);

    return (
        <div className="formation-liste overflow-auto">
            <h1 className="text-4xl mb-5">Formations name</h1>
            <ul className="steps steps-vertical w-full gap-4 py-4">
                {sortedChapters.map((chapter, index) => (
                    <li
                        key={index}
                        data-content={getIcon(chapter.type)}
                        className="step w-full"
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
