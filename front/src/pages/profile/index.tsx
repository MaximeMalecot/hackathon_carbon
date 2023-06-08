import { useCallback, useEffect, useState } from "react";
import ProgressionItem from "../../components/formation/progress-item";
import { UserData } from "../../interfaces";
import formationService from "../../services/formation.service";
import userService from "../../services/user.service";

export interface FormationWithProgression {
    chaptersDone: string[];
    finished: Date | null;

    formation: {
        _id: string;
        name: string;
        level: number;
    };
}

export default function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [formations, setFormations] = useState<
        FormationWithProgression[] | null
    >(null);

    const fetchUserData = useCallback(async () => {
        Promise.all([
            userService.getSelf(),
            formationService.getSelfFormations(),
        ]).then(([user, progression]) => {
            setUserData(user);
            setFormations(progression);
        });
    }, []);

    useEffect(() => {
        fetchUserData();
    }, []);

    if (!userData) return <div className="flex flex-col"></div>;

    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-md shadow-lg py-4 px-6 flex items-center gap-5 bg-white">
                <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                        <span className="text-3xl capitalize">
                            {userData.email.slice(0, 1)}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-4xl">
                        {"Lastname"} {"Firstname"}
                    </h1>
                    <h3 className="text-md text-slate-400">
                        {userData?.email}
                    </h3>
                    <div>
                        <progress
                            className="progress progress-secondary w-56"
                            value={
                                userData?.experiencePoints > 10
                                    ? userData?.experiencePoints
                                    : 10
                            }
                            max="100"
                        />
                        <h3>{userData?.experiencePoints} points</h3>
                    </div>
                </div>
            </div>
            <div className="rounded-md shadow-lg py-4 px-6 flex flex-col gap-5 bg-white">
                <h1 className="text-4xl">Formations</h1>
                {formations && formations.length < 1 ? (
                    <p className="text-sm text-slate-400">
                        Vous ne suivez actuellement aucune formation
                    </p>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {formations &&
                            formations.map((formation: any) => (
                                <ProgressionItem
                                    key={formation._id}
                                    formationProgression={formation}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
