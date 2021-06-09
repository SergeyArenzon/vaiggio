import Toolbar from './Toolbar';

export default function Layout({ children }) {
    return (
        <div>
            <Toolbar />

            <div style={{ paddingTop: '25px',height: '100vh', position:'relative'}}>{children}</div>
        </div>
    );
}
