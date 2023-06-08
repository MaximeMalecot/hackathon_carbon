import { useEffect, useState } from "react";
import DefaultFormationImage from "../../assets/images/default-formation-image.jpg";
import { ContractData } from "../../interfaces/contract";
import { Entreprise } from "../../interfaces/entreprise";
import entrepriseService from "../../services/entreprise.service";

interface ContractItemProps {
    contract: ContractData;
}

export default function ContractItem({ contract }: ContractItemProps) {
    const [entrepriseData, setEntrepriseData] = useState<Entreprise | null>(
        null
    );

    const fetchEntrepriseData = async () => {
        try {
            const res = await entrepriseService.getOne(contract.entrepriseId);
            setEntrepriseData(res.entreprise);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchEntrepriseData();
    }, []);

    return (
        <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
                <img
                    src={
                        entrepriseData?.image
                            ? entrepriseData.image
                            : DefaultFormationImage
                    }
                    alt="Entreprise image"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title capitalize">
                    {entrepriseData
                        ? entrepriseData.name
                        : contract.entrepriseId}
                </h2>
                <p className="capitalize">{contract.position}</p>
                <div>
                    <p>
                        Début:{" "}
                        {new Date(contract.startDate).toLocaleDateString()}
                    </p>
                    <p>
                        Fin:
                        {contract?.endDate
                            ? new Date(contract.endDate).toLocaleDateString()
                            : "En cours"}
                    </p>
                </div>
                <div className="card-actions justify-end">
                    {contract.status && (
                        <button className="btn btn-primary cursor-default">
                            {contract.status}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
