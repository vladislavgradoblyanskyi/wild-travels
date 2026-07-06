export type Traveller = {
    _id: number,
    avatarUrl: string,
    name: string,
    articlesAmount: number,
    savedArticles: number,
}

export type TravellersResponse = {
    users: Traveller[],
    page: number,
    perPage: number,
    totalUsers: number,
    totalPages: number
}