import DefaultFormationImage from "../../assets/images/default-formation-image.jpg";
import { ContractData } from "../../interfaces/contract";

interface ContractItemProps {
    contract: ContractData;
}

export default function ContractItem({ contract }: ContractItemProps) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
                <img src={DefaultFormationImage} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{contract.entrepriseId}</h2>
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
                        <button className="btn btn-primary">
                            {contract.status}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
