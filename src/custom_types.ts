export interface Pagination {
    page: number;
    count: number;
    next_page: number | string | null;
    previous_page: number | string | null;
    total_results: number;
}

export interface Pageable<P> extends Loadable<P[]> {
    pagination: Pagination;
}

export interface Loadable<L> {
    value: L;
    loading: boolean;
    loaded: boolean;
    message?: any;
}