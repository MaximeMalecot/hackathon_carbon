import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateDeliverableData } from "../../components/contracts/create-deliverable-form";
import CreateDeliverableModal from "../../components/contracts/create-deliverable-modal";
import { ROLES } from "../../constants";
import { CONTRACT_STATUS } from "../../constants/status";
import { useAccess } from "../../hooks/use-access";
import { ContractData, Entreprise, UserData } from "../../interfaces";
import contractService from "../../services/contract.service";
import deliverableService from "../../services/deliverable.service";
import entrepriseService from "../../services/entreprise.service";
import userService from "../../services/user.service";

interface DeliverableData {
    _id: string;
    title: string;
    file: string;
}

export default function Contracts() {
    const [contract, setContract] = useState<ContractData | null>(null);
    const [entreprise, setEntreprise] = useState<Entreprise | null>(null);
    const [consultant, setConsultant] = useState<UserData | null>(null);
    const [deliverables, setDelivrables] = useState<DeliverableData[]>([]); // TODO: Create interface for deliverables
    const { id } = useParams<{ id: string }>();

    const reload = () => {
        setContract(null);
        setEntreprise(null);
        setConsultant(null);
        setDelivrables([]);
        fetchContract();
    };

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
                    reload={reload}
                />
            )}
            <div className="divider"></div>
            {entreprise && contract && consultant && deliverables && (
                <DeliverablesPart
                    contractId={contract._id}
                    deliverables={deliverables}
                    reload={reload}
                />
            )}
        </div>
    );
}

interface TopPartProps {
    entreprise: Entreprise;
    consultant: UserData;
    contract: ContractData;
    reload: () => void;
}
function TopPart({ entreprise, consultant, contract, reload }: TopPartProps) {
    const { hasAccess } = useAccess();
    const canUpdateContract = contract.status === CONTRACT_STATUS.ACTIVE;

    const handleCancelContract = async () => {
        try {
            const res = await contractService.cancelContract(contract._id);
            if (!res) throw new Error("Error while canceling contract");
            reload();
        } catch (e: any) {
            console.log(e.message);
            toast.error("Erreur: " + e.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleFinishContract = async () => {
        try {
            const res = await contractService.finishContract(contract._id);
            if (!res) throw new Error("Error while finishing contract");
            reload();
        } catch (e: any) {
            console.log(e.message);
            toast.error("Erreur: " + e.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

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
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl">Consultant</h2>
                    <Link
                        className="text-xs border-solid border-2 px-2 border-primary rounded-md"
                        to={`/gestion-user/${consultant._id}`}
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
                <p className="">{contract.status}</p>
                {hasAccess([ROLES.ASSIGNMENT_EDITOR]) && canUpdateContract && (
                    <div className="flex gap-2">
                        <button
                            onClick={handleCancelContract}
                            className="btn btn-secondary"
                        >
                            Annuler le contrat
                        </button>
                        <button
                            onClick={handleFinishContract}
                            className="btn btn-info text-neutral"
                        >
                            Terminer le contrat
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

interface DeliverablesPartProps {
    deliverables: DeliverableData[];
    reload: () => void;
    contractId: string;
}

function DeliverablesPart({
    deliverables,
    contractId,
    reload,
}: DeliverablesPartProps) {
    const { hasAccess } = useAccess();
    const [formvisibility, setFormVisibility] = useState(false);

    const handleDelete = async (id: string) => {
        const res = await deliverableService.delete(id);
        if (!res) return console.log("Error while deleting deliverable");
        reload();
    };

    const addDeliverable = async (deliverable: CreateDeliverableData) => {
        try {
            const { file, title } = deliverable;
            const res = await deliverableService.create(
                contractId,
                file,
                title
            );
            if (!res) throw new Error("Error while creating deliverable");
            reload();
        } catch (e: any) {
            console.log(e);
            toast.error("Erreur: " + e.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <h2 className="text-xl">Documents </h2>
                    <div className="badge badge-info text-neutral">
                        {deliverables.length}
                    </div>
                </div>

                {hasAccess([ROLES.ASSIGNMENT_EDITOR]) && (
                    <button
                        onClick={() => setFormVisibility((prev) => !prev)}
                        className="mb-auto btn btn-primary text-sm"
                    >
                        Ajouter
                    </button>
                )}
            </div>

            <CreateDeliverableModal
                contractId={contractId}
                create={addDeliverable}
                isVisible={formvisibility}
                setVisibility={setFormVisibility}
            />

            {deliverables.length == 0 ? (
                <div>
                    <p className="text-sm text-slate-400">Aucun document</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliverables.map((deliverable, index) => (
                                <tr className="hover" key={index}>
                                    <th>{deliverable.title}</th>
                                    <td className="flex gap-3">
                                        <Link
                                            target="_blank"
                                            to={deliverable.file}
                                            className="btn btn-info text-neutral"
                                        >
                                            Voir
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(deliverable._id)
                                            }
                                            className="btn btn-secondary text-neutral"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
