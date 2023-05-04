function generateUniqueNumbers(n: number): number[] {
    const uniqueNumbers: number[] = [];

    // Generate n unique integers
    while (uniqueNumbers.length < n) {
        const num = Math.floor(Math.random() * 100) + 1;
        if (!uniqueNumbers.includes(num)) {
            uniqueNumbers.push(num);
        }
    }

    return uniqueNumbers;
}

export function getRandomisedArray(n: number): CellObject[] {
    var array: number[] = generateUniqueNumbers(n)
    array = array.concat(array);
    array = array.sort((a, b) => 0.5 - Math.random());
    console.log(array)
    return array.map(value => {
        return new CellObject(value, false);
    })
}

export class CellObject {
    value: number;
    isOpen: boolean;
    isSolved: boolean = false;

    constructor(value: number, isOpen: boolean) {
        this.value = value;
        this.isOpen = false
    }

    style(): string {
        if (this.isSolved || this.isOpen) {
            return "cell";
        } else {
            return "cell cell-covered";
        }
    }
} 