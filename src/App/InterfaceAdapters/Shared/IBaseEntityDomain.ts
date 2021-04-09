
export default interface IBaseEntityDomain
{
    createdAt: Date;
    updatedAt: Date;

    getId(): string;
    setId?(id: string): void;
    clone?(): void;
}