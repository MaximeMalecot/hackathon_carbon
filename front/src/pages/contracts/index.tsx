import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContractData } from "../../interfaces/contract";
import contractService from "../../services/contract.service";

export default function Contracts() {
    const [contracts, setContracts] = useState<ContractData[]>([]);

    const fetchContracts = useCallback(async () => {
        try {
            const res = await contractService.getAll();
            setContracts(res);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        fetchContracts();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-4xl mb-5">Liste des contrats</h1>
            {contracts.length === 0 ? (
                <div>
                    <p className="text-sm text-slate-400">
                        Il n'y actuellement aucun contrat listé
                    </p>
                </div>
            ) : (
                <div className="">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Entreprise</th>
                                    <th>Consultant</th>
                                    <th>Statut</th>
                                    <th>Commencé le</th>
                                    <th>Terminé le</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contracts.map((contract, index) => (
                                    <tr className="hover" key={index}>
                                        <th>{contract._id}</th>
                                        <td>{contract.entrepriseId}</td>
                                        <td>{contract.userId}</td>
                                        <td>{contract.status}</td>
                                        <td>
                                            {new Date(
                                                contract.startDate
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {contract?.endDate
                                                ? new Date(
                                                      contract.endDate
                                                  ).toLocaleDateString()
                                                : "Non indiqué"}
                                        </td>
                                        <td>
                                            <Link
                                                target="_blank"
                                                to={`/contracts/${contract._id}`}
                                                className="btn btn-info text-neutral"
                                            >
                                                Voir
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
