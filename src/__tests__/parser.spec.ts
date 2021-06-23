import HtmlParser from "../HtmlParser";

describe("Html Parser test suite", (): void => {
  const parser: HtmlParser = new HtmlParser("index");
  const data: any = {
    name: "Test",
    sendDate: new Date().toLocaleString(),
  };

  beforeAll((): void => {
    parser.attachData(data);
  });

  it("Test parser", async (): Promise<void> => {
    const parsedHtml: string = await parser.parse();

    expect(parsedHtml).toStrictEqual(
      `<div><h1>${data.name}</h1><p>${data.sendDate}</p></div>`,
    );
  });
});
