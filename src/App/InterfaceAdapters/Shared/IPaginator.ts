export default interface IPaginator
{
    paginate(): Promise<any>;
    getTotal(): number;
    getCurrentUrl(): string;
    getNextUrl(): string;
    getExist(): boolean;
}
