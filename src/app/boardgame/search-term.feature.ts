import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";

export type SearchTermState = {
    search: string,
    isLoading: boolean,
}

export function withSearchTerm() {
    return signalStoreFeature(
        withState<SearchTermState>({ search: "", isLoading: false }),
    )
    
}

export function setSearch(term: string): Partial<SearchTermState> {
    return { search: term };
}

export function setLoading(isLoading: boolean): Partial<SearchTermState> {
    return { isLoading };
}