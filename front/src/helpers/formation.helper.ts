import { Formation, FormationDTO } from "../interfaces";

export const mapperFormation = (formation: FormationDTO): Formation => {
    
    return {
        id: formation._id,
        title: formation.name,
        xp: Math.floor(Math.random() * 500),
        image: "../../public/images/formation-exemple.jpg",
        creator: formation.referent,
    };
};

