import { Timestamp } from "@angular/fire/firestore";

export interface Contract {
    id: string;
    title: string;
    color: string;
    timeZoneOffset: number;
    clientref: string;

    startDate?: Timestamp;

    vendor: string;
    purchaser: string;
    andNominee: boolean;
    orNominee: boolean;

    vendGSTreg: boolean;

    ppaRelevantVend: boolean;
    ppaRelevantPurch: boolean; 

    address: string;
    estate: string;
    description: string;
    lotFlatUnit: string;
    DPref: string;
    regTitle: string;
    area: string;

    purchasePrice: number;
    plusGST: boolean;
    deposit: number;
    GSTdate: Timestamp;
    settlementDate?: Timestamp;

    conditional: boolean;
    financeRequired: boolean;
    kiwisaverRequired: boolean;
    limRequired: boolean;
    brrequired: boolean
    toxrequired: boolean;
    OIArequired: boolean;
    landActRequired: boolean;

    stdConditionDates: {
      ksaver: Timestamp,
      finance: Timestamp,
      limreport: Timestamp,
      buildingreport: Timestamp,
      toxreport: Timestamp,
      oiaappr: Timestamp,
      landAct: Timestamp
    };

    ksaver: Timestamp;

    addConditionDates: {
      duediligence: Timestamp;
      solapprPurch: Timestamp;
      solapprVend: Timestamp;
    };

    otherConds: {};

    agtSignedBothParties: boolean;

    vendAddressForService: string;
    purchAddressForService: string;
}