import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContracteEntrepriseItem from "../../components/contracts/contract-entreprise-item";
import { ContractData } from "../../interfaces/contract";
import entrepriseService from "../../services/entreprise.service";

export default function EntrepriseView() {
    const params = useParams();
    const [entreprise, setEntreprise] = useState<any>();
    const [contracts, setContracts] = useState<Array<ContractData>>([]);

    const fetchEntreprise = async () => {
        const entreprise = await entrepriseService.getById(params.id);
        setEntreprise(entreprise);
    };

    const fetchContracts = async () => {
        const contracts = await entrepriseService.getContractByEntrepriseId(
            params.id
        );
        setContracts(contracts);
    };

    useEffect(() => {
        fetchEntreprise();
        fetchContracts();
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">
                    {entreprise?.entreprise.name}
                </h1>
                <div className="avatar">
                    <div className="w-24 rounded">
                        <img src={entreprise?.entreprise.image} />
                    </div>
                </div>
                <p className="text-xl">{entreprise?.entreprise.address}</p>
                {contracts.length > 0 ? (
                    <section>
                        <table className="table table-xs w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Position</th>
                                    <th>Consultant</th>
                                    <th>Entreprise</th>
                                    <th>status</th>
                                    <th>Début</th>
                                    <th>Fin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contracts.length > 0 &&
                                    contracts.map(
                                        (contract: ContractData, index) => (
                                            <ContracteEntrepriseItem
                                                contract={contract}
                                                key={index}
                                            />
                                        )
                                    )}
                            </tbody>
                        </table>
                    </section>
                ) : (
                    <h1> Il n'y a aucun contrats</h1>
                )}
            </div>
        </div>
    );
}
