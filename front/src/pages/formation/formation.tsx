import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FORMATION_TYPE, FormationChapters } from "../../interfaces";

export default function FormationPage() {
    const [sortedChapters, setSortedChapters] = useState<FormationChapters[]>(
        []
    );
    const formationChapters: FormationChapters[] = [
        {
            id: 1,
            order: 1,
            name: "Formation testu",
            resourceID: {},
            type: FORMATION_TYPE.COURS,
        },
        {
            id: 1,
            order: 3,
            name: "Formation toto",
            resourceID: {},
            type: FORMATION_TYPE.QUIZ,
        },
        {
            id: 1,
            order: 2,
            name: "Formation 1",
            resourceID: {},
            type: FORMATION_TYPE.QUIZ,
        },
        {
            id: 1,
            order: 5,
            name: "Formation toto",
            resourceID: {},
            type: FORMATION_TYPE.COURS,
        },
        {
            id: 1,
            order: 4,
            name: "Formation ssssss",
            resourceID: {},
            type: FORMATION_TYPE.COURS,
        },
        {
            id: 1,
            order: 6,
            name: "Formation xxxxxxxxx",
            resourceID: {},
            type: FORMATION_TYPE.COURS,
        },
        {
            id: 1,
            order: 7,
            name: "Formation 1",
            resourceID: {},
            type: FORMATION_TYPE.QUIZ,
        },
    ];

    const sorteChapters = useCallback(() => {
        const res = formationChapters.sort((a, b) => {
            return a.order - b.order;
        });
        setSortedChapters(res);
    }, []);

    const getIcon = useCallback((val: FORMATION_TYPE): string => {
        if (val === FORMATION_TYPE.COURS) {
            return "📚";
        }
        return "❓";
    }, []);

    useEffect(() => {
        sorteChapters();
    }, []);

    return (
        <div className="formation-liste">
            <h1 className="text-4xl mb-5">Formations name</h1>
            <ul className="steps steps-vertical w-full gap-4 py-4">
                {sortedChapters.map((chapter, index) => (
                    <li
                        key={index}
                        data-content={getIcon(chapter.type)}
                        className="step w-full"
                    >
                        {chapter.type === FORMATION_TYPE.QUIZ ? (
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
