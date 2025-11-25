export interface Country {
    cca3: string;
    name: {
        common:string;
        // ? is optional, so some countries has  nativeName, some not
        // API data looks like -> eng=key
        // nativeName: {
        //     eng: { common: "Japan" },
        //     jpn: { common: "日本" }
        //   }
        nativeName?: {
            [key:string]: {
                common:string;
            }
        }
    }

    flags: {
        png: string;
        svg: string;
    }
    population: number;
    region: string;
    subregion?: string;
    capital?: string;
    tld?: string[];
    currencies?: {
        [key: string]: {
            name: string;
            symbol: string
        }
    }

    languages?: {
        [key:string]: string;
    }
    borders?: string[];
}