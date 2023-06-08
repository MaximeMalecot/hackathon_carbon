export default function CreateQuestionQuiz({ submit }: Props) {
    const [chapterName, setChapterName] = useState("");
    return (
        <div>
            <h1 className="text-4xl mb-5">Creation de question pour le quiz</h1>
            <form>
                <div className="flex flex-col items-center">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Nom de la question</span>
                        </label>
                        <input
                            onChange={setName}
                            type="text"
                            name="name"
                            placeholder="Ex: Formation React"
                            className="input input-bordered w-full max-w-xs"
                            value={chapterName}
                        />
                        <select
                            onChange={(e) => setType(e.target.value)}
                            className="select select-bordered w-full max-w-xs mt-5"
                        >
                            <option disabled selected>
                                Type
                            </option>
                            <option>{ChapterTypes.QUIZ}</option>
                            <option>{ChapterTypes.RESOURCE}</option>
                        </select>
                        {type === ChapterTypes.QUIZ ? (
                            <CreateQuiz submit={handleSubmit} />
                        ) : (
                            type === ChapterTypes.RESOURCE && (
                                <CreateRessource submit={handleSubmit} />
                            )
                        )}
                    </div>
                </div>
            </form>
            <DisplayChapters />
        </div>
    );
}
