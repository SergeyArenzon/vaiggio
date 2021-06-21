import { useRouter } from 'next/router';

export default function LocationInfo() {
    const router = useRouter()
    const { id, data} = router.query

    console.log(data.id);
    return <div>location info: {id}</div>;
}



