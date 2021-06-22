import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LocationInfo() {
    const router = useRouter();
    const { id } = router.query;

    const [locationData, setLocationData] = useState(null);

    useEffect(async () => {
        const response = await fetch(`/api/location/${id}`);
        const data = await response.json();

        setLocationData(data.location);
    }, []);


    if(!locationData){
        return <div>Loading...</div>
    }
    return <div>{locationData.name}</div>;
}
