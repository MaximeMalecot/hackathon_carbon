export default function Sidebar(props: any) {
    return (
        <ul className="menu bg-base-200 md:w-56 w-full rounded-box md:ml-2 ml-0 md:h-5/6 h-full md:flex justify-between">
            <div>
                <li>
                    <a>Item 1</a>
                </li>
                <li>
                    <details open>
                        <summary>Parent</summary>
                        <ul>
                            <li>
                                <a>level 2 item 1</a>
                            </li>
                            <li>
                                <a>level 2 item 2</a>
                            </li>
                            <li>
                                <details open>
                                    <summary>Parent</summary>
                                    <ul>
                                        <li>
                                            <a>level 3 item 1</a>
                                        </li>
                                        <li>
                                            <a>level 3 item 2</a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <a>Item 3</a>
                </li>
            </div>
            <button
                className="md:hidden btn btn-primary mt-5"
                onClick={() => props.setMobileState(false)}
            >
                Close
            </button>
        </ul>
    );
}
