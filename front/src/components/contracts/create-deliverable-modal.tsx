import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export interface CreateDeliverableData {
    file: any;
    title: string;
}

interface CreateDeliverableFormProps {
    contractId: string;
    create: (deliverable: CreateDeliverableData) => Promise<void>;
    isVisible: boolean;
    setVisibility: (isVisible: boolean) => void;
}

export default function CreateDeliverableModal({
    create,
    isVisible,
    setVisibility,
}: CreateDeliverableFormProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    const [formData, setFormData] = useState<CreateDeliverableData>({
        file: null,
        title: "",
    });

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const { title, file } = formData;
                if (!title || !file) throw new Error("Champ(s) mmanquant(s)");
                await create(formData);
                setVisibility(false);
            } catch (e: any) {
                toast.error("Erreur: " + e.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        },
        [formData]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        },
        []
    );

    const handleChangeFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.files?.[0],
            }));
        },
        []
    );

    useEffect(() => {
        if (isVisible) {
            setFormData({
                file: null,
                title: "",
            });
            if (modalRef?.current?.showModal && !modalRef.current.open) {
                modalRef.current.showModal();
            }
        } else if (modalRef?.current?.close) {
            modalRef.current.close();
        }
    }, [isVisible]);

    useEffect(() => {
        if (!modalRef.current) return;
        modalRef.current.addEventListener("close", () => {
            setVisibility(false);
        });

        return () => {
            modalRef.current?.removeEventListener("close", () => {
                setVisibility(false);
            });
        };
    }, [modalRef]);

    return (
        <dialog ref={modalRef} className="modal">
            <form onSubmit={handleSubmit} className="modal-box">
                <div className="flex flex-col items-center h-fit">
                    <h1 className={"text-2xl"}>Ajout d'un déliverable</h1>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Nom du document</span>
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.title}
                            type="text"
                            name="title"
                            placeholder="Ex: Contrat de travail"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Fichier</span>
                        </label>
                        <input
                            name="file"
                            onChange={handleChangeFile}
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="submit"
                            className="btn w-full max-w-xs mt-4"
                            value="Enregister"
                        />
                    </div>
                </div>
            </form>
        </dialog>
    );
}
