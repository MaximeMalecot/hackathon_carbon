import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formationService from "../../services/formation.service";

export default function CoursRessource() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [ressource, setRessource] = useState<any>(null);
    const params = useParams<{ id: string }>();

    const fetchRessource = async () => {
        const res = await formationService.getResoucesByChapter(
            params.id ?? ""
        );

        if (!res.statusCode) {
            setRessource(res);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            fetchRessource();
        }
        setIsLoading(false);
    }, [isLoading]);
    return (
        <div className="w-full h-full pb-3">
            <h1 className="text-4xl mb-5">Cours Ressource</h1>
            <embed
                className="w-full h-4/5"
                src={ressource?.filePath}
                type="application/pdf"
            />
            <object
                data={ressource?.filePath}
                type="application/pdf"
                className="w-full h-4/5"
            >
                <a
                    className="btn btn-outline btn-primary mt-4"
                    target="_blank"
                    href={ressource?.filePath}
                >
                    Ouvrir dans une nouvelle fenetre
                </a>
            </object>
        </div>
    );
}
