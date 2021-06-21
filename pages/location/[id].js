import { useRouter } from 'next/router';

export default function LocationInfo() {
    const router = useRouter()
    const { id, location} = router.query

    console.log(location);
    return <div>location info: {id}</div>;
}



