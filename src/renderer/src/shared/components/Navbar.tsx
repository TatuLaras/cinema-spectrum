import { Xmark, Square, Minus, RefreshDouble } from 'iconoir-react';

import '../styles/navbar.scss';
import {
    refreshLibrary,
    minimize,
    maximize,
    closeApp,
} from '../utils/ipc_actions';

type Props = {};

export default function Navbar({}: Props) {
    return (
        <nav>
            <button
                className="refresh navbar-btn"
                onClick={refreshLibrary}
                title="Refresh Library"
                tabIndex={-1}
            >
                <RefreshDouble className="icon" strokeWidth={2} />
            </button>
            <div className="grab"></div>
            <div className="buttons">
                <button
                    className="minimize navbar-btn"
                    onClick={minimize}
                    tabIndex={-1}
                >
                    <Minus className="icon" strokeWidth={2} />
                </button>
                <button
                    className="maximize navbar-btn"
                    onClick={maximize}
                    tabIndex={-1}
                >
                    <Square className="icon" strokeWidth={2.8} />
                </button>
                <button
                    className="close navbar-btn"
                    onClick={closeApp}
                    tabIndex={-1}
                >
                    <Xmark className="icon" strokeWidth={2} />
                </button>
            </div>
        </nav>
    );
}
