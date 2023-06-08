import { Link } from "react-router-dom";
import DefaultFormationImage from "../../assets/images/default-formation-image.jpg";

interface ProgressItemProps {
    formationProgression: {
        chaptersDone: string[];
        finished: Date | null;

        formation: {
            _id: string;
            name: string;
            level: number;
        };
    };
}

export default function ProgressItem({
    formationProgression,
}: ProgressItemProps) {
    return (
        <div className="card max-w-sm w-auto bg-base-100 shadow-xl">
            <figure>
                <img src={DefaultFormationImage} alt="Formation image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {formationProgression.formation.name}
                </h2>
                <div className="card-actions justify-end">
                    {formationProgression.finished !== undefined &&
                        formationProgression.finished !== null && (
                            <p className="stat p-0 text-xs ">
                                Formation terminée le{" "}
                                {new Date(
                                    formationProgression.finished
                                ).toLocaleString()}
                            </p>
                        )}
                    <Link
                        target="_blank"
                        to={`/formation/${formationProgression.formation._id}`}
                        className="btn btn-info text-neutral w-full hover:opacity-90"
                    >
                        Go
                    </Link>
                </div>
            </div>
        </div>
    );
}
