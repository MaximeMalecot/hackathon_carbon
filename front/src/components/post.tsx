export function Post(props: {
    title: string;
    content: Array<Content>;
    type: string;
    writer: string;
    enterprise: string;
    createdAt: string;
}) {
    for (let i = 0; i < props.content.length; i++) {
        if (props.content[i].type === "text") {
            return (
                <div className="card w-1/2 bg-base-100 shadow-xl border">
                    <div className="card-body">
                        <div>
                            <h2 className="card-title">{props.title}</h2>
                            <p>{props.content[i].text}</p>
                        </div>
                        <div className="flex justify-between">
                            <div>{props.writer}</div>
                            <div>{props.createdAt}</div>
                        </div>
                    </div>
                </div>
            );
        } else if (props.content[i].type === "image") {
            return (
                <div className="card w-1/2 bg-base-100 shadow-xl border">
                    <div className="card-body">
                        <div>
                            <h2 className="card-title">{props.title}</h2>
                            <p>{props.content[i].text}</p>
                        </div>
                        <div className="flex justify-between">
                            <div>{props.writer}</div>
                            <div>{props.createdAt}</div>
                        </div>
                    </div>
                    <figure>
                        <img
                            className="w-full max-h-80"
                            src={props.content[i].url}
                            alt={props.title}
                        />
                    </figure>
                </div>
            );
        }
    }
}
