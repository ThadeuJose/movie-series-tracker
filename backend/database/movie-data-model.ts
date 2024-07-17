export default class MovieDataModel {
    private _id: number;
    private _title: string;

    constructor(id:number, title:string) {
        this._id = id;
        this._title = title 
    }

    public get title(): string {
        return this._title;
    }
    
    public get id(): number {
        return this._id;
    }
    
    
}