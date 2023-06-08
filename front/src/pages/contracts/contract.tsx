import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserData } from "../../interfaces";
import { ContractData } from "../../interfaces/contract";
import { Entreprise } from "../../interfaces/entreprise";
import contractService from "../../services/contract.service";
import entrepriseService from "../../services/entreprise.service";
import userService from "../../services/user.service";

interface DeliverableData {
    _id: string;
}

export default function Contracts() {
    const [contract, setContract] = useState<ContractData | null>(null);
    const [entreprise, setEntreprise] = useState<Entreprise | null>(null);
    const [consultant, setConsultant] = useState<UserData | null>(null);
    const [deliverables, setDelivrables] = useState<DeliverableData[]>([]); // TODO: Create interface for deliverables
    const { id } = useParams<{ id: string }>();

    const fetchData = useCallback(async () => {
        try {
            if (!contract) return console.log("No contract provided");
            Promise.all([
                entrepriseService.getOne(contract.entrepriseId),
                userService.getUser(contract.userId),
            ]).then(([entrepriseRes, consultantRes]) => {
                const { entreprise, users } = entrepriseRes;
                setEntreprise(entreprise);
                setConsultant(consultantRes);
            });
        } catch (e) {
            console.log(e);
        }
    }, [contract]);

    const fetchContract = useCallback(async () => {
        try {
            if (!id) throw new Error("No id provided");
            const { contract, delivrables } = await contractService.getOne(id);
            console.log(contract);
            setContract(contract);
            setDelivrables(delivrables);
        } catch (e) {
            console.log(e);
        }
    }, [id]);

    useEffect(() => {
        if (!contract) return;
        fetchData();
    }, [contract]);

    useEffect(() => {
        if (!id) return;
        fetchContract();
    }, [id]);

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-4xl mb-5">Contrat spécifique</h1>
            {entreprise && contract && consultant && (
                <TopPart
                    entreprise={entreprise}
                    contract={contract}
                    consultant={consultant}
                />
            )}
            <div className="divider"></div>
            <div>
                <h2 className="text-xl">
                    Documents{" "}
                    <div className="badge badge-info text-neutral">
                        {deliverables.length}
                    </div>
                </h2>
                {deliverables.length == 0 ? (
                    <div>
                        <p className="text-sm text-slate-400">Aucun document</p>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

interface TopPartProps {
    entreprise: Entreprise;
    consultant: UserData;
    contract: ContractData;
}
function TopPart({ entreprise, consultant, contract }: TopPartProps) {
    return (
        <div className="flex flex-col md:flex-row gap-5">
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure>
                    <img src={entreprise.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title ">
                        Entreprise:
                        <span className="uppercase">{entreprise.name}</span>
                    </h2>
                    <p>Adresse: {entreprise.address}</p>
                    <div className="card-actions justify-end">
                        <Link
                            target={"_blank"}
                            to={`/entreprise/${entreprise._id}`}
                            className="btn btn-primary"
                        >
                            Voir plus
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <h2 className="text-xl">Consultant</h2>
                    <Link
                        className="text-xs border-solid border-2 px-2 border-primary rounded-md"
                        to={`/user/${consultant._id}`}
                    >
                        Voir
                    </Link>
                </div>
                <p>{consultant.email}</p>
                <p>Position: {contract.position}</p>
                <p>
                    Début du contrat:{" "}
                    {new Date(contract.startDate).toLocaleDateString()}
                </p>
                {contract.endDate && (
                    <p>
                        Fin du contrat:{" "}
                        {new Date(contract.endDate).toLocaleDateString()}
                    </p>
                )}
                <p className="btn btn-info cursor-default text-neutral">
                    {contract.status}
                </p>
            </div>
        </div>
    );
}