import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import useBreedList from "./useBreedList";
import PetResults from "./PetResults";
import AdpotPetContext from "./adoptPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: ""
    });
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);
    // eslint-disable-next-line no-unused-vars
    const[adoptedPet, _] = useContext(AdpotPetContext)

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];

    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? ""
                };
                setRequestParams(obj);
            }}>
                {
                    adoptedPet ? (
                        <div className="pet image-container">
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    ) : null
                }
                <label htmlFor="location">
                    Location
                    <input 
                    id="location"
                    name="location"
                    placeholder="Location" />
                </label>

                <label htmlFor="animal">
                    Animal
                    <select
                    id="animal"
                    name="animal"
                    value={animal}
                    onChange={e => {
                        setAnimal(e.target.value);
                    }}
                    onBlur={e => {
                        setAnimal(e.target.value);
                    }}>
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </select>
                </label>

                <label htmlFor="breed">
                    Breed
                    <select
                    id="breed"
                    name="breed"
                    disabled = {breeds.length === 0}>
                        <option />
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <PetResults pets={pets}/>
        </div>
    );
};

export default SearchParams;