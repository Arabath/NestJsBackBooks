export class UpdateBookDto {
    readonly id: number; 
    readonly title: string;
    readonly genre: string;
    readonly description: string;
    readonly author: string;
    readonly publisher: string;
    readonly pages: number;
    readonly image_url: string;
}