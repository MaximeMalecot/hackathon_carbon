import { Post } from "../components/post";
import { Content } from "../interfaces/content";

export default function Home() {
    const dataContent: Array<Content> = [
        {
            id: "01",
            type: "text",
            data: "ceci est du texte 5",
            order: 5,
        },
        {
            id: "02",
            type: "file",
            data: "https://media.licdn.com/dms/image/C5603AQGUcRgaASIvcA/profile-displayphoto-shrink_800_800/0/1591829627226?e=2147483647&v=beta&t=MSe-nX4N-BH4q3gUcVekDhrBvGs0KneXSCU5VjbxEtU",
            order: 2,
        },
        {
            id: "01",
            type: "text",
            data: "ceci est du texte 3",
            order: 3,
        },
        {
            id: "01",
            type: "text",
            data: "ceci est du texte 1",
            order: 1,
        },
        {
            id: "02",
            type: "file",
            data: "https://media.licdn.com/dms/image/C5603AQGUcRgaASIvcA/profile-displayphoto-shrink_800_800/0/1591829627226?e=2147483647&v=beta&t=MSe-nX4N-BH4q3gUcVekDhrBvGs0KneXSCU5VjbxEtU",
            order: 4,
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center">
            <Post
                title="Title"
                type="BACKEND"
                content={dataContent}
                writer="Clarence Potel"
                createdAt="2021-01-22"
                enterprise="01"
            />
        </div>
    );
}
