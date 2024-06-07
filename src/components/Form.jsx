import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function convertToEmoji(countryCode) {
    if (countryCode === null || countryCode === undefined) return "";
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const navigate = useNavigate();
    const [lat, lng] = useUrlPosition();
    const { createCity, isLoading } = useCities();

    const [cityName, setCityName] = useState("");
    const [country, setCountryName] = useState({});
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [emoji, setEmoji] = useState("");
    const [geocodingError, setGeocodingError] = useState("");

    useEffect(
        function () {
            if (!lat && !lng) return;
            async function fetchCityData() {
                try {
                    setIsLoadingGeocoding(true);
                    setGeocodingError("");
                    const response = await fetch(
                        `${BASE_URL}?latitude=${lat}&longitude=${lng}`
                    );
                    const data = await response.json();
                    console.log(data);
                    if (!data.countryCode) throw new Error("That's water.");
                    setCityName(data.city || data.locality || "");
                    setCountryName(data.countryName);
                    setEmoji(convertToEmoji(data.countryCode));
                } catch (err) {
                    setGeocodingError(err.message);
                } finally {
                    setIsLoadingGeocoding(false);
                }
            }
            fetchCityData();
        },
        [lat, lng, setIsLoadingGeocoding]
    );

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const city = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {
                lat: Number(lat),
                lng: Number(lng),
            },
        };

        await createCity(city);
        navigate("/app/cities");
    }

    if (isLoadingGeocoding) return <Spinner />;
    if (geocodingError) return <Message message={geocodingError} />;
    if (!lat && !lng)
        return <Message message="Start by clicking somewhere on the map" />;

    return (
        <form
            className={`${styles.form} ${isLoading ? styles.loading : ""}`}
            onSubmit={handleSubmit}
        >
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker
                    id="date"
                    minDate={new Date("1900-01-01T00:00:00")}
                    maxDate={new Date()}
                    dateFormat={"d MMMM yyyy"}
                    selected={date}
                    onChange={(date) => setDate(date)}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton />
            </div>
        </form>
    );
}

export default Form;
