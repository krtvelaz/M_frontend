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

export interface IPageable<P> extends Loadable<P[]> {
    pagination: IPagination;
}

export interface Loadable<L> {
    value: L;
    loading: boolean;
    loaded: boolean;
    message?: any;
}

export interface IPagination {
    current_page: number;
    first_page: number;
    first_page_url: string;
    last_page: string | null;
    last_page_url: string;
    next_page_url: string;
    per_page: number;
    previous_page_url: string | null;
    total: number;
}