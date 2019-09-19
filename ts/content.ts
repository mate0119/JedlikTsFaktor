import * as fs from "fs";
import { ParsedUrlQuery } from "querystring";
import * as http from "http";
import * as path from "path";
import * as url from "url";

export default class Content {

    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        res.write("<head>");
        res.write("<title>Faktor</title>");
        res.write("</head>");
        res.write("<body><form style = 'font-family:Courier; font-size:24px'>");
        res.write("<h1>Szám faktoraiálisa</h1>");
        const query: ParsedUrlQuery = url.parse(req.url as string, true).query;
        const a: number = query.aInput === undefined || query.aInput === "" ? 5 : parseFloat(query.aInput as string); // number 64-bits lebegőpontos szám
        const b: number = query.bInput === undefined || query.bInput === "" ? 6 : parseFloat(query.bInput as string);;
        res.write("<p>a= ")
        res.write(`<input type='number' name= 'aInput' value=${a} onChange='this.form.submit();'></p>`);
        res.write("</p>");
        res.write("<p>b= ")
        res.write(`<input type='number' name= 'bInput' value=${b} onChange='this.form.submit();'></p>`);
        res.write("</p>");
        res.write(`<h2>a=${a}<h2>`)
        res.write(`<h2>b=${b}<h2>`)
        let terulet: number;
        terulet = a * b;
        //const terulet: number = a * b;
        const kerulet: number = (a + b) * 2;
        res.write(`<h2>${terulet}</h2>`)
        res.write(`<h2>${kerulet}</h2>`)
        res.write("</form></body>");
        res.write("</html>");
        res.end();
    }
}
