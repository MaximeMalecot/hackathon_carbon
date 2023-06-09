import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContracteEntrepriseItem from "../../components/contracts/contract-entreprise-item";
import { UserData } from "../../interfaces";
import { ContractData } from "../../interfaces/contract";
import entrepriseService from "../../services/entreprise.service";

export default function EntrepriseView() {
    const params = useParams();
    const [entreprise, setEntreprise] = useState<any>();
    const [contracts, setContracts] = useState<Array<ContractData>>([]);
    const [users, setUsers] = useState<Array<UserData>>([]);

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
            <div className="flex flex-col items-center h-screen">
                <h1 className="text-2xl font-bold">
                    {entreprise?.entreprise.name}
                </h1>
                <div className="avatar">
                    <div className="w-24 rounded">
                        <img src="https://media.foot-national.com/18/2023/06/photo_article/825003/328818/1200-L-quipe-de-france-didier-deschamps-recadr-par-la-real-sociedad.jpg" />
                    </div>
                </div>
                <p className="text-xl">{entreprise?.entreprise.address}</p>
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
                                        />
                                    )
                                )}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}
