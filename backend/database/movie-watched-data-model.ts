export default class MovieWatchedDataModel {
  private _id: number;
  private _title: string;
  private date: string;

  constructor(id: number, title: string, date: string) {
    this._id = id;
    this._title = title;
    this.date = date;
  }

  public get title(): string {
    return this._title;
  }

  public get id(): number {
    return this._id;
  }
}
