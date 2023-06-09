import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserData } from "../../interfaces";
import { ContractData } from "../../interfaces/contract";
import { Entreprise } from "../../interfaces/entreprise";
import entrepriseService from "../../services/entreprise.service";
import userService from "../../services/user.service";

interface ContractItemProps {
    contract: ContractData;
}

export default function ContracteEntrepriseItem({
    contract,
}: ContractItemProps) {
    const [entrepriseData, setEntrepriseData] = useState<Entreprise | null>(
        null
    );
    const [userData, setUserData] = useState<UserData | null>(null);
    const fetchEntrepriseData = async () => {
        try {
            const res = await entrepriseService.getOne(contract.entrepriseId);
            setEntrepriseData(res.entreprise);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchUserData = async () => {
        try {
            const res = await userService.getUser(contract.userId);
            setUserData(res);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchEntrepriseData();
        fetchUserData();
    }, []);

    return (
        <tr className="hover">
            <th></th>
            <td>{contract.position}</td>
            <td>{userData ? userData.email : contract.userId}</td>
            <td>
                {entrepriseData ? entrepriseData.name : contract.entrepriseId}
            </td>
            <td>{contract.status}</td>
            <td>{new Date(contract.startDate).toLocaleDateString()}</td>
            <td>
                {contract?.endDate
                    ? new Date(contract.endDate).toLocaleDateString()
                    : "En cours"}
            </td>
            <td>
                {contract?.endDate
                    ? new Date(contract.endDate).toLocaleDateString()
                    : "En cours"}
            </td>
            <td>
                <Link
                    to={`/contracts/${contract._id}`}
                    className="btn btn-info text-neutral"
                >
                    Go
                </Link>
            </td>
        </tr>
    );
}
