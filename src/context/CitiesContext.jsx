import {
    createContext,
    useEffect,
    useContext,
    useReducer,
    useCallback,
} from "react";
import supabase from "../../services/supabase";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            };
        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };
        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
                currentCity: {},
            };
        case "rejected":
            return {
                ...state,
                error: action.payload,
            };
        default:
            throw new Error("Unexpected reducer action");
    }
}

function CitiesProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { cities, isLoading, currentCity } = state;

    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: "loading" });
            try {
                const { data, error } = await supabase
                    .from("cities")
                    .select("*");

                if (error) {
                    console.log(error);
                    throw Error();
                }

                dispatch({ type: "cities/loaded", payload: data });
            } catch {
                dispatch({ type: "rejected", payload: "Error loading data" });
            }
        }

        fetchCities();
    }, []);

    const getCity = useCallback(
        async function getCity(id) {
            if (Number(id) === currentCity?.id) return;
            dispatch({ type: "loading" });
            try {
                const { data, error } = await supabase
                    .from("cities")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw new Error();

                dispatch({ type: "city/loaded", payload: data });
            } catch {
                dispatch({ type: "rejected", payload: "Error loading data" });
            }
        },
        [currentCity.id]
    );

    async function createCity(city) {
        dispatch({ type: "loading" });
        try {
            const { data, error } = await supabase
                .from("cities")
                .upsert(city)
                .select()
                .single();

            if (error) throw new Error();

            dispatch({ type: "city/created", payload: data });
        } catch {
            dispatch({ type: "rejected", payload: "Error creating city" });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });
        try {
            const { error } = await supabase
                .from("cities")
                .delete()
                .eq("id", id);
            if (error) throw new Error();
            dispatch({ type: "city/deleted", payload: id });
        } catch {
            dispatch({ type: "rejected", payload: "Error deleting city" });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                deleteCity,
                createCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("Cities context was used outside of provider");
    return context;
}

export { CitiesProvider, useCities };
