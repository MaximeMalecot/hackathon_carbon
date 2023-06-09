import { Content } from "../../interfaces/content";

export function Post(props: {
    title: string;
    content: Array<Content>;
    type: string;
    writer?: string;
    enterprise?: string;
    createdAt: string;
}) {
    const sortContents = props.content.sort(function (a, b) {
        return a.order - b.order;
    });
    return (
        <div className="card w-1/2 bg-base-100 shadow-xl border">
            <div className="card-body">
                <h2 className="card-title">{props.title}</h2>
            </div>
            {sortContents.map((content) => {
                if (content.type === "text") {
                    return <p>{content.data}</p>;
                } else if (content.type === "file") {
                    return (
                        <figure className="">
                            <img
                                className="w-full max-h-80 object-cover"
                                src={content.data}
                                alt={props.title}
                            />
                        </figure>
                    );
                }
            })}
            <div className="flex justify-between">
                <div>{props.writer}</div>
                <div>{props.createdAt}</div>
            </div>
        </div>
    );
}
