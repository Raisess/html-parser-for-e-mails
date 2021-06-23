import { join } from "path";
import { readFile } from "fs/promises";

export default class HtmlParser {
  private filePath: string;
  private data: any = {};

  private content: string = "";

  constructor(fileName: string) {
    this.filePath = join(__dirname, `../public/${fileName}.html`);
  }

  public attachData(data: any): void {
    Object.assign(this.data, data);
  }

  private async readFile(): Promise<string> {
    return (await readFile(this.filePath, { encoding: "utf-8" }))
      .split(/[\t|\n]/)
      .join("");
  }

  public async parse(): Promise<string> {
    const dataEntries: Array<[string, any]> = Object.entries(this.data);

    this.content = await this.readFile();

    dataEntries.forEach((entry: [string, any]): void => {
      const regex: RegExp = new RegExp(`{{${entry[0]}}}`, "g");

      this.content = this.content.replace(regex, entry[1]);
    });

    return this.content;
  }
}
