import { Post } from "../components/post";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Post
                title="Title"
                urlImage="https://picsum.photos/seed/picsum/900/600"
                content="En littérature, la description constitue une pause dans le récit, où elle peut former un ensemble autonome, bien que le plus souvent elle prenne place dans la narration.
On la reconnaît à l'abondance des verbes de perception, d'éléments visuels, de repères spatiaux, de verbes d'état et de qualificatifs. Elle suit généralement un ordre, par exemple de la tête aux pieds ou d'un plan général à un plan rapproché."
                date="2021-09-01"
                author="Clarence Potel"
            />
        </div>
    );
}
