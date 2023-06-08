export interface CreateQuizChapterDto {
    chapter: ChapterDto;
    quiz?: CreateQuizDto;
    resource?: CreateResourceDto;
}
interface ChapterDto {
    name: string;
}
interface CreateQuizDto {
    title: string;
    description: string;
}
interface CreateResourceDto {
    title: string;
    description: string;
    file: File;
}
