import Toolbar from './Toolbar';

export default function Layout({ children }) {
    return (
        <div>
            <Toolbar />

            <div class="h-screen relative bg-gray-400 pt-10">{children}</div>
        </div>
    );
}
