import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getAllLocations } from "../services/mongooseHelpers";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home(props) {
  const [locations, setLocations] = useState(props.locations);
  const router = useRouter();

  useEffect(async () => {
    const response = await fetch("/api/location");
    const updatedLocations = await response.json();

    setLocations(updatedLocations.locations);
  }, []);

  const locationsList = (
    <ul class="grid grid-cols-3 gap-4">
      {locations.map((location, index) => {
        return (
          <li
            class="border-4	border-green-500 rounded-lg"
            key={location.name + index}
          >
            <div class="text-center text-lg font-bold">{location.name}</div>
            <div>location: {location.location}</div>
            <div>description: {location.description}</div>
            <div>price: {location.price}</div>
            <Link
              type="button"
              href={{
                pathname: "/location/[id]",
                query: {
                  id: location.id,
                },
              }}
            >
              <a class="bg-green-100 p-2 px-8 rounded-md">Info</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
  return (
    <div class="px-20 flex flex-col items-center ">
      <div class="text-center text-green-800 text-5xl mb-10">
        Traveling Locations
      </div>
      {locationsList}
      <button
        class="bg-green-900 px-5 py-5 rounded-xl font-extrabold	text-white cursor-pointer ontent-center"
        onClick={() => router.push("/location")}
      >
        Create New Location
      </button>
    </div>
  );
}

export async function getStaticProps(context) {
  const locations = await getAllLocations();

  return {
    props: { locations: locations },
    revalidate: 300,
  };
}
