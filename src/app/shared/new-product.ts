export class NewProduct {
    constructor(
        public name: string,
        public category: string,
        public description: string,
        public price: number,
        public images: string[],
        public id?: string,
        public amount?: number,
        public state?: string,
        public comments?: string[],
        public owner?: string
    ) {}
}
