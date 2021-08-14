import TopBar from './TopBar/TopBar';

export default function Layout({ children }) {
    return (
        <div>
            <TopBar />
            <main className="h-screen relative pt-10 px-20">{children}</main>
        </div>
    );
}
