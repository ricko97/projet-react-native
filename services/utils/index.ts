export const truncateText = (text: string, nbCharacters: number = 25) => {
    return text.length > 20 ? text.substring(0, nbCharacters) + "..." : text;
}