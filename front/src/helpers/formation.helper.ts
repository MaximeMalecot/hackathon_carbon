import { Formation, FormationDTO } from "../interfaces";

export const mapperFormation = (formation: FormationDTO): Formation => {
    
    return {
        id: formation._id,
        title: formation.name,
        xp: formation.level,
        image: "../../public/images/formation-exemple.jpg",
        creator: formation.referent,
    };
};

